'use client';

import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

// Impor komponen-komponen kecil yang reusable
import { SearchCard } from './components/SearchCard';
import { CoverForm } from './components/CoverForm';
import { TemplateSelection } from './components/TemplateSelection';
import { WastewaterForm } from './components/WastewaterForm';
import { HeatStressForm } from './components/HeatStressForm';
import { IlluminationForm } from './components/IlluminationForm';

// Impor dokumen-dokumen untuk dicetak
import { CoaCoverDocument } from './CoaCoverDocument';
import { TemplateWastewaterDocument } from './TemplateWastewaterDocument'; 
import { TemplateHeatStressDocument } from './TemplateHeatStressDocument';
import { TemplateIlluminationDocument } from './TemplateIlluminationDocument';

// Impor data-data statis
import { wastewaterParameters } from './data/wastewater-parameters';
import { defaultIlluminationRow } from './data/illumination-data';

// Daftar template yang tersedia
const coaTemplates = [
  { id: 'wastewater', name: 'Template CoA Wastewater' },
  { id: 'heatstress', name: 'Template CoA Heat Stress' },
  { id: 'illumination', name: 'Template CoA Illumination' },
];

// Tipe data untuk form utama (Cover)
interface CoaData {
  nomorFpps: string; customer: string; address: string; phone: string; contactName: string;
  subjects: string[]; sampleTakenBy: string[];
  receiveDate: Date | undefined; analysisDateStart: Date | undefined;
  analysisDateEnd: string; reportDate: string;
  signatureUrl: string | null; directorName: string; showKanLogo: boolean;
  certificateNo: string;
}

// Tipe data untuk baris hasil Heat Stress
interface HeatStressResultRow {
  id: number;
  location: string;
  time: string;
  humidity: string;
  wetTemp: string;
  dewTemp: string;
  globeTemp: string;
}

// Tipe data untuk baris hasil Illumination
interface IlluminationResultRow {
  id: number; isVisible: boolean;
  location: string; result: string; time: string; 
  standard: string; unit: string; method: string;
}

export default function CoaPage() {
  // State untuk alur kerja dan UI
  const [step, setStep] = useState(1);
  const [fppsInput, setFppsInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  // State untuk data form utama (Cover)
  const [coaData, setCoaData] = useState<CoaData | null>(null);
  
  // State khusus untuk template Wastewater
  const [editableWastewaterParams, setEditableWastewaterParams] = useState<any[]>([]);
  const [wastewaterNotes, setWastewaterNotes] = useState('');
  const [wastewaterSampleInfo, setWastewaterSampleInfo] = useState({ sampleNo: '', samplingLocation: '', samplingTime: '' });
  
  // State khusus untuk template Heat Stress
  const [heatStressResults, setHeatStressResults] = useState<HeatStressResultRow[]>([]);
  const [heatStressSampleInfo, setHeatStressSampleInfo] = useState({ sampleNo: '', samplingDate: '', samplingTime: '', dateReceived: '', intervalTestingDate: '' });

  // State khusus untuk template Illumination
  const [illuminationResults, setIlluminationResults] = useState<IlluminationResultRow[]>([]);
  const [illuminationSampleInfo, setIlluminationSampleInfo] = useState({ sampleNo: '', samplingLocation: '', samplingDate: '', samplingTime: '', dateReceived: '', intervalTestingDate: '' });

  // State untuk dialog pratinjau
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewNode, setPreviewNode] = useState<React.ReactNode>(null);
  const documentRef = useRef<HTMLDivElement>(null);

  // useEffect untuk menghitung tanggal akhir analisis
  useEffect(() => {
    if (coaData && coaData.analysisDateStart) {
      const startDate = coaData.analysisDateStart;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 14);
      setCoaData(prev => prev ? { ...prev, analysisDateEnd: format(endDate, 'MMMM dd, yyyy', { locale: id }),} : null);
    }
  }, [coaData?.analysisDateStart]);

  // useEffect untuk membuat nomor sertifikat otomatis
  useEffect(() => {
    if (coaData && coaData.nomorFpps) {
      const fppsNumber = coaData.nomorFpps.split('-')[1] || '';
      const certNo = `${fppsNumber}COA`;
      handleCoaChange('certificateNo', certNo);
    }
  }, [coaData?.nomorFpps]);

  // Fungsi untuk mencari data FPPS via API
  const handleCariFpps = async () => {
    if (!fppsInput) { alert('Masukkan Nomor FPPS.'); return; }
    setIsLoading(true); setCoaData(null);
    const searchKey = `DIL-${fppsInput}`;
    try {
      const response = await fetch(`/api/fpps/${searchKey}`);
      if (!response.ok) throw new Error('Data tidak ditemukan');
      const fppsData = await response.json();
      setCoaData({
        nomorFpps: fppsData.formData.nomorFpps, customer: fppsData.formData.namaPelanggan,
        address: fppsData.formData.alamatPelanggan, phone: fppsData.formData.noTelp,
        contactName: fppsData.formData.contactPerson || 'Bapak/Ibu...', subjects: [],
        sampleTakenBy: ["PT. Delta Indonesia Laboratory"], receiveDate: undefined,
        analysisDateStart: undefined, analysisDateEnd: '',
        reportDate: format(new Date(), 'MMMM dd, yyyy', { locale: id }),
        signatureUrl: null, directorName: 'Drs. H. Soekardin Rachman, M.Si',
        showKanLogo: true, certificateNo: '',
      });
    } catch (error) {
      console.error(error); alert('Data tidak ditemukan atau terjadi kesalahan.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler generik untuk mengubah state coaData
  const handleCoaChange = (field: keyof CoaData, value: any) => {
    setCoaData(prev => prev ? { ...prev, [field]: value } : null);
  };
  
  // Handler untuk checkbox
  const handleCheckboxChange = (field: 'subjects' | 'sampleTakenBy', value: string) => {
    if (!coaData) return;
    const currentValues = coaData[field];
    const newValues = currentValues.includes(value) ? currentValues.filter(v => v !== value) : [...currentValues, value];
    handleCoaChange(field, newValues);
  };

  // Handler untuk upload file
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { handleCoaChange('signatureUrl', reader.result as string); };
      reader.readAsDataURL(file);
    }
  };
  
  // Handler untuk tombol "Selanjutnya" dari form cover
  const handlePilihTemplate = () => {
    if (!coaData?.receiveDate || !coaData.analysisDateStart) {
        alert('Harap lengkapi semua tanggal terlebih dahulu.');
        return;
    }
    setStep(2);
  };

  // Handler saat template dipilih
  const handleTemplateSelect = (templateId: string) => {
    if (templateId === 'wastewater') {
      setEditableWastewaterParams(wastewaterParameters.map(p => ({ ...p, testingResult: '', isVisible: true })));
      setWastewaterNotes('');
      setWastewaterSampleInfo({ sampleNo: '', samplingLocation: '', samplingTime: '' });
    } else if (templateId === 'heatstress') {
      setHeatStressResults([{ id: Date.now(), location: '', time: '', humidity: '', wetTemp: '', dewTemp: '', globeTemp: '' }]);
      setHeatStressSampleInfo({ sampleNo: '', samplingDate: '', samplingTime: '', dateReceived: '', intervalTestingDate: '' });
    } else if (templateId === 'illumination') {
      setIlluminationResults([{ id: Date.now(), ...defaultIlluminationRow }]);
      setIlluminationSampleInfo({ sampleNo: '', samplingLocation: '', samplingDate: '', samplingTime: '', dateReceived: '', intervalTestingDate: '' });
    }
    setSelectedTemplate(templateId);
    setStep(3);
  };

  // Handlers untuk form Wastewater
  const handleWastewaterParamChange = (index: number, field: string, value: string) => { /* ... */ };
  const toggleWastewaterParamVisibility = (index: number) => { /* ... */ };
  const handleWastewaterSampleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };

  // Handlers untuk form Heat Stress
  const handleHeatStressChange = (index: number, field: string, value: string) => {
    const updatedResults = [...heatStressResults];
    updatedResults[index] = { ...updatedResults[index], [field]: value };
    setHeatStressResults(updatedResults);
  };
  const addHeatStressRow = () => {
    setHeatStressResults(prev => [...prev, { id: Date.now(), location: '', time: '', humidity: '', wetTemp: '', dewTemp: '', globeTemp: '' }]);
  };
  const removeHeatStressRow = (index: number) => {
    setHeatStressResults(prev => prev.filter((_, i) => i !== index));
  };
  const handleHeatStressSampleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHeatStressSampleInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Handlers untuk form Illumination
  const handleIlluminationResultChange = (index: number, field: string, value: string) => {
    const updatedResults = [...illuminationResults];
    updatedResults[index] = { ...updatedResults[index], [field]: value };
    setIlluminationResults(updatedResults);
  };
  const addIlluminationRow = () => {
    setIlluminationResults(prev => [...prev, { id: Date.now(), ...defaultIlluminationRow }]);
  };
  const removeIlluminationRow = (index: number) => {
    setIlluminationResults(prev => prev.filter((_, i) => i !== index));
  };
  const toggleIlluminationRowVisibility = (index: number) => {
    const updatedResults = [...illuminationResults];
    updatedResults[index].isVisible = !updatedResults[index].isVisible;
    setIlluminationResults(updatedResults);
  };
  const handleIlluminationSampleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIlluminationSampleInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handler untuk pratinjau dan print
  const handlePreview = (node: React.ReactNode) => {
    setPreviewNode(node);
    setIsPreviewOpen(true);
  };
  const handlePrint = () => { window.print(); };

  return (
    <>
      {coaData && (
        <div className="print-only" ref={documentRef}>
          <CoaCoverDocument data={coaData} />
          <div className="page-break"></div> 
          
          {selectedTemplate === 'wastewater' && (
            <TemplateWastewaterDocument data={{ 
              parameters: editableWastewaterParams.filter(p => p.isVisible), 
              notes: wastewaterNotes, certificateNo: coaData.certificateNo,
              sampleInfo: { ...wastewaterSampleInfo, /* ...data tanggal otomatis */ },
              showKanLogo: coaData.showKanLogo
            }} />
          )}
          {selectedTemplate === 'heatstress' && (
            <TemplateHeatStressDocument data={{ 
              results: heatStressResults, 
              sampleInfo: { ...heatStressSampleInfo,
                samplingDate: coaData.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : '',
                dateReceived: coaData.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : '',
                intervalTestingDate: coaData.analysisDateStart ? `${format(coaData.analysisDateStart, 'MMMM dd, yyyy', { locale: id })} to ${coaData.analysisDateEnd}` : ''
              },
              certificateNo: coaData.certificateNo, 
              showKanLogo: coaData.showKanLogo 
            }} />
          )}
          {selectedTemplate === 'illumination' && (
            <TemplateIlluminationDocument data={{ 
              results: illuminationResults.filter(r => r.isVisible), 
              sampleInfo: { ...illuminationSampleInfo,
                samplingDate: coaData.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : '',
                dateReceived: coaData.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : '',
                intervalTestingDate: coaData.analysisDateStart ? `${format(coaData.analysisDateStart, 'MMMM dd, yyyy', { locale: id })} to ${coaData.analysisDateEnd}` : ''
              },
              certificateNo: coaData.certificateNo, 
              showKanLogo: coaData.showKanLogo 
            }} />
          )}
        </div>
      )}
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Certificate of Analysis (COA)</h1>
          <p className="text-slate-400 mt-1">
            {step === 1 && 'Langkah 1: Lengkapi data utama.'}
            {step === 2 && 'Langkah 2: Pilih template.'}
            {step === 3 && `Langkah 3: Isi data untuk template ${selectedTemplate}.`}
          </p>
        </div>

        {step === 1 && (
          <>
            <SearchCard fppsInput={fppsInput} setFppsInput={setFppsInput} handleCariFpps={handleCariFpps} isLoading={isLoading} />
            {coaData && <CoverForm coaData={coaData} handleCheckboxChange={handleCheckboxChange} handleCoaChange={handleCoaChange} handleSignatureUpload={handleSignatureUpload} onNextStep={handlePilihTemplate} onPreview={() => handlePreview(<CoaCoverDocument data={coaData} />)} />}
          </>
        )}
        {step === 2 && <TemplateSelection templates={coaTemplates} onSelectTemplate={handleTemplateSelect} onBack={() => setStep(1)} />}
        
        {step === 3 && selectedTemplate === 'wastewater' && (
          <WastewaterForm
            parameters={editableWastewaterParams}
            onParameterChange={handleWastewaterParamChange}
            onToggleVisibility={toggleWastewaterParamVisibility}
            notes={wastewaterNotes}
            onNotesChange={setWastewaterNotes}
            sampleInfo={wastewaterSampleInfo}
            onSampleInfoChange={handleWastewaterSampleInfoChange}
            autoFilledData={{
              samplingDate: coaData?.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : 'Pilih Tanggal di Hal. 1',
              intervalTestingDate: coaData?.analysisDateEnd ? `${format(coaData.analysisDateStart, 'MMMM dd, yyyy', { locale: id })} to ${coaData.analysisDateEnd}` : 'Pilih Tanggal di Hal. 1'
            }}
            showKanLogo={coaData.showKanLogo}
            onKanLogoChange={(checked) => handleCoaChange('showKanLogo', checked)}
            onPreview={() => handlePreview(
              <TemplateWastewaterDocument data={{ 
                parameters: editableWastewaterParams.filter(p => p.isVisible), 
                notes: wastewaterNotes, 
                certificateNo: coaData?.certificateNo,
                sampleInfo: { ...wastewaterSampleInfo,
                  samplingDate: coaData.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : '',
                  dateReceived: coaData.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : '',
                  intervalTestingDate: coaData.analysisDateStart ? `${format(coaData.analysisDateStart, 'MMMM dd, yyyy', { locale: id })} to ${coaData.analysisDateEnd}` : ''
                },
                showKanLogo: coaData.showKanLogo 
              }} />
            )}
            onBack={() => setStep(2)}
          />
        )}
        
        {step === 3 && selectedTemplate === 'heatstress' && (
          <HeatStressForm
            results={heatStressResults}
            onChange={handleHeatStressChange}
            onAddRow={addHeatStressRow}
            onRemoveRow={removeHeatStressRow}
            sampleInfo={heatStressSampleInfo}
            onSampleInfoChange={handleHeatStressSampleInfoChange}
            autoFilledData={{
              samplingDate: coaData?.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : '',
              dateReceived: coaData?.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : '',
              intervalTestingDate: coaData?.analysisDateEnd ? `${format(coaData.analysisDateStart, 'MMMM dd, yyyy', { locale: id })} to ${coaData.analysisDateEnd}` : 'Pilih Tanggal di Hal. 1'
            }}
            onPreview={() => handlePreview(
              <TemplateHeatStressDocument data={{ 
                results: heatStressResults, 
                sampleInfo: {
                  ...heatStressSampleInfo,
                  samplingDate: coaData?.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : '',
                  dateReceived: coaData?.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : '',
                  intervalTestingDate: coaData?.analysisDateStart ? `${format(coaData.analysisDateStart, 'MMMM dd, yyyy', { locale: id })} to ${coaData.analysisDateEnd}` : ''
                },
                certificateNo: coaData?.certificateNo, 
                showKanLogo: coaData.showKanLogo 
              }} />
            )}
            onBack={() => setStep(2)}
          />
        )}

        {step === 3 && selectedTemplate === 'illumination' && (
          <IlluminationForm
            results={illuminationResults}
            onChange={handleIlluminationResultChange}
            onAddRow={addIlluminationRow}
            onRemoveRow={removeIlluminationRow}
            onToggleVisibility={toggleIlluminationRowVisibility}
            sampleInfo={illuminationSampleInfo}
            onSampleInfoChange={handleIlluminationSampleInfoChange}
            autoFilledData={{
              samplingDate: coaData?.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : 'Pilih Tanggal di Hal. 1',
              dateReceived: coaData?.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : 'Pilih Tanggal di Hal. 1',
              intervalTestingDate: coaData?.analysisDateEnd ? `${format(coaData.analysisDateStart, 'MMMM dd, yyyy', { locale: id })} to ${coaData.analysisDateEnd}` : 'Pilih Tanggal di Hal. 1'
            }}
            showKanLogo={coaData.showKanLogo}
            onKanLogoChange={(checked) => handleCoaChange('showKanLogo', checked)}
            onPreview={() => handlePreview(
              <TemplateIlluminationDocument data={{ 
                results: illuminationResults.filter(r => r.isVisible), 
                sampleInfo: {
                  ...illuminationSampleInfo,
                  samplingDate: coaData?.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : '',
                  dateReceived: coaData?.receiveDate ? format(coaData.receiveDate, "MMMM dd, yyyy", { locale: id }) : '',
                  intervalTestingDate: coaData?.analysisDateStart ? `${format(coaData.analysisDateStart, 'MMMM dd, yyyy', { locale: id })} to ${coaData.analysisDateEnd}` : ''
                },
                certificateNo: coaData?.certificateNo, 
                showKanLogo: coaData.showKanLogo 
              }} />
            )}
            onBack={() => setStep(2)}
          />
        )}
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col bg-gray-200">
          <DialogHeader className='bg-white px-6 pt-6 rounded-t-lg'><DialogTitle>Pratinjau Dokumen</DialogTitle><DialogDescription>Ini adalah pratinjau halaman yang sedang Anda kerjakan. Tombol "Print" akan mencetak keseluruhan dokumen.</DialogDescription></DialogHeader>
          <div className="flex-grow overflow-auto p-4">{previewNode}</div>
          <DialogFooter className='bg-white px-6 pb-6 rounded-b-lg'>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Tutup</Button>
            <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" />Print Semua Halaman</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}