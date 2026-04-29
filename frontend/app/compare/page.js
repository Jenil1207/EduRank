'use client';
import { useCompareStore } from '@/store/compareStore';
import { Trash2, GitCompare, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { formatFees, formatPackage } from '@/lib/utils';

const ROWS = [
  { key: 'location', label: 'Location', format: (v) => v },
  { key: 'type', label: 'Type', format: (v) => v },
  { key: 'rating', label: 'Rating', format: (v) => `⭐ ${v?.toFixed(1)}` },
  { key: 'totalFees', label: 'Annual Fees', format: formatFees },
  { key: 'avgPackage', label: 'Avg Package', format: formatPackage },
  { key: 'placementPct', label: 'Placement %', format: (v) => `${v}%` },
];

export default function ComparePage() {
  const { colleges, removeCollege, clearAll } = useCompareStore();

  if (colleges.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1.5rem' }}>
        <GitCompare size={60} color="#2e2e50" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>No Colleges to Compare</h2>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>Add up to 3 colleges from the listing page to compare them.</p>
        <Link href="/" style={{ background: '#6366f1', color: '#fff', padding: '0.75rem 2rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>
          Browse Colleges
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Outfit', fontSize: '1.75rem', fontWeight: 800 }}>College Comparison</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Comparing {colleges.length} college{colleges.length > 1 ? 's' : ''}</p>
        </div>
        <button onClick={clearAll} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
          <Trash2 size={14} />Clear All
        </button>
      </div>

      {/* Comparison Table */}
      <div style={{ background: '#1a1a2e', border: '1px solid #2e2e50', borderRadius: '20px', overflow: 'hidden' }}>
        {/* College headers */}
        <div style={{ display: 'grid', gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)`, borderBottom: '1px solid #2e2e50' }}>
          <div style={{ padding: '1.25rem 1rem', background: '#0f0f1a', fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Criteria</div>
          {colleges.map((c) => (
            <div key={c._id} style={{ padding: '1.25rem 1rem', borderLeft: '1px solid #2e2e50', textAlign: 'center', background: '#0f0f1a' }}>
              <Link href={`/college/${c._id}`} style={{ textDecoration: 'none' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f1f5f9', marginBottom: '0.25rem', lineHeight: 1.3 }}>{c.name}</div>
              </Link>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>{c.city}</div>
              <button onClick={() => removeCollege(c._id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'transparent', border: '1px solid #2e2e50', color: '#64748b', borderRadius: '6px', padding: '3px 8px', cursor: 'pointer', fontSize: '0.72rem' }}>
                <Trash2 size={11} />Remove
              </button>
            </div>
          ))}
        </div>

        {/* Data rows */}
        {ROWS.map(({ key, label, format }, i) => {
          const values = colleges.map((c) => c[key]);
          let best = null;
          if (key === 'rating' || key === 'placementPct' || key === 'avgPackage') best = Math.max(...values);
          if (key === 'totalFees') best = Math.min(...values);

          return (
            <div key={key} style={{ display: 'grid', gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)`, borderBottom: i < ROWS.length - 1 ? '1px solid #2e2e50' : 'none', background: i % 2 === 0 ? 'transparent' : '#ffffff04' }}>
              <div style={{ padding: '1rem', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', display: 'flex', alignItems: 'center' }}>{label}</div>
              {colleges.map((c) => {
                const val = c[key];
                const isBest = best !== null && val === best;
                return (
                  <div key={c._id} style={{ padding: '1rem', borderLeft: '1px solid #2e2e50', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{
                      fontWeight: isBest ? 700 : 400,
                      color: isBest ? '#10b981' : '#94a3b8',
                      background: isBest ? '#10b98111' : 'transparent',
                      padding: isBest ? '3px 10px' : '3px 0',
                      borderRadius: isBest ? '20px' : '0',
                      fontSize: '0.9rem'
                    }}>
                      {format(val)}
                      {isBest && <span style={{ marginLeft: '4px', fontSize: '0.65rem' }}>✓ Best</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Add more prompt */}
      {colleges.length < 3 && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center', border: '2px dashed #2e2e50', borderRadius: '16px', padding: '2rem' }}>
          <GraduationCap size={32} color="#2e2e50" style={{ marginBottom: '0.75rem' }} />
          <p style={{ color: '#64748b', marginBottom: '1rem' }}>Add {3 - colleges.length} more college{3 - colleges.length > 1 ? 's' : ''} to compare</p>
          <Link href="/" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>+ Browse Colleges</Link>
        </div>
      )}
    </div>
  );
}
