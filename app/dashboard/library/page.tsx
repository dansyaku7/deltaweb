'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Pencil, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function DataLibraryPage() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/reports');
        const result = await response.json();
        if (result.success) {
          setReports(result.data);
        } else {
            console.error("API Error:", result.error);
            alert("Gagal memuat data laporan.");
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        alert("Terjadi kesalahan saat menghubungi server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleEdit = (reportId: string) => {
    // Navigasi ke halaman COA Builder dengan menyertakan ID laporan
    router.push(`/dashboard/coa?id=${reportId}`);
  };

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Data Library</h1>
        <p className="text-slate-400 mt-1">Lihat dan kelola semua laporan yang telah disimpan.</p>
      </div>
      <Card className="bg-slate-900 border-slate-800 text-white">
        <CardHeader>
          <CardTitle>Laporan Tersimpan</CardTitle>
          <CardDescription>Total {reports.length} laporan ditemukan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800">
                <TableHead className="text-white">No. FPPS</TableHead>
                <TableHead className="text-white">Nama Customer</TableHead>
                <TableHead className="text-white">Tanggal Laporan</TableHead>
                <TableHead className="text-white">Jumlah Template</TableHead>
                <TableHead className="text-right text-white">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.length > 0 ? reports.map((report: any) => (
                <TableRow key={report._id} className="border-slate-800 hover:bg-slate-850">
                  <TableCell>{report.coverData?.nomorFpps || '-'}</TableCell>
                  <TableCell>{report.coverData?.customer || '-'}</TableCell>
                  <TableCell>{report.coverData?.reportDate ? format(new Date(report.coverData.reportDate), 'dd MMMM yyyy') : '-'}</TableCell>
                  <TableCell className="text-center">{report.activeTemplates?.length || 0}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(report._id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                        Tidak ada data laporan yang tersimpan.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
