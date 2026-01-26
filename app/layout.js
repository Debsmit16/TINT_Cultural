import './globals.css';
import AuthProvider from './components/AuthProvider';

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
    icon: [{ url: '/icons/icon.svg', type: 'image/svg+xml' }],
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
