'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  onSelect: (regulationId: string) => void;
  onBack: () => void;
}

export function WorkplaceAirRegulationSelection({ onSelect, onBack }: Props) {
  const regulations = [
    { id: 'permenaker_a', name: 'Permenaker No. 05/2018 (Set A)', description: 'Standar umum lingkungan kerja industri.' },
    { id: 'permenaker_b', name: 'Permenaker No. 05/2018 (Set B)', description: 'Termasuk Temperatur & Kelembaban dalam parameter.' },
    { id: 'menkes_1405', name: 'Kepmenkes No. 1405/2002', description: 'Standar untuk lingkungan kerja perkantoran dan industri.' },
  ];

  return (
    <Card className="w-full max-w-2xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pilih Standar Baku Mutu Workplace Air</CardTitle>
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
