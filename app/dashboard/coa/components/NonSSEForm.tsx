// components/NonSSEForm.tsx

'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from 'lucide-react';
import { defaultNonSSERow } from '../data/non-sse-data';

export function NonSSEForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}) {
  
  const handleRowChange = (index: number, field: string, value: any) => {
    const newResults = [...template.results];
    newResults[index] = { ...newResults[index], [field]: value };

    // Otomatisasi standar berdasarkan parameter dan tahun
    if (field === 'parameter' || field === 'year') {
        const year = field === 'year' ? parseInt(value, 10) : parseInt(newResults[index].year, 10);
        const parameter = field === 'parameter' ? value : newResults[index].parameter;
        const fuel = newResults[index].fuel;

        if (parameter === 'Opacity') {
            newResults[index].unit = '%';
            newResults[index].method = 'SNI 09-7118-2005';
            if (year < 2010) {
                newResults[index].standard = '70';
            } else {
                newResults[index].standard = '40';
            }
        } else if (parameter === 'CO') {
            newResults[index].unit = '% Vol';
            newResults[index].method = 'SNI 19-7117.10-2005';
             if (year < 2007) {
                newResults[index].standard = '4.5';
            } else {
                newResults[index].standard = '1.5';
            }
        }
    }


    onTemplateChange({ ...template, results: newResults });
  };

  // Diperbarui untuk bisa menerima event dari Input dan Textarea
  const handleSampleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onTemplateChange({ ...template, sampleInfo: { ...template.sampleInfo, [name]: value } });
  };

  const handleAddRow = () => {
    const newResults = [...template.results, { ...defaultNonSSERow }];
    onTemplateChange({ ...template, results: newResults });
  };

  const handleRemoveRow = (id: string) => {
    const newResults = template.results.filter((row: any) => row.id !== id);
    onTemplateChange({ ...template, results: newResults });
  };

  return (
    <Card className="w-full max-w-6xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Tes Emisi Sumber Bergerak</CardTitle>
          <Button variant="outline" onClick={onBack}>Batal</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Informasi Sampel & Catatan</h3>
          {/* Ditambahkan: Input untuk informasi sampel umum */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div><Label htmlFor="sampleNo">Sampel No. (Umum)</Label><Input id="sampleNo" name="sampleNo" value={template.sampleInfo.sampleNo || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800"/></div>
            <div><Label htmlFor="samplingLocation">Sampling Location (Umum)</Label><Input id="samplingLocation" name="samplingLocation" value={template.sampleInfo.samplingLocation || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800" placeholder="Isi 'See Table' jika berbeda"/></div>
            <div><Label htmlFor="samplingTime">Sampling Time (Umum)</Label><Input id="samplingTime" name="samplingTime" value={template.sampleInfo.samplingTime || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800" placeholder="Isi 'See Table' jika berbeda"/></div>
          </div>
           <div className="mt-4">
             <Label htmlFor="notes">Catatan Kaki (Regulatory Standard)</Label>
             <Textarea id="notes" name="notes" value={template.sampleInfo.notes || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800" placeholder="Contoh: ** Ministry of Environment of republic Indonesia..."/>
           </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Data Kendaraan & Hasil Pengujian</h3>
          <div className="space-y-4">
            {template.results.map((row: any, index: number) => (
                <div key={row.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-white">Kendaraan #{index + 1}</p>
                        {template.results.length > 1 && <Button variant="destructive" size="icon" onClick={() => handleRemoveRow(row.id)}><Trash2 className="h-4 w-4"/></Button>}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div><Label>Lokasi</Label><Input value={row.location} onChange={(e) => handleRowChange(index, 'location', e.target.value)} className="mt-1 bg-slate-800"/></div>
                        <div><Label>Merek Kendaraan</Label><Input value={row.vehicleBrand} onChange={(e) => handleRowChange(index, 'vehicleBrand', e.target.value)} className="mt-1 bg-slate-800"/></div>
                        <div><Label>Tahun Pembuatan</Label><Input type="number" value={row.year} onChange={(e) => handleRowChange(index, 'year', e.target.value)} className="mt-1 bg-slate-800"/></div>
                        <div><Label>Kapasitas (CC)</Label><Input type="number" value={row.capacity} onChange={(e) => handleRowChange(index, 'capacity', e.target.value)} className="mt-1 bg-slate-800"/></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div><Label>Bahan Bakar</Label><Input value={row.fuel} onChange={(e) => handleRowChange(index, 'fuel', e.target.value)} className="mt-1 bg-slate-800"/></div>
                        <div><Label>Parameter</Label><Input value={row.parameter} onChange={(e) => handleRowChange(index, 'parameter', e.target.value)} className="mt-1 bg-slate-800" placeholder="Opacity atau CO"/></div>
                        <div><Label>Hasil Tes</Label><Input type="number" value={row.testingResult} onChange={(e) => handleRowChange(index, 'testingResult', e.target.value)} className="mt-1 bg-slate-800"/></div>
                        <div><Label>Standar Baku Mutu</Label><Input value={row.standard} onChange={(e) => handleRowChange(index, 'standard', e.target.value)} className="mt-1 bg-slate-800"/></div>
                    </div>
                </div>
            ))}
            <Button variant="outline" onClick={handleAddRow}><PlusCircle className="w-4 h-4 mr-2"/>Tambah Kendaraan</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onPreview}>Preview Halaman</Button>
        <Button onClick={() => onSave(template)}>Simpan Perubahan</Button>
      </CardFooter>
    </Card>
  );
}
