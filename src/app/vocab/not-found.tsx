'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="font-serif-jp text-[120px] font-bold opacity-10 leading-none mb-4" style={{ color: 'var(--primary)' }}>
          迷
        </div>
        <h1 className="text-6xl font-black text-primary mb-2">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h2>
        <p className="text-sm text-muted-foreground mb-8">
          この道は存在しません。<br />
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <button className="btn-press px-6 py-3 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background: 'var(--primary)' }}>
              🏠 Back to Dashboard
            </button>
          </Link>
          <button
            onClick={() => window.history?.back()}
            className="btn-press px-6 py-3 rounded-xl text-sm font-semibold border border-border bg-card-elevated text-foreground transition-all">
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
