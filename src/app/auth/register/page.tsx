'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  return (
    <div className="container py-10 max-w-md">
      <h1 className="text-2xl font-semibold mb-6">Đăng ký</h1>
      <form className="space-y-3" onSubmit={async (e)=>{e.preventDefault(); setMsg('');
        const res = await fetch('/api/auth/register', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, password, name})});
        const data = await res.json(); setMsg(res.ok? 'Đăng ký thành công' : (data.error||'Lỗi'));
      }}>
        <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Họ tên" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Mật khẩu" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full rounded bg-gray-900 text-white py-2 hover:bg-black" type="submit">Đăng ký</button>
      </form>
      {msg && <div className="mt-4 text-sm">{msg}</div>}
    </div>
  );
}
