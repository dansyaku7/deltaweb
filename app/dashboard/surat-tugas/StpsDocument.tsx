'use client';

import React from 'react';
import { Logo } from '@/components/logo';

interface StpsDocumentProps {
  nomorSurat: string;
  data: {
    hariTanggal: string;
    namaPelanggan: string;
    alamat: string;
    contactPerson: string;
    petugas: string[];
    pjTeknis: string;
    signatureUrl: string | null;
  };
}

export const StpsDocument = React.forwardRef<HTMLDivElement, StpsDocumentProps>(
  ({ nomorSurat, data }, ref) => {
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return (
      <div
        ref={ref}
        className='bg-white p-12 font-serif text-black'
        style={{ width: '794px', minHeight: '1123px' }}
      >
        <header className='flex items-start justify-between border-b-2 border-black pb-4'>
          <div className='w-1/4'>
            <Logo />
            <p className='text-sm font-bold'>Delta Indonesia Laboratory</p>
          </div>
          <div className='text-right text-xs'>
            <p className='font-bold'>PT. Delta Indonesia Laboratory</p>
            <p>Jln. Porum Prima Harapan Regency,</p>
            <p>Gedung Prima Orchard Blok C, No. 2</p>
            <p>Bekasi Utara, Kota Bekasi 17123, Provinsi Jawa Barat</p>
            <p>Telp. 021 - 88982018</p>
          </div>
        </header>

        <main className='mt-10'>
          <h1 className='text-center text-lg font-bold underline'>
            SURAT TUGAS PENGAMBILAN SAMPEL
          </h1>
          <p className='text-center text-sm'>
            No: {nomorSurat || '___/STPS/DIL/___/____'}
          </p>

          <div className='mt-8'>
            <p>Memerintahkan kepada :</p>
            <ol className='list-inside list-decimal pl-4'>
              {data.petugas.map((nama, index) => (
                <li key={index}>{nama}</li>
              ))}
            </ol>
          </div>

          <div className='mt-6'>
            <p>Untuk melakukan pengambilan sampel, pada :</p>
            <table className='mt-2 w-full'>
              <tbody>
                <tr>
                  <td className='w-1/4 align-top'>Hari/tanggal</td>
                  <td className='align-top'>: {data.hariTanggal}</td>
                </tr>
                <tr>
                  <td className='align-top'>Nama Pelanggan</td>
                  <td className='align-top'>: {data.namaPelanggan}</td>
                </tr>
                <tr>
                  <td className='align-top'>Alamat</td>
                  <td className='align-top'>: {data.alamat}</td>
                </tr>
                <tr>
                  <td className='align-top'>Contact person</td>
                  <td className='align-top'>: {data.contactPerson}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className='mt-8'>
            Demikian, Surat tugas ini dibuat untuk dipergunakan semestinya
          </p>

          <div className='mt-16 flex justify-end'>
            <div className='text-center'>
              <p>Bekasi, {today}</p>
              <p>PT Delta Indonesia Laboratory</p>
              <div className='relative h-24'>
                {data.signatureUrl ? (
                  <img 
                    src={data.signatureUrl} 
                    alt="Tanda Tangan"
                    className="absolute inset-0 mx-auto h-full w-full object-contain"
                  />
                ) : (
                  <div className="h-full"></div>
                )}
              </div>
              <p className='font-bold underline'>{data.pjTeknis || '.....................'}</p>
              <p>PJ Teknis</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
);

StpsDocument.displayName = 'StpsDocument';