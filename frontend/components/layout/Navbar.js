'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCompareStore } from '@/store/compareStore';
import { GraduationCap, Search, BookmarkCheck, GitCompare, LogIn, LogOut, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const compareCount = useCompareStore((s) => s.colleges.length);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Colleges', icon: Search },
    { href: '/compare', label: `Compare${compareCount > 0 ? ` (${compareCount})` : ''}`, icon: GitCompare },
    ...(user ? [{ href: '/saved', label: 'Saved', icon: BookmarkCheck }] : []),
  ];

  return (
    <nav className="glass sticky top-0 z-50" style={{ borderBottom: '1px solid #2e2e50' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <GraduationCap size={28} color="#6366f1" />
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 700 }} className="gradient-text">EduRank</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="hidden-mobile">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              color: pathname === href ? '#6366f1' : '#94a3b8',
              fontWeight: pathname === href ? 600 : 400,
              fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s'
            }}>
              <Icon size={16} />{label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <User size={14} />{user.name.split(' ')[0]}
              </span>
              <button onClick={logout} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.4rem 1rem', borderRadius: '8px', border: '1px solid #2e2e50',
                background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem'
              }}>
                <LogOut size={14} />Logout
              </button>
            </div>
          ) : (
            <Link href="/auth/login" style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.5rem 1.25rem', borderRadius: '8px',
              background: '#6366f1', color: '#fff', textDecoration: 'none',
              fontWeight: 600, fontSize: '0.875rem', transition: 'background 0.2s'
            }}>
              <LogIn size={16} />Sign In
            </Link>
          )}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="show-mobile"
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #2e2e50', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              color: pathname === href ? '#6366f1' : '#94a3b8',
              textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem'
            }}>
              <Icon size={16} />{label}
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
