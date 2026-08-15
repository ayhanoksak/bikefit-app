// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Bike Fit Türkiye',
  description: 'Profesyonel Bisiklet Fit ve Ölçüm Platformu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}