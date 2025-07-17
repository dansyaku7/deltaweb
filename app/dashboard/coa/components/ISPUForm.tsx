// components/ISPUForm.tsx

'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff } from 'lucide-react';

// Batas konsentrasi untuk perhitungan ISPU (berdasarkan PermenLHK P.14/2020)
const ispuBoundaries = {
  'PM10': [
    { Ib: 0, Ia: 50, Xb: 0, Xa: 50 },
    { Ib: 51, Ia: 100, Xb: 51, Xa: 150 },
    { Ib: 101, Ia: 200, Xb: 151, Xa: 350 },
    { Ib: 201, Ia: 300, Xb: 351, Xa: 420 },
    { Ib: 301, Ia: 500, Xb: 421, Xa: 500 }, // Asumsi batas atas 500
  ],
  'PM2.5': [
    { Ib: 0, Ia: 50, Xb: 0, Xa: 15.5 },
    { Ib: 51, Ia: 100, Xb: 15.6, Xa: 55.4 },
    { Ib: 101, Ia: 200, Xb: 55.5, Xa: 150.4 },
    { Ib: 201, Ia: 300, Xb: 150.5, Xa: 250.4 },
    { Ib: 301, Ia: 500, Xb: 250.5, Xa: 500 }, // Asumsi batas atas 500
  ],
};

const getCategory = (ispu) => {
    if (ispu >= 0 && ispu <= 50) return 'Good';
    if (ispu >= 51 && ispu <= 100) return 'Medium';
    if (ispu >= 101 && ispu <= 200) return 'Not Healthy';
    if (ispu >= 201 && ispu <= 300) return 'Very Unhealthy';
    if (ispu >= 301) return 'Dangerous';
    return '';
};

export function ISPUForm({
  template,
  onTemplateChange,
  onSave,
  onBack,
  onPreview,
}) {

  const calculateISPU = (pollutantName, concentrationStr) => {
    const concentration = parseFloat(concentrationStr);
    if (isNaN(concentration)) {
        return { ispu: '', category: '' };
    }

    const key = pollutantName.includes('PM10') ? 'PM10' : 'PM2.5';
    const boundaries = ispuBoundaries[key];
    const boundary = boundaries.find(b => concentration >= b.Xb && concentration <= b.Xa);

    if (!boundary) {
        // Handle di atas batas tertinggi
        if (concentration > boundaries[boundaries.length - 1].Xa) {
            return { ispu: '>500', category: 'Dangerous' };
        }
        return { ispu: '', category: '' };
    }

    const { Ia, Ib, Xa, Xb } = boundary;
    const ispuValue = ((Ia - Ib) / (Xa - Xb)) * (concentration - Xb) + Ib;
    const roundedIspu = Math.round(ispuValue);
    
    return {
        ispu: roundedIspu,
        category: getCategory(roundedIspu),
    };
  };
  
  const handleParameterChange = (index: number, field: string, value: any) => {
    const newResults = [...template.results];
    const currentParam = { ...newResults[index] };
    currentParam[field] = value;

    // Jika yang berubah adalah hasil tes, hitung ISPU
    if (field === 'testingResult') {
        const { ispu, category } = calculateISPU(currentParam.name, value);
        currentParam.ispuCalculationResult = ispu;
        currentParam.ispuCategory = category;
    }
    
    newResults[index] = currentParam;
    onTemplateChange({ ...template, results: newResults });
  };

  const handleSampleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onTemplateChange({ ...template, sampleInfo: { ...template.sampleInfo, [name]: value } });
  };

  return (
    <Card className="w-full max-w-6xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Isi Detail & Hasil Perhitungan ISPU</CardTitle>
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
             <Textarea id="notes" name="notes" value={template.sampleInfo.notes || ''} onChange={handleSampleInfoChange} className="mt-1 bg-slate-800" placeholder="Contoh: *** Minister of Environmental and Forestry Decree..."/>
           </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Hasil Pengujian & Perhitungan</h3>
          <div className="space-y-4">
            {template.results.map((param: any, index: number) => (
                <div key={`${param.name}-${index}`} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-white">{param.name}</p>
                        <Button variant="ghost" size="icon" onClick={() => handleParameterChange(index, 'isVisible', !param.isVisible)} className="text-slate-400 hover:text-white h-8 w-8">
                            {param.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                    </div>
                    {param.isVisible && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div>
                                <Label>Testing Result ({param.unit})</Label>
                                <Input type="number" value={param.testingResult || ''} onChange={(e) => handleParameterChange(index, 'testingResult', e.target.value)} className="mt-1 bg-slate-800"/>
                            </div>
                            <div>
                                <Label>ISPU Calculation Result</Label>
                                <Input value={param.ispuCalculationResult} readOnly className="mt-1 bg-slate-950 text-slate-400"/>
                            </div>
                            <div>
                                <Label>ISPU Category</Label>
                                <Input value={param.ispuCategory} readOnly className="mt-1 bg-slate-950 text-slate-400"/>
                            </div>
                        </div>
                    )}
                </div>
            ))}
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
