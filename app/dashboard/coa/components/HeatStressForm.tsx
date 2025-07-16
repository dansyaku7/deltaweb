'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch'; // Impor Switch

export function HeatStressForm({ 
  results, onChange, onAddRow, onRemoveRow, 
  sampleInfo, onSampleInfoChange,
  autoFilledData,
  showKanLogo, onKanLogoChange, // Terima props untuk KAN logo
  onPreview, onBack 
}) {
  return (
    <Card className="w-full max-w-6xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Langkah 3: Isi Detail & Hasil Tes Heat Stress</CardTitle>
          <Button variant="outline" onClick={onBack}>Kembali</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Informasi Sampel Umum</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><Label htmlFor="sampleNo">Sampel No.</Label><Input id="sampleNo" name="sampleNo" value={sampleInfo.sampleNo} onChange={onSampleInfoChange} className="mt-1 bg-slate-800"/></div>
            <div><Label htmlFor="samplingLocation">Sampling Location</Label><Input id="samplingLocation" name="samplingLocation" value={sampleInfo.samplingLocation} onChange={onSampleInfoChange} className="mt-1 bg-slate-800"/></div>
            <div><Label htmlFor="samplingTime">Sampling Time</Label><Input id="samplingTime" name="samplingTime" value={sampleInfo.samplingTime} onChange={onSampleInfoChange} className="mt-1 bg-slate-800"/></div>
            <div><Label>Sampling Date</Label><Input readOnly value={autoFilledData.samplingDate} className="mt-1 bg-slate-950 border-slate-800 text-slate-400"/></div>
            <div><Label>Date Received</Label><Input readOnly value={autoFilledData.dateReceived} className="mt-1 bg-slate-950 border-slate-800 text-slate-400"/></div>
            <div><Label>Interval Testing Date</Label><Input readOnly value={autoFilledData.intervalTestingDate} className="mt-1 bg-slate-950 border-slate-800 text-slate-400"/></div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2">Hasil Pengujian per Lokasi</h3>
          <div className="space-y-4 pt-4">
            {results.map((row, index) => (
              <div key={row.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-4 relative">
                {results.length > 1 && (<Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => onRemoveRow(index)}><Trash2 className="w-4 h-4" /></Button>)}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div><Label>Sampling Location</Label><Input value={row.location} onChange={(e) => onChange(index, 'location', e.target.value)} className="mt-1 bg-slate-800"/></div>
                  <div><Label>Time</Label><Input value={row.time} onChange={(e) => onChange(index, 'time', e.target.value)} className="mt-1 bg-slate-800"/></div>
                  <div><Label>Humidity (%)</Label><Input value={row.humidity} onChange={(e) => onChange(index, 'humidity', e.target.value)} className="mt-1 bg-slate-800"/></div>
                </div>
                <div>
                  <Label>Temperature (°C)</Label>
                  <div className="grid grid-cols-3 gap-4 mt-1">
                      <div><Label className="text-xs text-slate-400">Wet</Label><Input value={row.wetTemp} onChange={(e) => onChange(index, 'wetTemp', e.target.value)} className="bg-slate-800"/></div>
                      <div><Label className="text-xs text-slate-400">Dew</Label><Input value={row.dewTemp} onChange={(e) => onChange(index, 'dewTemp', e.target.value)} className="bg-slate-800"/></div>
                      <div><Label className="text-xs text-slate-400">Globe</Label><Input value={row.globeTemp} onChange={(e) => onChange(index, 'globeTemp', e.target.value)} className="bg-slate-800"/></div>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={onAddRow} className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4"/> Tambah Lokasi Pengujian
            </Button>
          </div>
        </div>

        {/* TAMBAHKAN Bagian Opsi Tampilan */}
        <div>
            <Label className="text-lg font-semibold text-slate-200">Opsi Tampilan Dokumen</Label>
            <div className="p-4 mt-2 rounded-md border border-slate-700">
                <div className="flex items-center space-x-2">
                    <Switch id="kan-logo-heatstress" checked={showKanLogo} onCheckedChange={onKanLogoChange} />
                    <Label htmlFor="kan-logo-heatstress" className="text-slate-300">Tampilkan Logo KAN di Halaman Ini</Label>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onPreview}>Preview Halaman Heat Stress</Button>
      </CardFooter>
    </Card>
  );
}