// app/dashboard/coa/components/OdorRegulationSelection.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  onSelect: (regulationId: string) => void;
  onBack: () => void;
}

export function OdorRegulationSelection({ onSelect, onBack }: Props) {
  return (
    <Card className="w-full max-w-2xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Langkah 3a: Pilih Standar Baku Mutu Odor</CardTitle>
          <Button variant="outline" onClick={onBack}>Kembali</Button>
        </div>
        <CardDescription>
          Pilih standar peraturan yang akan digunakan sebagai acuan pada sertifikat analisis.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onSelect('permenaker_a')}
          className="p-4 border border-slate-700 rounded-lg hover:bg-slate-800 text-left space-y-1"
        >
          <h4 className="font-semibold text-white">Permenaker No. 05 Thn 2018 (Set A)</h4>
          <p className="text-xs text-slate-400">Parameter: Ethyl Acetate, Benzene, Toluene, Xylene.</p>
        </button>
        <button
          onClick={() => onSelect('permenaker_b')}
          className="p-4 border border-slate-700 rounded-lg hover:bg-slate-800 text-left space-y-1"
        >
          <h4 className="font-semibold text-white">Permenaker No. 05 Thn 2018 (Set B)</h4>
          <p className="text-xs text-slate-400">Parameter: Methyl Ethyl Ketone, Aceton, Toluene.</p>
        </button>
        <button
          onClick={() => onSelect('kepmenlh')}
          className="p-4 border border-slate-700 rounded-lg hover:bg-slate-800 text-left space-y-1 md:col-span-2"
        >
          <h4 className="font-semibold text-white">Kepmen LH No. 50 Thn 1996</h4>
          <p className="text-xs text-slate-400">Parameter: Ammonia, Methyl Mercaptan, H2S, Methyl Sulfide, Styrene.</p>
        </button>
      </CardContent>
    </Card>
  );
}