'use client';

import { useEffect, useState } from 'react';
import styles from '../Admin.module.css';

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ status: '', sportId: '', category: '' });
  const [viewMode, setViewMode] = useState('list'); // 'list', 'bySport', 'byCategory'
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.status) params.append('status', filter.status);
      if (filter.sportId) params.append('sportId', filter.sportId);
      if (filter.category) params.append('category', filter.category);
      
      const [regRes, sportsRes] = await Promise.all([
        fetch(`/api/admin/registrations?${params}`),
        fetch('/api/admin/sports')
      ]);
      
      if (!regRes.ok) throw new Error('Failed to fetch registrations');
      const regJson = await regRes.json();
      const sportsJson = await sportsRes.json();
      
      setRegistrations(regJson.registrations || []);
      setSports(sportsJson || []);
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
      
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteRegistration = async (id) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete');
      
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleGroup = (key) => {
    setExpandedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Group registrations by sport
  const groupBySport = () => {
    const groups = {};
    registrations.forEach(reg => {
      const sportName = reg.sport?.name || 'Unknown';
      if (!groups[sportName]) {
        groups[sportName] = { sport: reg.sport, registrations: [] };
      }
      groups[sportName].registrations.push(reg);
    });
    return groups;
  };

  // Group registrations by category
  const groupByCategory = () => {
    const groups = { OUTDOOR: [], ATHLETICS: [], INDOOR: [] };
    registrations.forEach(reg => {
      const category = reg.sport?.category || 'OUTDOOR';
      groups[category].push(reg);
    });
    return groups;
  };

  if (loading) {
    return <div className={styles.loading}>Loading registrations...</div>;
  }

  const sportGroups = groupBySport();
  const categoryGroups = groupByCategory();

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Registrations</h1>
        <p className={styles.subtitle}>Manage sports event registrations • Total: {registrations.length}</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value, sportId: '' })}
          style={{
            padding: '0.625rem 1rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '0.875rem',
          }}
        >
          <option value="">All Categories</option>
          <option value="OUTDOOR">Outdoor</option>
          <option value="ATHLETICS">Athletics</option>
          <option value="INDOOR">Indoor</option>
        </select>

        <select
          value={filter.sportId}
          onChange={(e) => setFilter({ ...filter, sportId: e.target.value })}
          style={{
            padding: '0.625rem 1rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '0.875rem',
          }}
        >
          <option value="">All Sports</option>
          {sports
            .filter(s => !filter.category || s.category === filter.category)
            .map(sport => (
              <option key={sport.id} value={sport.id}>{sport.name}</option>
            ))}
        </select>

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

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
          <button
            className={`${styles.btn} ${viewMode === 'list' ? styles.btnPrimary : ''}`}
            onClick={() => setViewMode('list')}
            style={{ padding: '0.5rem 1rem' }}
          >
            📋 List
          </button>
          <button
            className={`${styles.btn} ${viewMode === 'bySport' ? styles.btnPrimary : ''}`}
            onClick={() => setViewMode('bySport')}
            style={{ padding: '0.5rem 1rem' }}
          >
            🏆 By Sport
          </button>
          <button
            className={`${styles.btn} ${viewMode === 'byCategory' ? styles.btnPrimary : ''}`}
            onClick={() => setViewMode('byCategory')}
            style={{ padding: '0.5rem 1rem' }}
          >
            📂 By Category
          </button>
        </div>
      </div>

      {error ? (
        <div className={styles.empty}><div className={styles.emptyIcon}>⚠️</div>{error}</div>
      ) : viewMode === 'list' ? (
        /* List View */
        <div className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>All Registrations ({registrations.length})</h2>
          </div>

          {registrations.length ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>TASO ID</th>
                  <th>Participant</th>
                  <th>Sport</th>
                  <th>Details</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id}>
                    <td>
                      <code style={{ fontSize: '0.75rem', background: 'rgba(34,197,94,0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                        {reg.tasoId || '-'}
                      </code>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{reg.participantName || reg.user?.name || 'Unknown'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                        {reg.user?.email}
                      </div>
                      {reg.participantPhone && (
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                          📞 {reg.participantPhone}
                        </div>
                      )}
                    </td>
                    <td>
                      <div>{reg.sport?.name || 'Unknown'}</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>
                        {reg.sport?.category}
                      </div>
                    </td>
                    <td>
                      {reg.teamName && <div style={{ fontSize: '0.8rem' }}>Team: {reg.teamName}</div>}
                      {reg.participantDept && <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{reg.participantDept}</div>}
                      {reg.participantYear && <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Year {reg.participantYear}</div>}
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[`status${reg.status.charAt(0) + reg.status.slice(1).toLowerCase()}`]}`}>
                        {reg.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>{new Date(reg.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className={styles.actions}>
                        {reg.status === 'PENDING' && (
                          <>
                            <button
                              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}
                              onClick={() => updateStatus(reg.id, 'APPROVED')}
                            >
                              ✓
                            </button>
                            <button
                              className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`}
                              onClick={() => updateStatus(reg.id, 'REJECTED')}
                            >
                              ✗
                            </button>
                          </>
                        )}
                        <button
                          className={`${styles.btn} ${styles.btnSmall}`}
                          onClick={() => deleteRegistration(reg.id)}
                          style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444' }}
                        >
                          🗑
                        </button>
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
      ) : viewMode === 'bySport' ? (
        /* By Sport View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(sportGroups).map(([sportName, data]) => (
            <div key={sportName} className={styles.tableSection}>
              <div 
                className={styles.tableHeader}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleGroup(sportName)}
              >
                <h2 className={styles.tableTitle}>
                  {expandedGroups[sportName] ? '▼' : '▶'} {sportName} 
                  <span style={{ fontSize: '0.875rem', marginLeft: '0.5rem', opacity: 0.7 }}>
                    ({data.registrations.length} registrations)
                  </span>
                </h2>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                  {data.sport?.category}
                </span>
              </div>
              
              {expandedGroups[sportName] && (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>TASO ID</th>
                      <th>Participant</th>
                      <th>Details</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.registrations.map((reg) => (
                      <tr key={reg.id}>
                        <td><code style={{ fontSize: '0.75rem' }}>{reg.tasoId || '-'}</code></td>
                        <td>
                          <div>{reg.participantName || reg.user?.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{reg.user?.email}</div>
                        </td>
                        <td>
                          {reg.teamName && <div>Team: {reg.teamName}</div>}
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{reg.participantDept} • Year {reg.participantYear}</div>
                        </td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles[`status${reg.status.charAt(0) + reg.status.slice(1).toLowerCase()}`]}`}>
                            {reg.status}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actions}>
                            {reg.status === 'PENDING' && (
                              <>
                                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`} onClick={() => updateStatus(reg.id, 'APPROVED')}>✓</button>
                                <button className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`} onClick={() => updateStatus(reg.id, 'REJECTED')}>✗</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
          {Object.keys(sportGroups).length === 0 && (
            <div className={styles.empty}><div className={styles.emptyIcon}>📭</div><p>No registrations found</p></div>
          )}
        </div>
      ) : (
        /* By Category View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {['OUTDOOR', 'ATHLETICS', 'INDOOR'].map(category => (
            <div key={category} className={styles.tableSection}>
              <div 
                className={styles.tableHeader}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleGroup(category)}
              >
                <h2 className={styles.tableTitle}>
                  {expandedGroups[category] ? '▼' : '▶'} {category}
                  <span style={{ fontSize: '0.875rem', marginLeft: '0.5rem', opacity: 0.7 }}>
                    ({categoryGroups[category].length} registrations)
                  </span>
                </h2>
                <span style={{ 
                  fontSize: '0.75rem', 
                  background: category === 'OUTDOOR' ? 'rgba(34,197,94,0.2)' : category === 'ATHLETICS' ? 'rgba(59,130,246,0.2)' : 'rgba(168,85,247,0.2)', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px',
                  color: category === 'OUTDOOR' ? '#22c55e' : category === 'ATHLETICS' ? '#3b82f6' : '#a855f7'
                }}>
                  Max {category === 'OUTDOOR' ? '1' : '2'} events per athlete
                </span>
              </div>
              
              {expandedGroups[category] && categoryGroups[category].length > 0 && (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>TASO ID</th>
                      <th>Participant</th>
                      <th>Sport</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryGroups[category].map((reg) => (
                      <tr key={reg.id}>
                        <td><code style={{ fontSize: '0.75rem' }}>{reg.tasoId || '-'}</code></td>
                        <td>
                          <div>{reg.participantName || reg.user?.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{reg.user?.email}</div>
                        </td>
                        <td>{reg.sport?.name}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles[`status${reg.status.charAt(0) + reg.status.slice(1).toLowerCase()}`]}`}>
                            {reg.status}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actions}>
                            {reg.status === 'PENDING' && (
                              <>
                                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`} onClick={() => updateStatus(reg.id, 'APPROVED')}>✓</button>
                                <button className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`} onClick={() => updateStatus(reg.id, 'REJECTED')}>✗</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              
              {expandedGroups[category] && categoryGroups[category].length === 0 && (
                <div style={{ padding: '1rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                  No registrations in this category
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
