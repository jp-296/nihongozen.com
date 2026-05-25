import React from 'react';
import AppLayout from '@/components/AppLayout';
import WelcomeBanner from './components/WelcomeBanner';
import StatsGrid from './components/StatsGrid';
import XPLevelCard from './components/XPLevelCard';
import JLPTLevelCards from './components/JLPTLevelCards';
import KanjiSection from './components/KanjiSection';
import VocabSection from './components/VocabSection';
import PomodoroTimer from './components/PomodoroTimer';
import ActivityFeed from './components/ActivityFeed';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 2xl:px-10 py-6 space-y-6">
        <WelcomeBanner />
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div className="lg:col-span-2 xl:col-span-3 space-y-5">
            <StatsGrid />
            <JLPTLevelCards />
            <KanjiSection />
            <VocabSection />
          </div>
          <div className="space-y-5">
            <XPLevelCard />
            <PomodoroTimer />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
