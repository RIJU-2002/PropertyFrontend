'use client';

import { useEffect, useState } from 'react';
import { useCreateUser, fetchAgentById, useUpdateAgent, useVerifyAgent, useActivateAgent, useAdminLeads } from '@/hooks/useApi'
import { useAuth } from '@/hooks/useAuth'
import { useQueryClient } from '@tanstack/react-query'

// ─── Types ────────────────────────────────────────────────────────────────────

interface AddAgentTabProps {
  onToast: (message: string) => void;
  mode?: "create" | "edit" | "view";
  agentId?: number | null;
  onSaved?: () => void;
  onEdit?: () => void;
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
    onSaved,
    onEdit,
  }: AddAgentTabProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateAgent, isPending: isUpdating } = useUpdateAgent();
  const { mutate: verifyAgent, isPending: isVerifying } = useVerifyAgent();
  const { mutate: activateAgent, isPending: isActivating } = useActivateAgent();
  const queryClient = useQueryClient();
  const { token, user } = useAuth();
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const isReadOnly = mode === "view";
  const isPending = isCreating || isUpdating;

  const {
    data: agent,
    isLoading: agentLoading,
  } = fetchAgentById(
    String(agentId),
    (mode === "edit" || mode === "view") && !!agentId
  );

  const { data: agentLeadsData } = useAdminLeads(
    { agentId: agentId ?? undefined, page: 1, limit: 10 },
    mode !== 'create' && !!agentId
  );
  const assignedLeads = agentLeadsData?.data ?? [];

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
    if (!token) {
      onToast('Please log in as an admin before creating an agent');
      return;
    }
    if (user?.role !== 'ADMIN') {
      onToast('Only an admin account can create agents');
      return;
    }
    if (!formData.name.trim()) {
      onToast('Please enter the agent name');
      return;
    }
    if (mode === 'create' && !/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      onToast('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!formData.agencyName.trim()) {
      onToast('Please enter an agency name');
      return;
    }

    if (mode === 'edit' && agentId) {
      updateAgent(
        {
          id: agentId,
          payload: {
            name: formData.name.trim(),
            agencyName: formData.agencyName.trim(),
            ...(formData.email.trim() ? { email: formData.email.trim() } : {}),
            ...(formData.reraNumber.trim()
              ? { reraNumber: formData.reraNumber.trim() }
              : {}),
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
            queryClient.invalidateQueries({ queryKey: ['agent', String(agentId)] });
            onToast('✅ Agent updated successfully');
            onSaved?.();
          },
          onError: (error: any) => {
            const apiMessage = error?.response?.data?.message as string | undefined;
            const code = error?.response?.data?.code as string | undefined;
            onToast(
              (code && ERROR_MESSAGES[code]) ||
              (apiMessage ? `❌ ${apiMessage}` : '❌ Failed to update agent')
            );
          },
        }
      );
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
        queryClient.invalidateQueries({ queryKey: ['agents'] });
        onToast('✅ Agent created successfully');
        onSaved?.();
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
                disabled={isReadOnly}
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

          </div>
        </div>

        {/* Publish Actions */}
        <div className="publish-row">
          {mode === 'view' ? (
            <button className="btn-gold" onClick={() => onEdit?.()}>
              Edit Agent
            </button>
          ) : (
            <button
              className="btn-gold"
              onClick={handlePublish}
              disabled={isPending || agentLoading}
            >
              {isPending
                ? mode === 'edit' ? 'Saving...' : 'Creating...'
                : mode === 'edit' ? 'Save Changes' : 'Create Agent'}
            </button>
          )}
        </div>

      </div>

      {/* ── RIGHT COLUMN ────────────────────────────────────────────────── */}
      <div className="form-right">

        {mode !== 'create' && agent && (
          <div className="card">
            <div className="card-head">Agent Status</div>
            <div className="card-body">
              <div className="field">
                <label className="field-label">Verification</label>
                <select
                  className="field-input"
                  value={agent.isVerified ? 'true' : 'false'}
                  disabled={isVerifying}
                  onChange={(e) => {
                    if (!agentId) return;
                    const verified = e.target.value === 'true';
                    verifyAgent(
                      { id: agentId, verified },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries({ queryKey: ['agents'] });
                          queryClient.invalidateQueries({ queryKey: ['agent', String(agentId)] });
                          onToast(verified ? '✅ Agent verified' : '✅ Agent marked pending');
                        },
                        onError: () => onToast('❌ Failed to update verification'),
                      }
                    );
                  }}
                >
                  <option value="false">Pending</option>
                  <option value="true">Verified</option>
                </select>
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label className="field-label">Account</label>
                <select
                  className="field-input"
                  value={agent.isActive ? 'true' : 'false'}
                  disabled={isActivating}
                  onChange={(e) => {
                    if (!agentId) return;
                    const next = e.target.value === 'true';
                    activateAgent(
                      { id: agentId, isActive: next },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries({ queryKey: ['agents'] });
                          queryClient.invalidateQueries({ queryKey: ['agent', String(agentId)] });
                          onToast(next ? '✅ Agent activated' : '✅ Agent deactivated');
                        },
                        onError: () => onToast('❌ Failed to update agent status'),
                      }
                    );
                  }}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        )}

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

      {mode !== 'create' && (
        <div className="leads-wrap">
          <div className="card">
            <div className="card-head">Assigned Leads</div>
            {assignedLeads.length === 0 ? (
              <div className="leads-empty">No leads assigned to this agent yet.</div>
            ) : (
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedLeads.map((lead: any) => (
                    <tr key={lead.id}>
                      <td>{lead.guestName || lead.buyer?.name || 'Guest'}</td>
                      <td>{lead.guestPhone || lead.buyer?.phone || '—'}</td>
                      <td>{lead.project?.name || lead.property?.title || 'General'}</td>
                      <td>{lead.status}</td>
                      <td>{new Date(lead.createdAt).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

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
        .leads-wrap { grid-column: 1 / -1; }
        .leads-empty { padding: 24px; text-align: center; color: #9CA3AF; font-size: 13px; }
        .leads-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .leads-table th {
          text-align: left;
          padding: 10px 16px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #8A8A8A;
          background: #FAF7F2;
        }
        .leads-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #FAF7F2;
          color: #4A4A4A;
        }
      `}</style>
    </div>
  );
}