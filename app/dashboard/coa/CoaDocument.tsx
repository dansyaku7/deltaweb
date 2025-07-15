'use client';

import React from 'react';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface CoaDocumentProps {
  data: {
    customer: string; address: string; phone: string; contactName: string;
    subjects: string[]; sampleTakenBy: string[];
    receiveDate: Date | undefined; analysisDateStart: Date | undefined; analysisDateEnd: string;
    reportDate: string; signatureUrl: string | null; directorName: string; showKanLogo: boolean;
    certificateNo?: string;
  };
}

const sampleTakenByOptions = ["PT. Delta Indonesia Laboratory", "Customer", "Third Party"];

export const CoaDocument = React.forwardRef<HTMLDivElement, CoaDocumentProps>(
  ({ data }, ref) => {
    return (
      <div ref={ref} className="p-15 font-times-new-roman text-black bg-white relative" style={{ width: '210mm', minHeight: '297mm' }}>
        
        <div className="absolute inset-25 flex items-center justify-center z-0">
          <div className="opacity-30 w-[500px] h-[500px]">
            <Image 
              src="/images/logo-delta-transparan.png" 
              alt="Logo DIL Watermark"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <header>
            <div className="flex justify-between items-start">
              <div className="w-36"><Logo /></div>
              {data.showKanLogo && (
                <div className="flex flex-col items-end text-right"> 
                  <div className="w-24 mb-1">
                    <Image src="/images/kan-logo.png" alt="Logo KAN" width={100} height={45} />
                  </div>
                  <div className="text-[7px] leading-tight font-sans mt-1 space-y-px">
                    <p>SK-KLHK No.00161/LPJ/Labling-1/LRK/KLHK</p>
                    <p>7-a.DEC.2023-6.DEC.2028</p>
                    <p>Halaman 1 dari ...</p>
                  </div>
                </div>
              )}
            </div>
          </header>

          <main className="flex-grow">
            <div className="text-center my-8">
              <h1 className="text-base font-bold tracking-wider">CERTIFICATE OF ANALYSIS (COA)</h1>
              <p className="text-xs">Certificate No. {data.certificateNo || 'DIL-AABBCCDDCOA'}</p>
            </div>

            {/* --- PERUBAHAN 1: Tambahkan div pembungkus dengan padding horizontal (px-8) --- */}
            <div className="px-20 text-xs">
              {/* Grup 1: Info Customer */}
              <div className="grid grid-cols-[140px_10px_1fr] gap-x-1 gap-y-1.5 mb-5">
                <p className="font-bold">Customer</p><p>:</p><p>{data.customer}</p>
                <p className="font-bold">Address</p><p>:</p><p>{data.address}</p>
                <p className="font-bold">Contact Name</p><p>:</p><p>{data.contactName}</p>
                <p className="font-bold">Email</p><p>:</p><p>..............................</p>
                <p className="font-bold">Phone</p><p>:</p><p>{data.phone}</p>
              </div>

              {/* Grup 2: Info Subject & Sampel */}
              <div className="grid grid-cols-[140px_10px_1fr] gap-x-1 gap-y-1.5 mb-5">
                <p className="font-bold self-start">Subject</p>
                <p className="self-start">:</p>
                <div>{data.subjects.length > 0 ? data.subjects.map(s => <p key={s}>- {s}</p>) : <p>-</p>}</div>
                
                <p className="font-bold self-start pt-2">Sample taken by</p>
                <p className="self-start pt-2">:</p>
                <div className="pt-2">
                  {sampleTakenByOptions.map(option => (
                    <p key={option} className="font-mono">
                      <span className="mr-2">{data.sampleTakenBy.includes(option) ? '●' : '○'}</span>
                      {option}
                    </p>
                  ))}
                </div>
              </div>

              {/* Grup 3: Info Tanggal */}
              <div className="grid grid-cols-[140px_10px_1fr] gap-x-1 gap-y-1.5">
                <p className="font-bold">Sample Receive Date</p><p>:</p><p>{data.receiveDate ? format(data.receiveDate, 'MMMM dd, yyyy', { locale: id }) : ''}</p>
                <p className="font-bold">Sample Analysis Date</p><p>:</p><p>{data.analysisDateStart ? `${format(data.analysisDateStart, 'MMMM dd, yyyy', { locale: id })} to ${data.analysisDateEnd}` : ''}</p>
                <p className="font-bold">Report Date</p><p>:</p><p>{data.reportDate}</p>
              </div>
            </div>
          </main>

          {/* --- PERUBAHAN 2: Tambah jarak di atas footer --- */}
          <footer className="mt-auto pt-55">
            <div className="flex justify-between items-end">
              <div className="w-1/2">
                <p className="text-[7px] italic">"This result (s) relate only to the sample (s) tested and the test report/certificate shall not be reproduced except in full, without written approval of PT Delta Indonesia Laboratory"</p>
                <p className="text-[8px] font-bold mt-4">FR-7.3.3</p>
              </div>
              <div className="text-center text-xs w-5/12 ml-auto">
                  <p>This Certificate of Analysis consist of ... pages</p>
                  <p className="mt-1">Bekasi, {data.reportDate}</p>
                  <div className="relative h-16 w-32 my-2 mx-auto">
                      {data.signatureUrl && <Image src={data.signatureUrl} alt="Signature" layout="fill" objectFit="contain" />}
                  </div>
                  <p className="font-bold underline">{data.directorName}</p>
                  <p>Direktur Utama</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
);

CoaDocument.displayName = 'CoaDocument';