'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchCardProps {
  fppsInput: string;
  setFppsInput: (value: string) => void;
  handleCariFpps: () => void;
  isLoading: boolean;
}

export function SearchCard({ fppsInput, setFppsInput, handleCariFpps, isLoading }: SearchCardProps) {
  return (
    <Card className="w-full max-w-lg bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>Cari Data FPPS</CardTitle>
        <CardDescription>Masukkan nomor FPPS untuk mengambil data customer.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full items-center space-x-2">
          <Input type="text" placeholder="Ketik nomornya saja, cth: 001" value={fppsInput} onChange={(e) => setFppsInput(e.target.value)} className="bg-slate-800 border-slate-700 text-white" />
          <Button onClick={handleCariFpps} disabled={isLoading}><Search className="mr-2 h-4 w-4" />{isLoading ? 'Mencari...' : 'Cari'}</Button>
        </div>
      </CardContent>
    </Card>
  );
}