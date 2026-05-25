import React from 'react';
import AppLayout from '@/components/AppLayout';
import ProfileHero from './components/ProfileHero';
import ProfileStats from './components/ProfileStats';
import StudyHeatmap from './components/StudyHeatmap';
import AudioSettings from './components/AudioSettings';
import ProfileActivity from './components/ProfileActivity';

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 2xl:px-10 py-6 space-y-6">
        <ProfileHero />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <ProfileStats />
            <StudyHeatmap />
            <ProfileActivity />
          </div>
          <div className="space-y-5">
            <AudioSettings />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
