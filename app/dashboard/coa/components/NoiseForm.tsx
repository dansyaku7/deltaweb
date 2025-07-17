// components/NoiseForm.tsx

'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch"; // Import Switch
import { PlusCircle, Trash2, Settings } from 'lucide-react'; // Import Settings
import { defaultNoiseSimpleRow } from '../data/noise-data';

export function NoiseForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}) {

  const handleSampleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onTemplateChange({ ...template, sampleInfo: { ...template.sampleInfo, [name]: value } });
  };

  const handleSimpleRowChange = (index, field, value) => {
    const newResults = [...template.results];
    newResults[index][field] = value;
    onTemplateChange({ ...template, results: newResults });
  };

  const handleAddSimpleRow = () => {
    const newResults = [...template.results, {...defaultNoiseSimpleRow, standard: template.results[0].standard, unit: template.results[0].unit, method: template.results[0].method }];
    onTemplateChange({ ...template, results: newResults });
  };

  const handleRemoveSimpleRow = (id) => {
    const newResults = template.results.filter(row => row.id !== id);
    onTemplateChange({ ...template, results: newResults });
  };

  const handleComplexChange = (locationIndex, measurementIndex, field, value) => {
    const newResults = [...template.results];
    newResults[locationIndex].measurements[measurementIndex][field] = value;
    onTemplateChange({ ...template, results: newResults });
  }

  const renderSimpleForm = () => (
    <div className="space-y-4">
        {template.results.map((row, index) => (
            <div key={row.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-white">Lokasi #{index + 1}</p>
                    {template.results.length > 1 && <Button variant="destructive" size="icon" onClick={() => handleRemoveSimpleRow(row.id)}><Trash2 className="h-4 w-4"/></Button>}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div><Label>Lokasi Sampling</Label><Input value={row.location} onChange={(e) => handleSimpleRowChange(index, 'location', e.target.value)} className="mt-1 bg-slate-800"/></div>
                    <div><Label>Waktu</Label><Input value={row.time} onChange={(e) => handleSimpleRowChange(index, 'time', e.target.value)} className="mt-1 bg-slate-800"/></div>
                    <div><Label>Hasil Tes (Leq)</Label><Input value={row.testingResult} onChange={(e) => handleSimpleRowChange(index, 'testingResult', e.target.value)} className="mt-1 bg-slate-800"/></div>
                    <div><Label>Standar</Label><Input value={row.standard} readOnly className="mt-1 bg-slate-950 text-slate-400"/></div>
                </div>
            </div>
        ))}
        <Button variant="outline" onClick={handleAddSimpleRow}><PlusCircle className="w-4 h-4 mr-2"/>Tambah Lokasi</Button>
    </div>
  );

  const renderComplexForm = () => (
    <div className="space-y-6">
        {template.results.map((location, locationIndex) => (
            <div key={location.id}>
                <h4 className="text-lg font-semibold text-slate-300 mb-2">{location.locationName}</h4>
                <div className="space-y-2">
                    {location.measurements.map((m, measurementIndex) => (
                        <div key={m.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
                            <div className="font-medium text-white self-center">{m.point}</div>
                            <div><Label>Leq</Label><Input value={m.leq} onChange={e => handleComplexChange(locationIndex, measurementIndex, 'leq', e.target.value)} className="mt-1 bg-slate-800"/></div>
                            <div><Label>Ls</Label><Input value={m.ls} onChange={e => handleComplexChange(locationIndex, measurementIndex, 'ls', e.target.value)} className="mt-1 bg-slate-800"/></div>
                            <div><Label>Lm</Label><Input value={m.lm} onChange={e => handleComplexChange(locationIndex, measurementIndex, 'lm', e.target.value)} className="mt-1 bg-slate-800"/></div>
                            <div><Label>Lsm</Label><Input value={m.lsm} onChange={e => handleComplexChange(locationIndex, measurementIndex, 'lsm', e.target.value)} className="mt-1 bg-slate-800"/></div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  );

  return (
    <Card className="w-full max-w-6xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Tes Kebisingan</CardTitle>
          <Button variant="outline" onClick={onBack}>Batal</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Informasi Sampel</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div><Label>Sampel No.</Label><Input name="sampleNo" value={template.sampleInfo.sampleNo || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800"/></div>
            <div><Label>Lokasi Sampling</Label><Input name="samplingLocation" value={template.sampleInfo.samplingLocation || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800"/></div>
            <div><Label>Waktu Sampling</Label><Input name="samplingTime" value={template.sampleInfo.samplingTime || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800"/></div>
            <div><Label>Metode Sampling</Label><Input name="samplingMethod" value={template.sampleInfo.samplingMethod || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800"/></div>
          </div>
          <div className="mt-4">
             <Label>Catatan Kaki</Label>
             <Textarea name="notes" value={template.sampleInfo.notes || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800" placeholder="Contoh: ** Government Regulation..."/>
           </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Hasil Pengujian</h3>
          {['kepmen_lh_48', 'kepgub_dki_551'].includes(template.regulation) ? renderComplexForm() : renderSimpleForm()}
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