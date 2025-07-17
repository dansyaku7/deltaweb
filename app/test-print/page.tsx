// app/test-print/page.tsx

'use client';

import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function TestPrintPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Halaman Tes Cetak QR Code</h1>
      <p className="mb-4">
        Jika QR code di bawah ini muncul saat Anda menekan tombol "Cetak Halaman Ini", 
        maka masalahnya ada pada CSS atau struktur komponen COA Anda. Jika tidak muncul, 
        masalahnya ada pada library atau browser.
      </p>

      {/* Tombol untuk memicu print */}
      <button 
        onClick={() => window.print()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Cetak Halaman Ini
      </button>

      <hr className="my-8" />

      {/* Ini adalah QR Code yang akan kita tes */}
      <div className="mt-4 p-4 border-2 border-dashed border-red-500 inline-block">
        <h2 className="text-center font-bold mb-2">QR Code Seharusnya di Sini</h2>
        <QRCodeCanvas 
          value="https://www.google.com" 
          size={150} 
        />
      </div>
    </div>
  );
}