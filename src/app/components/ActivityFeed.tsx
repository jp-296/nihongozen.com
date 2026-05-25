import React from 'react';
import { BookOpen, Zap, Award, CheckCircle, Flame } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const activities = [
  { id: 'act-001', icon: BookOpen, color: 'var(--jlpt-n4)', label: 'Studied N4 kanji', detail: '12 new kanji', time: '2h ago' },
  { id: 'act-002', icon: Zap, color: 'var(--primary)', label: 'Earned 120 XP', detail: 'Quiz completed', time: '3h ago' },
  { id: 'act-003', icon: CheckCircle, color: 'var(--jlpt-n5)', label: 'N5 vocab review', detail: '98% accuracy', time: '5h ago' },
  { id: 'act-004', icon: Award, color: 'var(--accent)', label: 'Badge unlocked', detail: 'Scholar rank', time: 'Yesterday' },
  { id: 'act-005', icon: Flame, color: 'var(--accent)', label: '14-day streak!', detail: 'Milestone reached', time: 'Yesterday' },
];

export default function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
        <span className="text-xs text-muted-foreground">Today</span>
      </div>
      <div className="space-y-3">
        {activities?.map((act) => {
          const Icon = act?.icon;
          return (
            <div key={act?.id} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: `${act?.color}22` }}>
                <Icon size={13} style={{ color: act?.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground leading-tight">{act?.label}</p>
                <p className="text-[11px] text-muted-foreground">{act?.detail}</p>
              </div>
              <span className="text-[10px] text-foreground-subtle flex-shrink-0">{act?.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
