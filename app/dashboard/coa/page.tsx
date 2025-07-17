// app/dashboard/coa/page.tsx (Ganti seluruh isi file)

'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useSearchParams, useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Printer, Loader2 } from 'lucide-react';
import { nanoid } from 'nanoid';

// --- Impor Komponen UI & Form ---
import { SearchCard } from './components/SearchCard';
import { CoverForm } from './components/CoverForm';
import { TemplateSelection } from './components/TemplateSelection';
import { ReportDashboard } from './components/ReportDashboard';
import { IlluminationForm } from './components/IlluminationForm';
import { HeatStressForm } from './components/HeatStressForm';
import { OdorRegulationSelection } from './components/OdorRegulationSelection';
import { OdorForm } from './components/OdorForm';
import { WastewaterRegulationSelection } from './components/WastewaterRegulationSelection';
import { WastewaterForm } from './components/WastewaterForm';
import { CleanWaterRegulationSelection } from './components/CleanWaterRegulationSelection';
import { CleanWaterForm } from './components/CleanWaterForm';
import { WorkplaceAirRegulationSelection } from './components/WorkplaceAirRegulationSelection';
import { WorkplaceAirForm } from './components/WorkplaceAirForm';
import { SurfaceWaterRegulationSelection } from './components/SurfaceWaterRegulationSelection';
import { SurfaceWaterForm } from './components/SurfaceWaterForm';
import { VibrationRegulationSelection } from './components/VibrationRegulationSelection';
import { VibrationForm } from './components/VibrationForm';
import { AirAmbientRegulationSelection } from './components/AirAmbientRegulationSelection';
import { AirAmbientForm } from './components/AirAmbientForm';
import { SSSERegulationSelection } from './components/SSSERegulationSelection';
import { SSSEForm } from './components/SSSEForm';
import { ISPUForm } from './components/ISPUForm';
import { NonSSEForm } from './components/NonSSEForm';
import { NoiseRegulationSelection } from './components/NoiseRegulationSelection';
import { NoiseForm } from './components/NoiseForm';
import { QrCodeModal } from './components/QrCodeModal';


// --- Impor Dokumen Cetak ---
import { CoaCoverDocument } from './CoaCoverDocument';
import { TemplateIlluminationDocument } from './TemplateIlluminationDocument';
import { TemplateHeatStressDocument } from './TemplateHeatStressDocument';
import { TemplateOdorDocument } from './TemplateOdorDocument';
import { TemplateWastewaterDocument } from './TemplateWastewaterDocument';
import { TemplateCleanWaterDocument } from './TemplateCleanWaterDocument';
import { TemplateWorkplaceAirDocument } from './TemplateWorkplaceAirDocument';
import { TemplateSurfaceWaterDocument } from './TemplateSurfaceWaterDocument';
import { TemplateVibrationDocument } from './TemplateVibrationDocument';
import { TemplateAirAmbientDocument } from './TemplateAirAmbientDocument';
import { TemplateSSSEDocument } from './TemplateSSSEDocument';
import { TemplateISPUDocument } from './TemplateISPUDocument';
import { TemplateNonSSEDocument } from './TemplateNonSSEDocument';
import { TemplateNoiseDocument } from './TemplateNoiseDocument';


// --- Impor Data Default ---
import { defaultIlluminationRow } from './data/illumination-data';
import { defaultHeatStressRow, defaultHeatStressSampleInfo } from './data/heatstress-data';
import { odorParamsPermenakerA, odorParamsPermenakerB, odorParamsKepmenLH, defaultOdorSampleInfo } from './data/odor-data';
import * as wastewaterData from './data/wastewater-data';
import * as cleanwaterData from './data/cleanwater-data';
import * as workplaceairData from './data/workplaceair-data';
import * as surfacewaterData from './data/surfacewater-data';
import * as vibrationData from './data/vibration-data';
import * as airambientData from './data/airambient-data';
import * as ssseData from './data/ssse-data';
import * as ispuData from './data/ispu-data';
import * as nonsseData from './data/non-sse-data';
import * as noiseData from './data/noise-data';


// --- Tipe Data & Konfigurasi ---
const coaTemplates = [
    { id: 'illumination', name: 'Template CoA Illumination' },
    { id: 'heatstress', name: 'Template CoA Heat Stress' },
    { id: 'odor', name: 'Template CoA Odor' },
    { id: 'wastewater', name: 'Template CoA Wastewater' },
    { id: 'cleanwater', name: 'Template CoA Clean Water' },
    { id: 'workplaceair', name: 'Template CoA Workplace Air' },
    { id: 'surfacewater', name: 'Template CoA Surface Water' },
    { id: 'vibration', name: 'Template CoA Vibration' },
    { id: 'airambient', name: 'Template CoA Air Ambient' },
    { id: 'ssse', name: 'Template CoA SSSE' },
    { id: 'ispu', name: 'Template CoA ISPU' },
    { id: 'nonsse', name: 'Template CoA Non-SSE' },
    { id: 'noise', name: 'Template CoA Noise' },
];

type ViewState = 'search' | 'cover' | 'dashboard' | 'template_selection' | 'form' | 'loading';

export default function CoaPage() {
    const [view, setView] = useState<ViewState>('search');
    const [fppsInput, setFppsInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<any | null>(null);
    const [coaData, setCoaData] = useState<any | null>(null);
    const [activeTemplates, setActiveTemplates] = useState<any[]>([]);
    const [reportId, setReportId] = useState<string | null>(null);

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewNode, setPreviewNode] = useState<React.ReactNode>(null);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const idFromUrl = searchParams.get('id');
        if (idFromUrl && idFromUrl !== reportId) { 
            const loadReport = async () => {
                setView('loading');
                try {
                    const response = await fetch(`/api/reports/${idFromUrl}`);
                    const result = await response.json();
                    if (result.success) {
                        const report = result.data;
                        const coverDataWithDates = {
                            ...report.coverData,
                            receiveDate: report.coverData.receiveDate ? new Date(report.coverData.receiveDate) : undefined,
                            analysisDateStart: report.coverData.analysisDateStart ? new Date(report.coverData.analysisDateStart) : undefined,
                        };
                        setCoaData(coverDataWithDates);
                        setActiveTemplates(report.activeTemplates);
                        setReportId(report._id);
                        setView('dashboard');
                    } else {
                        alert('Gagal memuat laporan.');
                        router.push('/dashboard/coa');
                    }
                } catch (error) {
                    alert('Terjadi kesalahan saat memuat laporan.');
                    router.push('/dashboard/coa');
                }
            };
            loadReport();
        }
    }, [searchParams, router, reportId]);

    useEffect(() => {
        if (coaData && coaData.analysisDateStart) {
            const startDate = new Date(coaData.analysisDateStart);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 14);
            setCoaData(prev => ({ ...prev, analysisDateEnd: format(endDate, 'MMMM dd, yyyy', { locale: id }) }));
        }
    }, [coaData?.analysisDateStart]);

    const handleCariFpps = async () => {
        if (!fppsInput) return alert('Masukkan Nomor FPPS.');
        setIsLoading(true);
        const searchKey = `DIL-${fppsInput}`;
        try {
            const response = await fetch(`/api/fpps/${searchKey}`);
            if (!response.ok) throw new Error('Data tidak ditemukan');
            const fppsData = await response.json();
            
            // --- MODIFIKASI DIMULAI DI SINI ---
            // 1. Buat ID unik baru di frontend
            const newReportId = nanoid(24); 

            // 2. Set ID ini ke state, sehingga bisa langsung digunakan
            setReportId(newReportId);
            // --- AKHIR MODIFIKASI ---
            
            setCoaData({
                nomorFpps: fppsData.formData.nomorFpps, customer: fppsData.formData.namaPelanggan, address: fppsData.formData.alamatPelanggan, phone: fppsData.formData.noTelp,
                contactName: fppsData.formData.contactPerson || 'Bapak/Ibu...', subjects: [], sampleTakenBy: ["PT. Delta Indonesia Laboratory"],
                receiveDate: undefined, analysisDateStart: undefined, analysisDateEnd: '',
                reportDate: format(new Date(), 'MMMM dd, yyyy', { locale: id }),
                signatureUrl: null, directorName: 'Drs. H. Soekardin Rachman, M.Si', certificateNo: '',
            });
            setView('cover');
        } catch (error) {
            console.error(error);
            alert('Data tidak ditemukan atau terjadi kesalahan.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSaveReport = async () => {
        if (!coaData || !reportId) return alert('Data cover atau ID Laporan tidak lengkap.');
        setIsLoading(true);

        // --- MODIFIKASI DIMULAI DI SINI ---
        // Kirim _id yang sudah dibuat frontend ke backend saat membuat laporan baru
        const reportPayload = {
            _id: reportId, // Tambahkan _id ke payload
            coverData: coaData,
            activeTemplates: activeTemplates,
        };
        // --- AKHIR MODIFIKASI ---

        try {
            let response;
            // Cek apakah ini update (PUT) atau pembuatan baru (POST)
            const resCheck = await fetch(`/api/reports/${reportId}`);
            const isExisting = resCheck.ok;

            if (isExisting) {
                // Laporan sudah ada, gunakan metode PUT untuk update
                response = await fetch(`/api/reports/${reportId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ coverData: coaData, activeTemplates: activeTemplates }), // Saat PUT, tidak perlu kirim _id di body
                });
            } else {
                // Laporan belum ada, gunakan metode POST untuk membuat baru
                response = await fetch('/api/reports', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reportPayload), // Kirim payload lengkap dengan _id
                });
            }

            const result = await response.json();
            if (result.success) {
                alert('Laporan berhasil disimpan!');
                if (!isExisting) {
                    // Update URL jika ini adalah penyimpanan pertama kali
                    router.push(`/dashboard/coa?id=${result.data._id}`, { scroll: false });
                }
            } else {
                throw new Error(result.error || 'Gagal menyimpan laporan.');
            }
        } catch (error) {
            console.error("Save error:", error);
            alert(`Gagal menyimpan laporan: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrint = () => window.print();
    const handlePreview = (node: React.ReactNode) => { setPreviewNode(node); setIsPreviewOpen(true); };
    const handleCoaChange = (field: string, value: any) => setCoaData((prev: any) => ({ ...prev, [field]: value }));
    const handleCheckboxChange = (field: 'subjects' | 'sampleTakenBy', value: string) => {
        const currentValues = coaData[field] || [];
        const newValues = currentValues.includes(value) ? currentValues.filter((v: string) => v !== value) : [...currentValues, value];
        handleCoaChange(field, newValues);
    };
    
    const addOrUpdateTemplate = (templateData: any) => {
        const existingIndex = activeTemplates.findIndex(t => t.id === templateData.id);
        if (existingIndex > -1) {
            setActiveTemplates(prev => prev.map(t => t.id === templateData.id ? templateData : t));
        } else {
            setActiveTemplates(prev => [...prev, templateData]);
        }
        setView('dashboard');
        setEditingTemplate(null);
    };
    
    const handleEditTemplate = (templateId: string) => {
        const templateToEdit = activeTemplates.find(t => t.id === templateId);
        if (templateToEdit) {
            setEditingTemplate({ ...templateToEdit });
            setView('form');
        }
    };

    const handleRemoveTemplate = (templateId: string) => {
        if (confirm('Anda yakin ingin menghapus template ini dari laporan?')) {
            setActiveTemplates(prev => prev.filter(t => t.id !== templateId));
        }
    };
    
    const totalPages = 1 + activeTemplates.length;

    const renderFormForTemplate = (template: any) => {
        const commonProps = {
            template: template,
            onTemplateChange: setEditingTemplate,
            onSave: addOrUpdateTemplate,
            onBack: () => { setEditingTemplate(null); setView('dashboard'); },
        };

        const previewHandler = () => {
            let previewComponent;
            const pageNumber = activeTemplates.findIndex(t => t.id === template.id) + 2 || 2;
            const previewData = { ...coaData, ...template, totalPages, pageNumber, reportId };
            
            if (template.templateType === 'odor') previewComponent = <TemplateOdorDocument data={previewData} />;
            else if (template.templateType === 'illumination') previewComponent = <TemplateIlluminationDocument data={previewData} />;
            else if (template.templateType === 'heatstress') previewComponent = <TemplateHeatStressDocument data={previewData} />;
            else if (template.templateType === 'wastewater') previewComponent = <TemplateWastewaterDocument data={previewData} />;
            else if (template.templateType === 'cleanwater') previewComponent = <TemplateCleanWaterDocument data={previewData} />;
            else if (template.templateType === 'workplaceair') previewComponent = <TemplateWorkplaceAirDocument data={previewData} />;
            else if (template.templateType === 'surfacewater') previewComponent = <TemplateSurfaceWaterDocument data={previewData} />;
            else if (template.templateType === 'vibration') previewComponent = <TemplateVibrationDocument data={previewData} />;
            else if (template.templateType === 'airambient') previewComponent = <TemplateAirAmbientDocument data={previewData} />;
            else if (template.templateType === 'ssse') previewComponent = <TemplateSSSEDocument data={previewData} />;
            else if (template.templateType === 'ispu') previewComponent = <TemplateISPUDocument data={previewData} />;
            else if (template.templateType === 'nonsse') previewComponent = <TemplateNonSSEDocument data={previewData} />;
            else if (template.templateType === 'noise') previewComponent = <TemplateNoiseDocument data={previewData} />;

            if (previewComponent) handlePreview(previewComponent);
        };

        switch (template.templateType) {
            case 'illumination': return <IlluminationForm {...commonProps} onPreview={previewHandler} />;
            case 'heatstress': return <HeatStressForm {...commonProps} onPreview={previewHandler} />;
            case 'odor': return <OdorForm {...commonProps} onPreview={previewHandler} />;
            case 'wastewater': return <WastewaterForm {...commonProps} onPreview={previewHandler} />;
            case 'cleanwater': return <CleanWaterForm {...commonProps} onPreview={previewHandler} />;
            case 'workplaceair': return <WorkplaceAirForm {...commonProps} onPreview={previewHandler} />;
            case 'surfacewater': return <SurfaceWaterForm {...commonProps} onPreview={previewHandler} />;
            case 'vibration': return <VibrationForm {...commonProps} onPreview={previewHandler} />;
            case 'airambient': return <AirAmbientForm {...commonProps} onPreview={previewHandler} />;
            case 'ssse': return <SSSEForm {...commonProps} onPreview={previewHandler} />;
            case 'ispu': return <ISPUForm {...commonProps} onPreview={previewHandler} />;
            case 'nonsse': return <NonSSEForm {...commonProps} onPreview={previewHandler} />;
            case 'noise': return <NoiseForm {...commonProps} onPreview={previewHandler} />;
            default: return <p>Form untuk template ini tidak ditemukan.</p>;
        }
    };

    const renderCurrentView = () => {
        switch (view) {
            case 'loading': return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-white" /></div>;
            case 'search': return <SearchCard fppsInput={fppsInput} setFppsInput={setFppsInput} handleCariFpps={handleCariFpps} isLoading={isLoading} />;
            case 'cover': return coaData && <CoverForm coaData={coaData} handleCoaChange={handleCoaChange} handleCheckboxChange={handleCheckboxChange} handleSignatureUpload={() => {}} onNextStep={() => setView('dashboard')} onPreview={() => handlePreview(<CoaCoverDocument data={{...coaData, totalPages, reportId}}/>)} />;
            case 'dashboard': return <ReportDashboard templates={activeTemplates} onAddNew={() => setView('template_selection')} onEdit={handleEditTemplate} onRemove={handleRemoveTemplate} onSave={handleSaveReport} onPrint={handlePrint} isSaving={isLoading} reportId={reportId} onGenerateQrClick={() => setIsQrModalOpen(true)} />;
            
            case 'template_selection': return <TemplateSelection templates={coaTemplates} onSelectTemplate={(type) => {
                let newTemplate;
                const baseTemplate = { id: nanoid(), templateType: type, showKanLogo: true };

                if (['odor', 'wastewater', 'cleanwater', 'workplaceair', 'surfacewater', 'vibration', 'airambient', 'ssse', 'noise'].includes(type)) {
                    setEditingTemplate({ templateType: type }); 
                } else {
                    if (type === 'illumination') {
                        newTemplate = { ...baseTemplate, results: [{ ...defaultIlluminationRow, id: nanoid() }], sampleInfo: { sampleNo: '', samplingLocation: '', samplingTime: '' } };
                    } else if (type === 'heatstress') {
                        newTemplate = { ...baseTemplate, results: [{ ...defaultHeatStressRow, id: nanoid() }], sampleInfo: { ...defaultHeatStressSampleInfo } };
                    } else if (type === 'ispu') {
                        newTemplate = { ...baseTemplate, results: ispuData.defaultISPUParameters.map(p => ({...p})), sampleInfo: { ...ispuData.defaultISPUSampleInfo } };
                    } else if (type === 'nonsse') {
                        newTemplate = { ...baseTemplate, results: [{ ...nonsseData.defaultNonSSERow, id: nanoid() }], sampleInfo: { ...nonsseData.defaultNonSSESampleInfo } };
                    }
                    setEditingTemplate(newTemplate);
                }
                setView('form');
            }} onBack={() => setView('dashboard')} />;
            
            case 'form':
                const baseTemplate = { id: nanoid(), showKanLogo: true };

                if (editingTemplate?.templateType === 'odor' && !editingTemplate.regulation) {
                    return <OdorRegulationSelection onSelect={(regulationId) => {
                        const paramsMap = { permenaker_a: odorParamsPermenakerA, permenaker_b: odorParamsPermenakerB, kepmenlh: odorParamsKepmenLH };
                        setEditingTemplate({ ...baseTemplate, templateType: 'odor', regulation: regulationId, sampleInfo: defaultOdorSampleInfo, results: (paramsMap[regulationId] || []).map(p => ({...p, isVisible: true})) });
                    }} onBack={() => { setEditingTemplate(null); setView('template_selection'); }} />;
                }
                if (editingTemplate?.templateType === 'wastewater' && !editingTemplate.regulation) {
                    return <WastewaterRegulationSelection onSelect={(regulationId) => {
                        const paramsMap = { menlhk_p68: wastewaterData.wastewaterParamsMenlhkP68, jababeka: wastewaterData.wastewaterParamsJababeka, surya_cipta: wastewaterData.wastewaterParamsSuryaCipta };
                        setEditingTemplate({ ...baseTemplate, templateType: 'wastewater', regulation: regulationId, sampleInfo: wastewaterData.defaultWastewaterSampleInfo, results: (paramsMap[regulationId] || []).map(p => ({...p, testingResult: '', isVisible: true})) });
                    }} onBack={() => { setEditingTemplate(null); setView('template_selection'); }} />;
                }
                if (editingTemplate?.templateType === 'cleanwater' && !editingTemplate.regulation) {
                    return <CleanWaterRegulationSelection onSelect={(regulationId) => {
                        const paramsMap = { permenkes_32_2017: cleanwaterData.cleanWaterParamsPermenkes32, permenkes_2_2023: cleanwaterData.cleanWaterParamsPermenkes2 };
                        setEditingTemplate({ ...baseTemplate, templateType: 'cleanwater', regulation: regulationId, sampleInfo: cleanwaterData.defaultCleanWaterSampleInfo, results: (paramsMap[regulationId] || []).map(p => ({...p, testingResult: '', isVisible: true})) });
                    }} onBack={() => { setEditingTemplate(null); setView('template_selection'); }} />;
                }
                if (editingTemplate?.templateType === 'workplaceair' && !editingTemplate.regulation) {
                    return <WorkplaceAirRegulationSelection onSelect={(regulationId) => {
                        const paramsMap = { permenaker_a: workplaceairData.workplaceAirParamsPermenakerA, permenaker_b: workplaceairData.workplaceAirParamsPermenakerB, menkes_1405: workplaceairData.workplaceAirParamsMenkes1405 };
                        setEditingTemplate({ ...baseTemplate, templateType: 'workplaceair', regulation: regulationId, sampleInfo: workplaceairData.defaultWorkplaceAirSampleInfo, results: (paramsMap[regulationId] || []).map(p => ({...p, testingResult: '', isVisible: true})) });
                    }} onBack={() => { setEditingTemplate(null); setView('template_selection'); }} />;
                }
                if (editingTemplate?.templateType === 'surfacewater' && !editingTemplate.regulation) {
                    return <SurfaceWaterRegulationSelection onSelect={(regulationId) => {
                        const paramsMap = { pp_22_2021_river: surfacewaterData.surfaceWaterParamsPP22_River, pp_22_2021_lake: surfacewaterData.surfaceWaterParamsPP22_Lake, pergub_dki_582: surfacewaterData.surfaceWaterParamsPergubDKI582 };
                        setEditingTemplate({ ...baseTemplate, templateType: 'surfacewater', regulation: regulationId, sampleInfo: surfacewaterData.defaultSurfaceWaterSampleInfo, results: (paramsMap[regulationId] || []).map(p => ({...p, testingResult: '', isVisible: true})) });
                    }} onBack={() => { setEditingTemplate(null); setView('template_selection'); }} />;
                }
                if (editingTemplate?.templateType === 'vibration' && !editingTemplate.regulation) {
                    return <VibrationRegulationSelection onSelect={(regulationId) => {
                        const paramsMap = { permenaker_5: vibrationData.vibrationParamsPermenaker5, kepmenlh_49_kejut: vibrationData.vibrationParamsKepmenlh49_Kejut, kepmenlh_49_class3: vibrationData.vibrationParamsKepmenlh49_Class3, kepmenlh_49_class2: vibrationData.vibrationParamsKepmenlh49_Class2 };
                        setEditingTemplate({ ...baseTemplate, templateType: 'vibration', regulation: regulationId, sampleInfo: vibrationData.defaultVibrationSampleInfo, results: (paramsMap[regulationId] || []).map(p => ({...p, isVisible: true})) });
                    }} onBack={() => { setEditingTemplate(null); setView('template_selection'); }} />;
                }
                if (editingTemplate?.templateType === 'airambient' && !editingTemplate.regulation) {
                    return <AirAmbientRegulationSelection onSelect={(regulationId) => {
                        const paramsMap = { 
                            pp_22_2021: airambientData.airAmbientParamsPP22, 
                            pp_22_2021_plus_odor: airambientData.airAmbientParamsPP22PlusOdor,
                            pp_41_1999: airambientData.airAmbientParamsPP41,
                            kepgub_dki_551: airambientData.airAmbientParamsDKI551,
                            kepgub_dki_551_plus_odor: airambientData.airAmbientParamsDKI551PlusOdor,
                            pergub_jabar_82: airambientData.airAmbientParamsJabar624,
                        };
                        setEditingTemplate({ ...baseTemplate, templateType: 'airambient', regulation: regulationId, sampleInfo: airambientData.defaultAirAmbientSampleInfo, results: (paramsMap[regulationId] || []).map(p => ({...p, testingResult: '', isVisible: true})) });
                    }} onBack={() => { setEditingTemplate(null); setView('template_selection'); }} />;
                }
                if (editingTemplate?.templateType === 'ssse' && !editingTemplate.regulation) {
                    return <SSSERegulationSelection onSelect={(regulationId) => {
                        const paramsMap = {
                            permenlh_13_Vb: ssseData.ssseParamsPermenlh13_Vb,
                            permenlh_7_III: ssseData.ssseParamsPermenlh7_III,
                            permenlh_7_IV: ssseData.ssseParamsPermenlh7_IV,
                            permenlh_7_V: ssseData.ssseParamsPermenlh7_V,
                            permenlh_7_VI: ssseData.ssseParamsPermenlh7_VI,
                            permenlh_21_IIIA: ssseData.ssseParamsPermenlh21_IIIA,
                            permenlh_21_IVA: ssseData.ssseParamsPermenlh21_IVA,
                            permenlhk_11_I1: ssseData.ssseParamsPermenLhk11_I1,
                            permenlhk_11_I2: ssseData.ssseParamsPermenLhk11_I2,
                            permenlhk_11_I3: ssseData.ssseParamsPermenLhk11_I3,
                            permenlhk_15_IIIA: ssseData.ssseParamsPermenLhk15_IIIA,
                            permenlhk_15_IXA: ssseData.ssseParamsPermenLhk15_IXA,
                            permenlhk_15_IXB: ssseData.ssseParamsPermenLhk15_IXB,
                            kepgub_dki_670_III: ssseData.ssseParamsKepgubDKI670_III,
                        };
                        setEditingTemplate({ ...baseTemplate, templateType: 'ssse', regulation: regulationId, sampleInfo: ssseData.defaultSSSESampleInfo, results: (paramsMap[regulationId] || []).map(p => ({...p, testingResult: '', isVisible: true})) });
                    }} onBack={() => { setEditingTemplate(null); setView('template_selection'); }} />;
                }
                 if (editingTemplate?.templateType === 'noise' && !editingTemplate.regulation) {
                    return <NoiseRegulationSelection onSelect={(regulationId) => {
                        const paramsMap = {
                            kepmen_lh_48: noiseData.noiseParamsKepmenLH48,
                            kepgub_dki_551: noiseData.noiseParamsKepgubDKI551,
                            permenaker_5: noiseData.noiseParamsPermenaker5,
                        };
                        setEditingTemplate({ ...baseTemplate, templateType: 'noise', regulation: regulationId, sampleInfo: noiseData.defaultNoiseSampleInfo, results: JSON.parse(JSON.stringify(paramsMap[regulationId] || [])) });
                    }} onBack={() => { setEditingTemplate(null); setView('template_selection'); }} />;
                }
                
                return editingTemplate ? renderFormForTemplate(editingTemplate) : <p>Silakan pilih template untuk diedit.</p>;

            default: return <p>Tampilan tidak ditemukan.</p>;
        }
    };
    
    const getVerificationUrl = () => {
        if (typeof window !== 'undefined' && reportId) {
            return `${window.location.origin}/verify/${reportId}`;
        }
        return '';
    };

    return (
        <>
            <div className="print-only">
                {coaData && <CoaCoverDocument data={{...coaData, totalPages, reportId}} />}
                {activeTemplates.map((template, index) => {
                    const pageNumber = index + 2;
                    const fullTemplateData = {
                        ...coaData,
                        ...template,
                        totalPages, 
                        pageNumber,
                        reportId,
                        sampleInfo: {
                            ...template.sampleInfo,
                            samplingDate: coaData.receiveDate ? format(new Date(coaData.receiveDate), "MMMM dd, yyyy", { locale: id }) : '',
                            dateReceived: coaData.receiveDate ? format(new Date(coaData.receiveDate), "MMMM dd, yyyy", { locale: id }) : '',
                            intervalTestingDate: coaData.analysisDateStart ? `${format(new Date(coaData.analysisDateStart), 'MMMM dd, yyyy', { locale: id })} to ${coaData.analysisDateEnd}` : '',
                        },
                    };
                    return (
                        <React.Fragment key={template.id}>
                            <div className="page-break"></div>
                            {template.templateType === 'odor' && <TemplateOdorDocument data={fullTemplateData} />}
                            {template.templateType === 'illumination' && <TemplateIlluminationDocument data={fullTemplateData} />}
                            {template.templateType === 'heatstress' && <TemplateHeatStressDocument data={fullTemplateData} />}
                            {template.templateType === 'wastewater' && <TemplateWastewaterDocument data={fullTemplateData} />}
                            {template.templateType === 'cleanwater' && <TemplateCleanWaterDocument data={fullTemplateData} />}
                            {template.templateType === 'workplaceair' && <TemplateWorkplaceAirDocument data={fullTemplateData} />}
                            {template.templateType === 'surfacewater' && <TemplateSurfaceWaterDocument data={fullTemplateData} />}
                            {template.templateType === 'vibration' && <TemplateVibrationDocument data={fullTemplateData} />}
                            {template.templateType === 'airambient' && <TemplateAirAmbientDocument data={fullTemplateData} />}
                            {template.templateType === 'ssse' && <TemplateSSSEDocument data={fullTemplateData} />}
                            {template.templateType === 'ispu' && <TemplateISPUDocument data={fullTemplateData} />}
                            {template.templateType === 'nonsse' && <TemplateNonSSEDocument data={fullTemplateData} />}
                            {template.templateType === 'noise' && <TemplateNoiseDocument data={fullTemplateData} />}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className="no-print space-y-8">
                <div><h1 className="text-3xl font-bold text-white">Certificate of Analysis (COA) Builder</h1></div>
                {renderCurrentView()}
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
            
            <QrCodeModal
                isOpen={isQrModalOpen}
                onClose={() => setIsQrModalOpen(false)}
                url={getVerificationUrl()}
                reportNumber={coaData?.certificateNo || reportId || ''}
            />
        </>
    );
}