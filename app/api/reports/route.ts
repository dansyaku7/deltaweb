// GANTI ISI FILE: app/api/reports/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DB_NAME = process.env.DB_NAME || 'your_database_name';
const COLLECTION_NAME = 'reports';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const { _id, coverData, activeTemplates } = await request.json();

    if (!_id || !coverData || !activeTemplates) {
      return NextResponse.json({ success: false, error: "Data tidak lengkap" }, { status: 400 });
    }

    // --- PERBAIKAN ---
    // Simpan dokumen dengan _id sebagai string langsung dari nanoid.
    // Jangan gunakan new ObjectId().
    const newReportData = {
      _id: _id, // _id sudah berupa string unik dari nanoid
      coverData,
      activeTemplates,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newReportData);

    return NextResponse.json({ success: true, data: newReportData }, { status: 201 });

  } catch (error) {
    console.error("API POST Error:", error);
    
    // Penanganan untuk error kunci duplikat (jika terjadi)
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'ID Laporan duplikat atau sudah ada.' }, { status: 409 });
    }

    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const reports = await collection.find({}).sort({ updatedAt: -1 }).toArray();
    
    return NextResponse.json({ success: true, data: reports }, { status: 200 });
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
