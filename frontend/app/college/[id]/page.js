'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Star, DollarSign, TrendingUp, BookmarkPlus, BookmarkCheck, GitCompare, ArrowLeft, Award, Calendar, Users } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useCompareStore } from '@/store/compareStore';
import { formatFees, formatPackage } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';

export default function CollegeDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const { addCollege, removeCollege, isInCompare } = useCompareStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [compareMsg, setCompareMsg] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['college', id],
    queryFn: () => api.get(`/colleges/${id}`).then((r) => r.data.data),
    enabled: !!id,
  });

  const college = data;
  const inCompare = college ? isInCompare(college._id) : false;

  const handleCompare = () => {
    if (!college) return;
    if (inCompare) { removeCollege(college._id); return; }
    const result = addCollege(college);
    if (result?.error) { setCompareMsg(result.error); setTimeout(() => setCompareMsg(''), 2500); }
  };

  const handleSave = async () => {
    if (!user || !college) return;
    setSaving(true);
    try {
      if (saved) { await api.delete(`/saved/${college._id}`); setSaved(false); }
      else { await api.post('/saved', { collegeId: college._id }); setSaved(true); }
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  if (isLoading) return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div className="skeleton" style={{ height: '300px', borderRadius: '16px', marginBottom: '1.5rem' }} />
      <div className="skeleton" style={{ height: '40px', width: '60%', marginBottom: '1rem' }} />
      <div className="skeleton" style={{ height: '20px', width: '40%', marginBottom: '2rem' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: '80px', borderRadius: '12px' }} />)}
      </div>
    </div>
  );

  if (isError || !college) return (
    <div style={{ textAlign: 'center', padding: '5rem', color: '#ef4444' }}>
      <p>College not found.</p>
      <Link href="/" style={{ color: '#6366f1' }}>← Back to Home</Link>
    </div>
  );

  const TABS = ['overview', 'courses', 'placements', 'reviews'];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Back */}
      <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} />Back
      </button>

      {/* Hero card */}
      <div style={{ background: '#1a1a2e', border: '1px solid #2e2e50', borderRadius: '20px', overflow: 'hidden', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', height: '260px' }}>
          <img src={college.imageUrl || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop'}
            alt={college.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1a1a2e, transparent)' }} />
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ background: college.type === 'Public' ? '#10b98122' : '#6366f122', color: college.type === 'Public' ? '#10b981' : '#6366f1', border: `1px solid ${college.type === 'Public' ? '#10b98144' : '#6366f144'}`, borderRadius: '20px', padding: '2px 12px', fontSize: '0.8rem', fontWeight: 600 }}>{college.type}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f59e0b', fontWeight: 700, fontSize: '0.9rem' }}>
                <Star size={14} fill="#f59e0b" />{college.rating.toFixed(1)}
              </span>
            </div>
            <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800 }}>{college.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.3rem' }}>
              <MapPin size={14} />{college.location}
              {college.establishedYear && <><span style={{ color: '#2e2e50' }}>·</span><Calendar size={13} />{college.establishedYear}</>}
            </div>
          </div>
        </div>

        {/* Actions bar */}
        <div style={{ display: 'flex', gap: '0.75rem', padding: '1rem 1.5rem', borderTop: '1px solid #2e2e50', flexWrap: 'wrap' }}>
          <button onClick={handleCompare} style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.25rem', borderRadius: '10px',
            border: inCompare ? '1px solid #6366f1' : '1px solid #2e2e50',
            background: inCompare ? '#6366f122' : 'transparent', color: inCompare ? '#6366f1' : '#94a3b8',
            cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem'
          }}><GitCompare size={16} />{inCompare ? 'Remove from Compare' : 'Add to Compare'}</button>
          {user && (
            <button onClick={handleSave} disabled={saving} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.25rem', borderRadius: '10px',
              border: saved ? '1px solid #10b981' : '1px solid #2e2e50',
              background: saved ? '#10b98122' : 'transparent', color: saved ? '#10b981' : '#94a3b8',
              cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem'
            }}>{saved ? <BookmarkCheck size={16} /> : <BookmarkPlus size={16} />}{saved ? 'Saved' : 'Save College'}</button>
          )}
          {compareMsg && <p style={{ color: '#f59e0b', fontSize: '0.8rem', alignSelf: 'center' }}>{compareMsg}</p>}
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { icon: DollarSign, label: 'Annual Fees', value: formatFees(college.totalFees), color: '#6366f1' },
          { icon: TrendingUp, label: 'Avg Package', value: formatPackage(college.avgPackage), color: '#10b981' },
          { icon: Award, label: 'Placement %', value: `${college.placementPct}%`, color: '#f59e0b' },
          { icon: Users, label: 'Courses', value: `${college.courses?.length || 0} Programs`, color: '#a855f7' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} style={{ background: '#1a1a2e', border: '1px solid #2e2e50', borderRadius: '14px', padding: '1.25rem', textAlign: 'center' }}>
            <Icon size={22} color={color} style={{ marginBottom: '0.5rem' }} />
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color }}>{value}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', background: '#1a1a2e', border: '1px solid #2e2e50', borderRadius: '12px', padding: '4px', marginBottom: '1.5rem' }}>
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            flex: 1, padding: '0.6rem', borderRadius: '9px', border: 'none', cursor: 'pointer',
            background: activeTab === tab ? '#6366f1' : 'transparent',
            color: activeTab === tab ? '#fff' : '#64748b',
            fontWeight: 600, fontSize: '0.85rem', textTransform: 'capitalize', transition: 'all 0.2s'
          }}>{tab}</button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ background: '#1a1a2e', border: '1px solid #2e2e50', borderRadius: '16px', padding: '1.5rem' }}>
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>About {college.name}</h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{college.description}</p>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Programs Offered</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {college.courses?.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f0f1a', borderRadius: '10px', padding: '1rem 1.25rem' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{c.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>{c.duration}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#6366f1', fontSize: '0.9rem' }}>{formatFees(c.fees)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'placements' && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Placement Statistics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
              {[
                { label: 'Placement Rate', value: `${college.placementPct}%`, color: '#10b981' },
                { label: 'Avg CTC', value: `${college.avgPackage} LPA`, color: '#6366f1' },
                { label: 'Highest CTC', value: `${(college.avgPackage * 2.5).toFixed(0)} LPA`, color: '#f59e0b' },
                { label: 'Companies', value: '150+', color: '#a855f7' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ background: '#0f0f1a', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color }}>{value}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{label}</div>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ color: '#94a3b8' }}>Overall Placement</span>
                <span style={{ fontWeight: 700, color: '#10b981' }}>{college.placementPct}%</span>
              </div>
              <div style={{ background: '#0f0f1a', borderRadius: '6px', height: '10px' }}>
                <div style={{ width: `${college.placementPct}%`, height: '100%', background: 'linear-gradient(90deg,#10b981,#6366f1)', borderRadius: '6px' }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Student Reviews</h2>
            {college.reviews?.length === 0 && <p style={{ color: '#64748b' }}>No reviews yet.</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {college.reviews?.map((r, i) => (
                <div key={i} style={{ background: '#0f0f1a', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, color: '#f1f5f9' }}>{r.author}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f59e0b', fontWeight: 700 }}>
                      <Star size={13} fill="#f59e0b" />{r.rating}
                    </span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
