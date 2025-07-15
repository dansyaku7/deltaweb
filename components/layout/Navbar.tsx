'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'; // Impor useState
import { ModeToggle } from '../mode-toggle';
import { Logo } from '@/components/logo';
import { AuthForm } from '@/components/auth/AuthForm'; // Asumsikan AuthForm.tsx ada di direktori yang sama

const menuItems = [
  { name: 'About', href: '#about' },
  { name: 'Service', href: '#solution' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Features', href: '#features' },
];

export const Navbar = () => {
  const [menuState, setMenuState] = useState(false);
  // State untuk mengontrol modal otentikasi
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signIn');

  // Fungsi untuk membuka modal Sign In
  const handleSignInClick = () => {
    setAuthMode('signIn');
    setAuthModalOpen(true);
    setMenuState(false); // Tutup menu mobile jika terbuka
  };

  // Fungsi untuk membuka modal Sign Up
  const handleSignUpClick = () => {
    setAuthMode('signUp');
    setAuthModalOpen(true);
    setMenuState(false); // Tutup menu mobile jika terbuka
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <>
      <header>
        <nav
          data-state={menuState && 'active'}
          className='bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl'
        >
          <div className='mx-auto max-w-6xl px-6 transition-all duration-300'>
            <div className='flex items-center justify-between py-3 lg:py-4'>
              {/* Kiri: Logo */}
              <div className='flex items-center'>
                <Link href='/' aria-label='home' className='flex items-center space-x-2'>
                  <Logo />
                </Link>
              </div>

              {/* Tengah: Menu Tengah */}
              <div className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block'>
                <div className='flex items-center gap-8 rounded-full border px-6 py-2 backdrop-blur-sm shadow-sm'>
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className='text-muted-foreground hover:text-accent-foreground text-sm transition-colors duration-200'
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Kanan: Tombol Aksi + Hamburger */}
              <div className='flex items-center justify-end gap-4'>
                {/* Desktop actions */}
                <div className='hidden items-center gap-3 lg:flex'>
                  {/* Ganti Link dengan Button onClick */}
                  <Button variant='outline' size='sm' onClick={handleSignInClick}>
                    Sign In
                  </Button>
                  <Button size='sm' onClick={handleSignUpClick}>
                    Sign Up
                  </Button>
                  <ModeToggle />
                </div>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                  className='p-2.5 lg:hidden'
                >
                  <Menu className='in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200' />
                  <X className='in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 scale-0 opacity-0 duration-200' />
                </button>
              </div>

              {/* Mobile Menu */}
              <div
                className={`${
                  menuState ? 'block' : 'hidden'
                } bg-background col-span-3 mt-4 w-full rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 dark:shadow-none lg:hidden`}
              >
                <ul className='mb-6 space-y-6 text-base'>
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className='text-muted-foreground hover:text-accent-foreground block duration-150'
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className='flex flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0'>
                  {/* Ganti Link dengan Button onClick di menu mobile */}
                  <Button variant='outline' size='sm' onClick={handleSignInClick}>
                    Sign In
                  </Button>
                  <Button size='sm' onClick={handleSignUpClick}>
                    Sign Up
                  </Button>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Modal untuk AuthForm */}
      {isAuthModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
          <div className='bg-background relative w-full max-w-md rounded-lg p-8 shadow-2xl'>
            {/* Tombol Close Modal */}
            <button
              onClick={handleCloseModal}
              className='absolute right-4 top-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
              aria-label='Close'
            >
              <X size={24} />
            </button>
            <AuthForm onClose={handleCloseModal} initialMode={authMode} />
          </div>
        </div>
      )}
    </>
  );
};