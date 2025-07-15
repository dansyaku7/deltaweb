// app/dashboard/page.tsx

// Komponen ini bisa menjadi Server Component karena tidak menggunakan hooks
export default function DashboardPage() {
  return (
    <div>
      <h1 className='text-3xl font-bold text-white'>Dashboard Overview</h1>
      <p className='mt-2 text-slate-400'>
        Selamat datang! Ini adalah ringkasan dari aktivitas Anda.
      </p>

      {/* Contoh Stat Cards untuk mengisi halaman */}
      <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <div className='rounded-lg bg-slate-900 p-6'>
          <h3 className='text-sm font-medium text-slate-400'>Total Sample Masuk</h3>
          <p className='mt-2 text-3xl font-bold text-white'>1,250</p>
          <p className='mt-1 text-sm text-green-400'>+12% dari minggu lalu</p>
        </div>
        <div className='rounded-lg bg-slate-900 p-6'>
          <h3 className='text-sm font-medium text-slate-400'>Analisis Selesai</h3>
          <p className='mt-2 text-3xl font-bold text-white'>86</p>
          <p className='mt-1 text-sm text-slate-400'>+2 bulan ini</p>
        </div>
        <div className='rounded-lg bg-slate-900 p-6'>
          <h3 className='text-sm font-medium text-slate-400'>Sertifikat Terbit</h3>
          <p className='mt-2 text-3xl font-bold text-white'>74</p>
          <p className='mt-1 text-sm text-green-400'>98.8% Tepat Waktu</p>
        </div>
      </div>
    </div>
  );
}