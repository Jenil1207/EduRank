'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import CollegeCard from '@/components/college/CollegeCard';
import CollegeCardSkeleton from '@/components/ui/CollegeCardSkeleton';
import { BookmarkCheck, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SavedPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [savedIds, setSavedIds] = useState(new Set());

  const { data, isLoading } = useQuery({
    queryKey: ['saved'],
    queryFn: () => api.get('/saved').then((r) => {
      const ids = new Set(r.data.data.map((c) => c._id));
      setSavedIds(ids);
      return r.data.data;
    }),
    enabled: !!user,
  });

  const handleSaveToggle = (id, isSaved) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      isSaved ? next.add(id) : next.delete(id);
      return next;
    });
    qc.invalidateQueries(['saved']);
  };

  if (!user) return (
    <div style={{ textAlign: 'center', padding: '6rem 1.5rem' }}>
      <LogIn size={56} color="#2e2e50" style={{ marginBottom: '1rem' }} />
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sign In to See Saved Colleges</h2>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Create an account to save your favourite colleges.</p>
      <Link href="/auth/login" style={{ background: '#6366f1', color: '#fff', padding: '0.75rem 2rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>
        Sign In
      </Link>
    </div>
  );

  const colleges = data || [];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Outfit', fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookmarkCheck size={28} color="#10b981" />Saved Colleges
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{colleges.length} college{colleges.length !== 1 ? 's' : ''} saved</p>
      </div>

      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1.25rem' }}>
          {[...Array(6)].map((_, i) => <CollegeCardSkeleton key={i} />)}
        </div>
      ) : colleges.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
          <BookmarkCheck size={56} color="#2e2e50" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem' }}>No saved colleges yet</h3>
          <p style={{ color: '#475569', marginBottom: '1.5rem' }}>Browse colleges and click Save to add them here.</p>
          <Link href="/" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}>Browse Colleges →</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1.25rem' }}>
          {colleges.map((college) => (
            <CollegeCard key={college._id} college={college} isSaved={savedIds.has(college._id)} onSaveToggle={handleSaveToggle} />
          ))}
        </div>
      )}
    </div>
  );
}
