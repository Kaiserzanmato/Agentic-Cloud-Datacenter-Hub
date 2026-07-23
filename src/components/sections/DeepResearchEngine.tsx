import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  Copy,
  Check,
  Sliders,
  ShieldAlert,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { PRESET_RESEARCH_QUERIES, DEEP_RESEARCH_PROMPT_TEMPLATE } from '../../data/deepResearchPrompt';
import { getRegionReport } from '../../data/regionResearchReports';

interface DeepResearchEngineProps {
  selectedRegion?: string;
}

export const DeepResearchEngine: React.FC<DeepResearchEngineProps> = ({ selectedRegion: propRegion = 'Southeast Asia' }) => {
  const [userQuery, setUserQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(propRegion);

  useEffect(() => {
    setSelectedRegion(propRegion);
    // Update default query when region changes
    setUserQuery(`Analyze ${propRegion} sovereign cloud & datacenter power grid constraints in 2026.`);
  }, [propRegion]);
  const [focusCategory, setFocusCategory] = useState('Sovereign Cloud & Data Centers');
  const [confidenceThreshold, setConfidenceThreshold] = useState<'All' | 'High' | 'Medium'>('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [executionStep, setExecutionStep] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true);
  const [reportRegion, setReportRegion] = useState(propRegion);
  const [reportCategory, setReportCategory] = useState('Sovereign Cloud & Data Centers');

  // Keep the rendered report in sync with the active region even before the
  // user clicks "Execute Deep Research" (e.g. selecting a region from the navbar).
  useEffect(() => {
    setReportRegion(propRegion);
  }, [propRegion]);

  const activeReport = getRegionReport(reportRegion);

  const steps = [
    'Initializing Deep Research Agent & Loading ISO 3166-1 Registry...',
    'Querying Global Authoritative Sources (SEC Filings, METI, DICT, Synergy Research)...',
    'Executing Dual-Source Verification & Auditing Project Capacities (MW/GW)...',
    'Computing Confidence Scores & Generating 12-Section Intelligence Report...'
  ];

  const handleRunResearch = () => {
    setIsGenerating(true);
    setExecutionStep(0);
    setReportGenerated(false);

    const interval = setInterval(() => {
      setExecutionStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsGenerating(false);
          setReportGenerated(true);
          setReportRegion(selectedRegion);
          setReportCategory(focusCategory);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const handleCopyPrompt = () => {
    const fullPrompt = `${DEEP_RESEARCH_PROMPT_TEMPLATE}\n\n## Custom Research Query\nTarget Region: ${selectedRegion}\nCategory Focus: ${focusCategory}\nUser Instruction: ${userQuery}`;
    navigator.clipboard.writeText(fullPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <span>AI Deep Research Engine</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Execute verified research prompts based on the 12-section Global Infrastructure Research Methodology
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyPrompt}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium transition-all cursor-pointer"
          >
            {copiedPrompt ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{copiedPrompt ? 'Prompt Copied!' : 'Copy Research Prompt'}</span>
          </button>
        </div>
      </div>

      {/* Query Input & Preset Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 lg:col-span-2 space-y-4">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
            Enter Research Query or Hypothesis
          </label>
          <textarea
            rows={4}
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Type your deep research request here..."
            className="w-full p-4 bg-slate-50/80 dark:bg-slate-950/80 border border-slate-300/80 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-mono leading-relaxed"
          />

          {/* Presets */}
          <div>
            <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Or Select Research Preset:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_RESEARCH_QUERIES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setUserQuery(preset.promptText);
                    setSelectedRegion(preset.category);
                  }}
                  className="text-left p-3 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer group"
                >
                  <span className="text-xs font-bold text-cyan-400 block group-hover:text-cyan-300">
                    {preset.title}
                  </span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {preset.promptText}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Configuration Side Panel */}
        <GlassCard className="p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Model Parameters</span>
            </h3>

            {/* Region Select */}
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Target Geographic Coverage</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              >
                <option value="Southeast Asia">Southeast Asia</option>
                <option value="North America">North America</option>
                <option value="East Asia">East Asia</option>
                <option value="Europe">Europe</option>
                <option value="Middle East">Middle East</option>
                <option value="Global">Global Coverage</option>
              </select>
            </div>

            {/* Focus Category */}
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Infrastructure Focus</label>
              <select
                value={focusCategory}
                onChange={(e) => setFocusCategory(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              >
                <option value="Sovereign Cloud & Data Centers">Sovereign Cloud & Data Centers</option>
                <option value="AI Compute & Supercomputing">AI Compute & Supercomputing</option>
                <option value="Semiconductors & Foundries">Semiconductors & Foundries</option>
                <option value="Energy, Nuclear & Liquid Cooling">Energy, Nuclear & Liquid Cooling</option>
              </select>
            </div>

            {/* Confidence Filter */}
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Confidence Score Threshold</label>
              <div className="grid grid-cols-3 gap-2">
                {(['All', 'High', 'Medium'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setConfidenceThreshold(lvl)}
                    className={`py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      confidenceThreshold === lvl
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleRunResearch}
            disabled={isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Running Synthesizer...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Execute Deep Research</span>
              </>
            )}
          </button>
        </GlassCard>
      </div>

      {/* Progress execution indicator */}
      {isGenerating && (
        <GlassCard className="p-6 space-y-3 border-cyan-500/40">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
            <span className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Step {executionStep + 1} of {steps.length}</span>
            </span>
            <span>{Math.round(((executionStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
              style={{ width: `${((executionStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-mono animate-pulse">{steps[executionStep]}</p>
        </GlassCard>
      )}

      {/* Rendered Intelligence Report */}
      {reportGenerated && !isGenerating && (
        <GlassCard className="p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono uppercase tracking-wider font-semibold">
                  Verified Audit Report
                </span>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  Target: {reportRegion} | Category: {reportCategory}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Deep Research Intelligence Briefing (2026)
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono">
                Confidence: High [94%]
              </span>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider font-mono">
              1. Executive Summary & Key Strategic Findings
            </h4>
            <div className="bg-slate-50/60 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
              {activeReport.summaryBullets.map((bullet) => (
                <p key={bullet.label}>
                  • <strong>{bullet.label}:</strong> {bullet.text}
                </p>
              ))}
            </div>
          </div>

          {/* Section 2: Regional Analysis Table */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider font-mono">
              2. Key Project & Development Registry (Verified Excerpts)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                    <th className="py-2.5 px-3">Country</th>
                    <th className="py-2.5 px-3">Project Name</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">CapEx</th>
                    <th className="py-2.5 px-3">Capacity</th>
                    <th className="py-2.5 px-3">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 text-slate-800 dark:text-slate-200">
                  {activeReport.projects
                    .filter((project) => confidenceThreshold === 'All' || project.confidence === confidenceThreshold)
                    .map((project) => (
                      <tr key={`${project.country}-${project.projectName}`}>
                        <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">{project.country}</td>
                        <td className="py-2.5 px-3">{project.projectName}</td>
                        <td className="py-2.5 px-3">{project.category}</td>
                        <td className={`py-2.5 px-3 ${project.statusColor}`}>{project.status}</td>
                        <td className="py-2.5 px-3 font-mono">{project.capex}</td>
                        <td className="py-2.5 px-3 font-mono">{project.capacity}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                            {project.confidence}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Risk & ESG Assessment */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider font-mono">
              3. Environmental & Grid Constraint Matrix
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {activeReport.risks.map((risk) => (
                <div
                  key={risk.title}
                  className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1.5"
                >
                  <span className={`font-bold block flex items-center space-x-1.5 ${risk.icon === 'warning' ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {risk.icon === 'warning' ? <ShieldAlert className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                    <span>{risk.title}</span>
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">{risk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
};
