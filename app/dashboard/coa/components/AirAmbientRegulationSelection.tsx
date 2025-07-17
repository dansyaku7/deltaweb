'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  onSelect: (regulationId: string) => void;
  onBack: () => void;
}

export function AirAmbientRegulationSelection({ onSelect, onBack }: Props) {
  const regulations = [
    { id: 'pp_22_2021', name: 'PP No. 22/2021', description: 'Standar Nasional Baku Mutu Udara Ambien.' },
    { id: 'pp_22_2021_plus_odor', name: 'PP No. 22/2021 + Odor', description: 'Standar Nasional ditambah parameter Odor (Kep-50/MENLH/1996).' },
    { id: 'pp_41_1999', name: 'PP No. 41/1999', description: 'Standar Pengendalian Pencemaran Udara.' },
    { id: 'kepgub_dki_551', name: 'Kepgub DKI Jakarta No. 551/2001', description: 'Standar Baku Mutu Udara Ambien di DKI Jakarta.' },
    { id: 'kepgub_dki_551_plus_odor', name: 'Kepgub DKI Jakarta No. 551/2001 + Odor', description: 'Standar DKI ditambah parameter Odor.' },
    { id: 'pergub_jabar_82', name: 'Pergub Jabar No. 660.31/SK/624/BKPMD/82', description: 'Standar Baku Mutu Udara Ambien di Jawa Barat.' },
  ];

  return (
    <Card className="w-full max-w-4xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pilih Standar Baku Mutu Air Ambient</CardTitle>
          <Button variant="outline" onClick={onBack}>Kembali</Button>
        </div>
        <CardDescription>
          Pilih standar peraturan yang akan digunakan sebagai acuan pada sertifikat analisis.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
