'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Mail, CheckCircle, Send, ArrowRight, BookMarked, Headphones, Zap, BarChart2 } from 'lucide-react';
import { toast } from 'sonner';
import AppLogo from '@/components/ui/AppLogo';

type EmailForm = { email: string };

const features = [
  { id: 'feat-jlpt', icon: BarChart2, text: 'Structured N5→N1 JLPT curriculum' },
  { id: 'feat-kanji', icon: BookMarked, text: '2,136 kanji with readings and examples' },
  { id: 'feat-listen', icon: Headphones, text: 'Listening comprehension with transcripts' },
  { id: 'feat-xp', icon: Zap, text: 'Gamified XP, streaks, and rank badges' },
];

const stats = [
  { id: 'stat-learners', value: '48,200+', label: 'Active learners' },
  { id: 'stat-kanji', value: '2,136', label: 'Kanji covered' },
  { id: 'stat-vocab', value: '12,500+', label: 'Vocabulary entries' },
  { id: 'stat-accuracy', value: '94%', label: 'Exam pass rate' },
];

export default function LoginContent() {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [emailSent, setEmailSent] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EmailForm>();

  // Backend integration point: replace with Firebase Auth email magic link
  const onSubmit = async (data: EmailForm) => {
    await new Promise((r) => setTimeout(r, 1200));
    setEmailSent(true);
    toast.success(`Magic link sent to ${data.email}`);
  };

  // Backend integration point: replace with Firebase Auth Google Sign-In popup
  const handleGoogle = () => {
    toast.info('Google Sign-In — connect Firebase Auth here');
    setTimeout(() => {
      window.location.href = '/';
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-between w-[55%] p-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1A0810 0%, #0F0F14 50%, #0A0A12 100%)' }}>
        {/* 学 watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-serif-jp text-[280px] font-bold opacity-[0.04] leading-none"
            style={{ color: 'var(--primary)' }}>
            学
          </span>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <AppLogo size={36} />
          <span className="font-bold text-xl text-foreground">NihongoZen</span>
        </div>

        {/* Headline */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <p className="font-sans-jp text-sm text-muted-foreground mb-3 tracking-wider">日本語を極める</p>
          <h1 className="text-5xl xl:text-6xl font-black text-foreground leading-tight mb-6">
            Master<br />
            <span style={{ color: 'var(--primary)' }}>Japanese.</span>
          </h1>
          <p className="text-base text-muted-foreground mb-8 max-w-sm leading-relaxed">
            From your first hiragana to JLPT N1 — a structured, gamified path to Japanese fluency.
          </p>

          <div className="space-y-3 mb-10">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--primary-dim)', border: '1px solid var(--primary)' }}>
                    <CheckCircle size={12} style={{ color: 'var(--primary)' }} />
                  </div>
                  <span className="text-sm text-foreground">{f.text}</span>
                </div>
              );
            })}
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-4 gap-4 p-4 rounded-xl border border-border bg-card/40">
            {stats.map((s) => (
              <div key={s.id} className="text-center">
                <p className="text-lg font-bold tabular-nums text-foreground">{s.value}</p>
                <p className="text-[11px] text-muted-foreground leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-foreground-subtle">
          © 2026 NihongoZen · Privacy Policy · Terms of Service
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10"
        style={{ background: 'var(--background-secondary)' }}>
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8 md:hidden">
          <AppLogo size={32} />
          <span className="font-bold text-lg text-foreground">NihongoZen</span>
        </div>

        <div className="w-full max-w-sm">
          {/* Tabs */}
          <div className="flex rounded-xl border border-border bg-card p-1 mb-8">
            {(['signin', 'signup'] as const).map((t) => (
              <button
                key={`auth-tab-${t}`}
                onClick={() => { setTab(t); setEmailSent(false); }}
                className="btn-press flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: tab === t ? 'var(--primary)' : 'transparent',
                  color: tab === t ? '#fff' : 'var(--muted-foreground)',
                }}>
                {t === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              {tab === 'signin' ? 'Welcome back' : 'Start your journey'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {tab === 'signin' ?'Sign in to continue your Japanese studies' :'Create your free account to begin learning'}
            </p>

            {/* Google */}
            <button
              onClick={handleGoogle}
              className="btn-press w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border bg-card hover:bg-card-elevated transition-all text-sm font-semibold text-foreground">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or use email</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Magic link form */}
            {!emailSent ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                      type="email"
                      placeholder="kenji@example.com"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-primary mt-1">{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-press w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, var(--primary), #C03058)' }}>
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending magic link...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Magic Link
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl border text-center space-y-2"
                style={{ borderColor: 'var(--jlpt-n5)', background: 'var(--jlpt-n5-dim)' }}>
                <CheckCircle size={28} className="mx-auto" style={{ color: 'var(--jlpt-n5)' }} />
                <p className="text-sm font-semibold text-foreground">Check your inbox!</p>
                <p className="text-xs text-muted-foreground">We sent a magic link — click it to sign in instantly. No password needed.</p>
                <button onClick={() => setEmailSent(false)} className="text-xs text-primary hover:opacity-80 transition-opacity mt-1">
                  Use a different email
                </button>
              </div>
            )}

            {/* Disabled social buttons */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'btn-apple', label: '🍎 Apple', disabled: true },
                { id: 'btn-facebook', label: '📘 Facebook', disabled: true },
              ].map((btn) => (
                <button
                  key={btn.id}
                  disabled={btn.disabled}
                  className="py-2.5 rounded-xl border border-border text-xs font-medium text-muted-foreground opacity-40 cursor-not-allowed flex items-center justify-center gap-1.5">
                  {btn.label}
                  <span className="text-[9px] bg-card-elevated px-1.5 py-0.5 rounded-full">Soon</span>
                </button>
              ))}
            </div>

            {/* Demo credentials box */}
            <div className="p-3 rounded-xl border border-border bg-card">
              <p className="text-[11px] font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Demo Access</p>
              <div className="space-y-1.5">
                {[
                  { id: 'demo-email', label: 'Email', value: 'kenji@nihongozen.app' },
                  { id: 'demo-note', label: 'Auth', value: 'Click "Continue with Google" above' },
                ].map((row) => (
                  <div key={row.id} className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{row.label}</span>
                    <span className="text-[10px] font-mono text-foreground">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground text-center">
              By continuing, you agree to our{' '}
              <span className="text-primary cursor-pointer hover:opacity-80">Terms of Service</span>
              {' '}and{' '}
              <span className="text-primary cursor-pointer hover:opacity-80">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
