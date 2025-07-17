'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  onSelect: (regulationId: string) => void;
  onBack: () => void;
}

export function WastewaterRegulationSelection({ onSelect, onBack }: Props) {
  const regulations = [
    { id: 'menlhk_p68', name: 'PermenLHK P.68/2016 (Limbah Domestik)' },
    { id: 'jababeka', name: 'Kawasan Industri Jababeka' },
    { id: 'surya_cipta', name: 'Kawasan Industri Surya Cipta' },
    { id: 'mm2100', name: 'Kawasan Industri MM2100' },
    { id: 'mm2100_cat_c', name: 'Kawasan Industri MM2100 (Kat. C)' },
    { id: 'lippo_cikarang', name: 'Kawasan Industri Lippo Cikarang' },
    { id: 'kiic', name: 'Karawang International Industrial City (KIIC)' },
    { id: 'permenlh_5_2014_xxix', name: 'PermenLH 5/2014 (Lamp. XXIX)' },
    { id: 'permenlh_5_2014_xlvii', name: 'PermenLH 5/2014 (Lamp. XLVII)' },
    { id: 'pergub_dki_69_2013', name: 'Pergub DKI Jakarta 69/2013' },
    { id: 'bekasi_fajar', name: 'Kawasan Industri Bekasi Fajar (MM2100)' },
    { id: 'giic', name: 'Greenland International Industrial Center (GIIC)' },
  ];

  return (
    <Card className="w-full max-w-4xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pilih Standar Baku Mutu Wastewater</CardTitle>
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
            </button>
        ))}
      </CardContent>
    </Card>
  );
}
