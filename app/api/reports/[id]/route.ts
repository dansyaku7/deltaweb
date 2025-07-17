import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb'; // Penting untuk query berdasarkan ID

const DB_NAME = process.env.DB_NAME || 'your_database_name';
const COLLECTION_NAME = 'reports';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!ObjectId.isValid(params.id)) {
        return NextResponse.json({ success: false, error: 'Invalid Report ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const report = await collection.findOne({ _id: new ObjectId(params.id) });

    if (!report) {
      return NextResponse.json({ success: false, error: 'Report not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: report }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        if (!ObjectId.isValid(params.id)) {
            return NextResponse.json({ success: false, error: 'Invalid Report ID' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const reportData = await request.json();
        
        // Memperbarui timestamp
        const updateData = {
            ...reportData,
            updatedAt: new Date(),
        };

        const result = await collection.updateOne(
            { _id: new ObjectId(params.id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, error: 'Report not found' }, { status: 404 });
        }

        const updatedReport = await collection.findOne({ _id: new ObjectId(params.id) });

        return NextResponse.json({ success: true, data: updatedReport }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
