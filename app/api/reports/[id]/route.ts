// GANTI ISI FILE: app/api/reports/[id]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DB_NAME = process.env.DB_NAME || 'your_database_name';
const COLLECTION_NAME = 'reports';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const report = await collection.findOne({ _id: params.id });

    if (!report) {
      return NextResponse.json({ success: false, error: 'Report not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: report }, { status: 200 });
  } catch (error) {
    console.error(`API GET /api/reports/${params.id} Error:`, error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const reportData = await request.json();
        
        // --- PERBAIKAN BARU: Konversi string tanggal kembali ke objek Date ---
        // Ini memastikan tipe data yang disimpan di database konsisten.
        if (reportData.coverData?.receiveDate) {
            reportData.coverData.receiveDate = new Date(reportData.coverData.receiveDate);
        }
        if (reportData.coverData?.analysisDateStart) {
            reportData.coverData.analysisDateStart = new Date(reportData.coverData.analysisDateStart);
        }
        
        const updateData = {
            ...reportData,
            updatedAt: new Date(),
        };

        const result = await collection.updateOne(
            { _id: params.id },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, error: 'Report not found' }, { status: 404 });
        }

        const updatedReport = await collection.findOne({ _id: params.id });

        return NextResponse.json({ success: true, data: updatedReport }, { status: 200 });
    } catch (error) {
        console.error(`API PUT /api/reports/${params.id} Error:`, error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
