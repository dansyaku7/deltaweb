// app/api/fpps/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const result = await db.collection('fpps').insertOne(data);

    return NextResponse.json({ message: 'Data berhasil disimpan', id: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error('Error saat menyimpan data:', e);
    return NextResponse.json({ message: 'Gagal menyimpan data' }, { status: 500 });
  }
}