'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, BookOpen, Library, Headphones, FileText, GraduationCap,
  ChevronLeft, ChevronRight, BarChart2, Settings, User,
  BookMarked, Mic, Clock
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';


const navSections = [
  {
    id: 'section-study',
    label: 'Study',
    items: [
      { id: 'nav-home', label: 'ホーム', labelEn: 'Dashboard', icon: Home, href: '/', badge: null },
      { id: 'nav-kanji', label: '漢字', labelEn: 'Kanji', icon: BookMarked, href: '/kanji', badge: '284' },
      { id: 'nav-vocab', label: '語彙', labelEn: 'Vocabulary', icon: Library, href: '/vocab', badge: null },
      { id: 'nav-listen', label: '聴解', labelEn: 'Listening', icon: Headphones, href: '/listening', badge: '3' },
      { id: 'nav-reading', label: '読解', labelEn: 'Reading', icon: FileText, href: '/reading', badge: null },
      { id: 'nav-grammar', label: '文法', labelEn: 'Grammar', icon: BookOpen, href: '/grammar', badge: null },
    ],
  },
  {
    id: 'section-jlpt',
    label: 'JLPT Levels',
    items: [
      { id: 'nav-n5', label: 'N5 初級', labelEn: 'N5 Beginner', icon: GraduationCap, href: '/jlpt/n5', badge: null },
      { id: 'nav-n4', label: 'N4 初中級', labelEn: 'N4 Elementary', icon: GraduationCap, href: '/jlpt/n4', badge: null },
      { id: 'nav-n3', label: 'N3 中級', labelEn: 'N3 Intermediate', icon: GraduationCap, href: '/jlpt/n3', badge: null },
    ],
  },
  {
    id: 'section-tools',
    label: 'Tools',
    items: [
      { id: 'nav-progress', label: 'Progress', labelEn: 'Progress', icon: BarChart2, href: '/progress', badge: null },
      { id: 'nav-timer', label: 'Timer', labelEn: 'Pomodoro', icon: Clock, href: '/timer', badge: null },
      { id: 'nav-kana', label: 'Kana Chart', labelEn: 'Kana', icon: Mic, href: '/kana', badge: null },
      { id: 'nav-profile', label: 'Profile', labelEn: 'Profile', icon: User, href: '/profile', badge: null },
    ],
  },
];

const jlptColors: Record<string, string> = {
  'nav-n5': 'var(--jlpt-n5)',
  'nav-n4': 'var(--jlpt-n4)',
  'nav-n3': 'var(--jlpt-n3)',
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <aside
      className="hidden lg:flex flex-col flex-shrink-0 h-full border-r border-border bg-background-secondary transition-all duration-300 ease-in-out overflow-hidden"
      style={{ width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)' }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <AppLogo size={28} />
            <span className="font-bold text-base text-foreground truncate">NihongoZen</span>
          </div>
        )}
        {collapsed && <AppLogo size={28} className="mx-auto" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="btn-press p-1.5 rounded-lg hover:bg-card-elevated transition-colors flex-shrink-0"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight size={14} className="text-muted-foreground" />
            : <ChevronLeft size={14} className="text-muted-foreground" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-1 px-2">
        {navSections.map((section) => (
          <div key={section.id}>
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground-subtle px-2 pt-3 pb-1.5">
                {section.label}
              </p>
            )}
            {collapsed && <div className="h-2" />}
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const jlptColor = jlptColors[item.id];

              return (
                <Link key={item.id} href={item.href}>
                  <div
                    className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-all group relative"
                    style={{
                      background: active ? 'var(--primary-dim)' : 'transparent',
                      borderLeft: active ? `2px solid var(--primary)` : '2px solid transparent',
                    }}
                    title={collapsed ? item.labelEn : undefined}
                  >
                    <Icon
                      size={16}
                      style={{ color: active ? 'var(--primary)' : jlptColor || 'var(--muted-foreground)', flexShrink: 0 }}
                    />
                    {!collapsed && (
                      <>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium font-sans-jp truncate block"
                            style={{ color: active ? 'var(--primary)' : 'var(--foreground)' }}>
                            {item.label}
                          </span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
                            style={{ background: 'var(--primary-dim)', color: 'var(--primary)' }}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User mini-card */}
      <div className="border-t border-border p-3 flex-shrink-0">
        <Link href="/profile">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-card-elevated transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, var(--primary), #B02050)' }}>
              K
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">Kenji Tanaka</p>
                <p className="text-[10px] text-muted-foreground truncate">Level 12 · Scholar</p>
              </div>
            )}
            {!collapsed && <Settings size={13} className="text-muted-foreground flex-shrink-0" />}
          </div>
        </Link>
      </div>
    </aside>
  );
}
