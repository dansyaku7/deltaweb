'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PlusCircle, Save, Printer, FileText, Pencil, Trash2, Loader2 } from 'lucide-react';

interface Props {
  templates: any[];
  onAddNew: () => void;
  onEdit: (templateId: string) => void;
  onRemove: (templateId: string) => void;
  onSave: () => void;
  onPrint: () => void;
  isSaving: boolean; 
}

// Fungsi untuk membuat nama template lebih deskriptif
const getTemplateDisplayName = (template: any) => {
  switch (template.templateType) {
    case 'odor':
      if (template.regulation === 'permenaker_a') return 'Odor - Permenaker (Set A)';
      if (template.regulation === 'permenaker_b') return 'Odor - Permenaker (Set B)';
      if (template.regulation === 'kepmenlh') return 'Odor - Kepmen LH 1996';
      return 'Odor';
    case 'illumination':
      return 'Illumination';
    case 'heatstress':
      return 'Heat Stress (Iklim Kerja)';
    case 'wastewater':
      return 'Wastewater';
    case 'cleanwater':
      return 'Clean Water';
    case 'workplaceair':
      return 'Workplace Air';
    case 'surfacewater':
      return 'Surface Water';
    case 'vibration':
      return 'Vibration';
    // --- TEMPLATE BARU DITAMBAHKAN DI SINI ---
    case 'airambient':
      return 'Air Ambient';
    case 'ssse':
      return 'Stationary Source Emission';
    case 'ispu':
      return 'ISPU (Indeks Standar Pencemar Udara)';
    case 'nonsse':
      return 'Non-Stationary Source Emission';
    case 'noise':
      return 'Noise';
    default:
      return 'Template Tidak Dikenal';
  }
};

export function ReportDashboard({
  templates,
  onAddNew,
  onEdit,
  onRemove,
  onSave,
  onPrint,
  isSaving,
}: Props) {
  return (
    <Card className="w-full max-w-4xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <CardTitle>Dashboard Laporan</CardTitle>
                <CardDescription className="mt-1">
                    Tambahkan, edit, atau hapus template untuk laporan ini.
                </CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="outline" onClick={onSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    {isSaving ? 'Menyimpan...' : 'Simpan'}
                </Button>
                <Button onClick={onPrint}><Printer className="w-4 h-4 mr-2" /> Cetak Semua</Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border border-slate-800 rounded-lg">
          <div className="p-4 border-b border-slate-800">
            <h3 className="font-semibold text-white">Template Ditambahkan</h3>
          </div>
          {templates.length === 0 ? (
            <div className="p-6 text-center text-slate-400">
              <p>Belum ada template yang ditambahkan.</p>
              <p className="text-sm">Klik tombol "Tambah Template Baru" untuk memulai.</p>
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {templates.map((template, index) => (
                <div key={template.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="font-medium text-white">{getTemplateDisplayName(template)}</p>
                      <p className="text-xs text-slate-400">Urutan Halaman: {index + 2}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white" onClick={() => onEdit(template.id)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-red-500" onClick={() => onRemove(template.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onAddNew} className="w-full">
          <PlusCircle className="w-4 h-4 mr-2" />
          Tambah Template Baru
        </Button>
      </CardFooter>
    </Card>
  );
}
