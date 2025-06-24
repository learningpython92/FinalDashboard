import React, { useState, useEffect, useMemo, useCallback } from 'react';
// We will dynamically import sql.js inside the hook to solve build issues.
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// NOTE: The only 'backend' call is for AI insights. This can be pointed to a live service.
// For the demo, it will gracefully handle being offline.
const AI_INSIGHTS_URL = 'http://localhost:8000/generate_insights';

/* ----------------------------------------------------------------
 * 🔧 In-Browser Database Hook
 * This hook handles loading the SQLite database file and the
 * required WebAssembly module. It provides a simple function
 * to run SQL queries.
 * -------------------------------------------------------------- */
function useDatabase() {
  const [db, setDb] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDb() {
      try {
        // Dynamically import sql.js for Vite compatibility.
        const initSqlJs = (await import('sql.js')).default;

        const SQL = await initSqlJs({
          locateFile: file => `/${file}` // Points to the /public directory for the .wasm file
        });

        const response = await fetch('/dashboard2.db');
        if (!response.ok) {
          throw new Error(`Failed to fetch database: ${response.statusText}`);
        }
        const buffer = await response.arrayBuffer();
        
        const database = new SQL.Database(new Uint8Array(buffer));
        setDb(database);
        
        // --- DEBUGGING STEP ---
        // This will query the master table to list all tables in the loaded database.
        const tables = database.exec("SELECT name FROM sqlite_master WHERE type='table';");
        console.log("Tables found in database:", tables[0].values.flat());

        setIsReady(true);
      } catch (err) {
        console.error("DATABASE LOADING FAILED:", err);
        setError("Failed to load local DB. Check console (F12) for details. Ensure 'dashboard2.db' and 'sql-wasm.wasm' are in the /public folder.");
      }
    }
    loadDb();
  }, []);

  const executeQuery = useCallback((sql, params = []) => {
    if (!isReady || !db) {
      console.error("executeQuery called before DB was ready.");
      return [];
    }
    try {
      const stmt = db.prepare(sql);
      stmt.bind(params);
      const results = [];
      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }
      stmt.free();
      return results;
    } catch (err) {
      console.error("SQL EXECUTION FAILED:", err.message, "\nQuery:", sql, "\nParams:", params);
      throw err;
    }
  }, [db, isReady]);

  return { executeQuery, isReady, error };
}


/* ================================================================
 * 🖥️  TalentDashboard (root component)
 * ================================================================ */
export default function TalentDashboard() {
  /* ---- static filter lists ---- */
  const businessUnits = ['All Units', 'Energy', 'FMCG', 'Tech', 'Media'];
  const functions = ['All Functions', 'Sales', 'Marketing', 'HR', 'Finance', 'Procurement', 'Legal', 'Others'];

  /* ---- state ---- */
  const [selectedBU, setSelectedBU] = useState('All Units');
  const [selectedFunction, setSelectedFunction] = useState('All Functions');
  const [dateRange, setDateRange] = useState({ start: '2025-01-01', end: '2025-12-31' });

  const [view, setView] = useState('main');
  const [selectedKpi, setSelectedKpi] = useState(null);

  const [headcount, setHeadcount] = useState({ total: 0, available: 0, gap: 0 });
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [aiInsights, setAiInsights] = useState([]);
  const [insightsLoading, setInsightsLoading] = useState(false);

  /* ---- data hooks ---- */
  const { executeQuery, isReady, error: dbError } = useDatabase();

  useEffect(() => {
      if(dbError) setError(dbError);
  }, [dbError]);

  /* ---- core data fetch & calculation from local DB ---- */
  useEffect(() => {
    if (!isReady) return;

    const runQueries = () => {
      setLoading(true);
      setError(null);
      
      try {
        // --- 1. Build dynamic WHERE clause for filtering `hiring_data` table ---
        let whereClauses = ["hire_date BETWEEN ? AND ?"];
        let params = [dateRange.start, dateRange.end];

        if (selectedBU !== 'All Units') {
          whereClauses.push("business_group = ?");
          params.push(selectedBU);
        }
        if (selectedFunction !== 'All Functions') {
          whereClauses.push("function = ?");
          params.push(selectedFunction);
        }
        const whereSql = whereClauses.join(" AND ");

        // --- 2. Calculate all KPIs with a single SQL query ---
        const kpiSql = `
          SELECT
            COUNT(*) as total_hires,
            AVG(time_to_fill) as average_ttf,
            AVG(cost_per_hire) as average_cph,
            AVG(CASE WHEN ijp_adherence = 1 THEN 1.0 ELSE 0.0 END) * 100 as ijp_adherence,
            AVG(CASE WHEN build_buy_ratio = 'Build' THEN 1.0 ELSE 0.0 END) * 100 as build_ratio,
            AVG(CASE WHEN diversity_ratio = 1 THEN 1.0 ELSE 0.0 END) * 100 as diversity_ratio
          FROM hiring_data
          WHERE ${whereSql}
        `;
        const kpiResult = executeQuery(kpiSql, params);
        
        // --- 3. Query the `business_summary` table for headcount data ---
        let headcountSql = '';
        let headcountParams = [];

        if (selectedBU === 'All Units' && selectedFunction === 'All Functions') {
            headcountSql = `SELECT SUM(total_headcount) as total, SUM(available_headcount) as available, SUM(gap) as gap FROM business_summary WHERE function = 'Overall'`;
        } else if (selectedBU !== 'All Units' && selectedFunction === 'All Functions') {
            headcountSql = `SELECT total_headcount as total, available_headcount as available, gap FROM business_summary WHERE business_group = ? AND function = 'Overall'`;
            headcountParams = [selectedBU];
        } else if (selectedBU === 'All Units' && selectedFunction !== 'All Functions') {
            headcountSql = `SELECT SUM(total_headcount) as total, SUM(available_headcount) as available, SUM(gap) as gap FROM business_summary WHERE function = ? AND business_group != 'All Units'`;
            headcountParams = [selectedFunction];
        } else {
            headcountSql = `SELECT total_headcount as total, available_headcount as available, gap FROM business_summary WHERE business_group = ? AND function = ?`;
            headcountParams = [selectedBU, selectedFunction];
        }

        const headcountResult = executeQuery(headcountSql, headcountParams);

        // --- 4. Shape data and update state ---
        if (kpiResult.length > 0) {
            const raw = kpiResult[0];
            setKpiData({
                'Total Hires': fmt(raw.total_hires),
                'Avg. Time to Fill': `${fmt(raw.average_ttf)} days`,
                'Avg. Cost Per Hire': fmt(raw.average_cph, true),
                'IJP Adherence': fmt(raw.ijp_adherence) + '%',
                'Build Ratio': fmt(raw.build_ratio) + '%',
                'Diversity %': fmt(raw.diversity_ratio) + '%',
            });
        }
        if (headcountResult.length > 0 && headcountResult[0].total !== null) {
            setHeadcount(headcountResult[0]);
        } else {
            setHeadcount({ total: 0, available: 0, gap: 0 });
        }

      } catch (e) {
        console.error("A critical error occurred while calculating metrics:", e);
        setError('Failed to calculate dashboard metrics. Check console for details.');
      } finally {
        setLoading(false);
      }
    };
    runQueries();
  }, [isReady, selectedBU, selectedFunction, dateRange, executeQuery]);

  /* ---- AI insight fetch (debounced) ---- */
  useEffect(() => {
    if (!isReady || !kpiData) return;

    const getInsights = async () => {
      setInsightsLoading(true);
      try {
        const payload = {
          business_group: selectedBU === 'All Units' ? null : selectedBU,
          function: selectedFunction === 'All Functions' ? null : selectedFunction,
          start_date: dateRange.start,
          end_date: dateRange.end,
          kpi_summary: kpiData
        };
        const response = await fetch(AI_INSIGHTS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if(!response.ok) throw new Error("Network response was not ok.");

        const data = await response.json();
        setAiInsights(data.insights || []);
      } catch {
        setAiInsights(['⚠️ AI insight service is currently offline.']);
      } finally {
        setInsightsLoading(false);
      }
    };

    const timer = setTimeout(getInsights, 500);
    return () => clearTimeout(timer);
  }, [isReady, kpiData, selectedBU, selectedFunction, dateRange]);

  /* ---- handlers ---- */
  const openDrill = (k) => {
    setSelectedKpi(k);
    setView('drilldown');
  };

  /* ---- render ---- */
  if (!isReady && !dbError) {
      return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-xl font-bold">🚀 Loading Database...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-4 sm:p-6 font-sans">
      <div className="max-w-screen-xl mx-auto">
        <Header />
        <Filters
          businessUnits={businessUnits}
          functions={functions}
          selectedBU={selectedBU}
          selectedFunction={selectedFunction}
          dateRange={dateRange}
          onBU={setSelectedBU}
          onFunc={setSelectedFunction}
          onDate={setDateRange}
        />
        {error && <Banner text={error} />}

        {view === 'main' ? (
          <MainDashboardView
            headcount={headcount}
            kpis={kpiData}
            loading={loading}
            onKpiClick={openDrill}
            insights={aiInsights}
            insightsLoading={insightsLoading}
          />
        ) : (
          <DrilldownView
            kpiName={selectedKpi}
            onBack={() => setView('main')}
            filters={{ bu: selectedBU, func: selectedFunction, dates: dateRange }}
            executeQuery={executeQuery}
          />
        )}
      </div>
    </div>
  );
}

/* ================================================================
 * DrilldownView (Refactored to use SQL)
 * ================================================================ */
const KPI_SQL_MAP = {
  'Total Hires': { key: 'total_hires', sql: 'COUNT(*)', color: '#3b82f6' },
  'Avg. Time to Fill': { key: 'average_ttf', sql: 'AVG(time_to_fill)', color: '#82ca9d' },
  'Avg. Cost Per Hire': { key: 'average_cph', sql: 'AVG(cost_per_hire)', color: '#eab308' },
  'IJP Adherence': { key: 'ijp_adherence', sql: "AVG(CASE WHEN ijp_adherence = 1 THEN 1.0 ELSE 0.0 END) * 100", color: '#ec4899' },
  'Build Ratio': { key: 'build_ratio', sql: "AVG(CASE WHEN build_buy_ratio = 'Build' THEN 1.0 ELSE 0.0 END) * 100", color: '#8b5cf6' },
  'Diversity %': { key: 'diversity_ratio', sql: "AVG(CASE WHEN diversity_ratio = 1 THEN 1.0 ELSE 0.0 END) * 100", color: '#f97316' },
};

function DrilldownView({ kpiName, onBack, filters, executeQuery }) {
  const kpiInfo = KPI_SQL_MAP[kpiName];
  
  const [trendData, setTrendData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [barChartConfig, setBarChartConfig] = useState({ title: '', dataKey: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!kpiInfo) {
      setError("Unknown KPI for drilldown.");
      setLoading(false);
      return;
    }
    const fetchAll = () => {
      setLoading(true);
      setError(null);
      try {
        let baseWhere = ["hire_date BETWEEN ? AND ?"];
        let baseParams = [filters.dates.start, filters.dates.end];
        if (filters.bu !== 'All Units') {
            baseWhere.push("business_group = ?");
            baseParams.push(filters.bu);
        }

        let trendWhere = [...baseWhere];
        let trendParams = [...baseParams];
        if (filters.func !== 'All Functions') {
            trendWhere.push("function = ?");
            trendParams.push(filters.func);
        }
        
        const trendSql = `
            SELECT strftime('%Y-%m', hire_date) as month, ${kpiInfo.sql} as value
            FROM hiring_data WHERE ${trendWhere.join(' AND ')}
            GROUP BY month ORDER BY month ASC
        `;
        const trendResult = executeQuery(trendSql, trendParams);
        setTrendData(trendResult.map(r => ({ ...r, month: new Date(r.month + '-02').toLocaleString('default', { month: 'short' }) })));
        
        let barSql, barConfig;

        if (filters.func !== 'All Functions') {
          barConfig = { title: 'Business Unit Comparison', dataKey: 'business_group' };
          let barWhere = ["hire_date BETWEEN ? AND ?"];
          let barParams = [filters.dates.start, filters.dates.end];
          barWhere.push("function = ?");
          barParams.push(filters.func);
          barSql = `
              SELECT business_group, ${kpiInfo.sql} as value
              FROM hiring_data WHERE ${barWhere.join(' AND ')}
              GROUP BY business_group ORDER BY value DESC
          `;
          const barResult = executeQuery(barSql, barParams);
          setBarData(barResult);
        } else {
          barConfig = { title: 'Function-wise Comparison', dataKey: 'function' };
          barSql = `
              SELECT function, ${kpiInfo.sql} as value
              FROM hiring_data WHERE ${baseWhere.join(' AND ')}
              GROUP BY function ORDER BY value DESC
          `;
          const barResult = executeQuery(barSql, baseParams);
          setBarData(barResult);
        }
        setBarChartConfig(barConfig);

      } catch (e) {
        console.error('Drilldown query error:', e);
        setError('Failed to load drilldown data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [filters, kpiInfo, executeQuery]);

  const yDomainLine = useMemo(() => padDomain(Math.min(...trendData.map(d => d.value)), Math.max(...trendData.map(d => d.value))), [trendData]);
  const yDomainBar = useMemo(() => padDomain(Math.min(...barData.map(d => d.value)), Math.max(...barData.map(d => d.value))), [barData]);
  const Tt = ({ active, payload, label }) => active && payload?.[0] ? <div className="p-2 bg-gray-700/80 border border-gray-600 rounded text-white text-sm"><p className="font-bold mb-1">{label}</p><p style={{ color: payload[0].color }}>{`${payload[0].name}: ${fmt(payload[0].value, kpiName.includes('Cost'))}`}</p></div> : null;

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Drilldown: <span style={{color: kpiInfo?.color}}>{kpiName}</span></h2>
            <button onClick={onBack} className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-transform hover:scale-105">← Back</button>
        </div>
        {error && <Banner text={error} />}
        {loading ? <div className="text-center p-10">Calculating Drilldown...</div> : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartContainer title="Month-wise Trend">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={trendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                            <XAxis dataKey="month" stroke="#A0AEC0" />
                            <YAxis stroke="#A0AEC0" domain={yDomainLine} tickFormatter={v => fmt(v, kpiName.includes('Cost'))}/>
                            <Tooltip content={<Tt />} />
                            <Line type="monotone" dataKey="value" name={kpiName} stroke={kpiInfo?.color || '#8884d8'} strokeWidth={2} dot={{r: 2}} activeDot={{r: 6}} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
                <ChartContainer title={barChartConfig.title}>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                            <XAxis dataKey={barChartConfig.dataKey} stroke="#A0AEC0" tick={{fontSize: 12}} />
                            <YAxis domain={yDomainBar} tickFormatter={v => fmt(v, kpiName.includes('Cost'))}/>
                            <Tooltip content={<Tt />} />
                            <Bar dataKey="value" name={kpiName} fill={kpiInfo?.color || '#8884d8'} fillOpacity={0.8} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
        )}
    </div>
  );
}


/* ================================================================
 * Helper Components and Formatting Functions
 * ================================================================ */
const fmt = (v, isCurrency = false) => {
    if (v === null || v === undefined || !Number.isFinite(+v)) return '—';
    const num = Math.round(v);
    const prefix = isCurrency ? '₹' : '';
    return prefix + num.toLocaleString('en-IN');
};
const padDomain = (min, max) => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0, 'auto'];
  if (min === max) return [min > 0 ? min * 0.9 : min * 1.1, max > 0 ? max * 1.1 : max * 0.9];
  const span = max - min;
  return [min - span * 0.05, max + span * 0.05];
};
const Header = () => <header className="mb-6"><h1 className="text-3xl font-bold text-white">Talent Dashboard</h1><p className="text-gray-400 mt-1">Core hiring metrics powered by a local SQL database</p></header>;
const Banner = ({ text }) => <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg mb-8 animate-fade-in">{text}</div>;
const ChartContainer = ({ title, children }) => <div className="bg-gray-800/60 p-4 sm:p-6 rounded-lg shadow-md"><h4 className="font-semibold text-gray-200 mb-4">{title}</h4>{children}</div>;

function Filters({ businessUnits, functions, selectedBU, selectedFunction, dateRange, onBU, onFunc, onDate }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 sm:p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="md:col-span-3 lg:col-span-2">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">{businessUnits.map((u) => <button key={u} onClick={() => onBU(u)} className={`px-4 py-2 text-sm rounded-lg font-semibold transition whitespace-nowrap ${selectedBU === u ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}`}>{u}</button>)}</div>
        </div>
        <div className="md:col-span-1"><select value={selectedFunction} onChange={(e) => onFunc(e.target.value)} className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none">{functions.map((f) => <option key={f} value={f} className="bg-gray-800 text-white">{f}</option>)}</select></div>
        <div className="md:col-span-2 lg:col-span-1 flex gap-2 items-center"><input type="date" value={dateRange.start} onChange={(e) => onDate({ ...dateRange, start: e.target.value })} className="w-full px-2 py-2 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white" /><span className="text-gray-500">-</span><input type="date" value={dateRange.end} onChange={(e) => onDate({ ...dateRange, end: e.target.value })} className="w-full px-2 py-2 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white" /></div>
      </div>
    </div>
  );
}

function MainDashboardView({ headcount, kpis, loading, onKpiClick, insights, insightsLoading }) {
  // CHANGED: This component now takes a full background color class for a solid fill.
  const StatCard = ({ t, v, bgColor }) => (
    <div className={`${bgColor} p-6 rounded-lg shadow-lg`}>
      <h3 className="text-sm font-semibold text-white/80">{t}</h3>
      <p className="text-3xl font-bold text-white mt-2">{fmt(v)}</p>
    </div>
  );
  const KpiCard = ({ k, v }) => <div onClick={() => onKpiClick(k)} className="bg-gray-800/60 p-4 rounded-lg shadow-md h-24 cursor-pointer hover:bg-gray-700/80 transition-all hover:-translate-y-1 flex flex-col justify-between"><h4 className="text-sm font-medium text-gray-400">{k}</h4><p className="text-2xl font-bold text-white">{v ?? '—'}</p></div>;

  if (loading) return <div className="text-center p-10 font-semibold text-lg">⚙️ Calculating Metrics...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <section><h2 className="text-xl font-semibold text-white mb-4">Headcount Overview</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CHANGED: Passing full background color classes */}
        <StatCard t="Total Headcount" v={headcount.total} bgColor="bg-green-600" />
        <StatCard t="Available Headcount" v={headcount.available} bgColor="bg-orange-500" />
        <StatCard t="Open Positions (Gap)" v={headcount.gap} bgColor="bg-red-600" />
      </div></section>
      {/* CHANGED: KPI grid layout changed to 3x2 on large screens */}
      <section><h2 className="text-xl font-semibold text-white mb-4">Key Performance Indicators</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{kpis && Object.entries(kpis).map(([k, v]) => <KpiCard key={k} k={k} v={v} />)}</div></section>
      <section><h2 className="text-xl font-semibold text-white mb-4">AI-Driven Insights</h2>{insightsLoading ? <div className="text-center text-gray-500 p-6">🧠 Generating AI Insights...</div> : <InsightGrid insights={insights} />} </section>
    </div>
  );
}

function InsightGrid({ insights }) {
  if (!insights || !insights.length) return <div className="text-center text-gray-500 p-6">No insights for current selection.</div>;
  const titles = ['Key Observation', 'Potential Risk', 'Recommendation'];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{insights.map((txt, idx) => (<div key={idx} className={`bg-gray-800/60 p-6 rounded-lg shadow-md ${txt.startsWith('⚠️') ? 'border border-red-700/50' : ''}`}><h3 className={`${txt.startsWith('⚠️') ? 'text-red-400' : 'text-blue-400'} font-semibold mb-2`}>{txt.startsWith('⚠️') ? 'API Error' : titles[idx] || 'Insight'}</h3><p className="text-gray-400 text-sm leading-relaxed">{txt.replace(/^- /, '')}</p></div>))}</div>
  );
}
