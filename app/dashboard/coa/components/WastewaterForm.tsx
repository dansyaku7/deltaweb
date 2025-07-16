'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Eye, EyeOff } from "lucide-react";
import { Switch } from '@/components/ui/switch';

export function WastewaterForm({ 
  parameters, onParameterChange, onToggleVisibility,
  notes, onNotesChange, 
  sampleInfo, onSampleInfoChange, 
  autoFilledData, 
  showKanLogo, onKanLogoChange, 
  onPreview, onBack 
}) {
  return (
    <Card className="w-full max-w-4xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle>Langkah 3: Isi Detail Tes Wastewater</CardTitle>
            <Button variant="outline" onClick={onBack}>Kembali</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2 mb-4">Informasi Sampel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div><Label htmlFor="sampleNo">Sample No.</Label><Input id="sampleNo" name="sampleNo" value={sampleInfo.sampleNo} onChange={onSampleInfoChange} className="mt-1 bg-slate-800 border-slate-700"/></div>
            <div><Label htmlFor="samplingLocation">Sampling Location</Label><Input id="samplingLocation" name="samplingLocation" value={sampleInfo.samplingLocation} onChange={onSampleInfoChange} className="mt-1 bg-slate-800 border-slate-700"/></div>
            <div><Label htmlFor="samplingTime">Sampling Time</Label><Input id="samplingTime" name="samplingTime" value={sampleInfo.samplingTime} onChange={onSampleInfoChange} className="mt-1 bg-slate-800 border-slate-700"/></div>
            <div><Label>Sampling Date</Label><Input readOnly value={autoFilledData.samplingDate} className="mt-1 bg-slate-950 border-slate-800 text-slate-400"/></div>
            <div><Label>Date Received</Label><Input readOnly value={autoFilledData.samplingDate} className="mt-1 bg-slate-950 border-slate-800 text-slate-400"/></div>
            <div><Label>Interval Testing Date</Label><Input readOnly value={autoFilledData.intervalTestingDate} className="mt-1 bg-slate-950 border-slate-800 text-slate-400"/></div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2">Hasil Pengujian</h3>
          <div className="space-y-6 pt-4">
            {parameters.map((param, index) => (
              <React.Fragment key={param.name}>
                {param.category && (<h4 className="text-lg font-semibold text-sky-400 pt-4 border-t border-slate-800">{param.category}</h4>)}
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-base text-white">{parameters.indexOf(param) + 1}. {param.name}</p>
                    <Button variant="ghost" size="icon" onClick={() => onToggleVisibility(index)} className="text-slate-400 hover:text-white">
                      {param.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  {param.isVisible && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 text-sm">
                      <div><Label htmlFor={`unit-${index}`} className="text-slate-400 text-xs flex items-center">Unit <Pencil className="w-3 h-3 ml-1" /></Label><Input id={`unit-${index}`} value={param.unit} onChange={(e) => onParameterChange(index, 'unit', e.target.value)} className="mt-1 bg-slate-800 border-slate-700 text-white font-mono" /></div>
                      <div><Label htmlFor={`standard-${index}`} className="text-slate-400 text-xs flex items-center">Regulatory Standard <Pencil className="w-3 h-3 ml-1" /></Label><Input id={`standard-${index}`} value={param.standard} onChange={(e) => onParameterChange(index, 'standard', e.target.value)} className="mt-1 bg-slate-800 border-slate-700 text-white font-mono" /></div>
                      <div><Label htmlFor={`method-${index}`} className="text-slate-400 text-xs flex items-center">Methods <Pencil className="w-3 h-3 ml-1" /></Label><Input id={`method-${index}`} value={param.method} onChange={(e) => onParameterChange(index, 'method', e.target.value)} className="mt-1 bg-slate-800 border-slate-700 text-white font-mono" /></div>
                      <div><Label htmlFor={`result-${index}`} className="text-slate-300 font-semibold">Testing Result</Label><Input id={`result-${index}`} placeholder="Hasil..." value={param.testingResult} onChange={(e) => onParameterChange(index, 'testingResult', e.target.value)} className="mt-1 bg-slate-800 border-slate-700 text-white" /></div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div>
          <Label className="text-lg font-semibold text-slate-200">Catatan Kaki (Regulatory Standard)**</Label>
          <Input value={notes} onChange={(e) => onNotesChange(e.target.value)} placeholder="Contoh: KI JABABEKA Estate Regulation" className="mt-2 bg-slate-800 border-slate-700" />
        </div>
        <div>
            <Label className="text-lg font-semibold text-slate-200">Opsi Tampilan</Label>
            <div className="p-4 mt-2 rounded-md border border-slate-700">
                <div className="flex items-center space-x-2">
                    <Switch id="kan-logo-wastewater" checked={showKanLogo} onCheckedChange={onKanLogoChange} />
                    <Label htmlFor="kan-logo-wastewater" className="text-slate-300">Tampilkan Logo KAN di Halaman Ini</Label>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onPreview}>Preview Halaman Wastewater</Button>
      </CardFooter>
    </Card>
  );
}