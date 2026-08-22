'use client';

import { useEffect, useState } from 'react';
import { useCreateUser, fetchAgentById } from '@/hooks/useApi'

// ─── Types ────────────────────────────────────────────────────────────────────

interface AddAgentTabProps {
  onToast: (message: string) => void;

  mode?: "create" | "edit" | "view";
  agentId?: number | null;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  agencyName: string;
  reraNumber: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_FORM: FormData = {
  name: '',
  phone: '',
  email: '',
  agencyName: '',
  reraNumber: '',
};

const ERROR_MESSAGES: Record<string, string> = {
  PHONE_TAKEN: '❌ A user with this phone number already exists',
  EMAIL_TAKEN: '❌ This email is already in use',
  AGENT_ALREADY_EXISTS: '❌ This user already has an agent profile',
  RERA_ALREADY_EXISTS: '❌ That RERA number is already registered to another agent',
  CANNOT_CONVERT_ADMIN: '❌ An admin account cannot be converted to an agent',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AddAgentTab({
    onToast,
    mode = "create",
    agentId,
  }: AddAgentTabProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const { mutate: createUser, isPending } = useCreateUser();
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const isReadOnly = mode === "view";

  const {
    data: agent,
    isLoading: agentLoading,
  } = fetchAgentById(
    String(agentId),
    (mode === "edit" || mode === "view") && !!agentId
  );

  // ── Helpers ──────────────────────────────────────────────────────────────

  const update = (field: keyof FormData, val: string) =>
    setFormData(prev => ({ ...prev, [field]: val }));

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLicenseFile(e.target.files[0]);
    }
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handlePublish = () => {
    if (!formData.name.trim()) {
      onToast('Please enter the agent name');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      onToast('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!formData.agencyName.trim()) {
      onToast('Please enter an agency name');
      return;
    }

    createUser(
      {
        phone: formData.phone.trim(),
        name: formData.name.trim(),
        role: 'AGENT',
        agencyName: formData.agencyName.trim(),
        ...(formData.email.trim() ? { email: formData.email.trim() } : {}),
        ...(formData.reraNumber.trim()
          ? { reraNumber: formData.reraNumber.trim() }
          : {}),
      },
      {
      onSuccess: (data) => {
        console.log(data);
        setFormData(INITIAL_FORM);
        setLicenseFile(null);
        onToast('✅ Agent created successfully');
      },

      onError: (error: any) => {
        console.error(error);
        const apiMessage = error?.response?.data?.message as string | undefined;
        const code = error?.response?.data?.code as string | undefined;
        onToast(
          (code && ERROR_MESSAGES[code]) ||
          (apiMessage ? `❌ ${apiMessage}` : '❌ Failed to create agent')
        );
      },
    });
  };

  useEffect(() => {
    if (!agent) return;

    setFormData({
      name: agent.user?.name ?? '',
      phone: agent.user?.phone ?? '',
      email: agent.user?.email ?? '',
      agencyName: agent.agencyName ?? '',
      reraNumber: agent.reraNumber ?? '',
    });
  }, [agent]);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="form-layout">
      {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
      <div className="form-left">

        {/* Agent Info */}
        <div className="card">
          <div className="card-head">Agent Information</div>
          <div className="card-body">

            <div className="field">
              <label className="field-label">Name *</label>
              <input
                className="field-input"
                type="text"
                placeholder="e.g. Rahul Mohanty"
                value={formData.name}
                onChange={e => update('name', e.target.value)}
                disabled={isReadOnly || mode === "edit"}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label">Phone *</label>
                <input
                  className="field-input"
                  type="tel"
                  inputMode="numeric"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={e => update('phone', e.target.value)}
                  disabled={isReadOnly || mode === "edit"}
                />
              </div>
              <div className="field">
                <label className="field-label">Email</label>
                <input
                  className="field-input"
                  type="email"
                  placeholder="agent@agency.com"
                  value={formData.email}
                  onChange={e => update('email', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label">Agency Name *</label>
                <input
                  className="field-input"
                  placeholder="e.g. Samriddh Realty Partners"
                  value={formData.agencyName}
                  onChange={e => update('agencyName', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>
              <div className="field">
                <label className="field-label">RERA Number</label>
                <input
                  className="field-input"
                  placeholder="WBRERA/A/KOL/2024/XXX"
                  value={formData.reraNumber}
                  onChange={e => update('reraNumber', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>
            </div>

            {agent?.isVerified !== undefined && (
              <div className="field">
                <label className="field-label">Status</label>
                <p style={{ fontSize: 13, color: agent.isVerified ? '#0D1B2A' : '#A32D2D' }}>
                  {agent.isVerified ? '✅ Verified' : '⏳ Pending Verification'}
                </p>
              </div>
            )}

          </div>
        </div>

        {/* Publish Actions */}
        <div className="publish-row">
          <button
            className="btn-gold"
            onClick={handlePublish}
            disabled={isPending || isReadOnly}
          >
            {isPending ? 'Creating...' : 'Create Agent'}
          </button>
        </div>

      </div>

      {/* ── RIGHT COLUMN ────────────────────────────────────────────────── */}
      <div className="form-right">

        {/* License Upload */}
        <div className="card">
          <div className="card-head">Agent License</div>
          <div className="card-body">
            <input
              id="license-input"
              type="file"
              accept="image/*,application/pdf"
              hidden
              onChange={handleLicenseChange}
              disabled={isReadOnly}
            />
            <div className="upload-zone" onClick={() => document.getElementById('license-input')?.click()}>
              <div className="upload-icon">📄</div>
              <div className="upload-text">
                Drop license file here or <span className="upload-link">browse</span>
              </div>
              <div className="upload-hint">
                {licenseFile
                  ? licenseFile.name
                  : agent?.licenseUrl
                    ? 'License already on file — upload to replace'
                    : 'PDF or image, up to 5MB'}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Styles ──────────────────────────────────────────────────────── */}
      <style jsx>{`
        .form-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          padding: 28px;
          align-items: start;
        }
        .form-left, .form-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(13,27,42,0.07);
          border: 1px solid #F0EAE0;
          overflow: hidden;
        }
        .card-head {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          color: #0D1B2A;
          padding: 16px 20px;
          border-bottom: 1px solid #F0EAE0;
          font-weight: 600;
        }
        .card-body { padding: 20px; }
        .field { margin-bottom: 14px; }
        .field:last-child { margin-bottom: 0; }
        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }
        .field-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8A8A8A;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .field-input {
          width: 100%;
          padding: 9px 12px;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          font-size: 13px;
          font-family: inherit;
          color: #1A1A1A;
          background: #fff;
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
        }
        .field-input:focus { border-color: #C9A84C; }
        .field-input:disabled { background: #FAFAFA; color: #9CA3AF; }
        .publish-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .btn-gold {
          padding: 11px 24px;
          background: #C9A84C;
          color: #0D1B2A;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.18s;
        }
        .btn-gold:hover { background: #9B7A2A; color: #fff; }
        .btn-gold:disabled { opacity: 0.6; cursor: not-allowed; }
        .upload-zone {
          border: 2px dashed #E5E7EB;
          border-radius: 8px;
          padding: 28px;
          text-align: center;
          cursor: pointer;
          margin-bottom: 12px;
          transition: border-color 0.15s;
        }
        .upload-zone:hover { border-color: #C9A84C; }
        .upload-icon { font-size: 28px; margin-bottom: 8px; }
        .upload-text { font-size: 13px; color: #6B7280; }
        .upload-link { color: #185FA5; font-weight: 500; }
        .upload-hint { font-size: 11px; color: #9CA3AF; margin-top: 4px; }
      `}</style>
    </div>
  );
}