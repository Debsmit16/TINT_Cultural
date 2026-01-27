'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from './Admin.module.css';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/registrations', label: 'Registrations', icon: '📝' },
  { href: '/admin/sports', label: 'Sports / Events', icon: '🏆' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
];

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/exuberance/login?callbackUrl=/admin');
      return;
    }

    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      router.push('/exuberance/dashboard');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className={styles.wrap}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return null;
  }

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className={styles.wrap}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/exuberance" className={styles.logo}>EXUBERANCE</Link>
          <span className={styles.badge}>Admin</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {getInitials(session.user.name)}
            </div>
            <div>
              <div className={styles.userName}>{session.user.name}</div>
              <div className={styles.userRole}>{session.user.role}</div>
            </div>
          </div>
          
          <Link href="/exuberance" className={`${styles.navLink}`} style={{ marginTop: '0.5rem' }}>
            <span className={styles.navIcon}>←</span>
            <span>Back to Site</span>
          </Link>
        </div>
      </aside>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
