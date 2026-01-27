'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './EventForm.module.css';
import exuStyles from '../../Exuberance.module.css';

const DEPARTMENTS = [
  'AEIE', 'AIML', 'ECE', 'EE', 'ME', 'IT', 'CE', 'DS', 'BCA', 'BBA', 'MBA', 'MCA',
  'CYS', 'IOT', 'CSBS', 'CSE', 'BSC in Cyber Security', 'ECS', 'AIDS', 'EECE', 'CSIT', 'MTECH',
  'Faculty Member / Non-teaching staff member', 'Other'
];

const YEARS = ['1st', '2nd', '3rd', '4th', 'Faculty Member / Non-teaching staff member'];

const OUTDOOR_EVENTS = [
  { id: 'cricket_boys', name: 'Cricket (Boys)', teamSize: '10 (8+2)', hasTeam: true },
  { id: 'cricket_girls', name: 'Cricket (Girls)', teamSize: '8', hasTeam: true },
  { id: 'football_boys', name: 'Football (Boys)', teamSize: '7+3 substitutes', hasTeam: true },
];

export default function OutdoorRegistration() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    year: '',
    phone: '',
    department: '',
    participantType: 'Student',
    eventName: '',
    captainName: '',
    viceCaptainName: '',
    goalkeeperName: '', // Football only
  });
  const [idProofUrl, setIdProofUrl] = useState('');
  const [teamListUrl, setTeamListUrl] = useState('');
  const [uploadingId, setUploadingId] = useState(false);
  const [uploadingTeam, setUploadingTeam] = useState(false);
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

  const handleTeamListChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setTeamListFile(file);
      setUploadingTeam(true);
      const url = await handleFileUpload(file, 'teamlist');
      if (url) setTeamListUrl(url);
      setUploadingTeam(false);
    }
  };

  const selectedEvent = OUTDOOR_EVENTS.find(e => e.id === formData.eventName);

  // Map form event ID to database sport ID
  const getSportId = (eventId) => {
    const mapping = {
      'cricket_boys': 'cricket_boys',
      'cricket_girls': 'cricket_girls', 
      'football_boys': 'football_boys',
    };
    return mapping[eventId] || eventId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.eventName || !formData.year || !formData.phone || !formData.department) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (selectedEvent?.hasTeam) {
      if (!formData.captainName || !formData.viceCaptainName) {
        setError('Captain and Vice-Captain names are required');
        setLoading(false);
        return;
      }
      if (formData.eventName === 'football_boys' && !formData.goalkeeperName) {
        setError('Goalkeeper name is required for Football');
        setLoading(false);
        return;
      }
    }

    try {
      // Submit to API
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sportId: getSportId(formData.eventName),
          participantName: session.user?.name || formData.captainName,
          participantPhone: formData.phone,
          participantDept: formData.department,
          participantYear: formData.year,
          participantRollNo: '',
          participantGender: formData.eventName.includes('girls') ? 'Female' : 'Male',
          teamName: formData.captainName ? `Team ${formData.captainName}` : null,
          captainName: formData.captainName,
          viceCaptainName: formData.viceCaptainName,
          goalkeeperName: formData.goalkeeperName || null,
          idProofPath: idProofUrl || null,
          teamListPath: teamListUrl || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit registration');
      }

      setSuccess(`Registration submitted successfully! Your TASO ID: ${data.registration?.tasoId || 'Pending'}`);
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
            <h1 className={styles.formTitle}>Outdoor Events Registration</h1>
            <p className={styles.formSubtitle}>Cricket & Football — 6th & 7th Feb 2026</p>
          </div>

          <div className={styles.infoBox}>
            <h3>📍 Venue: NKDA Ground, Newtown</h3>
            <p>🕗 Time: 08:00 AM | ⚠️ Max 1 outdoor game per athlete</p>
            <a href="https://maps.app.goo.gl/eJ7Pu6pMUCpNBTXCA" target="_blank" rel="noreferrer" className={styles.mapLink}>
              View on Map →
            </a>
          </div>

          <div className={styles.rulesBox}>
            <h4>Rules & Regulations</h4>
            <ul>
              <li>Only currently enrolled college students are eligible to participate.</li>
              <li>Each athlete can participate in maximum of ONE outdoor game.</li>
              <li>Captain from the team will fill this form.</li>
              <li>One team per year per department is allowed.</li>
              <li>Unsportsmanlike behavior will result in disqualification.</li>
            </ul>
          </div>

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Basic Information</h3>
              
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  className={styles.input}
                  value={session.user?.email || ''}
                  disabled
                />
              </div>

              <div className={styles.row}>
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
            </div>

            {/* Step 2: Event Selection */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Select Event</h3>
              
              <div className={styles.eventCards}>
                {OUTDOOR_EVENTS.map(event => (
                  <label
                    key={event.id}
                    className={`${styles.eventCard} ${formData.eventName === event.id ? styles.eventCardSelected : ''}`}
                  >
                    <input
                      type="radio"
                      name="eventName"
                      value={event.id}
                      checked={formData.eventName === event.id}
                      onChange={handleChange}
                      className={styles.radioHidden}
                    />
                    <span className={styles.eventName}>{event.name}</span>
                    <span className={styles.eventTeamSize}>Team: {event.teamSize}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Team Details (conditional) */}
            {selectedEvent?.hasTeam && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Team Details — {selectedEvent.name}</h3>
                
                <div className={styles.row}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Captain&apos;s Name *</label>
                    <input
                      name="captainName"
                      type="text"
                      className={styles.input}
                      placeholder="Enter captain's full name"
                      value={formData.captainName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Vice-Captain&apos;s Name *</label>
                    <input
                      name="viceCaptainName"
                      type="text"
                      className={styles.input}
                      placeholder="Enter vice-captain's full name"
                      value={formData.viceCaptainName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {formData.eventName === 'football_boys' && (
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Goalkeeper&apos;s Name *</label>
                    <input
                      name="goalkeeperName"
                      type="text"
                      className={styles.input}
                      placeholder="Enter goalkeeper's full name"
                      value={formData.goalkeeperName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

                {/* ID Card upload temporarily disabled
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    All Players ID Proof (Image) *
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
                */}

                {/* Team list upload temporarily disabled
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>
                    Team List (Image) *
                    <span className={styles.labelHint}>Photo of team list — Max 3MB (JPEG, PNG, WebP)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className={styles.fileInput}
                    onChange={handleTeamListChange}
                    disabled={uploadingTeam}
                  />
                  {uploadingTeam && <span className={styles.uploadStatus}>Uploading...</span>}
                  {teamListUrl && <span className={styles.uploadSuccess}>✓ Uploaded</span>}
                </div>
                */}
              </div>
            )}

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
