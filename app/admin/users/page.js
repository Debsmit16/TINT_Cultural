'use client';

import { useEffect, useState } from 'react';
import styles from '../Admin.module.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const json = await res.json();
      setUsers(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading users...</div>;
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Users</h1>
        <p className={styles.subtitle}>View registered users</p>
      </div>

      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>All Users ({users.length})</h2>
        </div>

        {users.length ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>College</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name || '-'}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || '-'}</td>
                  <td>
                    {user.college || '-'}
                    {user.department && (
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                        {user.department} • {user.year}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? styles.statusApproved : ''}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>👥</div>
            <p>No users yet</p>
          </div>
        )}
      </div>
    </>
  );
}
