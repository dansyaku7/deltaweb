import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb'; // 1. Impor ObjectId

const DB_NAME = process.env.DB_NAME || 'your_database_name';
const COLLECTION_NAME = 'reports';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // 2. Ambil _id beserta sisa data dari body
    const { _id, coverData, activeTemplates } = await request.json();

    // Validasi data yang masuk
    if (!_id || !coverData || !activeTemplates) {
        return NextResponse.json({ success: false, error: "Data tidak lengkap" }, { status: 400 });
    }

    // 3. Siapkan dokumen untuk dimasukkan dengan _id dari frontend
    const newReportData = {
        _id: new ObjectId(_id), // Gunakan _id dari frontend, konversi ke tipe ObjectId
        coverData,
        activeTemplates,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await collection.insertOne(newReportData);

    // Kirim kembali dokumen yang baru saja dibuat
    return NextResponse.json({ success: true, data: newReportData }, { status: 201 });

  } catch (error) {
    console.error("API POST Error:", error);

    // 4. Tambahkan penanganan untuk error kunci duplikat
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