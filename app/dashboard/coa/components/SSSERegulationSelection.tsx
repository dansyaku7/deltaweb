// components/SSSERegulationSelection.tsx

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  onSelect: (regulationId: string) => void;
  onBack: () => void;
}

export function SSSERegulationSelection({ onSelect, onBack }: Props) {
  const regulations = [
    { id: 'permenlh_13_Vb', name: 'Permen LH No. 13/1995 Lamp. VB', description: 'Standar Baku Mutu Emisi Umum.' },
    { id: 'permenlh_7_III', name: 'Permen LH No. 07/2007 Lamp. III', description: 'Ketel Uap - Bahan Bakar Biomassa.' },
    { id: 'permenlh_7_IV', name: 'Permen LH No. 07/2007 Lamp. IV', description: 'Ketel Uap - Bahan Bakar Batubara.' },
    { id: 'permenlh_7_V', name: 'Permen LH No. 07/2007 Lamp. V', description: 'Ketel Uap - Bahan Bakar Minyak.' },
    { id: 'permenlh_7_VI', name: 'Permen LH No. 07/2007 Lamp. VI', description: 'Ketel Uap - Bahan Bakar Gas.' },
    { id: 'permenlh_21_IIIA', name: 'Permen LH No. 21/2008 Lamp. III A', description: 'PLTD < 500 HP.' },
    { id: 'permenlh_21_IVA', name: 'Permen LH No. 21/2008 Lamp. IV A', description: 'PLTD > 500 HP.' },
    { id: 'permenlhk_11_I1', name: 'Permen LHK No. 11/2021 Lamp. I No. 1', description: 'Genset > 500 HP (Gas).' },
    { id: 'permenlhk_11_I2', name: 'Permen LHK No. 11/2021 Lamp. I No. 2', description: 'Genset > 500 HP (Diesel).' },
    { id: 'permenlhk_11_I3', name: 'Permen LHK No. 11/2021 Lamp. I No. 3', description: 'Genset > 500 HP (Dual Fuel).' },
    { id: 'permenlhk_15_IIIA', name: 'Permen LHK No. P.15/2019 Lamp. III A', description: 'Pembangkit Listrik Tenaga Termal (Batubara).' },
    { id: 'permenlhk_15_IXA', name: 'Permen LHK No. P.15/2019 Lamp. IX A', description: 'PLTGU (Gas).' },
    { id: 'permenlhk_15_IXB', name: 'Permen LHK No. P.15/2019 Lamp. IX B', description: 'PLTGU (Minyak).' },
    { id: 'kepgub_dki_670_III', name: 'Kepgub DKI No. 670/2000 Lamp. III', description: 'Standar Baku Mutu Emisi DKI Jakarta.' },
  ];

  return (
    <Card className="w-full max-w-4xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pilih Standar Baku Mutu Emisi</CardTitle>
          <Button variant="outline" onClick={onBack}>Kembali</Button>
        </div>
        <CardDescription>
          Pilih standar peraturan yang akan digunakan sebagai acuan pada sertifikat analisis emisi sumber tidak bergerak.
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
