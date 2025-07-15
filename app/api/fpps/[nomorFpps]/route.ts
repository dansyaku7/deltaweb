// app/api/fpps/[nomorFpps]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { nomorFpps: string } }
) {
  // Ambil nilai 'nomorFpps' dari 'params' ke dalam sebuah variabel.
  const { nomorFpps } = params;

  if (!nomorFpps) {
    return NextResponse.json({ message: 'Nomor FPPS tidak diberikan di URL' }, { status: 400 });
  }
  
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    
    // Gunakan variabel 'nomorFpps' di dalam query
    const query = { "formData.nomorFpps": nomorFpps };
    const fpps = await db.collection('fpps').findOne(query);

    if (!fpps) {
      return NextResponse.json({ message: 'Data tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(fpps, { status: 200 });
  } catch (e) {
    console.error('Terjadi error di API Route:', e);
    return NextResponse.json({ message: 'Gagal mengambil data karena error server' }, { status: 500 });
  }
}