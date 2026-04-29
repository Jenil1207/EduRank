'use client';
import { useCompareStore } from '@/store/compareStore';
import { useRouter } from 'next/navigation';
import { GitCompare, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CompareBar() {
  const { colleges, removeCollege } = useCompareStore();
  const router = useRouter();

  if (colleges.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
          background: 'linear-gradient(135deg, #1a1a2e, #0f0f1a)',
          borderTop: '1px solid #2e2e50',
          padding: '0.75rem 1.5rem',
          display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6366f1', fontWeight: 700 }}>
          <GitCompare size={20} />
          <span>Compare ({colleges.length}/3)</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flex: 1, flexWrap: 'wrap' }}>
          {colleges.map((c) => (
            <div key={c._id} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              background: '#2e2e50', borderRadius: '8px', padding: '0.35rem 0.75rem',
              fontSize: '0.85rem', fontWeight: 500
            }}>
              <span style={{ color: '#f1f5f9' }}>{c.name}</span>
              <button onClick={() => removeCollege(c._id)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', padding: 0 }}>
                <X size={14} />
              </button>
            </div>
          ))}
          {colleges.length < 3 && (
            <div style={{
              border: '2px dashed #2e2e50', borderRadius: '8px', padding: '0.35rem 1rem',
              fontSize: '0.8rem', color: '#64748b'
            }}>+ Add college</div>
          )}
        </div>

        <button
          onClick={() => router.push('/compare')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: '#6366f1', color: '#fff', border: 'none',
            padding: '0.6rem 1.25rem', borderRadius: '8px',
            fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem'
          }}
        >
          Compare Now <ArrowRight size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
