'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PlusCircle, Trash2, Printer } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { FppsDocument } from './FppsDocument';

interface RincianUji {
  id: string;
  area: string;
  matriks: string;
  parameter: string;
  regulasi: string;
  metode: string;
}

export default function FormPendaftaranPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomorFpps: '',
    nomorQuotation: '',
    petugas: '',
    namaPelanggan: '',
    alamatPelanggan: '',
    noTelp: '',
    tanggalMasuk: '',
    kegiatan: '',
  });
  const [rincianPengujian, setRincianPengujian] = useState<RincianUji[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'nomorFpps') {
      const numericValue = value.startsWith('DIL-') ? value.substring(4) : value;
      if (/^\d*$/.test(numericValue)) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const goToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nomorFpps.trim() === '') {
      alert('Nomor FPPS wajib diisi untuk membuat ID otomatis.');
      return;
    }
    setStep(2);
  };
  
  const generateId = (nomorUrut: number) => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const fppsSuffix = formData.nomorFpps.slice(-3).padStart(3, '0');
    const sequence = (nomorUrut).toString().padStart(2, '0');
    return `${year}${month}${day}-${fppsSuffix}.${sequence}`;
  };

  const handleTambahArea = () => {
    const nextIdNumber = rincianPengujian.length + 1;
    const newId = generateId(nextIdNumber);
    setRincianPengujian([
      ...rincianPengujian,
      { id: newId, area: '', matriks: '', parameter: '', regulasi: '', metode: '' },
    ]);
  };

  const handleRincianChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedRincian = [...rincianPengujian];
    updatedRincian[index] = { ...updatedRincian[index], [name]: value };
    setRincianPengujian(updatedRincian);
  };

  const handleHapusArea = (index: number) => {
    const updatedRincian = rincianPengujian.filter((_, i) => i !== index);
    setRincianPengujian(updatedRincian);
  };

  const handleSimpanDanPreview = async () => {
    const uniqueKey = `DIL-${formData.nomorFpps}`;
    const dataToSave = {
      formData: { ...formData, nomorFpps: uniqueKey },
      rincian: rincianPengujian,
    };

    try {
      const response = await fetch('/api/fpps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan data ke database');
      }

      alert(`Data untuk FPPS No: ${uniqueKey} telah disimpan ke database!`);
      setIsPreviewOpen(true);

    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Form Pendaftaran Pengujian</h1>
        <p className="text-slate-400 mt-1">Isi data pelanggan dan rincian pengujian di bawah ini.</p>
      </div>

      <Card className="w-full bg-slate-900 border-slate-800">
        {step === 1 ? (
          <form onSubmit={goToStep2}>
            <CardHeader>
              <CardTitle className="text-2xl text-white">Langkah 1: Informasi Dasar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <div>
                      <Label htmlFor="nomorFpps" className="text-slate-300">Nomor FPPS</Label>
                      <Input
                        id="nomorFpps"
                        name="nomorFpps"
                        value={`DIL-${formData.nomorFpps}`}
                        onChange={handleFormChange}
                        required
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div><Label htmlFor="nomorQuotation" className="text-slate-300">Nomor Quotation</Label><Input id="nomorQuotation" name="nomorQuotation" value={formData.nomorQuotation} onChange={handleFormChange} className="mt-1 bg-slate-800 border-slate-700 text-white" /></div>
                    <div><Label htmlFor="petugas" className="text-slate-300">Petugas</Label><Input id="petugas" name="petugas" value={formData.petugas} onChange={handleFormChange} className="mt-1 bg-slate-800 border-slate-700 text-white" /></div>
                    <div><Label htmlFor="tanggalMasuk" className="text-slate-300">Tanggal Masuk Contoh Uji</Label><Input id="tanggalMasuk" name="tanggalMasuk" type="date" value={formData.tanggalMasuk} onChange={handleFormChange} className="mt-1 bg-slate-800 border-slate-700 text-white" /></div>
                  </div>
                  <div className="space-y-4">
                    <div><Label htmlFor="namaPelanggan" className="text-slate-300">Nama Pelanggan</Label><Input id="namaPelanggan" name="namaPelanggan" value={formData.namaPelanggan} onChange={handleFormChange} className="mt-1 bg-slate-800 border-slate-700 text-white" /></div>
                    <div><Label htmlFor="noTelp" className="text-slate-300">No. Telp/HP</Label><Input id="noTelp" name="noTelp" value={formData.noTelp} onChange={handleFormChange} className="mt-1 bg-slate-800 border-slate-700 text-white" /></div>
                    <div><Label htmlFor="alamatPelanggan" className="text-slate-300">Alamat Pelanggan</Label><Textarea id="alamatPelanggan" name="alamatPelanggan" value={formData.alamatPelanggan} onChange={handleFormChange} className="mt-1 bg-slate-800 border-slate-700 text-white" /></div>
                    <div><Label htmlFor="kegiatan" className="text-slate-300">Kegiatan / Paket Pekerjaan</Label><Input id="kegiatan" name="kegiatan" value={formData.kegiatan} onChange={handleFormChange} className="mt-1 bg-slate-800 border-slate-700 text-white" /></div>
                  </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Selanjutnya</Button>
            </CardFooter>
          </form>
        ) : (
          <div>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-white">Langkah 2: Rincian Pengujian</CardTitle>
                <Button variant="outline" onClick={() => setStep(1)}>Kembali</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm p-4 rounded-lg bg-slate-800">
                <p className="text-slate-400">No. FPPS: <span className="font-semibold text-slate-200">{`DIL-${formData.nomorFpps}`}</span></p>
                <p className="text-slate-400">Pelanggan: <span className="font-semibold text-slate-200">{formData.namaPelanggan}</span></p>
                <p className="text-slate-400">No. Quotation: <span className="font-semibold text-slate-200">{formData.nomorQuotation}</span></p>
                <p className="text-slate-400">Kegiatan: <span className="font-semibold text-slate-200">{formData.kegiatan}</span></p>
              </div>
              <div className="space-y-4">{rincianPengujian.map((item, index) => (
                <div key={item.id} className="p-4 rounded-lg border border-slate-700 bg-slate-900/50 space-y-4 relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><Label className="text-slate-300">ID / Area</Label><div className="flex gap-2"><Input value={item.id} readOnly className="mt-1 bg-slate-800 border-slate-700 text-gray-400 w-1/2" /><Input name="area" placeholder="e.g., Upwind" value={item.area} onChange={(e) => handleRincianChange(index, e)} className="mt-1 bg-slate-800 border-slate-700 text-white w-1/2" /></div></div>
                    <div><Label htmlFor={`matriks-${index}`} className="text-slate-300">Matriks</Label><Input id={`matriks-${index}`} name="matriks" placeholder="e.g., UA" value={item.matriks} onChange={(e) => handleRincianChange(index, e)} className="mt-1 bg-slate-800 border-slate-700 text-white" /></div>
                    <div><Label htmlFor={`metode-${index}`} className="text-slate-300">Metode</Label><Input id={`metode-${index}`} name="metode" placeholder="e.g., SNI, IK" value={item.metode} onChange={(e) => handleRincianChange(index, e)} className="mt-1 bg-slate-800 border-slate-700 text-white" /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label htmlFor={`parameter-${index}`} className="text-slate-300">Parameter</Label><Textarea id={`parameter-${index}`} name="parameter" placeholder="e.g., Debu (TSP), Timbal (PB), PM2.5..." value={item.parameter} onChange={(e) => handleRincianChange(index, e)} className="mt-1 bg-slate-800 border-slate-700 text-white" /></div>
                    <div><Label htmlFor={`regulasi-${index}`} className="text-slate-300">Regulasi</Label><Textarea id={`regulasi-${index}`} name="regulasi" placeholder="e.g., PPRI No. 22 Tahun 2021..." value={item.regulasi} onChange={(e) => handleRincianChange(index, e)} className="mt-1 bg-slate-800 border-slate-700 text-white" /></div>
                  </div>
                  <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => handleHapusArea(index)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              </div>
              <Button onClick={handleTambahArea} variant="outline" className="flex items-center gap-2"><PlusCircle className="h-5 w-5" /> Tambah Area Pengujian</Button>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSimpanDanPreview}>
                Simpan & Buat FPPS
              </Button>
            </CardFooter>
          </div>
        )}
      </Card>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Pratinjau Dokumen</DialogTitle>
            <DialogDescription>
              Dokumen siap untuk dicetak. Klik tombol 'Print' untuk melanjutkan. Pastikan pengaturan kertas adalah A4.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
             <Button type="button" variant="secondary" onClick={() => setIsPreviewOpen(false)}>
              Batal
            </Button>
            <Button type="button" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="print-only">
        <FppsDocument
          data={{
            ...formData,
            nomorFpps: `DIL-${formData.nomorFpps}`,
            rincian: rincianPengujian
          }}
        />
      </div>
    </div>
  );
}