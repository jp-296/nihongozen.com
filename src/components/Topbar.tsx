'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Zap, Bell, ChevronDown, User, Settings, BarChart2, LogOut, Menu, X } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';


const pillNav = [
  { id: 'pill-home', label: 'ホーム', href: '/' },
  { id: 'pill-kanji', label: '漢字', href: '/kanji' },
  { id: 'pill-vocab', label: '語彙', href: '/vocab' },
  { id: 'pill-listen', label: '聴解', href: '/listening' },
  { id: 'pill-reading', label: '読解', href: '/reading' },
  { id: 'pill-grammar', label: '文法', href: '/grammar' },
  { id: 'pill-kana', label: 'かな', href: '/kana' },
];

export default function Topbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-40 flex-shrink-0 glass border-b border-border"
        style={{ height: 'var(--topbar-height)' }}>
        <div className="flex items-center h-full px-4 lg:px-6 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 lg:hidden">
            <AppLogo size={28} />
            <span className="font-bold text-sm text-foreground">NihongoZen</span>
          </div>

          {/* Pill nav - desktop */}
          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {pillNav.map((item) => (
              <Link key={item.id} href={item.href}>
                <span
                  className="btn-press px-3 py-1.5 rounded-full text-sm font-medium font-sans-jp transition-all cursor-pointer"
                  style={{
                    background: isActive(item.href) ? 'var(--primary-dim)' : 'transparent',
                    color: isActive(item.href) ? 'var(--primary)' : 'var(--muted-foreground)',
                    border: `1px solid ${isActive(item.href) ? 'var(--primary)' : 'transparent'}`,
                  }}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex-1 xl:flex-none" />

          {/* Right badges */}
          <div className="flex items-center gap-2">
            {/* Streak */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-card-elevated border border-border text-xs">
              <Flame size={13} className="text-accent" />
              <span className="font-semibold tabular-nums text-accent">14</span>
            </div>

            {/* XP */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-card-elevated border border-border text-xs">
              <Zap size={13} className="text-primary" />
              <span className="font-semibold tabular-nums text-foreground">340 XP</span>
            </div>

            {/* Notifications */}
            <button className="btn-press relative p-2 rounded-lg hover:bg-card-elevated transition-colors">
              <Bell size={17} className="text-muted-foreground" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="btn-press flex items-center gap-2 p-1.5 pr-2.5 rounded-full hover:bg-card-elevated transition-colors"
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, var(--primary), #B02050)' }}>
                  K
                </div>
                <span className="hidden md:block text-sm font-medium text-foreground">Kenji</span>
                <ChevronDown size={13} className="text-muted-foreground" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-card-elevated shadow-2xl z-20 overflow-hidden"
                    style={{ animation: 'fadeUp 0.15s ease forwards' }}>
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-semibold text-foreground">Kenji Tanaka</p>
                      <p className="text-xs text-muted-foreground">Level 12 · Scholar</p>
                    </div>
                    {[
                      { id: 'menu-profile', icon: User, label: 'Profile', href: '/profile' },
                      { id: 'menu-settings', icon: Settings, label: 'Settings', href: '/profile' },
                      { id: 'menu-progress', icon: BarChart2, label: 'Progress', href: '/profile' },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.id} href={item.href} onClick={() => setUserMenuOpen(false)}>
                          <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-card transition-colors cursor-pointer">
                            <Icon size={14} className="text-muted-foreground" />
                            <span className="text-sm text-foreground">{item.label}</span>
                          </div>
                        </Link>
                      );
                    })}
                    <div className="border-t border-border">
                      <Link href="/sign-up-login-screen">
                        <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-card transition-colors cursor-pointer">
                          <LogOut size={14} className="text-primary" />
                          <span className="text-sm text-primary">Sign Out</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn-press xl:hidden p-2 rounded-lg hover:bg-card-elevated transition-colors">
              {mobileOpen ? <X size={18} className="text-foreground" /> : <Menu size={18} className="text-foreground" />}
            </button>
          </div>
        </div>

        {/* Daily XP progress bar */}
        <div className="h-0.5 bg-card-elevated">
          <div className="h-full transition-all duration-1000" style={{ width: '68%', background: 'var(--primary)' }} />
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 z-40 w-72 bg-background-secondary border-r border-border shadow-2xl overflow-y-auto"
            style={{ animation: 'fadeUp 0.2s ease forwards' }}>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <AppLogo size={28} />
                <span className="font-bold text-foreground">NihongoZen</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-card-elevated">
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>
            <nav className="p-3 space-y-1">
              {pillNav.map((item) => (
                <Link key={item.id} href={item.href} onClick={() => setMobileOpen(false)}>
                  <div
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-sans-jp text-sm font-medium transition-all"
                    style={{
                      background: isActive(item.href) ? 'var(--primary-dim)' : 'transparent',
                      color: isActive(item.href) ? 'var(--primary)' : 'var(--foreground)',
                    }}>
                    {item.label}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
