'use client';

import { useEffect, useState } from 'react';
import styles from './Admin.module.css';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/admin/dashboard');
      if (!res.ok) throw new Error('Failed to fetch dashboard');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading dashboard...</div>;
  }

  if (error) {
    return <div className={styles.empty}><div className={styles.emptyIcon}>⚠️</div>{error}</div>;
  }

  const stats = data?.stats || {};

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Welcome to Exuberance Admin Panel</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.statIconBlue}`}>👥</div>
          </div>
          <div className={styles.statValue}>{stats.totalUsers || 0}</div>
          <div className={styles.statLabel}>Total Users</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.statIconGreen}`}>📝</div>
          </div>
          <div className={styles.statValue}>{stats.totalRegistrations || 0}</div>
          <div className={styles.statLabel}>Total Registrations</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.statIconYellow}`}>⏳</div>
          </div>
          <div className={styles.statValue}>{stats.pendingRegistrations || 0}</div>
          <div className={styles.statLabel}>Pending Approvals</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.statIconPurple}`}>🏆</div>
          </div>
          <div className={styles.statValue}>{stats.totalSports || 0}</div>
          <div className={styles.statLabel}>Active Sports</div>
        </div>
      </div>

      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Recent Registrations</h2>
        </div>
        
        {data?.recentRegistrations?.length ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Sport</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentRegistrations.map((reg) => (
                <tr key={reg.id}>
                  <td>
                    <div>{reg.user?.name || 'Unknown'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                      {reg.user?.email}
                    </div>
                  </td>
                  <td>{reg.sport?.name || 'Unknown'}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${reg.status.charAt(0) + reg.status.slice(1).toLowerCase()}`]}`}>
                      {reg.status}
                    </span>
                  </td>
                  <td>{new Date(reg.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📭</div>
            <p>No registrations yet</p>
          </div>
        )}
      </div>
    </>
  );
}
