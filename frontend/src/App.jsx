/* ================================================================
 *  App.jsx  –  DB-free Talent Dashboard (insights from dummyData)
 * ================================================================ */
import React, { useState, useEffect, useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

/* local helpers & data ----------------------------------------- */
import { getDummyData } from './data/dummyData';

/* ────────────────────────── helpers ─────────────────────────── */
const numeric = v => +String(v).replace(/[^\d.]/g, '') || 0;
const fmt = (v, isCurr = false) =>
  (isCurr ? '₹' : '') + numeric(v).toLocaleString('en-IN');

/* fast deterministic pseudo-random for trend generation */
const h32  = s => [...s].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 9_654_435) + 1, 0) | 0;
const prnd = seed => () => (seed = (seed * 48_271) % 0x7fffffff) / 0x7fffffff;

/* ================================================================
 *  ROOT  –  TalentDashboard
 * ================================================================ */
export default function TalentDashboard() {
  const businessUnits = ['All Units', 'Energy', 'FMCG', 'Tech', 'Media'];
  const functions     = ['All Functions', 'Sales', 'Marketing', 'HR', 'Finance',
                         'Procurement', 'Legal', 'Others'];

  /* filters & navigation */
  const [selectedBU,   setSelectedBU]   = useState('All Units');
  const [selectedFunc, setSelectedFunc] = useState('All Functions');
  const [dateBucket,   setDateBucket]   = useState('ytd');      // ytd | last6Months | last3Months
  const [view,         setView]         = useState('main');     // main | drilldown
  const [selectedKpi,  setKpi]          = useState(null);

  /* data state */
  const [headcount, setHeadcount] = useState({});
  const [kpiData,   setKpiData]   = useState(null);
  const [insights,  setInsights]  = useState([]);
  const [error,     setError]     = useState(null);
  const [loading,   setLoading]   = useState(true);

  /* fetch dummy block whenever filters change ------------------- */
  useEffect(() => {
    setLoading(true);
    try {
      const blk = getDummyData(selectedBU, selectedFunc, dateBucket);
      setHeadcount(blk.headcount);
      setKpiData(blk.kpis);
      setInsights(blk.insights);        // long-form insights straight from JSON
      setError(null);
    } catch (e) {
      console.error(e);
      setError('Failed to load demo data.');
    } finally {
      setLoading(false);
    }
  }, [selectedBU, selectedFunc, dateBucket]);

  if (loading) return <Splash text="🚀 Loading demo data…" />;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-4 sm:p-6 font-sans">
      <div className="max-w-screen-xl mx-auto">
        <Header />

        <Filters
          businessUnits={businessUnits}
          functions={functions}
          bucket={dateBucket}
          onBU={setSelectedBU}
          onFunc={setSelectedFunc}
          onBucket={setDateBucket}
          selectedBU={selectedBU}
          selectedFunction={selectedFunc}
        />

        {error && <Banner text={error} />}

        {view === 'main' ? (
          <MainDashboardView
            headcount={headcount}
            kpis={kpiData}
            insights={insights}
            onKpiClick={k => { setKpi(k); setView('drilldown'); }}
          />
        ) : (
          <DrilldownView
            kpiName={selectedKpi}
            onBack={() => setView('main')}
            filters={{ bu: selectedBU, func: selectedFunc, bucket: dateBucket }}
          />
        )}
      </div>
    </div>
  );
}

/* ================================================================
 *  Drill-down view  (filter-reactive trend w/ 20 % padding)
 * ================================================================ */
function DrilldownView({ kpiName, onBack, filters }) {
  const block = getDummyData(filters.bu, filters.func, filters.bucket);
  const cards = block.drilldownInsights?.[kpiName] || [];

  /* deterministic 12-month trend ------------------------------- */
  const lineData = useMemo(() => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const base   = numeric(block.kpis[kpiName]);
    const span   = filters.bucket === 'last3Months' ? 0.25
                 : filters.bucket === 'last6Months' ? 0.15 : 0.10;
    const rnd    = prnd((h32(`${filters.bu}|${filters.func}|${kpiName}|${filters.bucket}`)>>>0)+1);
    let val      = base * (1 - span);

    /* NOTE: months.map((_,i)=>{... months[i] ...}) avoids the
       previous months.shift() side-effect while keeping order. */
    return months.map((m, i) => {
      val += base * span / 11;
      val += (rnd() - 0.5) * base * span * 0.3;
      return { month: m, value: Math.round(val) };
    });
  }, [block, kpiName, filters]);

  const vMin    = Math.min(...lineData.map(d => d.value));
  const vMax    = Math.max(...lineData.map(d => d.value));
  const yDomain = [Math.floor(vMin * 0.8), Math.ceil(vMax * 1.2)];

  /* bar comparison --------------------------------------------- */
  const barData = useMemo(() => {
    if (filters.func !== 'All Functions') {
      return ['Energy','FMCG','Tech','Media','Manufacturing','Retail'].map(bu => ({
        label: bu,
        value: numeric(getDummyData(bu, filters.func, 'ytd').kpis[kpiName])
      }));
    }
    return ['Sales','Marketing','HR','Finance','Procurement','Legal','Others'].map(fn => ({
      label: fn,
      value: numeric(getDummyData(filters.bu, fn, 'ytd').kpis[kpiName])
    }));
  }, [filters, kpiName]);

  const col = '#3b82f6';

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Drill-down: {kpiName}</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold"
        >
          ← Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="12-month Trend">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="month" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" domain={yDomain} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke={col} strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Comparison">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="label" stroke="#A0AEC0" tick={{ fontSize: 12 }} />
              <YAxis stroke="#A0AEC0" />
              <Tooltip />
              <Bar dataKey="value" fill={col} fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <InsightGrid insights={cards} />
    </div>
  );
}

/* ================================================================
 *  Shared small components
 * ================================================================ */
const Splash = ({ text }) => (
  <div className="min-h-screen flex items-center justify-center text-xl text-white">
    {text}
  </div>
);

const Banner = ({ text }) => (
  <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg mb-8">
    {text}
  </div>
);

const Header = () => (
  <header className="mb-6">
    <h1 className="text-3xl font-bold text-white">Talent Dashboard (Demo)</h1>
    <p className="text-gray-400 mt-1">All numbers are synthetic but deterministic.</p>
  </header>
);

const ChartContainer = ({ title, children }) => (
  <div className="bg-gray-800/60 p-4 sm:p-6 rounded-lg shadow-md">
    <h4 className="font-semibold text-gray-200 mb-4">{title}</h4>
    {children}
  </div>
);

/* --------------------------------------------------------------
 *  Filters component
 * -------------------------------------------------------------- */
function Filters({
  businessUnits,
  functions,
  bucket,
  onBU,
  onFunc,
  onBucket,
  selectedBU,
  selectedFunction
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4 sm:p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* BU pills */}
        <div className="md:col-span-3 lg:col-span-2 flex gap-2 overflow-x-auto -mx-4 px-4">
          {businessUnits.map(u => (
            <button
              key={u}
              onClick={() => onBU(u)}
              className={`px-4 py-2 text-sm rounded-lg font-semibold transition whitespace-nowrap
                ${
                  selectedBU === u
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {u}
            </button>
          ))}
        </div>

        {/* Function select */}
        <div className="md:col-span-1">
          <select
            value={selectedFunction}
            onChange={e => onFunc(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
          >
            {functions.map(f => (
              <option key={f} value={f} className="bg-gray-800 text-white">
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Date bucket select */}
        <div className="md:col-span-2 lg:col-span-1">
          <select
            value={bucket}
            onChange={e => onBucket(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
          >
            <option value="ytd">Year-to-date</option>
            <option value="last6Months">Last 6 months</option>
            <option value="last3Months">Last 3 months</option>
          </select>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------
 *  Main dashboard view
 * -------------------------------------------------------------- */
function MainDashboardView({ headcount, kpis, insights, onKpiClick }) {
  if (!kpis) return null;

  const StatCard = ({ label, value, bg }) => (
    <div className={`${bg} p-6 rounded-lg shadow-lg`}>
      <h3 className="text-sm font-semibold text-white/80">{label}</h3>
      <p className="text-3xl font-bold text-white mt-2">{fmt(value)}</p>
    </div>
  );

  const KpiCard = ({ k, v }) => (
    <div
      onClick={() => onKpiClick(k)}
      className="bg-gray-800/60 p-4 rounded-lg shadow-md h-24 cursor-pointer hover:bg-gray-700/80
                 transition-all hover:-translate-y-1 flex flex-col justify-between"
    >
      <h4 className="text-sm font-medium text-gray-400">{k}</h4>
      <p className="text-2xl font-bold text-white">{v}</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Headcount */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Headcount Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Headcount"     value={headcount.total}     bg="bg-green-600" />
          <StatCard label="Available Headcount" value={headcount.available} bg="bg-orange-500" />
          <StatCard label="Open Positions"      value={headcount.gap}       bg="bg-red-600" />
        </div>
      </section>

      {/* KPI grid */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Key Performance Indicators</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(kpis).map(([k, v]) => (
            <KpiCard key={k} k={k} v={v} />
          ))}
        </div>
      </section>

      {/* Insights */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">AI-Driven Insights</h2>
        <InsightGrid insights={insights} />
      </section>
    </div>
  );
}

/* --------------------------------------------------------------
 *  Card-style insight grid  (main & drill)
 * -------------------------------------------------------------- */
function InsightGrid({ insights }) {
  if (!insights?.length) {
    return <div className="text-center text-gray-500 p-6">No insights.</div>;
  }

  const titles = ['Key Observation', 'Potential Risk', 'Recommendation'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {insights.map((txt, i) => (
        <div key={i} className="bg-gray-800/60 p-6 rounded-lg shadow-md">
          <h3 className="text-blue-400 font-semibold mb-2">{titles[i] || 'Insight'}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {txt.replace(/^[^A-Za-z0-9]*/, '')}
          </p>
        </div>
      ))}
    </div>
  );
}
