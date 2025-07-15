'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, XCircle, Upload, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { StpsDocument } from './StpsDocument'; 

export default function StpsPage() {
  const [customerData, setCustomerData] = useState({
    hariTanggal: '',
    namaPelanggan: '',
    alamat: '',
    contactPerson: '',
  });
  const [petugas, setPetugas] = useState(['']);
  const [signatureData, setSignatureData] = useState({
    pjTeknis: '',
    signatureUrl: null as string | null,
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);
  
  const [nomorSurat, setNomorSurat] = useState({
    nomorFpps: '',
    nomorStpsLengkap: '',
  });

  useEffect(() => {
    if (nomorSurat.nomorFpps) {
      const bulanRomawi = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
      const bulanSekarang = new Date().getMonth();
      const tahunSekarang = new Date().getFullYear();
      
      const nomorLengkap = `${nomorSurat.nomorFpps}/STPS/DIL/${bulanRomawi[bulanSekarang]}/${tahunSekarang}`;
      setNomorSurat(prev => ({ ...prev, nomorStpsLengkap: nomorLengkap }));
    } else {
      setNomorSurat(prev => ({ ...prev, nomorStpsLengkap: '' }));
    }
  }, [nomorSurat.nomorFpps]);

  const handleCustomerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePetugasChange = (index: number, value: string) => {
    const newPetugas = [...petugas];
    newPetugas[index] = value;
    setPetugas(newPetugas);
  };

  const handlePjTeknisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignatureData(prev => ({ ...prev, pjTeknis: e.target.value }));
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureData(prev => ({ ...prev, signatureUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addPetugas = () => setPetugas([...petugas, '']);
  const removePetugas = (index: number) => {
    if (petugas.length > 1) {
      setPetugas(petugas.filter((_, i) => i !== index));
    }
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreviewOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Buat Surat Tugas Pengambilan Sampel (STPS)</h1>
        <p className="text-slate-400 mt-1">Lengkapi data di bawah ini untuk menerbitkan surat tugas.</p>
      </div>

      <Card className="w-full max-w-4xl bg-slate-900 border-slate-800">
        <form onSubmit={handlePreview}>
          <CardHeader>
            <CardTitle className="text-2xl text-white">Formulir Surat Tugas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">

            <div>
              <h2 className='mb-4 text-xl font-semibold text-gray-200'>Informasi Surat</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nomorFpps" className="text-gray-300">Nomor FPPS Acuan</Label>
                  <Input
                    id="nomorFpps"
                    placeholder="Contoh: 001"
                    value={nomorSurat.nomorFpps}
                    onChange={(e) => setNomorSurat(prev => ({...prev, nomorFpps: e.target.value}))}
                    required
                    className="mt-1 bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="nomorStpsLengkap" className="text-gray-300">Nomor Surat Tugas (Otomatis)</Label>
                  <Input
                    id="nomorStpsLengkap"
                    value={nomorSurat.nomorStpsLengkap}
                    readOnly
                    className="mt-1 bg-slate-950 border-slate-800 text-gray-400"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className='mb-4 text-xl font-semibold text-gray-200'>Memerintahkan kepada:</h2>
              <div className='space-y-4'>
                {petugas.map((nama, index) => (
                  <div key={index} className='flex items-center gap-4'>
                    <label className='w-10 text-sm font-medium text-gray-300'>{index + 1}.</label>
                    <Input
                      type='text'
                      placeholder={`Nama Petugas ${index + 1}`}
                      value={nama}
                      onChange={(e) => handlePetugasChange(index, e.target.value)}
                      required
                      className='flex-1 bg-slate-800 border-slate-700 text-white'
                    />
                    {petugas.length > 1 && (
                      <Button type='button' variant="ghost" size="icon" onClick={() => removePetugas(index)} className='text-red-500 hover:text-red-400 hover:bg-red-900/20'>
                        <XCircle size={22} />
                      </Button>
                    )}
                  </div>
                ))}
                <div className='pl-14'>
                   <Button type='button' onClick={addPetugas} variant="outline" className='mt-2 flex items-center gap-2'>
                    <PlusCircle size={18} />
                    Tambah Petugas
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className='mb-4 text-xl font-semibold text-gray-200'>Untuk melakukan pengambilan sampel, pada:</h2>
              <div className='space-y-6'>
                <div><Label htmlFor='hariTanggal' className='text-gray-300'>Hari/Tanggal</Label><Input type='text' id='hariTanggal' name='hariTanggal' value={customerData.hariTanggal} onChange={handleCustomerChange} required className='mt-1 bg-slate-800 border-slate-700 text-white' /></div>
                <div><Label htmlFor='namaPelanggan' className='text-gray-300'>Nama Pelanggan</Label><Input type='text' id='namaPelanggan' name='namaPelanggan' value={customerData.namaPelanggan} onChange={handleCustomerChange} required className='mt-1 bg-slate-800 border-slate-700 text-white' /></div>
                <div><Label htmlFor='alamat' className='text-gray-300'>Alamat</Label><Textarea id='alamat' name='alamat' rows={3} value={customerData.alamat} onChange={handleCustomerChange} required className='mt-1 bg-slate-800 border-slate-700 text-white'></Textarea></div>
                <div><Label htmlFor='contactPerson' className='text-gray-300'>Contact Person</Label><Input type='text' id='contactPerson' name='contactPerson' value={customerData.contactPerson} onChange={handleCustomerChange} required className='mt-1 bg-slate-800 border-slate-700 text-white' /></div>
              </div>
            </div>

            <div>
              <h2 className='mb-4 text-xl font-semibold text-gray-200'>Penanggung Jawab</h2>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div>
                  <Label htmlFor='pjTeknis' className='text-gray-300'>Nama PJ Teknis</Label>
                  <Input type='text' id='pjTeknis' value={signatureData.pjTeknis} onChange={handlePjTeknisChange} className='mt-1 bg-slate-800 border-slate-700 text-white' />
                </div>
                <div>
                  <Label htmlFor='signature' className='text-gray-300'>Tanda Tangan Digital (PNG)</Label>
                  <div className="mt-1 flex items-center gap-4">
                    <label htmlFor="signature-upload" className="flex-1 cursor-pointer rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-gray-300 shadow-sm hover:bg-slate-700">
                      <div className="flex items-center gap-2"><Upload size={16} /><span>Pilih Gambar...</span></div>
                    </label>
                    <input id="signature-upload" type="file" className="sr-only" accept="image/png" onChange={handleSignatureUpload} />
                    {signatureData.signatureUrl && (
                      <img src={signatureData.signatureUrl} alt="Pratinjau TTD" className="h-12 w-24 rounded border border-slate-600 bg-slate-700 object-contain p-1" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
          </CardContent>
          <CardFooter className="flex justify-end pt-6">
            <Button type='submit'>Buat & Preview Surat Tugas</Button>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="bg-white">
          <DialogHeader><DialogTitle>Siap untuk Mencetak?</DialogTitle><DialogDescription>Klik tombol "Print Surat Tugas" untuk membuka dialog cetak. Pastikan pengaturan kertas adalah A4.</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsPreviewOpen(false)}>Batal</Button>
            <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4"/>Print Surat Tugas</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="print-only">
        <StpsDocument
          ref={documentRef}
          nomorSurat={nomorSurat.nomorStpsLengkap}
          data={{
            ...customerData,
            petugas: petugas.filter((p) => p.trim() !== ''),
            ...signatureData,
          }}
        />
      </div>
    </div>
  );
}