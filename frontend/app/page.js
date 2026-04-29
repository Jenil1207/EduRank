'use client';
import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, GraduationCap, Zap, Users } from 'lucide-react';
import api from '@/lib/api';
import CollegeCard from '@/components/college/CollegeCard';
import CollegeFilters, { FEE_RANGES } from '@/components/college/CollegeFilters';
import CollegeCardSkeleton from '@/components/ui/CollegeCardSkeleton';
import { useDebounce } from '@/hooks/useDebounce';

const STATS = [
  { icon: GraduationCap, value: '1000+', label: 'Colleges Listed' },
  { icon: Users, value: '5L+', label: 'Students Helped' },
  { icon: Zap, value: '98%', label: 'Placement Accuracy' },
];

function fetchColleges({ search, state, type, feeRange, minRating, page }) {
  const range = FEE_RANGES[feeRange];
  const params = { page, limit: 12 };
  if (search) params.search = search;
  if (state !== 'all') params.state = state;
  if (type !== 'all') params.type = type;
  if (range && range.min > 0) params.minFees = range.min;
  if (range && range.max !== Infinity) params.maxFees = range.max;
  if (minRating > 0) params.minRating = minRating;
  return api.get('/colleges', { params }).then((r) => r.data);
}

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ state: 'all', type: 'all', feeRange: 0, minRating: 0 });
  const [page, setPage] = useState(1);
  const [savedIds, setSavedIds] = useState(new Set());
  const debouncedSearch = useDebounce(search, 400);

  // Reset page on filter/search change
  useEffect(() => { setPage(1); }, [debouncedSearch, filters]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['colleges', debouncedSearch, filters, page],
    queryFn: () => fetchColleges({ search: debouncedSearch, ...filters, page }),
    keepPreviousData: true,
  });

  const handleSaveToggle = useCallback((id, saved) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      saved ? next.add(id) : next.delete(id);
      return next;
    });
  }, []);

  const colleges = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f2a 100%)',
        padding: '5rem 1.5rem 4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glowing orbs */}
        <div style={{ position: 'absolute', top: '20%', left: '15%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#6366f122', border: '1px solid #6366f144', borderRadius: '20px', padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
            <Zap size={14} color="#6366f1" />
            <span style={{ fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 500 }}>India's #1 College Discovery Platform</span>
          </div>

          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1rem' }}>
            Find Your <span className="gradient-text">Dream College</span><br />with Confidence
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '540px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Compare fees, placements & rankings across 1000+ colleges. Make the right choice for your future.
          </p>

          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by college name, city, or state..."
              style={{
                width: '100%', padding: '1rem 1rem 1rem 3.25rem',
                background: '#1a1a2e', border: '2px solid #2e2e50',
                borderRadius: '14px', color: '#f1f5f9', fontSize: '1rem',
                outline: 'none', transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#6366f1'}
              onBlur={(e) => e.target.style.borderColor = '#2e2e50'}
            />
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <Icon size={20} color="#6366f1" style={{ marginBottom: '0.3rem' }} />
                <div style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 800, color: '#f1f5f9' }}>{value}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <CollegeFilters filters={filters} onChange={setFilters} />

        {/* Results header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {isLoading ? 'Searching...' : `${pagination?.total ?? 0} Colleges Found`}
            </h2>
            {debouncedSearch && <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Results for "{debouncedSearch}"</p>}
          </div>
        </div>

        {/* Grid */}
        {isError && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#ef4444' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Failed to load colleges.</p>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>Please check if the backend is running.</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => <CollegeCardSkeleton key={i} />)
            : colleges.map((college) => (
                <CollegeCard
                  key={college._id}
                  college={college}
                  isSaved={savedIds.has(college._id)}
                  onSaveToggle={handleSaveToggle}
                />
              ))
          }
        </div>

        {/* Empty state */}
        {!isLoading && !isError && colleges.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
            <GraduationCap size={56} color="#2e2e50" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem' }}>No colleges found</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem' }}>Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '2.5rem' }}>
            <button onClick={() => setPage((p) => p - 1)} disabled={!pagination.hasPrevPage}
              style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid #2e2e50', background: 'transparent', color: pagination.hasPrevPage ? '#f1f5f9' : '#475569', cursor: pagination.hasPrevPage ? 'pointer' : 'not-allowed' }}>
              ← Prev
            </button>
            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Page {pagination.page} of {pagination.totalPages}</span>
            <button onClick={() => setPage((p) => p + 1)} disabled={!pagination.hasNextPage}
              style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid #2e2e50', background: pagination.hasNextPage ? '#6366f1' : 'transparent', color: '#fff', cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed' }}>
              Next →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
