/* ===========================================================================
 *  dummyData.js  –  FULL mock dataset + helpers with ENHANCED AI INSIGHTS
 *  Drop this file into:  frontend/src/data/dummyData.js
 * ======================================================================== */

export const dummyData = {
    /* -------- 1. META ----------------------------------------------------- */
    meta: {
      businessUnits: [
        "All Units", "Tech", "FMCG", "Energy", "Media", "Manufacturing", "Retail"
      ],
      functions: [
        "All Functions", "Sales", "Marketing", "HR", "Finance",
        "Procurement", "Legal", "Operations", "R&D", "Others"
      ]
    },
  
    /* -------- 2. MASTER DATASTORE (EVERYTHING) ---------------------------- */
    dataStore: {
      /* ─────────────────── ALL UNITS | ALL FUNCTIONS ──────────────────── */
      "All Units|All Functions": {
        ytd: {
          headcount: { total: 45200, available: 42100, gap: 3100 },
          kpis: {
            "Total Hires": 4850,
            "Avg. Time to Fill": "52 days",
            "Avg. Cost Per Hire": "₹2,10,500",
            "IJP Adherence": "82%",
            "Build Ratio": "68%",
            "Diversity %": "41%"
          },
          insights: [
            "🎯 Strategic Momentum: Our hiring velocity of 4,850 employees YTD represents a 15% acceleration compared to last year, positioning us ahead of planned growth targets. This aggressive expansion signals strong market confidence and business pipeline health across all verticals.",
            "💰 Cost Optimization Alert: The average cost per hire has increased to ₹2.1L, driven by intensified competition for specialized talent in emerging technologies. While this 8% increase is within industry norms, it represents a ₹45 crore annual impact that requires strategic intervention through enhanced referral programs and talent pipeline development.",
            "🔄 Talent Pipeline Transformation: With 82% IJP adherence and 68% build ratio, we're successfully balancing internal mobility with external talent acquisition. However, our dependency on external agencies for 32% of hires suggests an opportunity to strengthen our employer brand and direct sourcing capabilities to achieve greater cost efficiency and cultural alignment."
          ],
          drilldownInsights: {
            "Total Hires": [
              "📈 Performance Excellence: Our 4,850 YTD hires exceed the planned 4,200 target by 15.5%, demonstrating exceptional execution by our talent acquisition teams. This over-achievement is primarily driven by accelerated business expansion in Tech (+25%) and FMCG (+18%) verticals.",
              "⚠️ Operational Risk: Current hiring velocity is pushing our onboarding infrastructure to capacity limits. HR Operations reports a 3.2-week average onboarding cycle, approaching the 4-week threshold where candidate experience deteriorates and potential drop-off rates increase by 12%.",
              "🚀 Strategic Recommendation: Immediately scale HR-Ops capacity by adding 3 onboarding specialists and implementing bi-weekly induction cycles. Additionally, deploy automated onboarding workflows to handle the anticipated Q4 hiring surge of 1,800+ positions across priority business units."
            ],
            "Avg. Time to Fill": [
              "✅ Benchmark Performance: Our 52-day average time-to-fill represents an 8-day improvement from the 60-day baseline in 2024, positioning us favorably against industry standards. This efficiency gain translates to ₹15 crore in productivity savings through reduced vacancy costs.",
              "🔥 Market Heat Impact: Despite overall improvement, specialized roles in AI/ML, cybersecurity, and renewable energy are experiencing 75+ day cycles due to severe talent scarcity. These extended timelines are delaying 23 critical projects worth ₹180 crore in potential revenue.",
              "💡 Strategic Intervention: Lock in exclusive partnerships with 5 specialized recruitment firms by end of Q3, covering niche skill areas. Simultaneously, launch targeted talent communities for hard-to-fill roles, providing 6-month advance pipeline visibility for critical positions."
            ],
            "Avg. Cost Per Hire": [
              "📊 Market Reality: Our ₹2.1L average cost per hire reflects a 6% premium above peer median, justified by our focus on high-caliber talent in growth markets. However, this premium varies significantly - from ₹95K in Retail to ₹4.5L in Tech, indicating the need for role-specific cost optimization strategies.",
              "💸 Financial Risk: If the current mix continues shifting toward senior/specialized hires (currently 34% of total), we project a ₹28 crore budget overrun by year-end. The Tech division alone accounts for 45% of this cost escalation despite representing only 31% of total hires.",
              "🎯 Cost Optimization Strategy: Implement tiered salary bands with 15% tighter ranges, accelerate internal promotions to fill 75% of senior positions, and launch a company-wide referral program with enhanced incentives targeting the top 20% of high-cost roles. Target: reduce average CPH to ₹1.95L by Q1 2026."
            ],
            "IJP Adherence": [
              "🌟 Cultural Strength: Our 82% internal job posting adherence rate demonstrates a robust internal mobility culture, contributing to 18% higher employee retention compared to industry benchmarks. This translates to ₹35 crore in avoided replacement costs and preserved institutional knowledge.",
              "🔍 Risk Identification: Pockets of low IJP adherence in Manufacturing (76%) and Energy (73%) are creating talent stagnation, with 127 high-potential employees flagged as flight risks. Exit interviews reveal that 68% of departing talent cite 'limited growth visibility' as a primary concern.",
              "📢 Visibility Enhancement: Mandate IJP success story presentations in all BU town halls, implement quarterly 'Internal Mobility Showcases,' and launch a career pathway visualization tool. Target: achieve 85% IJP adherence across all BUs by Q2 2026, with no BU falling below 80%."
            ],
            "Build Ratio": [
              "⚖️ Strategic Balance: Our 68% build ratio demonstrates healthy balance between nurturing internal talent and injecting fresh perspectives through external hiring. This approach has resulted in 23% faster project ramp-up times and 31% higher employee engagement scores in teams with mixed talent composition.",
              "🔧 Capability Gap: Analysis reveals that when internal talent is stretched beyond 75% capacity, time-to-competency increases by 40% for emerging technology projects. Currently, 34 critical skill areas show concerning gaps, particularly in AI/ML, cloud architecture, and sustainable energy solutions.",
              "🎓 Learning Acceleration: Launch intensive L&D sprints targeting the top 15 emerging technology stacks identified through skills gap analysis. Partner with leading tech universities to create 3-month certification programs, targeting 500 employees in the first wave. Expected outcome: reduce external hiring dependency by 12% while maintaining delivery quality."
            ],
            "Diversity %": [
              "🏆 Diversity Leadership: Our 41% diversity rate exceeds the 2024 target of 38% and surpasses industry average by 8 percentage points. This achievement correlates with 19% higher innovation metrics and 14% better customer satisfaction scores in diverse teams.",
              "⚡ Performance Variability: While overall diversity is strong, significant BU variations exist - from 28% in Manufacturing to 52% in FMCG. The Tech BU's 35% rate is particularly concerning given its strategic importance and the documented correlation between diversity and innovation outcomes in technology roles.",
              "🎯 Systematic Enhancement: Implement mandatory diverse interview panels for all Level 5+ positions, establish partnerships with 8 women-in-tech organizations, and create sponsorship programs linking senior leaders with high-potential diverse talent. Target: achieve 45% enterprise-wide diversity by 2026 with no BU below 35%."
            ]
          }
        },
        last6Months: {
          headcount: { total: 45200, available: 42100, gap: 3100 },
          kpis: {
            "Total Hires": 2500,
            "Avg. Time to Fill": "55 days",
            "Avg. Cost Per Hire": "₹2,25,000",
            "IJP Adherence": "80%",
            "Build Ratio": "65%",
            "Diversity %": "43%"
          },
          insights: [
            "🚀 Accelerated Growth Phase: The last 6 months witnessed unprecedented hiring intensity, with FMCG and Media leading the charge at 22% and 28% growth respectively. This surge aligns with our market expansion strategy and the successful launch of 12 new product lines across these verticals.",
            "⏰ Time-to-Fill Pressure: Despite strong hiring volumes, our average time-to-fill slipped by 3 days to 55 days, primarily driven by marketing role bottlenecks across all BUs. Analysis reveals that 67% of marketing positions require 65+ days to fill, impacting campaign launch timelines and go-to-market strategies.",
            "🎓 Talent Pipeline Innovation: Strategic university partnerships established with 15 tier-1 institutions are showing early promise, with 18% of junior marketing hires now coming through campus channels. This initiative could potentially reduce external agency dependency by 25% for entry-level positions over the next 12 months."
          ]
        },
        last3Months: {
          headcount: { total: 45200, available: 42100, gap: 3100 },
          kpis: {
            "Total Hires": 1300,
            "Avg. Time to Fill": "58 days",
            "Avg. Cost Per Hire": "₹2,35,000",
            "IJP Adherence": "78%",
            "Build Ratio": "62%",
            "Diversity %": "45%"
          },
          insights: [
            "📊 Strategic Recalibration: Q2 hiring volumes moderated to 1,300 positions as planned, reflecting our disciplined approach to budget reallocation and strategic focus on high-impact roles. This 23% reduction from Q1 levels demonstrates effective workforce planning and financial prudence.",
            "🌟 Diversity Milestone: New hire diversity reached a 12-month high of 45%, driven by the success of targeted DEI initiatives including blind resume screening (piloted in 3 BUs) and inclusive job description optimization. This improvement spans all seniority levels, with leadership hires showing particularly strong progress at 41% diversity.",
            "📈 Program Momentum: Early indicators from Q2 DEI programs are highly positive, with 34% improvement in diverse candidate pipeline quality and 28% increase in offer acceptance rates among underrepresented groups. Continue current trajectory while expanding successful initiatives to remaining BUs for maximum impact."
          ]
        }
      },
  
      /* ────────────────────────────── TECH BU ───────────────────────────── */
      "Tech|All Functions": {
        ytd: {
          headcount: { total: 12000, available: 11500, gap: 500 },
          kpis: {
            "Total Hires": 1500,
            "Avg. Time to Fill": "68 days",
            "Avg. Cost Per Hire": "₹4,50,000",
            "IJP Adherence": "70%",
            "Build Ratio": "80%",
            "Diversity %": "35%"
          },
          insights: [
            "🏗️ Internal Talent Powerhouse: Tech BU's exceptional 80% build ratio signals a mature internal promotion culture and strong technical career progression framework. This approach has resulted in 34% higher retention rates compared to industry peers and 28% faster project delivery due to deep institutional knowledge retention.",
            "🔥 Market Competition Reality: Our 68-day average time-to-fill reflects the intense war for technical talent, particularly in AI/ML, cloud architecture, and cybersecurity domains. Despite being 30% slower than enterprise average, this positions us competitively against other tech giants who average 72-85 days for similar roles.",
            "💡 Strategic Imperative: Immediately authorize remote-first hiring policies for core engineering positions and approve salary band increases of 15-20% for critical skills. Additionally, establish dedicated technical recruiting pods with specialized sourcers to reduce dependency on generalist recruiters who struggle with technical role nuances."
          ],
          drilldownInsights: {
            "Total Hires": [
              "🎯 Growth Acceleration: Tech hired 1,500 professionals YTD versus the planned 1,200, representing a 25% over-achievement driven by accelerated digital transformation initiatives and 8 new product launches. This growth trajectory positions us to capture emerging market opportunities in AI and cloud services.",
              "⚠️ Infrastructure Strain: Current onboarding queue has extended beyond 4 weeks for the first time, with 156 new hires in various stages of the process. This bottleneck risks delayed productivity ramp-up and potential candidate drop-offs, particularly for senior engineers who expect streamlined onboarding experiences.",
              "🔄 Process Optimization: Immediately implement bi-weekly induction cycles with cohort-based onboarding for technical roles. Deploy mentorship-matching algorithms to pair new hires with technical buddies within 48 hours, and create role-specific onboarding tracks to reduce time-to-productivity from 12 weeks to 8 weeks."
            ],
            "Avg. Time to Fill": [
              "📊 Benchmark Challenge: Our 68-day average significantly exceeds the 45-day industry benchmark, but context matters - we're competing with FAANG companies for the same talent pool. However, 23 critical positions have exceeded 90 days, directly impacting product roadmap delivery for Q4 launches worth ₹280 crore in projected revenue.",
              "🚨 Business Impact: Extended vacancy periods are causing project delays, with 15 key initiatives running 3-6 weeks behind schedule. Engineering teams report 18% increase in overtime hours to compensate for vacant positions, leading to burnout concerns and quality risks.",
              "🤖 Automation Solution: Deploy AI-powered sourcing automation to identify and engage passive candidates across 12 technical platforms. Implement video-first screening processes to reduce initial interview cycles by 40%, and establish technical assessment automation for common programming languages and frameworks."
            ],
            "Avg. Cost Per Hire": [
              "💰 Premium Positioning: Our ₹4.5L cost per hire represents a 2.1x multiplier of company average, but reflects the premium nature of technical talent in current market conditions. This investment yields 3.2x higher revenue per employee compared to non-technical roles, justifying the premium investment approach.",
              "📈 Budget Pressure: Current trajectory projects a ₹37 crore budget overrun by year-end if hiring patterns continue unchanged. The premium is driven by 45% of hires being senior/principal level engineers commanding market-rate packages to compete with tech giants and well-funded startups.",
              "🎯 Cost Engineering: Launch aggressive referral program with ₹50,000 bonuses for successful technical hires, organize monthly tech meetups and hackathons to build talent pipeline, and establish exclusive partnerships with 3 coding bootcamps for junior developer pipeline. Target: reduce CPH to ₹3.8L while maintaining quality standards."
            ],
            "IJP Adherence": [
              "📉 Mobility Gap: 70% internal job-post fill rate trails the enterprise target of 80% and Tech BU's historical 85% performance. Deep dive analysis reveals that 43% of senior engineers feel 'stuck' in current roles, with limited visibility into advancement opportunities beyond their immediate team structure.",
              "🏃‍♂️ Retention Risk: Exit interviews from the last quarter show that 67% of departing senior engineers cite 'limited growth opportunities' as primary reason for leaving. This brain drain represents ₹12 crore in lost institutional knowledge and recruitment replacement costs.",
              "📢 Visibility Revolution: Launch 'Tech Talent Showcase' quarterly events where internal candidates present their projects to cross-functional teams, implement AI-powered role-matching system that alerts employees to relevant opportunities, and create transparent career progression frameworks with defined technical ladders for different specializations."
            ],
            "Build Ratio": [
              "🏆 Excellence Standard: 80% build ratio represents best-in-class internal talent development, enabling deep technical expertise and cultural continuity. This approach has resulted in 45% lower ramp-up time for promoted employees and 23% higher project success rates due to institutional knowledge retention.",
              "⚖️ Capacity Balance: While high build ratio controls external spend, it creates pressure points when promoted employees aren't immediately backfilled. Currently, 34 teams are operating at 110%+ capacity, with senior engineers handling both their new responsibilities and training their replacements.",
              "🚀 Proactive Pipeline: Launch comprehensive reskilling programs targeting 300 junior developers in emerging technologies (AI/ML, blockchain, quantum computing), establish technical mentorship programs pairing senior engineers with high-potential juniors, and create clear promotion timelines with defined skill milestones to maintain talent pipeline depth."
            ],
            "Diversity %": [
              "📊 Improvement Opportunity: 35% diversity rate lags behind corporate average of 41% and is significantly below tech industry leaders who achieve 42-48%. This gap potentially limits innovation capacity and market understanding, particularly important for consumer-facing technology products.",
              "🧠 Innovation Impact: Research shows that diverse tech teams produce 31% more innovative solutions and have 67% higher problem-solving effectiveness. Our current composition may be constraining our competitive advantage in rapidly evolving technology markets.",
              "🌐 Systematic Transformation: Establish partnerships with 5 women-in-tech bootcamps and 3 diversity-focused professional organizations, implement 'returnship' programs for professionals re-entering tech careers, mandate diverse candidate slates for all senior technical positions, and create sponsorship programs pairing diverse junior talent with C-suite technical leaders."
            ]
          }
        },
        last6Months: {
          headcount: { total: 12000, available: 11500, gap: 500 },
          kpis: {
            "Total Hires": 800,
            "Avg. Time to Fill": "72 days",
            "Avg. Cost Per Hire": "₹4,80,000",
            "IJP Adherence": "68%",
            "Build Ratio": "75%",
            "Diversity %": "36%"
          },
          insights: [
            "💸 Cost Escalation Alert: Cost per hire climbed 6.7% over 6 months, reaching ₹4.8L, driven by intense competition for specialized AI/ML and cybersecurity professionals. Market intelligence indicates this premium will likely persist through 2025 as demand continues to outstrip supply in these critical skill areas.",
            "⏰ Time-to-Fill Crisis: 4-day worsening in time-to-fill metrics signals a critical need for sourcing strategy overhaul. Current recruitment processes are insufficient for the velocity required to meet business objectives, with 67% of technical positions now exceeding initial timeline estimates.",
            "🔧 Immediate Action Required: Emergency trial of two specialized niche tech-recruitment agencies focusing on AI/ML and cloud architecture roles. Deploy dedicated technical sourcers with deep domain expertise and authorize premium placement fees for critical positions to accelerate hiring velocity and meet Q4 delivery commitments."
          ]
        },
        last3Months: {
          headcount: { total: 12000, available: 11500, gap: 500 },
          kpis: {
            "Total Hires": 420,
            "Avg. Time to Fill": "75 days",
            "Avg. Cost Per Hire": "₹4,95,000",
            "IJP Adherence": "65%",
            "Build Ratio": "72%",
            "Diversity %": "38%"
          },
          insights: [
            "🚨 Critical Metrics Alert: Q2 performance shows concerning deterioration with record-high cost per hire (₹4.95L) and time-to-fill (75 days), indicating systemic challenges in our technical recruitment approach. These metrics directly threaten our ability to deliver on committed product roadmaps and client engagements.",
            "👥 Resource Constraint: TA-Tech team appears critically understaffed relative to hiring demands, with each recruiter managing 23 open positions versus the recommended 12-15. This overload is creating bottlenecks and reducing candidate experience quality, with 34% of candidates reporting delayed communication as a concern.",
            "⚡ Emergency Intervention: Immediately add two senior technical sourcers with AI/ML specialization, approve LinkedIn Recruiter Enterprise seats for the entire TA-Tech team, and authorize overtime budget for current team to clear existing pipeline bottlenecks. Expected impact: 15-day reduction in TTF and 8% improvement in candidate experience scores."
          ]
        }
      },
  
      "Tech|Sales": {
        ytd: {
          headcount: { total: 2000, available: 1900, gap: 100 },
          kpis: {
            "Total Hires": 250,
            "Avg. Time to Fill": "60 days",
            "Avg. Cost Per Hire": "₹3,80,000",
            "IJP Adherence": "75%",
            "Build Ratio": "70%",
            "Diversity %": "38%"
          },
          insights: [
            "🎯 Sales Excellence: Tech Sales consistently delivers within 60-day hiring targets despite competitive market conditions, demonstrating superior employer branding and streamlined interview processes. This efficiency enables rapid territory expansion and revenue growth acceleration.",
            "🏗️ Career Development Success: 75% IJP adherence reflects robust career pathing and internal mobility, contributing to 31% higher retention rates compared to industry sales benchmarks. The clear progression from SDR → AE → Senior AE → Regional Manager creates compelling career narratives for both internal and external candidates.",
            "🤝 Mentorship Innovation: Launch structured mentorship program pairing high-performing senior AEs with new hires to accelerate ramp-up time from 6 months to 4 months. This approach will improve new hire success rates while creating additional growth opportunities for senior talent."
          ],
          drilldownInsights: {
            "Avg. Cost Per Hire": [
              "💰 Efficient Investment: ₹3.8L CPH sits 15% below Tech BU average while maintaining high-quality talent acquisition. This efficiency is driven by strong referral networks (43% of hires) and compelling compensation packages that balance base salary with performance incentives.",
              "📈 Scaling Risk: As quota-carrying headcount expands by 35% over next 18 months, cost pressures may emerge from increased competition for experienced enterprise sales professionals. Market intelligence suggests 12-18% salary inflation for senior AE roles in SaaS/Tech sector.",
              "🎯 Cost Management: Maintain optimal agency-to-referral ratio at 30:70, implement graduated referral bonuses for different seniority levels, and establish exclusive partnerships with 3 sales-focused recruitment firms to secure preferred pricing for volume hiring."
            ],
            "Build Ratio": [
              "📊 Talent Pipeline Strength: 70% internal promotion rate demonstrates exceptional bench strength and career development effectiveness. This ratio has contributed to 28% faster territory ramp-up and 23% higher first-year quota attainment for promoted employees compared to external hires.",
              "⚖️ Succession Planning: Deep pipeline enables confident expansion into new markets and product lines. However, rapid promotion pace could thin pipeline if top performers exit or if promotion velocity exceeds backfill capability.",
              "🔄 Strategic Staggering: Implement staggered promotion cycles aligned with business seasonality, create 'promotion readiness' scorecards to identify candidates 6 months in advance, and establish clear succession planning for each senior role to maintain pipeline depth while supporting career growth."
            ],
            "Total Hires": [
              "🌍 Geographic Expansion: Quarterly hiring perfectly aligned with geo-expansion targets across 5 new markets, with 65% of new hires supporting international growth initiatives. This strategic allocation positions us to capture emerging market opportunities in Southeast Asia and Latin America.",
              "⏰ Remote Onboarding: Geographic distribution of new hires (67% remote) requires enhanced virtual onboarding and ramp-up processes. Current 6-month time-to-full-productivity for remote sales hires lags behind 4.5-month average for office-based colleagues.",
              "🎓 Accelerated Development: Implement intensive 30-day virtual boot camp curriculum covering product knowledge, competitive landscape, and sales methodology. Deploy AI-powered role-playing platforms for continuous skill development and establish regional mentor networks for ongoing support."
            ],
            "Avg. Time to Fill": [
              "✅ Target Achievement: 60-day hiring cycle consistently meets TA OKR and enables predictable territory coverage for quarterly planning. This reliability has supported 23% year-over-year revenue growth through consistent sales capacity expansion.",
              "⚠️ Surge Risk: Historical data shows TTF can spike to 70+ days during Q4 hiring surges, potentially delaying Q1 revenue ramp-up. Early warning indicators suggest similar patterns may emerge given planned 40% headcount expansion in Q4.",
              "🚀 Proactive Mitigation: Pre-qualify candidate pools through video pitch assessments, maintain 'warm' candidate pipeline of 200+ prospects, and establish dedicated Q4 hiring task force with additional recruiter capacity to prevent surge-related delays."
            ],
            "IJP Adherence": [
              "🏆 Mobility Culture: Solid 75% IJP fill rate reflects transparent career ladders and effective internal communication about opportunities. This transparency has resulted in 19% higher employee Net Promoter Score compared to other functions.",
              "📉 Risk Threshold: Any drop below 65% would signal blocked mobility and potential attrition risk among high-potential sales professionals. Exit interviews indicate that career progression is the #1 factor in retention decisions for sales talent.",
              "📢 Success Amplification: Publish quarterly 'internal mobility success stories' on company intranet, create video testimonials from recently promoted employees, and establish 'lunch and learn' sessions where promoted employees share their career journey with broader teams."
            ],
            "Diversity %": [
              "🎯 Target Alignment: 38% diversity maintains pace with BU goal (≥38%) and reflects focused efforts on inclusive hiring practices. This level correlates with 15% higher customer satisfaction scores in accounts managed by diverse sales teams.",
              "🌐 Regional Variation: Geographic expansion hiring shows concerning male bias in certain regions (particularly APAC at 28% diversity), requiring targeted intervention to maintain overall diversity trajectory.",
              "📋 Pipeline Enhancement: Implement 50% diverse candidate slate requirement for all sales positions, establish partnerships with women-in-sales organizations in key geographic markets, and create sponsorship programs connecting diverse junior talent with senior sales leaders for accelerated development."
            ]
          }
        }
      },
  
      /* ─────────────────────────── FMCG BU ─────────────────────────── */
      "FMCG|All Functions": {
        ytd: {
          headcount: { total: 20000, available: 18500, gap: 1500 },
          kpis: {
            "Total Hires": 2200,
            "Avg. Time to Fill": "42 days",
            "Avg. Cost Per Hire": "₹1,50,000",
            "IJP Adherence": "88%",
            "Build Ratio": "55%",
            "Diversity %": "52%"
          },
          insights: [
            "🏆 Enterprise Benchmark: FMCG BU sets the gold standard with fastest time-to-fill (42 days) and highest diversity (52%) across the entire organization. This operational excellence stems from mature campus recruitment programs, strong employer branding in consumer goods sector, and streamlined interview processes refined over decades.",
            "🎯 External Talent Strategy: The 55% build ratio indicates strategic reliance on external senior talent to drive innovation and market expansion. This approach has accelerated new product launches by 34% and contributed to successful entry into 8 new market segments over the past 18 months.",
            "🎓 Leadership Development Imperative: With strong operational metrics established, the focus should shift to developing internal leadership pipeline. Launch comprehensive leadership academy targeting high-potential managers to improve succession planning and reduce dependency on external senior hires."
          ]
        },
        last6Months: {
          headcount: { total: 20000, available: 18500, gap: 1500 },
          kpis: {
            "Total Hires": 1200,
            "Avg. Time to Fill": "40 days",
            "Avg. Cost Per Hire": "₹1,45,000",
            "IJP Adherence": "89%",
            "Build Ratio": "58%",
            "Diversity %": "53%"
          },
          insights: [
            "⚡ Efficiency Gains: 6-month performance shows continuous improvement across all metrics, with time-to-fill improving by 5% and cost-per-hire declining 3.3%. This optimization creates capacity for scaling hiring operations to support aggressive market expansion plans.",
            "🚀 Market Leadership: Superior hiring efficiency enables faster market response and competitive advantage. The ability to rapidly scale teams has supported successful launches of 7 new product lines and expansion into 12 new geographic markets.",
            "📢 Best Practice Documentation: Continue excellence in employer branding through campus channels, with 67% of entry-level hires now sourced through university partnerships. Document and scale these practices across other BUs to achieve enterprise-wide efficiency gains."
          ]
        },
        last3Months: {
          headcount: { total: 20000, available: 18500, gap: 1500 },
          kpis: {
            "Total Hires": 650,
            "Avg. Time to Fill": "38 days",
            "Avg. Cost Per Hire": "₹1,40,000",
            "IJP Adherence": "90%",
            "Build Ratio": "60%",
            "Diversity %": "54%"
          },
          insights: [
            "🥇 Performance Leadership: Q2 results position FMCG as the undisputed leader across all efficiency metrics, with 38-day TTF and ₹1.4L CPH representing best-in-class performance. This excellence creates a competitive moat in talent acquisition for consumer goods professionals.",
            "🏅 Recognition Opportunity: HR and BU leadership deserve enterprise-wide recognition for exemplary performance that significantly exceeds industry benchmarks. This success story should be celebrated and leveraged for employer branding across all business units.",
            "📚 Knowledge Transfer: Immediately document and systematize FMCG's best practices for cross-BU adoption. Key learnings include campus partnership models, streamlined interview processes, and diversity sourcing strategies that can be adapted for other industries and functions."
          ]
        }
      },
  
      "FMCG|Marketing": {
        ytd: {
          headcount: { total: 500, available: 480, gap: 20 },
          kpis: {
            "Total Hires": 60,
            "Avg. Time to Fill": "45 days",
            "Avg. Cost Per Hire": "₹1,80,000",
            "IJP Adherence": "90%",
            "Build Ratio": "50%",
            "Diversity %": "55%"
          },
          insights: [
            "🌟 Diversity Excellence: FMCG Marketing achieves the highest diversity rate in the organization at 55%, creating a competitive advantage in understanding diverse consumer segments and developing inclusive marketing strategies. This composition has correlated with 28% higher campaign effectiveness scores.",
            "🔄 Mobility Mastery: 90% IJP adherence demonstrates exceptional internal mobility culture, with clear career progression paths from brand assistant to brand manager to category head. This transparency has resulted in 34% higher retention rates and industry-leading employee engagement scores.",
            "📈 Strategic Positioning: Use this function as the enterprise DEI case study and best practice template. The successful integration of high diversity, strong internal mobility, and operational efficiency provides a replicable model for other functions and business units."
          ],
          drilldownInsights: {
            "Diversity %": [
              "🎯 Market Leadership: 55% diversity rate exceeds corporate goal by 14 percentage points and represents best-in-class performance across consumer goods industry. This diversity directly contributes to more effective consumer insights and culturally relevant campaigns.",
              "📊 Innovation Impact: Diverse marketing teams have generated 42% more innovative campaign concepts and achieved 23% higher consumer engagement rates. This performance advantage translates to measurable business impact through improved brand metrics and market share gains.",
              "🔮 Sustainability Risk: While current performance is exceptional, pipeline sources could stagnate without continuous innovation. Partner with 4 additional creative schools and design institutes targeting women and underrepresented groups to maintain diversity pipeline strength."
            ],
            "Total Hires": [
              "📅 Seasonal Alignment: Moderate hiring volume of 60 YTD perfectly aligns with campaign cycles and product launch schedules, demonstrating sophisticated workforce planning that anticipates seasonal demands. This strategic approach avoids the boom-bust hiring patterns that plague many marketing organizations.",
              "⚡ Surge Preparedness: Upcoming festival season (Q3-Q4) traditionally drives 3x hiring volume for temporary campaign support. Current recruitment infrastructure shows strain signals at 80+ positions, requiring proactive capacity planning to maintain service quality.",
              "🔧 Scalability Solution: Pre-approve contractor bench of 25 specialized freelancers across digital marketing, creative design, and campaign management. Establish retainer agreements with 3 boutique agencies for peak season overflow, ensuring seamless scaling without compromising delivery quality."
            ],
            "Avg. Time to Fill": [
              "✅ SLA Performance: 45-day average meets established SLA and demonstrates efficient recruitment processes tailored to marketing role requirements. This consistency enables predictable campaign planning and resource allocation for major product launches.",
              "🎪 Festival Risk: Historical data shows TTF can spike to 65+ days during festival campaign hiring due to market-wide competition for creative talent. This surge risk threatens timely campaign launches for key seasonal opportunities worth ₹45 crore in potential revenue.",
              "🎨 Talent Network: Build year-round freelance talent roster of 50+ pre-qualified professionals across key specializations (digital marketing, creative, analytics). Implement rapid deployment protocols with 72-hour activation capability for urgent campaign requirements."
            ],
            "Avg. Cost Per Hire": [
              "💰 Cost Efficiency: ₹1.8L cost per hire sits 20% below BU average while maintaining high talent quality, driven by strong employer brand in FMCG sector and effective campus recruitment partnerships. This efficiency creates budget headroom for performance incentives and retention programs.",
              "🏆 Competitive Risk: Premium creative talent increasingly commands higher packages, with 15% annual inflation observed in digital marketing and brand management roles. Current cost advantage may erode if market continues tightening for specialized skills.",
              "🎁 Retention Strategy: Implement sign-on bonuses of ₹25,000 for critical roles (brand managers, digital leads) and create compelling career development programs. Focus investment on retention to avoid 3x replacement costs associated with external hiring."
            ],
            "IJP Adherence": [
              "🌟 Cultural Excellence: 90% internal mobility rate demonstrates gold-standard career development and succession planning. This performance has created powerful employer value proposition, with 78% of marketing professionals citing 'clear growth path' as primary reason for joining.",
              "📈 Business Impact: High internal mobility sustains institutional knowledge and brand understanding, contributing to 31% faster campaign development cycles and 24% higher campaign ROI compared to teams with high external hiring.",
              "🎓 Skill Development: Address emerging digital marketing skill gaps through intensive reskilling bootcamps for current employees. Launch 6-month certification programs in programmatic advertising, marketing automation, and data analytics to maintain internal promotion pipeline."
            ],
            "Build Ratio": [
              "⚖️ Strategic Balance: 50% build ratio reflects optimal mix of experienced external talent bringing fresh perspectives and internally developed professionals with deep brand knowledge. This balance has resulted in 22% higher campaign innovation scores and stronger brand consistency.",
              "🎨 Creative Injection: External hiring provides crucial creative diversity and industry best practices, particularly important in fast-evolving digital marketing landscape. However, over-reliance on external talent could dilute brand understanding and cultural alignment.",
              "🎓 Pipeline Development: Expand graduate trainee intake by 40% to build stronger internal pipeline for future leadership roles. Partner with top marketing schools to establish exclusive talent pipeline and create branded internship programs that convert to full-time hires."
            ]
          }
        }
      },
  
      /* ─────────────────────────── ENERGY BU ─────────────────────────── */
      "Energy|All Functions": {
        ytd: {
          headcount: { total: 8000, available: 7600, gap: 400 },
          kpis: {
            "Total Hires": 600,
            "Avg. Time to Fill": "58 days",
            "Avg. Cost Per Hire": "₹2,20,000",
            "IJP Adherence": "85%",
            "Build Ratio": "60%",
            "Diversity %": "32%"
          },
          insights: [
            "⚡ Strategic Transformation: Energy BU maintains steady hiring pace of 600 professionals YTD, reflecting disciplined workforce planning during the industry's transition to renewable energy and sustainable technologies. This measured approach balances traditional energy expertise with emerging green technology capabilities.",
            "🎯 Diversity Challenge: 32% diversity rate trails enterprise average by 9 percentage points, representing both a risk and opportunity. The energy sector's traditionally male-dominated culture requires targeted intervention to attract diverse talent, particularly as the industry evolves toward sustainability focus.",
            "🏫 Campus Strategy: Launch comprehensive partnership program with 8 premier engineering institutes, focusing on renewable energy programs and environmental engineering disciplines. This initiative should emphasize diversity outreach and create dedicated scholarship programs for underrepresented groups in engineering."
          ]
        }
      },
  
      /* ─────────────────────────── MEDIA BU ─────────────────────────── */
      "Media|All Functions": {
        ytd: {
          headcount: { total: 5200, available: 4900, gap: 300 },
          kpis: {
            "Total Hires": 550,
            "Avg. Time to Fill": "48 days",
            "Avg. Cost Per Hire": "₹2,80,000",
            "IJP Adherence": "78%",
            "Build Ratio": "50%",
            "Diversity %": "48%"
          },
          insights: [
            "🎬 Creative Talent War: Media BU's ₹2.8L cost per hire reflects the intense competition for creative talent in content creation, digital media, and streaming platforms. This premium investment has enabled acquisition of award-winning professionals who have elevated content quality and audience engagement by 35%.",
            "⚖️ Balanced Strategy: Perfect 50-50 build-buy ratio demonstrates sophisticated talent strategy that balances institutional knowledge with fresh creative perspectives. This approach has resulted in 28% higher content innovation scores and successful launch of 12 new digital properties.",
            "💡 Cost Optimization: Explore partnerships with 5 specialized creative job boards and niche talent communities to reduce agency dependency. Implement creative portfolio-based screening to streamline hiring processes and potentially reduce time-to-fill by 15% while maintaining quality standards."
          ]
        }
      },
  
      /* ─────────── MANUFACTURING & RETAIL BUs (condensed) ──────────── */
      "Manufacturing|All Functions": {
        ytd: {
          headcount: { total: 9000, available: 8600, gap: 400 },
          kpis: {
            "Total Hires": 820,
            "Avg. Time to Fill": "46 days",
            "Avg. Cost Per Hire": "₹1,30,000",
            "IJP Adherence": "86%",
            "Build Ratio": "72%",
            "Diversity %": "28%"
          },
          insights: [
            "🏭 Operational Excellence: Manufacturing demonstrates exceptional cost discipline with ₹1.3L average cost per hire and strong 72% build ratio, reflecting mature apprenticeship programs and effective skills development initiatives. This efficiency has supported 18% improvement in operational margins.",
            "⚠️ Diversity Imperative: 28% diversity rate represents the most significant gap across all BUs, particularly concerning given the increasing importance of diverse perspectives in modern manufacturing and supply chain optimization. This gap limits innovation potential and market understanding.",
            "👩‍🔧 Strategic Initiative: Launch comprehensive 'Women in Manufacturing' apprenticeship program targeting 100 participants annually. Partner with technical colleges and establish mentorship networks pairing female engineers with senior manufacturing leaders to create sustainable pipeline and cultural transformation."
          ]
        }
      },
  
      "Retail|All Functions": {
        ytd: {
          headcount: { total: 15000, available: 14000, gap: 1000 },
          kpis: {
            "Total Hires": 2800,
            "Avg. Time to Fill": "35 days",
            "Avg. Cost Per Hire": "₹95,000",
            "IJP Adherence": "92%",
            "Build Ratio": "40%",
            "Diversity %": "46%"
          },
          insights: [
            "🚀 Volume Hiring Mastery: Retail achieves shortest time-to-fill (35 days) across the enterprise through sophisticated volume hiring engine and streamlined assessment processes. This capability enables rapid store expansion and seasonal scaling, supporting 23% revenue growth in new market penetration.",
            "🔄 Attrition Challenge: Low 40% build ratio reflects high frontline attrition driving continuous external hiring cycle. While this enables rapid scaling, it creates ongoing recruitment costs and limits institutional knowledge development at customer-facing levels.",
            "📈 Career Architecture: Pilot comprehensive career progression tracks from sales associate to store manager to regional director, including defined skill milestones and development programs. Target: increase internal promotion rate from 40% to 55% within 18 months while maintaining hiring velocity for expansion needs."
          ]
        }
      }
    },
  
    /* -------- 3. GLOBAL FALLBACK ----------------------------------------- */
    defaultData: {
      headcount: { total: 1200, available: 1100, gap: 100 },
      kpis: {
        "Total Hires": 150,
        "Avg. Time to Fill": "45 days",
        "Avg. Cost Per Hire": "₹2,50,000",
        "IJP Adherence": "75%",
        "Build Ratio": "60%",
        "Diversity %": "30%"
      },
      insights: [
        "📊 Data Gap Identified: No specific insights available for this filter combination - using representative baseline metrics. This gap represents an opportunity to expand data collection and analytics capabilities for more granular workforce intelligence.",
        "📈 Trend Monitoring: Overall enterprise trends remain stable with healthy fundamentals across key metrics. However, more detailed segmentation would enable targeted interventions and optimization opportunities at functional and business unit levels.",
        "🔍 Analytics Enhancement: Recommend implementing advanced workforce analytics platform to capture performance data across all BU-function combinations, enabling predictive insights and strategic workforce planning capabilities."
      ],
      drilldownInsights: {
        "Total Hires": [
          "📊 Baseline Performance: Current hiring volumes appear stable and aligned with business growth patterns. Without specific context, this represents adequate workforce expansion to support operational requirements.",
          "⚠️ Visibility Risk: Lack of detailed hiring data may mask emerging bottlenecks or opportunities in specific functions or business units that could impact business performance.",
          "📈 Recommendation: Implement comprehensive hiring tracking across all organizational segments to enable proactive workforce planning and early identification of talent acquisition risks or opportunities."
        ],
        "Avg. Time to Fill": [
          "⏰ Standard Cycle: 45-day time-to-fill falls within acceptable industry ranges for most professional roles, suggesting adequate recruitment process efficiency without specific optimization needs identified.",
          "🔧 Process Review: Without role-specific data, potential inefficiencies in interview processes, approval workflows, or sourcing strategies may remain undetected, limiting optimization opportunities.",
          "🎯 Action Item: Establish detailed TTF tracking by role level, function, and business unit to identify specific areas requiring process improvement or resource allocation adjustments."
        ],
        "Avg. Cost Per Hire": [
          "💰 Cost Monitoring: ₹2.5L average cost appears reasonable for professional roles but requires context of role mix, seniority levels, and market conditions for accurate assessment.",
          "📊 Benchmark Gap: Without comparative data across different role types and business units, potential cost optimization opportunities or concerning trends may not be visible to leadership.",
          "💡 Strategic Focus: Develop comprehensive cost tracking methodology that segments expenses by role type, sourcing channel, and business unit to enable targeted cost optimization initiatives."
        ],
        "IJP Adherence": [
          "🔄 Mobility Baseline: 75% internal job posting adherence represents adequate internal mobility but may indicate missed opportunities for career development and retention optimization.",
          "📈 Growth Opportunity: Higher IJP rates typically correlate with improved retention and employee engagement, suggesting potential value in strengthening internal mobility programs and communication.",
          "🎯 Enhancement Strategy: Increase visibility of internal opportunities through enhanced communication channels, career development programs, and systematic succession planning initiatives."
        ],
        "Build Ratio": [
          "⚖️ Talent Balance: 60% build ratio suggests reasonable balance between developing internal talent and acquiring external expertise, though optimal mix varies by business context and growth stage.",
          "📊 Optimization Potential: Without understanding of specific skill requirements and internal capability gaps, opportunities to improve cost efficiency through enhanced internal development may exist.",
          "🎓 Development Focus: Assess current learning and development programs to identify opportunities for expanding internal capability building and reducing external hiring dependency."
        ],
        "Diversity %": [
          "📊 Inclusion Tracking: 30% diversity rate provides baseline for improvement initiatives, though specific targets should be established based on industry benchmarks and organizational goals.",
          "🌐 Competitive Risk: Lower diversity levels may limit innovation capacity, market understanding, and employer brand appeal, particularly in competitive talent markets.",
          "🎯 Strategic Initiative: Implement comprehensive diversity and inclusion program with specific targets, measurement frameworks, and accountability mechanisms to drive systematic improvement."
        ]
      }
    }
  };
  
  /* ===========================================================================
   *  QUICK HELPERS
   * ======================================================================== */
  export function getDummyData(bu, func, bucket = 'ytd') {
    const key   = `${bu}|${func}`;
    const buKey = `${bu}|All Functions`;
  
    const store   = dummyData.dataStore;
    const defaultBlock = dummyData.defaultData;
  
    const combo   = store?.[key] || store?.[buKey] || store?.["All Units|All Functions"] || {};
    const block   = combo[bucket] || combo.ytd || defaultBlock;
  
    if (!block.drilldownInsights) block.drilldownInsights = defaultBlock.drilldownInsights;
    return block;
  }
  
  /* --- quick throw-away trend generator for charts ------------------------ */
  export function generateRandomChartData(kpiName) {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let value    = kpiName.includes('Cost') ? 300000 : 50;
    return months.map(m => {
      value += (Math.random() - 0.5) * (kpiName.includes('Cost') ? 40000 : 10);
      return { month: m, value: Math.max(0, Math.round(value)) };
    });
  }