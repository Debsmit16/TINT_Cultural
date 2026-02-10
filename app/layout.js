import './globals.css';
import AuthProvider from './components/AuthProvider';
import ClientEffects from './components/ClientEffects.jsx';

export const metadata = {
  title: 'TINTWeb',
  description: 'TINT has it all — sports, tech, culture.',
  applicationName: 'TINTWeb',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TINTWeb',
  },
  icons: {
    icon: [{ url: '/logos/tint_logo.png', type: 'image/png' }],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#100e17',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientEffects />

        <div className="cursor" aria-hidden="true">
          <div className="cursor__ring"></div>
          <div className="cursor__dot"></div>
        </div>

        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
