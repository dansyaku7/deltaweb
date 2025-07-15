'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Search, Printer, CalendarIcon, Upload } from 'lucide-react';
import { CoaDocument } from './CoaDocument';

const allSubjects = [
  "Ambient Outdoor Air Quality", "Workplace Air Quality", "Noise", "Odor", 
  "Illumination", "Heat Stress", "Wastewater"
];
const sampleTakenByOptions = ["PT. Delta Indonesia Laboratory", "Customer", "Third Party"];

interface CoaData {
  nomorFpps: string;
  customer: string; address: string; phone: string; contactName: string;
  subjects: string[]; sampleTakenBy: string[];
  receiveDate: Date | undefined; analysisDateStart: Date | undefined;
  analysisDateEnd: string; reportDate: string;
  signatureUrl: string | null; directorName: string; showKanLogo: boolean;
  certificateNo?: string;
}

export default function CoaPage() {
  const [fppsInput, setFppsInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [coaData, setCoaData] = useState<CoaData | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (coaData && coaData.analysisDateStart && coaData.analysisDateStart instanceof Date) {
      const startDate = coaData.analysisDateStart;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 14);

      setCoaData(prev => prev ? {
        ...prev,
        analysisDateEnd: format(endDate, 'MMMM dd, yyyy', { locale: id }),
      } : null);
    }
  }, [coaData?.analysisDateStart]);

  const handleCariFpps = async () => {
    if (!fppsInput) { alert('Masukkan Nomor FPPS (contoh: 001).'); return; }
    setIsLoading(true);
    setCoaData(null); 
    const searchKey = `DIL-${fppsInput}`;
    try {
      const response = await fetch(`/api/fpps/${searchKey}`);
      if (!response.ok) throw new Error('Data tidak ditemukan');
      const fppsData = await response.json();
      setCoaData({
        nomorFpps: fppsData.formData.nomorFpps,
        customer: fppsData.formData.namaPelanggan,
        address: fppsData.formData.alamatPelanggan,
        phone: fppsData.formData.noTelp,
        contactName: fppsData.formData.contactPerson || 'Bapak/Ibu...',
        subjects: [],
        sampleTakenBy: ["PT. Delta Indonesia Laboratory"],
        receiveDate: undefined,
        analysisDateStart: undefined,
        analysisDateEnd: '',
        reportDate: format(new Date(), 'MMMM dd, yyyy', { locale: id }),
        signatureUrl: null,
        directorName: 'Drs. H. Soekardin Rachman, M.Si',
        showKanLogo: true,
      });
    } catch (error) {
      console.error(error);
      alert('Data tidak ditemukan atau terjadi kesalahan.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCoaChange = (field: keyof CoaData, value: any) => {
    setCoaData(prev => prev ? { ...prev, [field]: value } : null);
  };
  
  const handleCheckboxChange = (field: 'subjects' | 'sampleTakenBy', value: string) => {
    if (!coaData) return;
    const currentValues = coaData[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    handleCoaChange(field, newValues);
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleCoaChange('signatureUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => { window.print(); };

  return (
    <>
      {coaData && <div className="print-only"><CoaDocument data={coaData} /></div>}
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Certificate of Analysis (COA)</h1>
          <p className="text-slate-400 mt-1">Cari data FPPS untuk memulai, lalu lengkapi form COA.</p>
        </div>

        <Card className="w-full max-w-lg bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle>Cari Data FPPS</CardTitle>
            <CardDescription>Masukkan nomor FPPS untuk mengambil data customer.</CardDescription>
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

        {coaData && (
          <Card className="w-full max-w-4xl bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle>Lengkapi Data COA untuk FPPS No: {coaData.nomorFpps}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="p-4 rounded-lg bg-slate-800">
                <p>Customer: <span className="font-semibold">{coaData.customer}</span></p>
                <p>Address: <span className="font-semibold">{coaData.address}</span></p>
                <p>Phone: <span className="font-semibold">{coaData.phone}</span></p>
              </div>
              
              <div>
                <Label className="text-lg font-semibold text-slate-200">Subject</Label>
                <div className="p-4 mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 rounded-md border border-slate-700">
                  {allSubjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox id={subject} checked={coaData.subjects.includes(subject)} onCheckedChange={() => handleCheckboxChange('subjects', subject)} />
                      <label htmlFor={subject} className="text-sm font-medium leading-none text-slate-300">{subject}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold text-slate-200">Sample taken by</Label>
                <div className="mt-2 p-4 flex flex-col md:flex-row gap-4 rounded-md border border-slate-700">
                  {sampleTakenByOptions.map(option => (
                      <div key={option} className="flex items-center space-x-2">
                          <Checkbox id={option} checked={coaData.sampleTakenBy.includes(option)} onCheckedChange={() => handleCheckboxChange('sampleTakenBy', option)} />
                          <label htmlFor={option} className="text-sm font-medium text-slate-300">{option}</label>
                      </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold text-slate-200">Tanggal</Label>
                <div className="p-4 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-md border border-slate-700">
                  <div>
                    <Label className="font-medium text-slate-300">Receive Date</Label>
                    <Popover>
                      <PopoverTrigger asChild><Button variant={"outline"} className="w-full justify-start text-left font-normal mt-2 bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white"><CalendarIcon className="mr-2 h-4 w-4" />{coaData.receiveDate ? format(coaData.receiveDate, "PPP", { locale: id }) : <span className="text-slate-400">Pilih tanggal</span>}</Button></PopoverTrigger>
                      <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={coaData.receiveDate} onSelect={(date) => handleCoaChange('receiveDate', date)} initialFocus /></PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label className="font-medium text-slate-300">Analysis Start</Label>
                    <Popover>
                      <PopoverTrigger asChild><Button variant={"outline"} className="w-full justify-start text-left font-normal mt-2 bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white"><CalendarIcon className="mr-2 h-4 w-4" />{coaData.analysisDateStart ? format(coaData.analysisDateStart, "PPP", { locale: id }) : <span className="text-slate-400">Pilih tanggal</span>}</Button></PopoverTrigger>
                      <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={coaData.analysisDateStart} onSelect={(date) => handleCoaChange('analysisDateStart', date)} initialFocus /></PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label className="font-medium text-slate-300">Analysis End</Label>
                    <Input readOnly value={coaData.analysisDateEnd} className="mt-2 bg-slate-950 border-slate-800 text-slate-400"/>
                  </div>
                  <div>
                    <Label className="font-medium text-slate-300">Report Date</Label>
                    <Input readOnly value={coaData.reportDate} className="mt-2 bg-slate-950 border-slate-800 text-slate-400"/>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold text-slate-200">Pengesahan</Label>
                <div className="p-4 mt-2 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-md border border-slate-700">
                  <div>
                    <Label htmlFor='directorName' className="text-slate-300">Nama Direktur Utama</Label>
                    <Input id='directorName' value={coaData.directorName} onChange={(e) => handleCoaChange('directorName', e.target.value)} className="mt-2 bg-slate-800 border-slate-700"/>
                  </div>
                  <div>
                    <Label className="text-slate-300">Tanda Tangan Digital (PNG)</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <Input type="file" accept="image/png" onChange={handleSignatureUpload} className="flex-1"/>
                      {coaData.signatureUrl && (<img src={coaData.signatureUrl} alt="Preview" className="h-10 w-20 rounded border border-slate-600 bg-slate-700 object-contain p-1" />)}
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center space-x-2 pt-2">
                    <Switch id="kan-logo" checked={coaData.showKanLogo} onCheckedChange={(checked) => handleCoaChange('showKanLogo', checked)} />
                    <Label htmlFor="kan-logo" className="text-slate-300">Tampilkan Logo KAN di Dokumen</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => setIsPreviewOpen(true)}>Generate & Preview COA</Button>
            </CardFooter>
          </Card>
        )}
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="bg-white">
          <DialogHeader><DialogTitle>Siap Mencetak Sertifikat?</DialogTitle><DialogDescription>Pastikan semua data sudah benar sebelum mencetak.</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Batal</Button>
            <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" />Print</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}