import React from 'react';

export default function App() {
  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#38bdf8' }}>Hendy Studio - Test Architecture</h1>
        <p style={{ color: '#94a3b8' }}>Ứng dụng React TypeScript được sinh tự động từ Cloudflare Edge Cloud.</p>
      </header>
      <main style={{ maxWidth: '600px', margin: '0 auto', background: '#1e293b', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
        <h3 style={{ borderBottom: '2px solid #334155', paddingBottom: '8px' }}>Trạng thái hệ thống:</h3>
        <ul style={{ lineHeight: '1.8', listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>🚀 Đóng gói ZIP thời gian thực hoàn tất.</li>
          <li>⚡ Triển khai thành công trên Cloudflare Pages.</li>
          <li>🛡️ Bảo mật và tối ưu hóa hiệu năng tuyệt đối.</li>
        </ul>
      </main>
    </div>
  );
}
