import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/components/AuthContext';

export const metadata: Metadata = {
  title: 'PlantScan AI — Deteksi Penyakit Tanaman',
  description: 'Sistem deteksi penyakit tanaman berbasis kecerdasan buatan. Upload foto daun dan dapatkan diagnosis penyakit secara instan.',
  keywords: 'deteksi penyakit tanaman, plant disease detection, AI, machine learning, tomat, kentang, paprika',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
