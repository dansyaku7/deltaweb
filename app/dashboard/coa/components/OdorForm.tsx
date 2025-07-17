'use client';

import React, { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // Import Switch
import { Pencil, Settings } from 'lucide-react'; // Import Settings

const WorkplaceConditionFields = ({ sampleInfo, onChange }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div><Label htmlFor="temperatureWorkplace">Temperature</Label><Input id="temperatureWorkplace" name="temperatureWorkplace" value={sampleInfo.temperatureWorkplace} onChange={onChange} className="mt-1 bg-slate-800" placeholder="... °C"/></div>
    <div><Label htmlFor="humidityWorkplace">Humidity</Label><Input id="humidityWorkplace" name="humidityWorkplace" value={sampleInfo.humidityWorkplace} onChange={onChange} className="mt-1 bg-slate-800" placeholder="... %RH"/></div>
  </div>
);
const AmbientConditionFields = ({ sampleInfo, onChange }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div><Label htmlFor="coordinate">Coordinate</Label><Input id="coordinate" name="coordinate" value={sampleInfo.coordinate} onChange={onChange} className="mt-1 bg-slate-800"/></div>
    <div><Label htmlFor="temperatureAmbient">Temperature</Label><Input id="temperatureAmbient" name="temperatureAmbient" value={sampleInfo.temperatureAmbient} onChange={onChange} className="mt-1 bg-slate-800" placeholder="... °C"/></div>
    <div><Label htmlFor="pressure">Pressure</Label><Input id="pressure" name="pressure" value={sampleInfo.pressure} onChange={onChange} className="mt-1 bg-slate-800" placeholder="... mmHg"/></div>
    <div><Label htmlFor="humidityAmbient">Humidity</Label><Input id="humidityAmbient" name="humidityAmbient" value={sampleInfo.humidityAmbient} onChange={onChange} className="mt-1 bg-slate-800" placeholder="... %RH"/></div>
    <div><Label htmlFor="windSpeed">Wind Speed</Label><Input id="windSpeed" name="windSpeed" value={sampleInfo.windSpeed} onChange={onChange} className="mt-1 bg-slate-800" placeholder="... m/s"/></div>
    <div><Label htmlFor="windDirection">Wind Direction</Label><Input id="windDirection" name="windDirection" value={sampleInfo.windDirection} onChange={onChange} className="mt-1 bg-slate-800"/></div>
    <div><Label htmlFor="weather">Weather</Label><Input id="weather" name="weather" value={sampleInfo.weather} onChange={onChange} className="mt-1 bg-slate-800"/></div>
  </div>
);

export function OdorForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}) {

  const regulationTitle = useMemo(() => {
    if (template.regulation.startsWith('permenaker')) return 'Permenaker No. 05 Tahun 2018';
    if (template.regulation === 'kepmenlh') return 'Kepmen LH No. 50 Tahun 1996';
    return 'Template Odor';
  }, [template.regulation]);

  const handleParameterChange = (index: number, field: string, value: string) => {
    const newResults = [...template.results];
    newResults[index][field] = value;
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
          <div>
            <CardTitle>Isi Detail & Hasil Tes Odor</CardTitle>
            <p className="text-sm text-slate-400 mt-1">Menggunakan standar: {regulationTitle}</p>
          </div>
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
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Hasil Pengujian Parameter</h3>
          <div className="space-y-4">
            {template.results.map((param: any, index: number) => (
              <div key={param.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
                <p className="font-semibold text-white">{param.name}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Testing Result</Label><Input value={param.testingResult} onChange={(e) => handleParameterChange(index, 'testingResult', e.target.value)} className="mt-1 bg-slate-800"/></div>
                    <div><Label className="flex items-center">Unit <Pencil className="w-3 h-3 ml-1" /></Label><Input value={param.unit} onChange={(e) => handleParameterChange(index, 'unit', e.target.value)} className="mt-1 bg-slate-800"/></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label className="flex items-center">Regulatory Standard <Pencil className="w-3 h-3 ml-1" /></Label><Input value={param.standard} onChange={(e) => handleParameterChange(index, 'standard', e.target.value)} className="mt-1 bg-slate-800"/></div>
                    <div><Label className="flex items-center">Methods <Pencil className="w-3 h-3 ml-1" /></Label><Input value={param.method} onChange={(e) => handleParameterChange(index, 'method', e.target.value)} className="mt-1 bg-slate-800"/></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">
            {template.regulation.startsWith('permenaker') ? 'Kondisi Lingkungan Kerja' : 'Kondisi Lingkungan Ambien'}
          </h3>
          {template.regulation.startsWith('permenaker') ? (
            <WorkplaceConditionFields sampleInfo={template.sampleInfo} onChange={handleSampleInfoChange} />
          ) : (
            <AmbientConditionFields sampleInfo={template.sampleInfo} onChange={handleSampleInfoChange} />
          )}
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