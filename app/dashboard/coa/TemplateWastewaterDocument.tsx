'use client';

import React from 'react';
import Image from 'next/image';
import { Logo } from '@/components/logo';

interface TemplateProps {
  data: {
    parameters: any[];
    notes: string;
    certificateNo?: string;
    sampleInfo?: any;
    showKanLogo: boolean;
  };
}

export const TemplateWastewaterDocument = React.forwardRef<HTMLDivElement, TemplateProps>(
  ({ data }, ref) => {
    const sampleInfo = data.sampleInfo || {};
    
    return (
      // Container utama dijadikan 'relative' sebagai kanvas
      <div ref={ref} className="p-10 font-serif text-black bg-white relative" style={{ width: '210mm', minHeight: '297mm' }}>
        
        {/* Watermark Logo DIL di lapisan belakang (z-0) */}
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

        {/* Semua konten dibungkus agar berada di lapisan atas (z-10) */}
        <div className="relative z-10 flex flex-col h-full">
          <header className="flex justify-between items-start mb-4">
            <div className="w-36"><Logo /></div>
            {data.showKanLogo && (
              <div className="flex flex-col items-end text-right"> 
                <div className="w-24 mb-1">
                  <Image src="/images/kan-logo.png" alt="Logo KAN" width={100} height={45} />
                </div>
                <div className="text-[7px] leading-tight font-sans mt-1 space-y-px">
                  <p>SK-KLHK No.00161/LPJ/Labling-1/LRK/KLHK</p>
                  <p>7-a.DEC.2023-6.DEC.2028</p>
                  <p>Halaman 2 dari ...</p>
                </div>
              </div>
            )}
          </header>
          
          <main className="text-xs flex-grow">
            <div className="text-center my-4">
              <h1 className="text-base font-bold tracking-wider">CERTIFICATE OF ANALYSIS (COA)</h1>
              <p className="text-xs">Certificate No. {data.certificateNo ? `DIL-${data.certificateNo}`: 'DIL-AABBCCDDCOA'}</p>
            </div>

            <table className="w-full border-collapse border-2 border-black mb-4 text-[9px]">
              <thead>
                <tr className="bg-gray-200 font-bold text-center">
                  <th className="border border-black p-1 font-bold">Sample No.</th>
                  <th className="border border-black p-1 font-bold">Sampling Location</th>
                  <th className="border border-black p-1 font-bold">Sample Description</th>
                  <th className="border border-black p-1 font-bold">Sampling Date</th>
                  <th className="border border-black p-1 font-bold">Sampling Time</th>
                  <th className="border border-black p-1 font-bold">Sampling Methods</th>
                  <th className="border border-black p-1 font-bold">Date Received</th>
                  <th className="border border-black p-1 font-bold">Interval Testing Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-1 text-center">{sampleInfo.sampleNo || '-'}</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.samplingLocation || '-'}</td>
                  <td className="border border-black p-1 text-center">Wastewater</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.samplingDate || '-'}</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.samplingTime || '-'}</td>
                  <td className="border border-black p-1 text-center">SNI 8990-2021</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.dateReceived || '-'}</td>
                  <td className="border border-black p-1 text-center">{sampleInfo.intervalTestingDate || '-'}</td>
                </tr>
              </tbody>
            </table>

            <table className="w-full border-collapse border-2 border-black text-[9px]">
               <thead>
                <tr className="bg-gray-200 font-bold">
                  <th className="border border-black p-1 w-8 font-bold">No</th>
                  <th className="border border-black p-1 font-bold text-left">Parameters</th>
                  <th className="border border-black p-1 w-20 font-bold">Unit</th>
                  <th className="border border-black p-1 w-24 font-bold">Testing Result</th>
                  <th className="border border-black p-1 w-28 font-bold">Regulatory Standard**</th>
                  <th className="border border-black p-1 font-bold text-left">Methods</th>
                </tr>
              </thead>
              <tbody>
                {data.parameters.map((param, index) => (
                  <React.Fragment key={param.name}>
                    {param.category && (
                      <tr className="font-bold bg-gray-100"><td colSpan={6} className="p-1 pl-2">{param.category}</td></tr>
                    )}
                    <tr>
                      <td className="border border-black p-1 text-center">{index + 1}</td>
                      <td className="border border-black p-1">{param.name}</td>
                      <td className="border border-black p-1 text-center">{param.unit}</td>
                      <td className="border border-black p-1 text-center">{param.testingResult || '-'}</td>
                      <td className="border border-black p-1 text-center">{param.standard}</td>
                      <td className="border border-black p-1">{param.method}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-[8px]">
              <p className='font-bold'>Notes:</p>
              <p>{'<'} : Less Than MDL (Method Detection Limit)</p>
              <p>* : Accredited Parameters</p>
              <p>** : {data.notes || 'Default Regulatory Standard'}</p>
            </div>
          </main>
          
          <footer className="mt-auto pt-8 text-[7px] italic">
              "This result (s) relate only to the sample (s) tested and the test report/certificate shall not be reproduced except in full, without written approval of PT Delta Indonesia Laboratory"
          </footer>
        </div>
      </div>
    );
  }
);

TemplateWastewaterDocument.displayName = 'TemplateWastewaterDocument';