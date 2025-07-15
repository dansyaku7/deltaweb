'use client';

import Link from 'next/link';
// 1. Impor useRouter untuk navigasi dan LogOut untuk ikon
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import {
  LayoutDashboard,
  FilePenLine,
  FileSpreadsheet,
  ClipboardCheck,
  FlaskConical,
  Database,
  BarChart3,
  FileBadge,
  LogOut,
} from 'lucide-react';

const sidebarNavItems = [
  {
    title: 'HOME',
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { title: 'Form Pendaftaran', href: '/dashboard/form', icon: FilePenLine },
      { title: 'Surat Tugas', href: '/dashboard/surat-tugas', icon: FileSpreadsheet },
      { title: 'Berita Acara', href: '/dashboard/berita-acara', icon: ClipboardCheck },
      { title: 'Hasil Analisa', href: '/dashboard/hasil-analisa', icon: FlaskConical },
    ],
  },
  {
    title: 'DOCUMENTS',
    items: [
      { title: 'Data Library', href: '/dashboard/library', icon: Database },
      { title: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
      { title: 'Certificate of Analysis', href: '/dashboard/coa', icon: FileBadge },
    ],
  },
];

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/'); 
  };

  return (
    <div className='flex min-h-screen bg-slate-950 text-slate-100'>
      {/* --- Perubahan struktur di dalam <aside> --- */}
      <aside className='fixed left-0 top-0 flex h-full w-72 flex-col bg-slate-900 p-6'>
        <div className='mb-10'>
          <Logo />
        </div>
        
        {/* Navigasi utama dibuat flex-1 agar mendorong tombol logout ke bawah */}
        <nav className='flex-1 space-y-8 overflow-y-auto'>
          {sidebarNavItems.map((section) => (
            <div key={section.title}>
              <h3 className='mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500'>
                {section.title}
              </h3>
              <ul className='flex flex-col gap-1'>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-md p-2 text-sm font-medium transition-colors',
                        pathname === item.href
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      )}
                    >
                      <item.icon className='h-5 w-5' />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* 4. Tambahkan tombol logout di sini */}
        <div className="mt-8 pt-4 border-t border-slate-800">
            <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-md p-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
            </button>
        </div>
      </aside>

      <main className='ml-72 flex-1 p-10'>{children}</main>
    </div>
  );
}