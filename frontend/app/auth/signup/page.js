'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Mail, Lock, User, UserPlus, Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', background: 'radial-gradient(ellipse at 40% 0%, #a855f722 0%, transparent 60%)' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <GraduationCap size={40} color="#6366f1" style={{ marginBottom: '0.75rem' }} />
          <h1 style={{ fontFamily: 'Outfit', fontSize: '1.75rem', fontWeight: 800 }}>Create Account</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Start discovering your dream college</p>
        </div>

        <div style={{ background: '#1a1a2e', border: '1px solid #2e2e50', borderRadius: '20px', padding: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
              <div style={{ background: '#ef444422', border: '1px solid #ef444444', borderRadius: '10px', padding: '0.75rem', color: '#ef4444', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            {[
              { key: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Rahul Sharma' },
              { key: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'you@example.com' },
            ].map(({ key, label, icon: Icon, type, placeholder }) => (
              <div key={key}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>{label}</label>
                <div style={{ position: 'relative' }}>
                  <Icon size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    required placeholder={placeholder}
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', background: '#0f0f1a', border: '1px solid #2e2e50', borderRadius: '10px', color: '#f1f5f9', fontSize: '0.9rem', outline: 'none' }} />
                </div>
              </div>
            ))}

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required placeholder="Min. 6 characters"
                  style={{ width: '100%', padding: '0.75rem 2.75rem 0.75rem 2.75rem', background: '#0f0f1a', border: '1px solid #2e2e50', borderRadius: '10px', color: '#f1f5f9', fontSize: '0.9rem', outline: 'none' }} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '0.85rem', borderRadius: '10px', border: 'none',
              background: loading ? '#4f46e5' : '#6366f1', color: '#fff',
              fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem'
            }}>
              <UserPlus size={18} />{loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
