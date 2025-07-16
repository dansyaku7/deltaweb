'use client';

import React from 'react';

interface TemplateProps {
  data: any; 
}

export const TemplateOdorDocument = React.forwardRef<HTMLDivElement, TemplateProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} className="p-10 font-serif text-black bg-white" style={{ width: '210mm', minHeight: '297mm' }}>
        <header className="text-center mb-6">
          <h1 className="text-lg font-bold">HASIL ANALISIS KEBISINGAN (ODOR)</h1>
          <p className="text-sm">Nomor Sertifikat: {data.certificateNo || 'DIL-AABBCCDDCOA'}</p>
        </header>
        <main>
          <p>Data Customer: {data.customer}</p>
          <div className="mt-8">
            <p>Ini adalah konten spesifik untuk template ODOR.</p>
            <p>Anda bisa membuat tabel hasil analisis di sini.</p>
          </div>
        </main>
      </div>
    );
  }
);

TemplateOdorDocument.displayName = 'TemplateOdorDocument';