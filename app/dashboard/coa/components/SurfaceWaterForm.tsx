'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch"; // Import Switch
import { Pencil, Eye, EyeOff, Settings } from 'lucide-react'; // Import Settings

export function SurfaceWaterForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}) {

  const handleParameterChange = (index: number, field: string, value: any, subField?: string) => {
    const newResults = [...template.results];
    if (subField) {
      newResults[index][field][subField] = value;
    } else {
      newResults[index][field] = value;
    }
    onTemplateChange({ ...template, results: newResults });
  };

  const handleSampleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onTemplateChange({ ...template, sampleInfo: { ...template.sampleInfo, [name]: value } });
  };

  const isMultiColumn = template.regulation.startsWith('pp_22');

  return (
    <Card className="w-full max-w-6xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Tes Surface Water</CardTitle>
          <Button variant="outline" onClick={onBack}>Batal</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Informasi Sampel & Catatan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Label htmlFor="sampleNo">Sampel No.</Label><Input id="sampleNo" name="sampleNo" value={template.sampleInfo.sampleNo || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800"/></div>
            <div><Label htmlFor="samplingLocation">Sampling Location</Label><Input id="samplingLocation" name="samplingLocation" value={template.sampleInfo.samplingLocation || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800"/></div>
            <div><Label htmlFor="samplingTime">Sampling Time</Label><Input id="samplingTime" name="samplingTime" value={template.sampleInfo.samplingTime || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800"/></div>
          </div>
           <div className="mt-4">
            <Label htmlFor="notes">Catatan Kaki (Regulatory Standard)</Label>
            <Textarea id="notes" name="notes" value={template.sampleInfo.notes || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800" placeholder="Contoh: ** Government of Republic of Indonesia Regulation..."/>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Hasil Pengujian Parameter</h3>
          <div className="space-y-4">
            {template.results.map((param: any, index: number) => (
              <React.Fragment key={`${param.name}-${index}`}>
                {param.category && (index === 0 || template.results[index-1]?.category !== param.category) && <h4 className="font-bold text-slate-300 pt-4 pb-2">{param.category}</h4>}
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-white">{param.name}</p>
                        <Button variant="ghost" size="icon" onClick={() => handleParameterChange(index, 'isVisible', !param.isVisible)} className="text-slate-400 hover:text-white h-8 w-8">
                            {param.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                    </div>
                    {param.isVisible && (
                        isMultiColumn ? (
                            // Layout untuk PP No. 22 (Multi-kolom)
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div><Label>Testing Result</Label><Input value={param.testingResult || ''} onChange={(e) => handleParameterChange(index, 'testingResult', e.target.value)} className="mt-1 bg-slate-800"/></div>
                                <div><Label className="flex items-center">Unit <Pencil className="w-3 h-3 ml-1" /></Label><Input value={param.unit} onChange={(e) => handleParameterChange(index, 'unit', e.target.value)} className="mt-1 bg-slate-800"/></div>
                                <div><Label className="flex items-center">Methods <Pencil className="w-3 h-3 ml-1" /></Label><Input value={param.method} onChange={(e) => handleParameterChange(index, 'method', e.target.value)} className="mt-1 bg-slate-800"/></div>
                                <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                                    <div><Label>Standard (Class I)</Label><Input value={param.standard.class1} onChange={(e) => handleParameterChange(index, 'standard', e.target.value, 'class1')} className="mt-1 bg-slate-800"/></div>
                                    <div><Label>Standard (Class II)</Label><Input value={param.standard.class2} onChange={(e) => handleParameterChange(index, 'standard', e.target.value, 'class2')} className="mt-1 bg-slate-800"/></div>
                                    <div><Label>Standard (Class III)</Label><Input value={param.standard.class3} onChange={(e) => handleParameterChange(index, 'standard', e.target.value, 'class3')} className="mt-1 bg-slate-800"/></div>
                                    <div><Label>Standard (Class IV)</Label><Input value={param.standard.class4} onChange={(e) => handleParameterChange(index, 'standard', e.target.value, 'class4')} className="mt-1 bg-slate-800"/></div>
                                </div>
                            </div>
                        ) : (
                            // Layout untuk Pergub DKI (Kolom tunggal)
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div><Label>Testing Result</Label><Input value={param.testingResult || ''} onChange={(e) => handleParameterChange(index, 'testingResult', e.target.value)} className="mt-1 bg-slate-800"/></div>
                                <div><Label className="flex items-center">Unit <Pencil className="w-3 h-3 ml-1" /></Label><Input value={param.unit} onChange={(e) => handleParameterChange(index, 'unit', e.target.value)} className="mt-1 bg-slate-800"/></div>
                                <div><Label className="flex items-center">Regulatory Standard <Pencil className="w-3 h-3 ml-1" /></Label><Input value={param.standard} onChange={(e) => handleParameterChange(index, 'standard', e.target.value)} className="mt-1 bg-slate-800"/></div>
                                <div><Label className="flex items-center">Methods <Pencil className="w-3 h-3 ml-1" /></Label><Input value={param.method} onChange={(e) => handleParameterChange(index, 'method', e.target.value)} className="mt-1 bg-slate-800"/></div>
                            </div>
                        )
                    )}
                </div>
              </React.Fragment>
            ))}
          </div>
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