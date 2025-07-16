'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TemplateSelection({ templates, onSelectTemplate, onBack }) {
  return (
    <Card className="w-full max-w-4xl bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Langkah 2: Pilih Template Halaman Lanjutan</CardTitle>
          <Button variant="outline" onClick={onBack}>Kembali</Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => (
          <Button key={template.id} variant="secondary" className="h-20 text-base" onClick={() => onSelectTemplate(template.id)}>
            {template.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}