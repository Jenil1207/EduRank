'use client';
import Link from 'next/link';
import { MapPin, Star, DollarSign, TrendingUp, BookmarkPlus, BookmarkCheck, GitCompare } from 'lucide-react';
import { useCompareStore } from '@/store/compareStore';
import { useAuth } from '@/context/AuthContext';
import { formatFees, formatPackage } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import api from '@/lib/api';

export default function CollegeCard({ college, isSaved, onSaveToggle }) {
  const { user } = useAuth();
  const { addCollege, removeCollege, isInCompare } = useCompareStore();
  const inCompare = isInCompare(college._id);
  const [saving, setSaving] = useState(false);
  const [compareMsg, setCompareMsg] = useState('');

  const handleCompare = (e) => {
    e.preventDefault();
    if (inCompare) { removeCollege(college._id); return; }
    const result = addCollege(college);
    if (result?.error) { setCompareMsg(result.error); setTimeout(() => setCompareMsg(''), 2500); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      if (isSaved) {
        await api.delete(`/saved/${college._id}`);
        onSaveToggle?.(college._id, false);
      } else {
        await api.post('/saved', { collegeId: college._id });
        onSaveToggle?.(college._id, true);
      }
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const typeColor = college.type === 'Public' ? '#10b981' : college.type === 'Private' ? '#6366f1' : '#f59e0b';

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/college/${college._id}`} style={{ textDecoration: 'none' }}>
        <div className="card-glow" style={{
          background: '#1a1a2e', border: '1px solid #2e2e50', borderRadius: '16px',
          overflow: 'hidden', transition: 'border-color 0.3s', cursor: 'pointer', height: '100%'
        }}>
          {/* Image */}
          <div style={{ position: 'relative', height: '160px', overflow: 'hidden', background: '#0f0f1a' }}>
            <img
              src={college.imageUrl || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop'}
              alt={college.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop'; }}
            />
            {/* Type badge */}
            <span style={{
              position: 'absolute', top: '12px', left: '12px',
              background: typeColor + '22', color: typeColor, border: `1px solid ${typeColor}44`,
              borderRadius: '20px', padding: '2px 10px', fontSize: '0.75rem', fontWeight: 600
            }}>{college.type}</span>
            {/* Rating */}
            <span style={{
              position: 'absolute', top: '12px', right: '12px',
              background: 'rgba(0,0,0,0.7)', borderRadius: '8px', padding: '2px 8px',
              display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b'
            }}>
              <Star size={12} fill="#f59e0b" />{college.rating.toFixed(1)}
            </span>
          </div>

          {/* Content */}
          <div style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3, marginBottom: '0.4rem' }}>
              {college.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
              <MapPin size={12} />{college.city}, {college.state}
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{ background: '#0f0f1a', borderRadius: '8px', padding: '0.4rem 0.6rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '2px' }}>Fees/yr</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6366f1' }}>{formatFees(college.totalFees)}</div>
              </div>
              <div style={{ background: '#0f0f1a', borderRadius: '8px', padding: '0.4rem 0.6rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '2px' }}>Avg Package</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>{formatPackage(college.avgPackage)}</div>
              </div>
            </div>

            {/* Placement bar */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ color: '#64748b' }}>Placement</span>
                <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{college.placementPct}%</span>
              </div>
              <div style={{ background: '#0f0f1a', borderRadius: '4px', height: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${college.placementPct}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: '4px' }} />
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={handleCompare} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                padding: '0.5rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                border: inCompare ? '1px solid #6366f1' : '1px solid #2e2e50',
                background: inCompare ? '#6366f122' : 'transparent',
                color: inCompare ? '#6366f1' : '#64748b', transition: 'all 0.2s'
              }}>
                <GitCompare size={13} />{inCompare ? 'Added' : 'Compare'}
              </button>
              {user && (
                <button onClick={handleSave} disabled={saving} style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                  padding: '0.5rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                  border: isSaved ? '1px solid #10b981' : '1px solid #2e2e50',
                  background: isSaved ? '#10b98122' : 'transparent',
                  color: isSaved ? '#10b981' : '#64748b', transition: 'all 0.2s'
                }}>
                  {isSaved ? <BookmarkCheck size={13} /> : <BookmarkPlus size={13} />}
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              )}
            </div>
            {compareMsg && <p style={{ color: '#f59e0b', fontSize: '0.72rem', marginTop: '0.5rem', textAlign: 'center' }}>{compareMsg}</p>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
