export default function CollegeCardSkeleton() {
  return (
    <div style={{ background: '#1a1a2e', border: '1px solid #2e2e50', borderRadius: '16px', overflow: 'hidden' }}>
      <div className="skeleton" style={{ height: '160px' }} />
      <div style={{ padding: '1rem' }}>
        <div className="skeleton" style={{ height: '18px', width: '80%', marginBottom: '8px' }} />
        <div className="skeleton" style={{ height: '13px', width: '50%', marginBottom: '16px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
          <div className="skeleton" style={{ height: '48px', borderRadius: '8px' }} />
          <div className="skeleton" style={{ height: '48px', borderRadius: '8px' }} />
        </div>
        <div className="skeleton" style={{ height: '5px', marginBottom: '12px' }} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="skeleton" style={{ flex: 1, height: '36px', borderRadius: '8px' }} />
          <div className="skeleton" style={{ flex: 1, height: '36px', borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
}
