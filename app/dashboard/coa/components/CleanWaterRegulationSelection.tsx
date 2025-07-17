'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  onSelect: (regulationId: string) => void;
  onBack: () => void;
}

export function CleanWaterRegulationSelection({ onSelect, onBack }: Props) {
  const regulations = [
    { id: 'permenkes_32_2017', name: 'Permenkes No. 32 Tahun 2017', description: 'Standar Kualitas Air untuk Keperluan Higiene Sanitasi.' },
    { id: 'permenkes_2_2023', name: 'Permenkes No. 2 Tahun 2023', description: 'Standar Baku Mutu Kesehatan Lingkungan untuk Media Air.' },
  ];

  return (
    <Card className="w-full max-w-2xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pilih Standar Baku Mutu Clean Water</CardTitle>
          <Button variant="outline" onClick={onBack}>Kembali</Button>
        </div>
        <CardDescription>
          Pilih standar peraturan yang akan digunakan sebagai acuan pada sertifikat analisis.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regulations.map(reg => (
            <button
                key={reg.id}
                onClick={() => onSelect(reg.id)}
                className="p-4 border border-slate-700 rounded-lg hover:bg-slate-800 text-left space-y-1"
            >
                <h4 className="font-semibold text-white">{reg.name}</h4>
                <p className="text-xs text-slate-400">{reg.description}</p>
            </button>
        ))}
      </CardContent>
    </Card>
  );
}
