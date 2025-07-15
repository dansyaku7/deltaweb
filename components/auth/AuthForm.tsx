'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Impor useRouter untuk navigasi

// Tipe props untuk komponen ini
type AuthFormProps = {
  onClose: () => void;
  initialMode: 'signIn' | 'signUp';
};

export const AuthForm = ({ onClose, initialMode }: AuthFormProps) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(initialMode === 'signUp');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter(); // Inisialisasi router

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fungsi handleSubmit yang sudah disederhanakan
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman

    // Tutup dialog
    onClose();

    // Langsung arahkan ke halaman dashboard
    router.push('/dashboard');
  };

  const toggleFormMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className='w-full'>
      <h2 className='text-center text-2xl font-bold text-gray-900 dark:text-white'>
        {isSignUp ? 'Buat Akun Baru' : 'Masuk ke Akun Anda'}
      </h2>

      <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
        <div className='space-y-4 rounded-md'>
          {isSignUp && (
            <div>
              <label htmlFor='name' className='sr-only'>
                Nama
              </label>
              <input
                id='name'
                name='name'
                type='text'
                autoComplete='name'
                required
                value={formData.name}
                onChange={handleChange}
                className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm'
                placeholder='Nama Lengkap'
              />
            </div>
          )}
          <div>
            <label htmlFor='email-address' className='sr-only'>
              Alamat Email
            </label>
            <input
              id='email-address'
              name='email'
              type='email'
              autoComplete='email'
              required
              value={formData.email}
              onChange={handleChange}
              className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm'
              placeholder='Alamat Email'
            />
          </div>
          <div>
            <label htmlFor='password' className='sr-only'>
              Kata Sandi
            </label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              required
              value={formData.password}
              onChange={handleChange}
              className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm'
              placeholder='Kata Sandi'
            />
          </div>
        </div>

        <div>
          <button
            type='submit'
            className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            {isSignUp ? 'Daftar' : 'Masuk'}
          </button>
        </div>
      </form>

      <div className='mt-6 text-center text-sm'>
        <button
          onClick={toggleFormMode}
          className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'
        >
          {isSignUp ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
        </button>
      </div>
    </div>
  );
};
