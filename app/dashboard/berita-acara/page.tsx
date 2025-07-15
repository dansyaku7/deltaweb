'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Search, Printer } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { BapsDocument } from './BapsDocument';

// Interface diperbarui dengan noTelp dan hariTanggal
interface BapsData {
  nomorFpps: string;
  perusahaan: string;
  alamat: string;
  noTelp: string; 
  hariTanggal: string;
  titikPengujian: {
    udaraAmbien: string; emisiCerobong: string; pencahayaan: string; heatStress: string;
    udaraRuangKerja: string; kebauan: string; kebisingan: string; airLimbah: string;
  };
  rincianUji: Array<{
    id: string; lokasi: string; parameter: string; regulasi: string;
    jenisSampel: string; waktuPengambilan: string;
  }>;
}

export default function BeritaAcaraPage() {
  const [fppsInput, setFppsInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bapsData, setBapsData] = useState<BapsData | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleCariFpps = async () => {
    if (!fppsInput) {
      alert('Silakan masukkan Nomor FPPS (contoh: 001).');
      return;
    }
    setIsLoading(true);
    setBapsData(null);

    const searchKey = `DIL-${fppsInput}`;

    try {
      const response = await fetch(`/api/fpps/${searchKey}`);

      if (response.status === 404) {
        alert(`Data untuk FPPS No: ${searchKey} tidak ditemukan di database.`);
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Gagal mengambil data dari server');
      }

      const fppsData = await response.json();

      // Mengisi state BAPS dengan data yang diambil, termasuk noTelp
      setBapsData({
        nomorFpps: fppsData.formData.nomorFpps,
        perusahaan: fppsData.formData.namaPelanggan,
        alamat: fppsData.formData.alamatPelanggan,
        noTelp: fppsData.formData.noTelp,
        hariTanggal: '',
        titikPengujian: {
          udaraAmbien: '', emisiCerobong: '', pencahayaan: '', heatStress: '',
          udaraRuangKerja: '', kebauan: '', kebisingan: '', airLimbah: '',
        },
        rincianUji: fppsData.rincian.map((item: any) => ({
          id: item.id,
          lokasi: item.area,
          parameter: item.parameter,
          regulasi: item.regulasi,
          jenisSampel: '',
          waktuPengambilan: '',
        })),
      });

    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mencari data.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBapsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (bapsData) {
      if (name in bapsData.titikPengujian) {
        setBapsData({
          ...bapsData,
          titikPengujian: { ...bapsData.titikPengujian, [name]: value },
        });
      } else {
        setBapsData({ ...bapsData, [name]: value });
      }
    }
  };

  const handleRincianChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (bapsData) {
      const updatedRincian = [...bapsData.rincianUji];
      updatedRincian[index] = { ...updatedRincian[index], [name]: value };
      setBapsData({ ...bapsData, rincianUji: updatedRincian });
    }
  };

  const handleSimpanDanCetak = () => {
    console.log("Data BAPS siap disimpan dan dicetak:", bapsData);
    setIsPreviewOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Berita Acara Pengambilan Sampel (BAPS)</h1>
          <p className="text-slate-400 mt-1">Cari data berdasarkan Nomor FPPS untuk mengisi Berita Acara.</p>
        </div>

        <Card className="w-full max-w-4xl bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle>Cari Data FPPS</CardTitle>
            <CardDescription>Masukkan Nomor FPPS (contoh: 001) untuk mengambil data secara otomatis.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Ketik nomornya saja, cth: 001"
                value={fppsInput}
                onChange={(e) => setFppsInput(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
              />
              <Button onClick={handleCariFpps} disabled={isLoading}>
                <Search className="mr-2 h-4 w-4" />
                {isLoading ? 'Mencari...' : 'Cari'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {bapsData && (
          <Card className="w-full bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle>Formulir Berita Acara untuk FPPS No: {bapsData.nomorFpps}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="p-4 rounded-lg bg-slate-800 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Perusahaan</p>
                    <p className="font-semibold">{bapsData.perusahaan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">No. Telp/HP</p>
                    <p className="font-semibold">{bapsData.noTelp}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-slate-400">Alamat</p>
                    <p className="font-semibold">{bapsData.alamat}</p>
                  </div>
                </div>
                 <div>
                  <Label htmlFor="hariTanggal" className="text-slate-300">Pada Hari, Tanggal Pengambilan Sampel</Label>
                  <Input
                    id="hariTanggal"
                    name="hariTanggal"
                    type="text"
                    placeholder="Contoh: Senin, 14 Juli 2025"
                    value={bapsData.hariTanggal}
                    onChange={handleBapsChange}
                    className="mt-1 bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-slate-200">Dengan lokasi masing-masing:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.keys(bapsData.titikPengujian).map((key) => (
                    <div key={key}>
                      <Label className="capitalize text-slate-300">{key.replace(/([A-Z])/g, ' $1')}</Label>
                      <Input
                        name={key}
                        value={(bapsData.titikPengujian as any)[key]}
                        onChange={handleBapsChange}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                        placeholder="... titik"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-slate-200">Rincian Pengujian:</h3>
                <div className="space-y-4">
                  {bapsData.rincianUji.map((item, index) => (
                    <div key={item.id} className="p-4 rounded-lg border border-slate-700">
                      <p className="font-semibold text-white">{index + 1}. Lokasi: {item.lokasi}</p>
                      <p className="text-sm text-slate-400">Parameter: {item.parameter}</p>
                      <p className="text-sm text-slate-400">Regulasi: {item.regulasi}</p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div><Label className="text-slate-300">Jenis Sampel</Label><Input name="jenisSampel" value={item.jenisSampel} onChange={(e) => handleRincianChange(index, e)} className="mt-1 bg-slate-800 border-slate-700 text-white"/></div>
                        <div><Label className="text-slate-300">Waktu Pengambilan (Jam)</Label><Input name="waktuPengambilan" value={item.waktuPengambilan} onChange={(e) => handleRincianChange(index, e)} className="mt-1 bg-slate-800 border-slate-700 text-white"/></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button onClick={handleSimpanDanCetak}>
                Simpan & Cetak Berita Acara
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Siap Mencetak Berita Acara?</DialogTitle>
            <DialogDescription>Pastikan semua data sudah benar. Klik 'Print' untuk melanjutkan.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Batal</Button>
            <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" />Print</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {bapsData && (
        <div className="print-only">
          <BapsDocument data={bapsData} />
        </div>
      )}
    </>
  );
}