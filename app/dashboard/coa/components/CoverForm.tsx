'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from '@/components/ui/switch';
import { CalendarIcon, Upload } from 'lucide-react';
import { format } from "date-fns";
import { id } from "date-fns/locale";

const allSubjects = [
  "Ambient Outdoor Air Quality", "Workplace Air Quality", "Noise", "Odor", 
  "Illumination", "Heat Stress", "Wastewater"
];
const sampleTakenByOptions = ["PT. Delta Indonesia Laboratory", "Customer", "Third Party"];

export function CoverForm({ coaData, handleCheckboxChange, handleCoaChange, handleSignatureUpload, onNextStep }) {
  return (
    <Card className="w-full max-w-4xl bg-slate-900 border-slate-800">
      <CardHeader><CardTitle>Lengkapi Data COA (Halaman 1)</CardTitle></CardHeader>
      <CardContent className="space-y-8">
        
        <div className="p-4 rounded-lg bg-slate-800">
          <p>Customer: <span className="font-semibold">{coaData.customer}</span></p>
          <p>Address: <span className="font-semibold">{coaData.address}</span></p>
          <p>Phone: <span className="font-semibold">{coaData.phone}</span></p>
        </div>
        
        <div>
          <Label className="text-lg font-semibold text-slate-200">Subject</Label>
          <div className="p-4 mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 rounded-md border border-slate-700">
            {allSubjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox id={subject} checked={coaData.subjects.includes(subject)} onCheckedChange={() => handleCheckboxChange('subjects', subject)} />
                <label htmlFor={subject} className="text-sm font-medium leading-none text-slate-300">{subject}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-lg font-semibold text-slate-200">Sample taken by</Label>
          <div className="mt-2 p-4 flex flex-col md:flex-row gap-4 rounded-md border border-slate-700">
            {sampleTakenByOptions.map(option => (
                <div key={option} className="flex items-center space-x-2">
                    <Checkbox id={option} checked={coaData.sampleTakenBy.includes(option)} onCheckedChange={() => handleCheckboxChange('sampleTakenBy', option)} />
                    <label htmlFor={option} className="text-sm font-medium text-slate-300">{option}</label>
                </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-lg font-semibold text-slate-200">Tanggal</Label>
          <div className="p-4 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-md border border-slate-700">
            <div>
              <Label className="font-medium text-slate-300">Receive Date</Label>
              <Popover>
                <PopoverTrigger asChild><Button variant={"outline"} className="w-full justify-start text-left font-normal mt-2 bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white"><CalendarIcon className="mr-2 h-4 w-4" />{coaData.receiveDate ? format(coaData.receiveDate, "PPP", { locale: id }) : <span className="text-slate-400">Pilih tanggal</span>}</Button></PopoverTrigger>
                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={coaData.receiveDate} onSelect={(date) => handleCoaChange('receiveDate', date)} initialFocus /></PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="font-medium text-slate-300">Analysis Start</Label>
              <Popover>
                <PopoverTrigger asChild><Button variant={"outline"} className="w-full justify-start text-left font-normal mt-2 bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white"><CalendarIcon className="mr-2 h-4 w-4" />{coaData.analysisDateStart ? format(coaData.analysisDateStart, "PPP", { locale: id }) : <span className="text-slate-400">Pilih tanggal</span>}</Button></PopoverTrigger>
                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={coaData.analysisDateStart} onSelect={(date) => handleCoaChange('analysisDateStart', date)} initialFocus /></PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="font-medium text-slate-300">Analysis End</Label>
              <Input readOnly value={coaData.analysisDateEnd} className="mt-2 bg-slate-950 border-slate-800 text-slate-400"/>
            </div>
            <div>
              <Label className="font-medium text-slate-300">Report Date</Label>
              <Input readOnly value={coaData.reportDate} className="mt-2 bg-slate-950 border-slate-800 text-slate-400"/>
            </div>
          </div>
        </div>
        
        <div>
          <Label className="text-lg font-semibold text-slate-200">Pengesahan</Label>
          <div className="p-4 mt-2 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-md border border-slate-700">
            <div>
              <Label htmlFor='directorName' className="text-slate-300">Nama Direktur Utama</Label>
              <Input id='directorName' value={coaData.directorName} onChange={(e) => handleCoaChange('directorName', e.target.value)} className="mt-2 bg-slate-800 border-slate-700"/>
            </div>
            <div>
              <Label className="text-slate-300">Tanda Tangan Digital (PNG)</Label>
              <div className="mt-2 flex items-center gap-4">
                <Input type="file" accept="image/png" onChange={handleSignatureUpload} className="flex-1"/>
                {coaData.signatureUrl && (<img src={coaData.signatureUrl} alt="Preview" className="h-10 w-20 rounded border border-slate-600 bg-slate-700 object-contain p-1" />)}
              </div>
            </div>
            <div className="col-span-2 flex items-center space-x-2 pt-2">
              <Switch id="kan-logo" checked={coaData.showKanLogo} onCheckedChange={(checked) => handleCoaChange('showKanLogo', checked)} />
              <Label htmlFor="kan-logo" className="text-slate-300">Tampilkan Logo KAN di Dokumen</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onNextStep}>Selanjutnya</Button>
      </CardFooter>
    </Card>
  );
}