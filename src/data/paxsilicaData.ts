export interface PaxSilicaProject {
  name: string;
  status: 'VERIFIED' | 'ANNOUNCED' | 'ANALYTICAL_ASSESSMENT';
  description: string;
  location?: string;
  scope?: string;
  financialAllocation?: string;
  risks?: string[];
}

export interface PaxSilicaSignatory {
  region: string;
  country: string;
  role: string;
  flagshipProjects: string[];
  strategicFocus: string;
  identifiedRisks: string;
  confidenceRating: 'High' | 'Medium' | 'Low';
}

export interface PaxSilicaRiskDimension {
  category: string;
  description: string;
  affectedNodes: string[];
  technicalScale?: string;
  mitigationApproach?: string;
}

export const PAX_SILICA_OVERVIEW = {
  framework: 'Pax Silica',
  launchDate: 'December 2025',
  description:
    'US-led strategic international coordination framework to secure, diversify, and de-risk the global technology supply stack for the artificial intelligence era',
  foundingSignatories: [
    'United States',
    'United Kingdom',
    'Japan',
    'South Korea',
    'Australia',
    'Singapore',
    'Israel',
  ],
  totalSignatories: 24,
  endorsingEconomies: 35,
  nonBindingInstrument: true,
  operationalScope: [
    'Critical mineral extraction and refining',
    'Semiconductor design and fabrication',
    'Advanced assembly, testing, and packaging (ATP)',
    'Power generation and transmission grid infrastructure',
    'Secure data centers and edge compute',
    'Trusted digital logistics',
    'Telecommunications',
    'High-tech workforce development',
  ],
};

export const PAX_SILICA_CAPITAL_VEHICLES = [
  {
    name: 'Project Vault',
    allocatedCapital: 'US$10.0 Billion',
    status: 'VERIFIED' as const,
    mechanism:
      'Export-Import Bank of the United States (EXIM) long-term financing to establish domestic strategic critical minerals reserve and process stockpiles',
    purpose:
      'Finance off-take agreements, processing infrastructure, and strategic buffer inventories to insulate allied manufacturers against export embargoes',
    confidenceRating: 'High' as const,
  },
  {
    name: 'Pax Silica Seed Fund',
    allocatedCapital: 'US$250 Million',
    status: 'ANNOUNCED' as const,
    mechanism: 'US foreign-assistance budget allocation',
    purpose:
      'De-risking capital to catalyze equity investments into upstream mining, refining, and packaging facilities in developing partner nodes',
    confidenceRating: 'Medium' as const,
  },
  {
    name: 'FORGE Forum',
    allocatedCapital: 'Multilateral coordination network',
    status: 'VERIFIED' as const,
    mechanism: 'Information-sharing, project-matching, and ESG standardization',
    purpose:
      'Successor/expansion to Minerals Security Partnership (MSP) for critical-minerals policy coordination',
    confidenceRating: 'High' as const,
  },
];

export const PAX_SILICA_FLAGSHIP_PROJECTS: PaxSilicaProject[] = [
  {
    name: 'Luzon Economic Corridor & New Clark City Industrial Hub (Philippines)',
    status: 'ANNOUNCED',
    description: 'Proposed specialized industrial acceleration zone within Pax Silica framework',
    location: 'New Clark City, Philippines',
    scope: '4,000 acres (~1,620 hectares)',
    financialAllocation: 'Bilateral negotiation frame (2-year timeline, initiated April 2026)',
    risks: [
      'Water resource degradation (Sacobia Watershed)',
      'Power grid instability (300-800 MW additional demand)',
      'Land displacement and ancestral domain disputes (Aeta populations)',
      'Sovereignty and extraterritoriality debates',
      'ATP low-value lock-in trap (5-10% value-add capture)',
    ],
  },
  {
    name: 'Panama Customs & Logistics Pilot (PaxPass)',
    status: 'ANNOUNCED',
    description: 'AI-driven, cryptographically secured logistics tracking corridor',
    location: 'Panama Canal and associated free trade zones',
    scope: 'Real-time container provenance verification, automated customs clearance',
    financialAllocation: 'Preliminary pilot testing phase',
    risks: ['Technical integration complexity', 'Port operational delays', 'Customs interoperability standards clarity'],
  },
  {
    name: 'Stanford Foundry School Workforce Initiative',
    status: 'ANNOUNCED',
    description: 'Academic-industrial training platform for semiconductor supply chain talent',
    scope: 'Curricula development for technicians, engineers, and risk analysts across partner nations',
    financialAllocation: 'Joint partnership with Stanford HAI institute',
    risks: ['Program scale finalization pending', 'Admissions criteria development', 'Regional university coordination'],
  },
];

export const PAX_SILICA_SIGNATORIES: PaxSilicaSignatory[] = [
  {
    region: 'North America',
    country: 'United States',
    role: 'Convenor / Anchor',
    flagshipProjects: ['Project Vault Reserve', 'Pax Silica Fund'],
    strategicFocus: 'Capital, IP, Strategic Mineral Stockpiling',
    identifiedRisks: 'High budget allocation debate, trade friction',
    confidenceRating: 'High',
  },
  {
    region: 'Indo-Pacific',
    country: 'Philippines',
    role: 'Regional Node',
    flagshipProjects: ['New Clark City Hub (1,620 ha)'],
    strategicFocus: 'Semiconductor ATP, PCBs, Logistics',
    identifiedRisks: 'Water strain, land claims, grid capacity, sovereignty debates',
    confidenceRating: 'High',
  },
  {
    region: 'East Asia',
    country: 'Japan',
    role: 'Technology / Equipment',
    flagshipProjects: ['Material & Equipment Alignment'],
    strategicFocus: 'Lithography chemicals, silicon wafers, advanced substrates',
    identifiedRisks: 'Export exposure to East Asian markets',
    confidenceRating: 'High',
  },
  {
    region: 'East Asia',
    country: 'South Korea',
    role: 'Technology / Foundry',
    flagshipProjects: ['Memory & Foundry Integration'],
    strategicFocus: 'HBM Memory, advanced packaging alignment',
    identifiedRisks: 'High trade exposure to Chinese commercial markets',
    confidenceRating: 'High',
  },
  {
    region: 'Indo-Pacific',
    country: 'Australia',
    role: 'Resource Supplier',
    flagshipProjects: ['Critical Mineral Extraction'],
    strategicFocus: 'Lithium, rare earths, nickel supply agreements',
    identifiedRisks: 'Environmental permitting, processing cost overhead',
    confidenceRating: 'High',
  },
  {
    region: 'Europe',
    country: 'European Union / EC',
    role: 'Regulatory / Regional',
    flagshipProjects: ['EU Chips Act Alignment'],
    strategicFocus: 'Strategic supply security, joint research, standards',
    identifiedRisks: 'Regulatory misalignment across member states',
    confidenceRating: 'High',
  },
  {
    region: 'Europe',
    country: 'Netherlands',
    role: 'Equipment Anchor',
    flagshipProjects: ['ASML / Photolithography Alignment'],
    strategicFocus: 'Semiconductor manufacturing equipment',
    identifiedRisks: 'Stringent export controls, corporate pushback',
    confidenceRating: 'High',
  },
  {
    region: 'Middle East',
    country: 'UAE',
    role: 'Capital / Energy',
    flagshipProjects: ['Gulf Compute & Capital Corridor'],
    strategicFocus: 'Clean energy, data center equity funding',
    identifiedRisks: 'Geopolitical balancing between US and Asian markets',
    confidenceRating: 'Medium',
  },
  {
    region: 'Indo-Pacific',
    country: 'India',
    role: 'Manufacturing Node',
    flagshipProjects: ['Tech Manufacturing Alignment'],
    strategicFocus: 'Electronics assembly, workforce scaling',
    identifiedRisks: 'Infrastructure bottlenecks, trade protectionism',
    confidenceRating: 'High',
  },
  {
    region: 'Latin America',
    country: 'Panama',
    role: 'Logistics Anchor',
    flagshipProjects: ['Panama Logistics Pilot (PaxPass)'],
    strategicFocus: 'Trusted supply-chain customs credentialing',
    identifiedRisks: 'Technical integration, port administrative delays',
    confidenceRating: 'Medium',
  },
];

export const PAX_SILICA_RISKS: PaxSilicaRiskDimension[] = [
  {
    category: 'Environmental & Resource Strain',
    description: 'Water resource degradation and power grid instability',
    affectedNodes: ['Philippines', 'Southeast Asia'],
    technicalScale:
      'ATP facility: 2.5-5.0M liters/day water consumption. Edge compute: continuous cooling. Full 1,620-hectare zone: 300-800 MW additional baseload demand',
    mitigationApproach: 'Dedicated renewable energy, 90%+ water recycling loops, pre-commissioned grid capacity',
  },
  {
    category: 'Socio-Economic & Labor Friction',
    description: 'Land displacement, ancestral domain disputes, ATP low-value lock-in',
    affectedNodes: ['Philippines', 'Indigenous Aeta communities'],
    technicalScale: 'ATP captures only 5-10% of semiconductor value-add; high-value IP remains concentrated in US/JP/EU',
    mitigationApproach: 'Transparent land mapping, Free Prior Informed Consent (FPIC), domestic supplier integration mandates',
  },
  {
    category: 'Sovereignty & Legal Jurisdiction',
    description: 'Extraterritoriality debates and constitutional constraints',
    affectedNodes: ['Philippines'],
    technicalScale: 'Special economic zones operate strictly under Philippine legal sovereignty per 1987 Constitution',
    mitigationApproach:
      'Reject extraterritorial proposals; operate under PEZA law (RA 7916) and Philippine courts exclusively',
  },
  {
    category: 'Geopolitical Escalation & Market Bifurcation',
    description: 'China countermeasures and global tech stack fragmentation',
    affectedNodes: ['Global'],
    technicalScale:
      'June 22, 2026: MOFCOM placed MP Materials and USA Rare Earth on export-control lists. Bipolar supply stack increases multinational compliance costs',
    mitigationApproach: 'Dual-track supply chain architecture for Western and Chinese tech ecosystems',
  },
  {
    category: 'Critical Mineral Extraction & Processing',
    description: 'Tailings disposal and acid mine drainage hazards',
    affectedNodes: ['Philippines (nickel)', 'Latin America (lithium)', 'Australia (rare earths)'],
    technicalScale: 'HPAL processing for battery-grade nickel produces massive toxic waste requiring strict containment',
    mitigationApproach: 'Strict tailings containment, regular coastal and groundwater monitoring',
  },
];

export const PAX_SILICA_TIMELINE = {
  'December 2025': {
    event: 'Pax Silica Inaugural Summit (Washington)',
    signatories: 7,
    details: 'Launch with founding members: US, UK, Japan, South Korea, Australia, Singapore, Israel',
  },
  'January - April 2026': {
    event: 'Indo-Pacific & Middle East Accession',
    signatories: 6,
    details: 'Qatar (Jan), UAE (Jan), India (Feb), Sweden (Mar), Finland (Apr), Philippines (Apr)',
  },
  'May - July 2026': {
    event: 'European & Latin American Integration',
    signatories: 11,
    details:
      'Norway (May), Netherlands (June), EU/EC (June), Argentina, Chile, Costa Rica, El Salvador, Germany, Greece, Kazakhstan, Panama (June)',
  },
  'June 22, 2026': {
    event: 'China MOFCOM Countermeasures',
    signatories: 0,
    details:
      'MOFCOM places MP Materials and USA Rare Earth on export-control restrict list; restricts processing equipment and heavy rare-earth refining technology',
  },
};

export const PAX_SILICA_VALUE_CHAIN = {
  extraction:
    'Raw nickel (PH/ID), copper (PH/CL), rare earths (US/AU) mined under audited ESG standards',
  refining:
    'Separation and stockpiling via Project Vault ($10B EXIM facility) to absorb price shocks',
  fabrication: 'Wafers produced in North America, Europe, East Asia (US/TW/KR)',
  advancedATP:
    'High-density interconnects, substrates, sensor integration in trusted nodes (PH/SG/MY)',
  computeDeployment:
    'Packaged chips integrated into secure cloud and edge computing architectures across member nations',
};

export function getPaxSilicaContext() {
  return {
    overview: PAX_SILICA_OVERVIEW,
    capitalVehicles: PAX_SILICA_CAPITAL_VEHICLES,
    flagshipProjects: PAX_SILICA_FLAGSHIP_PROJECTS,
    signatories: PAX_SILICA_SIGNATORIES,
    risks: PAX_SILICA_RISKS,
    timeline: PAX_SILICA_TIMELINE,
    valueChain: PAX_SILICA_VALUE_CHAIN,
  };
}
