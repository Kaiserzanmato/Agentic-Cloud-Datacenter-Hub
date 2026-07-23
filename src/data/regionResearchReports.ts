export interface RegionProjectRow {
  country: string;
  projectName: string;
  category: string;
  status: string;
  statusColor: string;
  capex: string;
  capacity: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export interface RegionRiskItem {
  title: string;
  icon: 'warning' | 'check';
  description: string;
}

export interface RegionReport {
  summaryBullets: { label: string; text: string }[];
  projects: RegionProjectRow[];
  risks: RegionRiskItem[];
}

export const REGION_RESEARCH_REPORTS: Record<string, RegionReport> = {
  'Southeast Asia': {
    summaryBullets: [
      {
        label: 'Hyperscale Infrastructure Acceleration',
        text: 'Southeast Asia datacenter capacity is accelerating at 38% CAGR, led by Malaysia (Johor), Singapore, and the Philippines, driven by sovereign AI compliance mandates and subsea fiber cable landings.',
      },
      {
        label: 'Power & Grid Congestion',
        text: 'High-density AI racks (>40kW/rack) require direct-to-chip liquid cooling. Electrical grid interconnections in Luzon (Philippines) and Johor (Malaysia) face 2026/2027 transformer lead-time delays.',
      },
      {
        label: 'Sovereign Cloud Policies',
        text: 'DICT Philippines, EDB Singapore, and MDEC Malaysia have established data-resiliency protocols requiring zero cross-border data leakage for government and banking workloads.',
      },
    ],
    projects: [
      { country: 'Philippines', projectName: 'STT Clark Sovereign DC Campus', category: 'Sovereign AI Cluster', status: 'Under Construction', statusColor: 'text-cyan-400', capex: '$1.2B', capacity: '124 MW', confidence: 'High' },
      { country: 'Malaysia', projectName: 'YTL Green AI Supercomputer', category: 'AI Supercomputer', status: 'Operational', statusColor: 'text-emerald-400', capex: '$4.3B', capacity: '500 MW', confidence: 'High' },
      { country: 'Singapore', projectName: 'Keppel Floating DC Platform', category: 'Colocation DC', status: 'Under Construction', statusColor: 'text-cyan-400', capex: '$750M', capacity: '80 MW', confidence: 'High' },
    ],
    risks: [
      {
        title: 'Grid Power Congestion',
        icon: 'warning',
        description: 'Peak demand in Johor and Manila Metro regions exceeds grid reserve margins by 14%. Micro-grids and direct PPA contracts with renewable suppliers are required for 2026/2027 cluster commissioning.',
      },
      {
        title: 'Liquid Cooling Efficiency',
        icon: 'check',
        description: 'Switching to closed-loop direct-to-chip liquid cooling lowers PUE from 1.55 to 1.18 in tropical high-humidity climates, saving up to 40% on operational electricity costs.',
      },
    ],
  },
  'North America': {
    summaryBullets: [
      {
        label: 'Hyperscaler CapEx Concentration',
        text: 'US hyperscalers (MSFT, AWS, GOOG, META) account for over $480B of the $602B global AI infrastructure CapEx cycle, concentrated in Virginia, Texas, and Arizona.',
      },
      {
        label: 'Grid Interconnection Bottlenecks',
        text: 'PJM and ERCOT interconnection queues exceed 3-5 year wait times for gigawatt-scale campuses, pushing hyperscalers toward on-site gas turbines and nuclear PPAs (Three Mile Island, Susquehanna).',
      },
      {
        label: 'Strategic Minerals Reserve',
        text: 'Project Vault ($10B EXIM financing) is building a domestic critical minerals stockpile to insulate US semiconductor and battery manufacturers from export-control shocks.',
      },
    ],
    projects: [
      { country: 'United States', projectName: 'Stargate Abilene Campus', category: 'AI Supercomputer', status: 'Under Construction', statusColor: 'text-cyan-400', capex: '$12.0B', capacity: '1,200 MW', confidence: 'High' },
      { country: 'United States', projectName: 'Three Mile Island Restart (Crane Clean Energy)', category: 'Nuclear PPA', status: 'Operational', statusColor: 'text-emerald-400', capex: '$1.6B', capacity: '835 MW', confidence: 'High' },
      { country: 'Canada', projectName: 'QScale Lévis AI Campus', category: 'Colocation DC', status: 'Under Construction', statusColor: 'text-cyan-400', capex: '$450M', capacity: '96 MW', confidence: 'Medium' },
    ],
    risks: [
      {
        title: 'Interconnection Queue Delays',
        icon: 'warning',
        description: 'ERCOT and PJM queues for new gigawatt-scale load exceed 36-60 months, forcing hyperscalers into behind-the-meter gas and nuclear generation to meet 2026-2027 commissioning targets.',
      },
      {
        title: 'Strategic Mineral Stockpiling',
        icon: 'check',
        description: 'Project Vault ($10B EXIM loan) buffers against China MOFCOM export restrictions on rare earth processors, securing supply continuity for domestic chip and battery manufacturers.',
      },
    ],
  },
  'East Asia': {
    summaryBullets: [
      {
        label: 'Foundry & Advanced Packaging Leadership',
        text: 'Taiwan (TSMC) and South Korea (Samsung, SK Hynix) retain dominant share of sub-3nm fabrication and HBM memory production, anchoring the Pax Silica trusted-supply framework.',
      },
      {
        label: 'Japan Equipment & Materials Alignment',
        text: 'Japan supplies critical lithography chemicals, silicon wafers, and advanced substrates, coordinating export-control alignment with the US and Netherlands under Pax Silica.',
      },
      {
        label: 'China Countermeasures',
        text: 'MOFCOM export-control restrictions (June 22, 2026) on rare-earth processors accelerate bifurcation between Western-aligned and Chinese domestic silicon ecosystems.',
      },
    ],
    projects: [
      { country: 'Taiwan', projectName: 'TSMC Kaohsiung Fab 22', category: 'Wafer Fabrication', status: 'Operational', statusColor: 'text-emerald-400', capex: '$18.0B', capacity: 'N/A (Wafer Starts)', confidence: 'High' },
      { country: 'South Korea', projectName: 'Yongin HBM Memory Cluster', category: 'Advanced Packaging', status: 'Under Construction', statusColor: 'text-cyan-400', capex: '$22.0B', capacity: 'N/A (Memory Output)', confidence: 'High' },
      { country: 'Japan', projectName: 'Rapidus Chitose 2nm Pilot Line', category: 'Wafer Fabrication', status: 'Under Construction', statusColor: 'text-cyan-400', capex: '$8.5B', capacity: 'N/A (Pilot)', confidence: 'Medium' },
    ],
    risks: [
      {
        title: 'Export Control Exposure',
        icon: 'warning',
        description: 'South Korea and Japan face high trade exposure to Chinese commercial markets, creating dual-compliance overhead as Pax Silica and MOFCOM restrictions diverge on equipment and materials.',
      },
      {
        title: 'Advanced Packaging Capacity',
        icon: 'check',
        description: 'CoWoS and HBM capacity expansions across Taiwan and South Korea are reducing AI accelerator packaging bottlenecks that constrained 2025 GPU supply.',
      },
    ],
  },
  Europe: {
    summaryBullets: [
      {
        label: 'EU Chips Act & Sovereign Compute Push',
        text: 'The European Commission signed the Pax Silica Declaration (June 25, 2026), aligning EU Chips Act investment with allied semiconductor equipment and trusted supply-chain standards.',
      },
      {
        label: 'Equipment Anchor: Netherlands (ASML)',
        text: 'ASML photolithography equipment remains the critical chokepoint for leading-edge fabrication, operating under stringent export controls coordinated with the US and Japan.',
      },
      {
        label: 'Grid Decarbonization Pressure',
        text: 'Ireland and the Netherlands face constrained grid connection queues for new hyperscale campuses, prompting a pivot to Nordic (Norway, Sweden, Finland) sites with abundant hydro and wind capacity.',
      },
    ],
    projects: [
      { country: 'Ireland', projectName: 'AWS Dublin Region Expansion', category: 'Colocation DC', status: 'Under Construction', statusColor: 'text-cyan-400', capex: '$2.3B', capacity: '210 MW', confidence: 'Medium' },
      { country: 'Norway', projectName: 'Blaalid Hydro-Powered AI Campus', category: 'AI Supercomputer', status: 'Operational', statusColor: 'text-emerald-400', capex: '$1.1B', capacity: '150 MW', confidence: 'High' },
      { country: 'Netherlands', projectName: 'ASML Veldhoven High-NA EUV Line', category: 'Lithography Equipment', status: 'Operational', statusColor: 'text-emerald-400', capex: '$3.8B', capacity: 'N/A (Equipment)', confidence: 'High' },
    ],
    risks: [
      {
        title: 'Grid Connection Constraints',
        icon: 'warning',
        description: 'Ireland and Netherlands regulators have imposed data-center grid connection moratoria in constrained corridors, redirecting new hyperscale demand toward Nordic renewable-rich sites.',
      },
      {
        title: 'Regulatory Standardization',
        icon: 'check',
        description: 'EU Chips Act alignment with Pax Silica standards is streamlining cross-border joint research and reducing duplicate compliance overhead for equipment exporters.',
      },
    ],
  },
  'Middle East': {
    summaryBullets: [
      {
        label: 'Gulf Capital & Compute Corridor',
        text: 'UAE and Qatar are deploying sovereign wealth capital into data center equity and clean-energy-backed compute campuses, balancing US and Asian technology partnerships under Pax Silica.',
      },
      {
        label: 'Clean Energy-Backed AI Campuses',
        text: 'Solar and gas-firm baseload agreements underpin new hyperscale AI clusters in Abu Dhabi and Riyadh, targeting sub-1.2 PUE performance in extreme-heat climates.',
      },
      {
        label: 'Geopolitical Balancing Act',
        text: 'UAE and Saudi Arabia navigate export-control compliance between US-aligned chip access and continued commercial/technology ties with China.',
      },
    ],
    projects: [
      { country: 'UAE', projectName: 'Stargate UAE (G42 Abu Dhabi)', category: 'AI Supercomputer', status: 'Under Construction', statusColor: 'text-cyan-400', capex: '$5.0B', capacity: '1,000 MW (phased)', confidence: 'Medium' },
      { country: 'Saudi Arabia', projectName: 'HUMAIN Riyadh AI Zone', category: 'Sovereign AI Cluster', status: 'Announced', statusColor: 'text-amber-400', capex: '$3.5B', capacity: '500 MW (planned)', confidence: 'Medium' },
      { country: 'Qatar', projectName: 'QIA Digital Infrastructure Fund', category: 'Capital Vehicle', status: 'Active', statusColor: 'text-emerald-400', capex: '$1.0B (initial)', capacity: 'N/A (Fund)', confidence: 'Medium' },
    ],
    risks: [
      {
        title: 'Export-Control Balancing',
        icon: 'warning',
        description: 'UAE and Saudi Arabia face ongoing scrutiny over re-export risk of advanced AI chips, requiring enhanced end-use verification to maintain access to US-origin accelerators.',
      },
      {
        title: 'Clean Energy Baseload',
        icon: 'check',
        description: 'Solar-plus-storage and firm gas agreements are enabling sub-1.2 PUE performance for new Gulf AI campuses despite extreme ambient temperatures.',
      },
    ],
  },
  Global: {
    summaryBullets: [
      {
        label: 'Global CapEx Surge',
        text: 'Big-5 hyperscaler CapEx has reached $602B cumulative (2022-2026E), a 315% four-year CAGR, spanning North America, East Asia, Europe, the Gulf, and Southeast Asia.',
      },
      {
        label: 'Pax Silica Coordination Framework',
        text: '24 formal signatories and ~35 endorsing economies now coordinate critical minerals, semiconductor ATP, and trusted logistics under the non-binding Pax Silica Declaration (launched Dec 2025).',
      },
      {
        label: 'Bipolar Supply Stack Fragmentation',
        text: 'China MOFCOM export-control countermeasures (June 22, 2026) are accelerating the split between Western-aligned and Chinese domestic technology ecosystems, raising multinational compliance costs.',
      },
    ],
    projects: [
      { country: 'United States', projectName: 'Stargate Abilene Campus', category: 'AI Supercomputer', status: 'Under Construction', statusColor: 'text-cyan-400', capex: '$12.0B', capacity: '1,200 MW', confidence: 'High' },
      { country: 'Philippines', projectName: 'STT Clark Sovereign DC Campus', category: 'Sovereign AI Cluster', status: 'Under Construction', statusColor: 'text-cyan-400', capex: '$1.2B', capacity: '124 MW', confidence: 'High' },
      { country: 'Taiwan', projectName: 'TSMC Kaohsiung Fab 22', category: 'Wafer Fabrication', status: 'Operational', statusColor: 'text-emerald-400', capex: '$18.0B', capacity: 'N/A (Wafer Starts)', confidence: 'High' },
    ],
    risks: [
      {
        title: 'Grid & Power Bottlenecks',
        icon: 'warning',
        description: 'Interconnection queues in the US, water/power strain in the Philippines, and grid moratoria in the EU are the top three near-term constraints on global AI infrastructure buildout.',
      },
      {
        title: 'Coordinated Mineral Stockpiling',
        icon: 'check',
        description: 'Project Vault ($10B) and allied stockpiling under FORGE Forum are building resilience against further Chinese export-control escalation across rare earths and battery-grade nickel.',
      },
    ],
  },
};

export function getRegionReport(region: string): RegionReport {
  if (region === 'All Regions' || region === 'Global Coverage') {
    return REGION_RESEARCH_REPORTS.Global;
  }
  return REGION_RESEARCH_REPORTS[region] ?? REGION_RESEARCH_REPORTS.Global;
}
