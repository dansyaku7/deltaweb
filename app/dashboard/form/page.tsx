'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Printer } from "lucide-react";
import FormDasar from "./components/FormDasar";
import FormRincian from "./components/FormRincian";
import { FppsDocument } from "./FppsDocument";
import { toast } from "sonner";

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomorFpps: "",
    nomorQuotation: "",
    petugas: "",
    namaPelanggan: "",
    alamatPelanggan: "",
    noTelp: "",
    tanggalMasuk: "",
    kegiatan: "",
  });
  const [rincian, setRincian] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleSimpanDanPreview = async () => {
    const nomorFppsFinal = `DIL-${formData.nomorFpps}`;
    const payload = { formData: { ...formData, nomorFpps: nomorFppsFinal }, rincian };

    try {
      const res = await fetch("/api/fpps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      toast.success(`Data untuk ${nomorFppsFinal} berhasil disimpan!`);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data!");
    }
  };

  const handlePrint = () => {
    document.body.classList.add('print-mode-fpps');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('print-mode-fpps');
    }, 500);
  };

  return (
    <div className="print-container">
      <div className="space-y-8 no-print">
        <div className="px-4 md:px-8 lg:px-6 pt-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
            Form Pendaftaran Pengujian
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">
            Silakan isi data pelanggan dan rincian pengujian secara lengkap di bawah ini.
          </p>
        </div>

        {step === 1 ? (
          <FormDasar
            formData={formData}
            setFormData={setFormData}
            goToStep2={() => setStep(2)}
          />
        ) : (
          <FormRincian
            formData={formData}
            rincian={rincian}
            setRincian={setRincian}
            goBack={() => setStep(1)}
            onSubmit={handleSimpanDanPreview}
            onPrint={() => setIsPreviewOpen(true)}
          />
        )}
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col no-print">
          <DialogHeader>
            <DialogTitle>Pratinjau Dokumen</DialogTitle>
            <DialogDescription>
              Dokumen siap dicetak. Klik tombol Print untuk melanjutkan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-auto p-4 bg-gray-200">
            <FppsDocument
              data={{ ...formData, nomorFpps: `DIL-${formData.nomorFpps}`, rincian }}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsPreviewOpen(false)}
            >
              Batal
            </Button>
            <Button type="button" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="print-only">
        <FppsDocument
          data={{ ...formData, nomorFpps: `DIL-${formData.nomorFpps}`, rincian }}
        />
      </div>
    </div>
  );
}