'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // Import Switch
import { PlusCircle, Trash2, Settings } from 'lucide-react'; // Import Settings
import { nanoid } from 'nanoid';

export function VibrationForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}) {

  const handleParameterChange = (index: number, field: string, value: any) => {
    const newResults = [...template.results];
    newResults[index][field] = value;
    onTemplateChange({ ...template, results: newResults });
  };

  const handleSampleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onTemplateChange({ ...template, sampleInfo: { ...template.sampleInfo, [name]: value } });
  };

  const handleAddRow = () => {
    // Hanya berlaku untuk Permenaker 5, karena hanya itu yang form-nya mendukung multi-row
    if (template.regulation === 'permenaker_5') {
        const { vibrationParamsPermenaker5 } = require('../data/vibration-data');
        const newResults = [...template.results, { ...vibrationParamsPermenaker5[0], id: nanoid() }];
        onTemplateChange({ ...template, results: newResults });
    }
  };

  const handleRemoveRow = (index: number) => {
    const newResults = template.results.filter((_: any, i: number) => i !== index);
    onTemplateChange({ ...template, results: newResults });
  };

  const renderFormContent = () => {
    switch (template.regulation) {
        case 'permenaker_5':
            return (
                <div className="space-y-4">
                    {template.results.map((row: any, index: number) => (
                        <div key={row.id || index} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-white">Lokasi #{index + 1}</p>
                                {template.results.length > 1 && <Button variant="destructive" size="icon" onClick={() => handleRemoveRow(index)}><Trash2 className="h-4 w-4"/></Button>}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div><Label>Sampling Location</Label><Input value={row.location || ''} onChange={(e) => handleParameterChange(index, 'location', e.target.value)} className="mt-1 bg-slate-800"/></div>
                                <div><Label>Time</Label><Input value={row.time || ''} onChange={(e) => handleParameterChange(index, 'time', e.target.value)} className="mt-1 bg-slate-800"/></div>
                                <div><Label>Testing Result</Label><Input value={row.testingResult || ''} onChange={(e) => handleParameterChange(index, 'testingResult', e.target.value)} className="mt-1 bg-slate-800"/></div>
                                <div><Label>Unit</Label><Input value={row.unit} readOnly className="mt-1 bg-slate-950 text-slate-400"/></div>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" onClick={handleAddRow}><PlusCircle className="w-4 h-4 mr-2"/>Tambah Lokasi</Button>
                </div>
            );
        // Form untuk regulasi lain bisa ditambahkan di sini jika perlu
        default:
            return <p className="text-slate-400">Form untuk regulasi ini belum memiliki input detail parameter.</p>;
    }
  }

  return (
    <Card className="w-full max-w-6xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Tes Vibration</CardTitle>
          <Button variant="outline" onClick={onBack}>Batal</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Informasi Sampel</h3>
          {/* MODIFIED: Menambahkan input yang hilang */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Label htmlFor="sampleNo">Sampel No.</Label><Input id="sampleNo" name="sampleNo" value={template.sampleInfo.sampleNo || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800"/></div>
            <div><Label htmlFor="samplingLocation">Sampling Location (Umum)</Label><Input id="samplingLocation" name="samplingLocation" value={template.sampleInfo.samplingLocation || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800" placeholder="(See Table)"/></div>
            <div><Label htmlFor="samplingTime">Sampling Time (Umum)</Label><Input id="samplingTime" name="samplingTime" value={template.sampleInfo.samplingTime || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800" placeholder="(See Table)"/></div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Hasil Pengujian</h3>
          {renderFormContent()}
        </div>

        {/* == KODE BARU DIMASUKKAN DI SINI == */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-200 border-b border-slate-700 pb-2 flex items-center"><Settings className="w-4 h-4 mr-2"/>Pengaturan Halaman</h3>
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="space-y-0.5">
                  <Label htmlFor="kan-logo-switch" className="text-base">Tampilkan Logo KAN</Label>
                  <p className="text-sm text-slate-400">
                      Aktifkan untuk menampilkan logo KAN di header halaman ini.
                  </p>
              </div>
              <Switch
                  id="kan-logo-switch"
                  checked={template.showKanLogo}
                  onCheckedChange={(value) => onTemplateChange({ ...template, showKanLogo: value })}
              />
          </div>
        </div>
        {/* == AKHIR DARI KODE BARU == */}

      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onPreview}>Preview Halaman</Button>
        <Button onClick={() => onSave(template)}>Simpan Perubahan</Button>
      </CardFooter>
    </Card>
  );
}