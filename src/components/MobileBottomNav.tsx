'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookMarked, Library, Headphones, User } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const tabs = [
  { id: 'mob-home', label: 'Home', icon: Home, href: '/' },
  { id: 'mob-kanji', label: 'Kanji', icon: BookMarked, href: '/kanji' },
  { id: 'mob-vocab', label: 'Vocab', icon: Library, href: '/vocab' },
  { id: 'mob-listen', label: 'Listen', icon: Headphones, href: '/listening' },
  { id: 'mob-profile', label: 'Profile', icon: User, href: '/profile' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden border-t border-border glass"
      style={{ height: '56px', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.href);
          return (
            <Link key={tab.id} href={tab.href} className="flex-1">
              <div className="btn-press flex flex-col items-center justify-center h-full gap-0.5 transition-all">
                <Icon
                  size={20}
                  style={{ color: active ? 'var(--primary)' : 'var(--muted-foreground)' }}
                />
                <span className="text-[10px] font-medium"
                  style={{ color: active ? 'var(--primary)' : 'var(--muted-foreground)' }}>
                  {tab.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
