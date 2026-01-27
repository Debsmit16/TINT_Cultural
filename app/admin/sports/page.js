'use client';

import { useEffect, useState } from 'react';
import styles from '../Admin.module.css';

const CATEGORIES = ['ATHLETICS', 'OUTDOOR', 'INDOOR'];

export default function AdminSports() {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSport, setEditingSport] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'ATHLETICS',
    description: '',
    maxTeamSize: 1,
    minTeamSize: 1,
    venue: '',
    eventDate: '',
    isTeamEvent: false,
    isGirlsOnly: false,
    isActive: true,
  });

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const res = await fetch('/api/admin/sports');
      if (!res.ok) throw new Error('Failed to fetch sports');
      const json = await res.json();
      setSports(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingSport 
        ? `/api/admin/sports/${editingSport.id}`
        : '/api/admin/sports';
      
      const res = await fetch(url, {
        method: editingSport ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      setShowForm(false);
      setEditingSport(null);
      resetForm();
      fetchSports();
    } catch (err) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      category: 'ATHLETICS',
      description: '',
      maxTeamSize: 1,
      minTeamSize: 1,
      venue: '',
      eventDate: '',
      isTeamEvent: false,
      isGirlsOnly: false,
      isActive: true,
    });
  };

  const editSport = (sport) => {
    setEditingSport(sport);
    setFormData({
      name: sport.name,
      slug: sport.slug,
      category: sport.category,
      description: sport.description || '',
      maxTeamSize: sport.maxTeamSize,
      minTeamSize: sport.minTeamSize,
      venue: sport.venue || '',
      eventDate: sport.eventDate ? sport.eventDate.split('T')[0] : '',
      isTeamEvent: sport.isTeamEvent || false,
      isGirlsOnly: sport.isGirlsOnly || false,
      isActive: sport.isActive !== false,
    });
    setShowForm(true);
  };

  const deleteSport = async (id) => {
    if (!confirm('Are you sure? Sports with registrations cannot be deleted.')) return;
    
    try {
      const res = await fetch(`/api/admin/sports/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      fetchSports();
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleActive = async (sport) => {
    try {
      const res = await fetch(`/api/admin/sports/${sport.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !sport.isActive }),
      });
      if (!res.ok) throw new Error('Failed to update');
      fetchSports();
    } catch (err) {
      alert(err.message);
    }
  };

  const generateSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // Group sports by category
  const sportsByCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = sports.filter(s => s.category === cat);
    return acc;
  }, {});

  if (loading) {
    return <div className={styles.loading}>Loading sports...</div>;
  }

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#fff',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.7)',
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Sports / Events Management</h1>
        <p className={styles.subtitle}>Add, edit, and manage sports events • Total: {sports.length}</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => {
            setShowForm(!showForm);
            setEditingSport(null);
            resetForm();
          }}
        >
          {showForm ? '✕ Cancel' : '+ Add New Sport'}
        </button>
      </div>

      {showForm && (
        <div className={styles.tableSection} style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#fff' }}>
            {editingSport ? `Edit: ${editingSport.name}` : 'Create New Sport'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    name: e.target.value,
                    slug: editingSport ? formData.slug : generateSlug(e.target.value)
                  })}
                  required
                  placeholder="e.g., Cricket (Boys)"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="e.g., cricket-boys"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  style={inputStyle}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Venue</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="e.g., Main Ground"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Event Date</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Min Team Size</label>
                <input
                  type="number"
                  min="1"
                  value={formData.minTeamSize}
                  onChange={(e) => setFormData({ ...formData, minTeamSize: parseInt(e.target.value) })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Max Team Size</label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxTeamSize}
                  onChange={(e) => setFormData({ ...formData, maxTeamSize: parseInt(e.target.value) })}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={labelStyle}>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Brief description of the event..."
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isTeamEvent}
                  onChange={(e) => setFormData({ ...formData, isTeamEvent: e.target.checked })}
                />
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Team Event</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isGirlsOnly}
                  onChange={(e) => setFormData({ ...formData, isGirlsOnly: e.target.checked })}
                />
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Girls Only 👩</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Active (Open for Registration)</span>
              </label>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                {editingSport ? '💾 Update Sport' : '✓ Create Sport'}
              </button>
              <button 
                type="button" 
                className={styles.btn}
                onClick={() => { setShowForm(false); setEditingSport(null); resetForm(); }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sports by Category */}
      {CATEGORIES.map(category => (
        <div key={category} className={styles.tableSection} style={{ marginBottom: '1.5rem' }}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>
              {category === 'OUTDOOR' ? '🏏' : category === 'ATHLETICS' ? '🏃' : '🎯'} {category}
              <span style={{ fontSize: '0.875rem', marginLeft: '0.5rem', opacity: 0.7 }}>
                ({sportsByCategory[category].length} sports)
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

          {sportsByCategory[category].length ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Team Size</th>
                  <th>Registrations</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sportsByCategory[category].map((sport) => (
                  <tr key={sport.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {sport.name}
                        {sport.isGirlsOnly && <span title="Girls Only">👩</span>}
                        {sport.isTeamEvent && <span title="Team Event">👥</span>}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{sport.slug}</div>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{sport.venue || '-'}</td>
                    <td style={{ fontSize: '0.85rem' }}>
                      {sport.eventDate ? new Date(sport.eventDate).toLocaleDateString() : '-'}
                    </td>
                    <td>{sport.minTeamSize === sport.maxTeamSize ? sport.minTeamSize : `${sport.minTeamSize}-${sport.maxTeamSize}`}</td>
                    <td>
                      <span style={{ 
                        background: sport._count?.registrations > 0 ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: sport._count?.registrations > 0 ? '#22c55e' : 'rgba(255,255,255,0.5)'
                      }}>
                        {sport._count?.registrations || 0}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleActive(sport)}
                        className={`${styles.statusBadge} ${sport.isActive !== false ? styles.statusApproved : styles.statusRejected}`}
                        style={{ cursor: 'pointer', border: 'none' }}
                      >
                        {sport.isActive !== false ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={`${styles.btn} ${styles.btnSmall}`}
                          onClick={() => editSport(sport)}
                          style={{ background: 'rgba(59,130,246,0.2)', color: '#3b82f6' }}
                        >
                          ✏️
                        </button>
                        <button
                          className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`}
                          onClick={() => deleteSport(sport.id)}
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
            <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
              No sports in this category
            </div>
          )}
        </div>
      ))}
    </>
  );
}
