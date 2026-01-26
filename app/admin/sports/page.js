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
      setFormData({
        name: '',
        slug: '',
        category: 'ATHLETICS',
        description: '',
        maxTeamSize: 1,
        minTeamSize: 1,
      });
      fetchSports();
    } catch (err) {
      alert(err.message);
    }
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
    });
    setShowForm(true);
  };

  const deleteSport = async (id) => {
    if (!confirm('Are you sure? This will also delete all registrations for this sport.')) return;
    
    try {
      const res = await fetch(`/api/admin/sports/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
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

  if (loading) {
    return <div className={styles.loading}>Loading sports...</div>;
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Sports Management</h1>
        <p className={styles.subtitle}>Add and manage sports events</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => {
            setShowForm(!showForm);
            setEditingSport(null);
            setFormData({
              name: '',
              slug: '',
              category: 'ATHLETICS',
              description: '',
              maxTeamSize: 1,
              minTeamSize: 1,
            });
          }}
        >
          {showForm ? 'Cancel' : '+ Add Sport'}
        </button>
      </div>

      {showForm && (
        <div className={styles.tableSection} style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    name: e.target.value,
                    slug: generateSlug(e.target.value)
                  })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                  Min Team Size
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.minTeamSize}
                  onChange={(e) => setFormData({ ...formData, minTeamSize: parseInt(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                  Max Team Size
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxTeamSize}
                  onChange={(e) => setFormData({ ...formData, maxTeamSize: parseInt(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                {editingSport ? 'Update Sport' : 'Create Sport'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>All Sports ({sports.length})</h2>
        </div>

        {sports.length ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Category</th>
                <th>Team Size</th>
                <th>Registrations</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sports.map((sport) => (
                <tr key={sport.id}>
                  <td>{sport.name}</td>
                  <td style={{ color: 'rgba(255,255,255,0.5)' }}>{sport.slug}</td>
                  <td>{sport.category}</td>
                  <td>{sport.minTeamSize} - {sport.maxTeamSize}</td>
                  <td>{sport._count?.registrations || 0}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${sport.isActive ? styles.statusApproved : styles.statusRejected}`}>
                      {sport.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`}
                        onClick={() => editSport(sport)}
                      >
                        Edit
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`}
                        onClick={() => deleteSport(sport.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🏆</div>
            <p>No sports added yet</p>
          </div>
        )}
      </div>
    </>
  );
}
