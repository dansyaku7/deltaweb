'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Eye, EyeOff, Pencil } from 'lucide-react';

export function IlluminationForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}) {

  const handleChange = (index: number, field: string, value: any) => {
    const newResults = [...template.results];
    newResults[index][field] = value;
    onTemplateChange({ ...template, results: newResults });
  };

  const handleAddRow = () => {
    const { defaultIlluminationRow } = require('../data/illumination-data'); 
    const newResults = [...template.results, { ...defaultIlluminationRow, id: Date.now(), isVisible: true }];
    onTemplateChange({ ...template, results: newResults });
  };

  const handleRemoveRow = (index: number) => {
    const newResults = template.results.filter((_: any, i: number) => i !== index);
    onTemplateChange({ ...template, results: newResults });
  };

  const handleSampleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onTemplateChange({ ...template, sampleInfo: { ...template.sampleInfo, [name]: value } });
  };

  return (
    <Card className="w-full max-w-6xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Tes Illumination</CardTitle>
          <Button variant="outline" onClick={onBack}>Batal</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Informasi Sampel Umum</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div><Label htmlFor="sampleNo">Sampel No.</Label><Input id="sampleNo" name="sampleNo" value={template.sampleInfo.sampleNo || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800"/></div>
            <div><Label htmlFor="samplingLocation">Sampling Location</Label><Input id="samplingLocation" name="samplingLocation" value={template.sampleInfo.samplingLocation || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800" placeholder="(See Table)"/></div>
            <div><Label htmlFor="samplingTime">Sampling Time</Label><Input id="samplingTime" name="samplingTime" value={template.sampleInfo.samplingTime || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800" placeholder="(See Table)"/></div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2">Hasil Pengujian per Lokasi</h3>
          <div className="space-y-4 pt-4">
            {template.results.map((row: any, index: number) => (
              <div key={row.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white">Lokasi #{index + 1}</p>
                  <div className="flex items-center gap-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleChange(index, 'isVisible', !row.isVisible)} className="text-slate-400 hover:text-white h-8 w-8">{row.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</Button>
                    {template.results.length > 1 && (<Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleRemoveRow(index)}><Trash2 className="w-4 h-4" /></Button>)}
                  </div>
                </div>
                {row.isVisible && (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div><Label>Sampling Location</Label><Input value={row.location} onChange={(e) => handleChange(index, 'location', e.target.value)} className="mt-1 bg-slate-800"/></div>
                      <div><Label>Testing Result</Label><Input value={row.result} onChange={(e) => handleChange(index, 'result', e.target.value)} className="mt-1 bg-slate-800"/></div>
                      <div><Label>Time</Label><Input value={row.time} onChange={(e) => handleChange(index, 'time', e.target.value)} className="mt-1 bg-slate-800"/></div>
                      <div><Label>Unit</Label><Input value={row.unit} onChange={(e) => handleChange(index, 'unit', e.target.value)} className="mt-1 bg-slate-800"/></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label className="flex items-center">Regulatory Standard<Pencil className="w-3 h-3 ml-1" /></Label><Input value={row.standard} onChange={(e) => handleChange(index, 'standard', e.target.value)} className="mt-1 bg-slate-800"/></div>
                        <div><Label className="flex items-center">Methods<Pencil className="w-3 h-3 ml-1" /></Label><Input value={row.method} onChange={(e) => handleChange(index, 'method', e.target.value)} className="mt-1 bg-slate-800"/></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={handleAddRow} className="flex items-center gap-2"><PlusCircle className="w-4 h-4"/> Tambah Lokasi</Button>
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
