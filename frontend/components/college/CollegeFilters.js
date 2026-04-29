'use client';
import { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import api from '@/lib/api';

const FEE_RANGES = [

  { label: 'Any', min: 0, max: Infinity },
  { label: 'Under ₹1L', min: 0, max: 100000 },
  { label: '₹1L – ₹3L', min: 100000, max: 300000 },
  { label: '₹3L – ₹6L', min: 300000, max: 600000 },
  { label: 'Above ₹6L', min: 600000, max: Infinity },
];

const TYPES = ['All', 'Public', 'Private', 'Deemed'];

export default function CollegeFilters({ filters, onChange }) {
  const [states, setStates] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Auto-open on desktop
    if (window.innerWidth >= 768) setOpen(true);
    api.get('/colleges/states').then(({ data }) => setStates(['All', ...data.data])).catch(() => {});
  }, []);

  const hasActive = filters.state !== 'all' || filters.type !== 'all' || filters.feeRange !== 0;

  const reset = () => onChange({ state: 'all', type: 'all', feeRange: 0, minRating: 0 });

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        background: '#1a1a2e', border: '1px solid #2e2e50', borderRadius: '10px',
        padding: '0.6rem 1rem', color: '#f1f5f9', cursor: 'pointer',
        fontSize: '0.875rem', fontWeight: 500, marginBottom: '1rem'
      }}>
        <SlidersHorizontal size={16} color="#6366f1" />
        Filters {hasActive && <span style={{ background: '#6366f1', color: '#fff', borderRadius: '20px', padding: '1px 7px', fontSize: '0.7rem' }}>Active</span>}
        <ChevronDown size={14} style={{ marginLeft: 'auto', transform: open ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
      </button>

      {/* Filter panel */}
      {open && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          {/* State */}
          <div>
            <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>State</label>
            <select value={filters.state} onChange={(e) => onChange({ ...filters, state: e.target.value })}
              style={{ width: '100%', background: '#1a1a2e', border: '1px solid #2e2e50', borderRadius: '8px', padding: '0.6rem 0.75rem', color: '#f1f5f9', fontSize: '0.875rem', cursor: 'pointer' }}>
              {states.map((s) => <option key={s} value={s === 'All' ? 'all' : s}>{s}</option>)}
            </select>
          </div>

          {/* Type */}
          <div>
            <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Type</label>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {TYPES.map((t) => (
                <button key={t} onClick={() => onChange({ ...filters, type: t === 'All' ? 'all' : t })}
                  style={{
                    padding: '0.4rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', border: 'none',
                    background: filters.type === (t === 'All' ? 'all' : t) ? '#6366f1' : '#2e2e50',
                    color: filters.type === (t === 'All' ? 'all' : t) ? '#fff' : '#94a3b8'
                  }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Fee Range */}
          <div>
            <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fee Range</label>
            <select value={filters.feeRange} onChange={(e) => onChange({ ...filters, feeRange: Number(e.target.value) })}
              style={{ width: '100%', background: '#1a1a2e', border: '1px solid #2e2e50', borderRadius: '8px', padding: '0.6rem 0.75rem', color: '#f1f5f9', fontSize: '0.875rem', cursor: 'pointer' }}>
              {FEE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
            </select>
          </div>

          {/* Min Rating */}
          <div>
            <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Min Rating</label>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[0, 3, 3.5, 4, 4.5].map((r) => (
                <button key={r} onClick={() => onChange({ ...filters, minRating: r })}
                  style={{
                    padding: '0.4rem 0.65rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', border: 'none',
                    background: filters.minRating === r ? '#f59e0b' : '#2e2e50',
                    color: filters.minRating === r ? '#000' : '#94a3b8'
                  }}>{r === 0 ? 'Any' : `${r}+`}</button>
              ))}
            </div>
          </div>

          {hasActive && (
            <button onClick={reset} style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              background: 'transparent', border: '1px solid #ef4444', color: '#ef4444',
              borderRadius: '8px', padding: '0.6rem 1rem', cursor: 'pointer', fontSize: '0.8rem'
            }}><X size={14} />Reset</button>
          )}
        </div>
      )}
    </div>
  );
}

export { FEE_RANGES };
