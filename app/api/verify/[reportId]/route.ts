// app/api/verify/[reportId]/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Report from '@/models/Report'; // Menggunakan model Report.ts yang Anda berikan

export async function GET(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  const { reportId } = params;

  // Validasi sederhana untuk format ObjectId MongoDB
  if (!reportId.match(/^[0-9a-fA-F]{24}$/)) {
    return NextResponse.json({ success: false, error: 'Format ID Laporan tidak valid' }, { status: 400 });
  }

  try {
    await dbConnect();

    const report = await Report.findById(reportId).select(
      'coverData.certificateNo coverData.customer coverData.reportDate coverData.nomorFpps'
    );

    if (!report) {
      return NextResponse.json({ success: false, error: 'Laporan tidak ditemukan' }, { status: 404 });
    }
    
    // Mengambil data dari dalam properti coverData
    const verificationData = {
      certificateNo: report.coverData.certificateNo,
      customer: report.coverData.customer,
      reportDate: report.coverData.reportDate,
      nomorFpps: report.coverData.nomorFpps,
    };
    
    return NextResponse.json({ success: true, data: verificationData });

  } catch (error) {
    console.error('API Verify Error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}