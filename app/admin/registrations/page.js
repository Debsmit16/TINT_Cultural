'use client';

import { useEffect, useState } from 'react';
import styles from '../Admin.module.css';

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ status: '', sportId: '' });

  useEffect(() => {
    fetchRegistrations();
  }, [filter]);

  const fetchRegistrations = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.status) params.append('status', filter.status);
      if (filter.sportId) params.append('sportId', filter.sportId);
      
      const res = await fetch(`/api/admin/registrations?${params}`);
      if (!res.ok) throw new Error('Failed to fetch registrations');
      const json = await res.json();
      setRegistrations(json.registrations || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (!res.ok) throw new Error('Failed to update');
      
      fetchRegistrations();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading registrations...</div>;
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Registrations</h1>
        <p className={styles.subtitle}>Manage sports event registrations</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          style={{
            padding: '0.625rem 1rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '0.875rem',
          }}
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>All Registrations ({registrations.length})</h2>
        </div>

        {error ? (
          <div className={styles.empty}><div className={styles.emptyIcon}>⚠️</div>{error}</div>
        ) : registrations.length ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Sport</th>
                <th>Team</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg.id}>
                  <td>
                    <div>{reg.user?.name || 'Unknown'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                      {reg.user?.email}
                    </div>
                    {reg.user?.phone && (
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                        {reg.user.phone}
                      </div>
                    )}
                  </td>
                  <td>{reg.sport?.name || 'Unknown'}</td>
                  <td>
                    {reg.teamName || '-'}
                    {reg.teamMembers?.length > 0 && (
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                        {reg.teamMembers.length} members
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status${reg.status.charAt(0) + reg.status.slice(1).toLowerCase()}`]}`}>
                      {reg.status}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${reg.paymentStatus === 'COMPLETED' ? styles.statusApproved : styles.statusPending}`}>
                      {reg.paymentStatus}
                    </span>
                  </td>
                  <td>{new Date(reg.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className={styles.actions}>
                      {reg.status === 'PENDING' && (
                        <>
                          <button
                            className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}
                            onClick={() => updateStatus(reg.id, 'APPROVED')}
                          >
                            Approve
                          </button>
                          <button
                            className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`}
                            onClick={() => updateStatus(reg.id, 'REJECTED')}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {reg.status === 'APPROVED' && (
                        <button
                          className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`}
                          onClick={() => updateStatus(reg.id, 'CANCELLED')}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📭</div>
            <p>No registrations found</p>
          </div>
        )}
      </div>
    </>
  );
}
