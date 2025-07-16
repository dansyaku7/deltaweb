'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Eye, EyeOff, Pencil } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function IlluminationForm({ 
  results, onChange, onAddRow, onRemoveRow, onToggleVisibility,
  sampleInfo, onSampleInfoChange,
  autoFilledData,
  showKanLogo, onKanLogoChange,
  onPreview, onBack 
}) {
  return (
    <Card className="w-full max-w-6xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Langkah 3: Isi Detail & Hasil Tes Illumination</CardTitle>
          <Button variant="outline" onClick={onBack}>Kembali</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Informasi Sampel Umum</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><Label htmlFor="sampleNo">Sampel No.</Label><Input id="sampleNo" name="sampleNo" value={sampleInfo.sampleNo} onChange={onSampleInfoChange} className="mt-1 bg-slate-800"/></div>
            <div><Label>Sampling Date (Otomatis)</Label><Input readOnly value={autoFilledData.samplingDate} className="mt-1 bg-slate-950 text-slate-400"/></div>
            <div><Label>Date Received (Otomatis)</Label><Input readOnly value={autoFilledData.dateReceived} className="mt-1 bg-slate-950 text-slate-400"/></div>
            <div><Label>Interval Testing Date (Otomatis)</Label><Input readOnly value={autoFilledData.intervalTestingDate} className="mt-1 bg-slate-950 text-slate-400"/></div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2">Hasil Pengujian per Lokasi</h3>
          <div className="space-y-4 pt-4">
            {results.map((row, index) => (
              <div key={row.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white">Lokasi #{index + 1}</p>
                  <div className="flex items-center gap-x-2">
                    <Button variant="ghost" size="icon" onClick={() => onToggleVisibility(index)} className="text-slate-400 hover:text-white h-8 w-8">
                      {row.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    {results.length > 1 && (<Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => onRemoveRow(index)}><Trash2 className="w-4 h-4" /></Button>)}
                  </div>
                </div>
                {row.isVisible && (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div><Label>Sampling Location</Label><Input value={row.location} onChange={(e) => onChange(index, 'location', e.target.value)} className="mt-1 bg-slate-800"/></div>
                      <div><Label>Testing Result</Label><Input value={row.result} onChange={(e) => onChange(index, 'result', e.target.value)} className="mt-1 bg-slate-800"/></div>
                      <div><Label>Time</Label><Input value={row.time} onChange={(e) => onChange(index, 'time', e.target.value)} className="mt-1 bg-slate-800"/></div>
                      <div><Label className="flex items-center">Unit<Pencil className="w-3 h-3 ml-1" /></Label><Input value={row.unit} onChange={(e) => onChange(index, 'unit', e.target.value)} className="mt-1 bg-slate-800"/></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><Label className="flex items-center">Regulatory Standard**<Pencil className="w-3 h-3 ml-1" /></Label><Input value={row.standard} onChange={(e) => onChange(index, 'standard', e.target.value)} className="mt-1 bg-slate-800"/></div>
                      <div><Label className="flex items-center">Methods<Pencil className="w-3 h-3 ml-1" /></Label><Input value={row.method} onChange={(e) => onChange(index, 'method', e.target.value)} className="mt-1 bg-slate-800"/></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={onAddRow} className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4"/> Tambah Lokasi Pengujian
            </Button>
          </div>
        </div>

        <div>
            <Label className="text-lg font-semibold text-slate-200">Opsi Tampilan Dokumen</Label>
            <div className="p-4 mt-2 rounded-md border border-slate-700">
                <div className="flex items-center space-x-2">
                    <Switch id="kan-logo-illumination" checked={showKanLogo} onCheckedChange={onKanLogoChange} />
                    <Label htmlFor="kan-logo-illumination" className="text-slate-300">Tampilkan Logo KAN di Halaman Ini</Label>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onPreview}>Preview Halaman Illumination</Button>
      </CardFooter>
    </Card>
  );
}