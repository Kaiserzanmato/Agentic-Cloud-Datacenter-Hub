import { Clapperboard } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function VideoBriefingSection() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <Clapperboard className="w-6 h-6" />
            </div>
            <span>Video Briefing</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Architecting the Silicon Divide — a documentary briefing on the global AI infrastructure race
          </p>
        </div>
      </div>

      <GlassCard className="p-4 sm:p-6">
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black">
          <video
            className="w-full h-auto max-h-[75vh]"
            src="/media/architecting-the-silicon-divide.mp4"
            controls
            preload="metadata"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="mt-4 text-xs text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-800 dark:text-slate-200">Architecting the Silicon Divide</span>{' '}
          — geopolitical fragmentation of the semiconductor supply chain, Pax Silica coordination, and the
          infrastructure race shaping the AI era.
        </p>
      </GlassCard>
    </div>
  );
}
