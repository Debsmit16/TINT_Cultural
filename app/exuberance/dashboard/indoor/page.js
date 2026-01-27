'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../outdoor/EventForm.module.css';
import exuStyles from '../../Exuberance.module.css';

const DEPARTMENTS = [
  'AEIE', 'AIML', 'ECE', 'EE', 'ME', 'IT', 'CE', 'DS', 'BCA', 'BBA', 'MBA', 'MCA',
  'CYS', 'IOT', 'CSBS', 'CSE', 'BSC in Cyber Security', 'ECS', 'AIDS', 'EECE', 'CSIT', 'MTECH',
  'Faculty Member / Non-teaching staff member', 'Other'
];

const YEARS = ['1st', '2nd', '3rd', '4th', 'Faculty Member / Non-teaching staff member'];

const INDOOR_EVENTS = [
  { id: 'chess', name: 'Chess', icon: '♟️' },
  { id: 'carrom', name: 'Carrom', icon: '🎯' },
  { id: 'table_tennis', name: 'Table Tennis', icon: '🏓' },
  { id: 'badminton', name: 'Badminton (Girls Only)', icon: '🏸', girlsOnly: true },
];

export default function IndoorRegistration() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    rollNo: '',
    phone: '',
    department: '',
    gender: '',
    participantType: 'Student',
    selectedEvents: [],
  });
  const [idProofUrl, setIdProofUrl] = useState('');
  const [uploadingId, setUploadingId] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/exuberance/login');
    }
  }, [status, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Handle file upload
  const handleFileUpload = async (file, type) => {
    if (!file) return null;
    
    if (file.size > 3 * 1024 * 1024) {
      setError('File size must be less than 3MB');
      return null;
    }

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('type', type);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data.url;
    } catch (err) {
      setError(err.message || 'Failed to upload file');
      return null;
    }
  };

  const handleIdProofChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdProofFile(file);
      setUploadingId(true);
      const url = await handleFileUpload(file, 'idproof');
      if (url) setIdProofUrl(url);
      setUploadingId(false);
    }
  };

  const handleEventToggle = (eventId) => {
    setError('');
    const current = formData.selectedEvents;
    const event = INDOOR_EVENTS.find(e => e.id === eventId);
    
    // Check girls-only
    if (event?.girlsOnly && formData.gender === 'Male') {
      setError('Badminton is only for girls');
      return;
    }
    
    if (current.includes(eventId)) {
      setFormData({
        ...formData,
        selectedEvents: current.filter(e => e !== eventId)
      });
    } else {
      // Check max 2 events limit
      if (current.length >= 2) {
        setError('You can select maximum 2 indoor games only!');
        return;
      }
      setFormData({
        ...formData,
        selectedEvents: [...current, eventId]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.name || !formData.year || !formData.rollNo || !formData.phone || !formData.department || !formData.gender) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.selectedEvents.length === 0) {
      setError('Please select at least one event');
      setLoading(false);
      return;
    }

    if (formData.selectedEvents.length > 2) {
      setError('Maximum 2 indoor games allowed per athlete');
      setLoading(false);
      return;
    }

    // Check girls-only event
    if (formData.selectedEvents.includes('badminton') && formData.gender !== 'Female') {
      setError('Badminton is only for girls');
      setLoading(false);
      return;
    }

    try {
      // Map form event IDs to database sport IDs
      const getSportId = (eventId) => {
        const mapping = {
          'chess': 'chess',
          'carrom': 'carrom',
          'table_tennis': 'table_tennis',
          'badminton': 'badminton',
        };
        return mapping[eventId] || eventId;
      };

      // Submit registration for each selected event
      const results = [];
      for (const eventId of formData.selectedEvents) {
        const event = INDOOR_EVENTS.find(e => e.id === eventId);
        
        const response = await fetch('/api/registrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sportId: getSportId(eventId),
            participantName: formData.name,
            participantPhone: formData.phone,
            participantDept: formData.department,
            participantYear: formData.year,
            participantRollNo: formData.rollNo,
            participantGender: formData.gender,
            idProofPath: idProofUrl || null,
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || `Failed to register for ${event?.name}`);
        }
        
        results.push(data.registration);
      }

      const tasoIds = results.map(r => r?.tasoId).filter(Boolean).join(', ');
      setSuccess(`Registration submitted successfully! Your TASO ID(s): ${tasoIds || 'Pending'}`);
      setTimeout(() => {
        router.push('/exuberance/dashboard');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to submit registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.spinner} />
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className={styles.wrap}>
      {/* Lightweight static background */}
      <div className={exuStyles.staticBg} aria-hidden="true" />

      <header className="topbar">
        <Link className="brand" href="/" aria-label="TINT Home">
          <span className="brand__mark" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 6C20.4 6 11 15.4 11 27c0 9.2 5.9 17 14.2 19.9L32 58l6.8-11.1C47.1 44 53 36.2 53 27 53 15.4 43.6 6 32 6Z" stroke="rgba(255,255,255,0.75)" strokeWidth="2.6"/>
              <path d="M22 28.5c6.5-9.2 17.6-13 28-10.4" stroke="#f8d24a" strokeWidth="2.6" strokeLinecap="round"/>
              <circle cx="32" cy="26" r="3.2" fill="#f8d24a"/>
            </svg>
          </span>
          <span className="brand__text">TINT</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/exuberance/dashboard">← Back to Dashboard</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Indoor Events Registration</h1>
            <p className={styles.formSubtitle}>Chess, Carrom, Table Tennis, Badminton — 5th & 6th Feb 2026</p>
          </div>

          <div className={styles.infoBox}>
            <h3>📍 Venue: College Premises</h3>
            <p>🕗 Time: 08:00 AM | ⚠️ Max 2 indoor games per athlete</p>
          </div>

          <div className={styles.rulesBox}>
            <h4>Rules & Regulations</h4>
            <ul>
              <li>Only currently enrolled college students are eligible to participate.</li>
              <li>Each athlete can participate in a maximum of TWO indoor games.</li>
              <li>Badminton event is only for girls.</li>
              <li>ID proof is mandatory for verification.</li>
              <li>Unsportsmanlike behavior will result in disqualification.</li>
            </ul>
          </div>

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Event Selection First */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Select Events (Max 2)</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '16px' }}>
                Selected: {formData.selectedEvents.length}/2
              </p>
              
              <div className={styles.eventCards}>
                {INDOOR_EVENTS.map(event => {
                  const isSelected = formData.selectedEvents.includes(event.id);
                  const isDisabled = event.girlsOnly && formData.gender === 'Male';
                  
                  return (
                    <label
                      key={event.id}
                      className={`${styles.eventCard} ${isSelected ? styles.eventCardSelected : ''}`}
                      style={{ opacity: isDisabled ? 0.5 : 1, cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => !isDisabled && handleEventToggle(event.id)}
                        className={styles.radioHidden}
                        disabled={isDisabled}
                      />
                      <span style={{ fontSize: '2rem' }}>{event.icon}</span>
                      <span className={styles.eventName}>{event.name}</span>
                      {event.girlsOnly && (
                        <span style={{ fontSize: '0.7rem', color: '#f472b6' }}>👩 Girls Only</span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Basic Info */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Personal Information</h3>
              
              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    className={styles.input}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    className={styles.input}
                    value={session.user?.email || ''}
                    disabled
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Gender *</label>
                  <select
                    name="gender"
                    className={styles.select}
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Roll No / Emp ID *</label>
                  <input
                    name="rollNo"
                    type="text"
                    className={styles.input}
                    placeholder="Enter roll number"
                    value={formData.rollNo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Phone (WhatsApp) *</label>
                  <input
                    name="phone"
                    type="tel"
                    className={styles.input}
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>You are a *</label>
                  <select
                    name="participantType"
                    className={styles.select}
                    value={formData.participantType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Student">Student</option>
                    <option value="Faculty Member">Faculty Member</option>
                    <option value="Non-teaching Staff Member">Non-teaching Staff Member</option>
                  </select>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Department *</label>
                  <select
                    name="department"
                    className={styles.select}
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Year *</label>
                  <select
                    name="year"
                    className={styles.select}
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Year</option>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* ID Proof Upload */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>ID Proof Upload</h3>
              
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Your ID Proof (Image) *
                  <span className={styles.labelHint}>Student ID / Library Card — Max 3MB (JPEG, PNG, WebP)</span>
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className={styles.fileInput}
                  onChange={handleIdProofChange}
                  disabled={uploadingId}
                />
                {uploadingId && <span className={styles.uploadStatus}>Uploading...</span>}
                {idProofUrl && <span className={styles.uploadSuccess}>✓ Uploaded</span>}
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? <span className={styles.spinner} /> : 'Submit Registration'}
            </button>
          </form>

          <Link href="/exuberance/dashboard" className={styles.backLink}>
            ← Back to Dashboard
          </Link>
        </div>

        <footer className="footer">
          <div className="footer__bottom">
            <div>© {new Date().getFullYear()} TINT — Exuberance 2026</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
