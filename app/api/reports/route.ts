import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DB_NAME = process.env.DB_NAME || 'your_database_name'; // Ganti dengan nama database Anda jika tidak ada di URI
const COLLECTION_NAME = 'reports';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const reportData = await request.json();
    
    // Menambahkan timestamp saat data dibuat
    const newReportData = {
        ...reportData,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const result = await collection.insertOne(newReportData);

    // Mengambil kembali dokumen yang baru saja dimasukkan untuk dikirim sebagai respons
    const newReport = await collection.findOne({ _id: result.insertedId });

    return NextResponse.json({ success: true, data: newReport }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
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
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
