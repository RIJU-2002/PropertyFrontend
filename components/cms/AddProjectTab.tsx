'use client';

import { useState } from 'react';
import { useCreateProject,useAmenities,useGeocodeLocation } from '@/hooks/useApi'
import { setDate } from 'date-fns';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AddProjectTabProps {
  onToast: (msg: string) => void;
}

interface Configuration {
  type: string;
  area: string;
  carpetArea:string;
  bedRoom:string;
  livingArea:string;
  kitchen:string;
  balconies:string;
  floorHeight:string;
  flooring:string;
  facing:string;
  pricePerArea:string;
  price: string;
  units: string;
}

interface FormData {
  projectName: string;
  developerName: string;

  address: string;
  reraNumber: string;

  cityId: number | null;
  cityName: string | null;

  stateId: number | null;
  stateName: string | null;

  localityName: string | null;

  latitude: number | null;
  longitude: number | null;

  mapsLink: string;

  propertyType: string;
  status: string;
  totalUnits: string;
  availableUnits: string;
  possessionDate: string;
  launchDate: string;
  description: string;
  metaTitle: string;
  metaDesc: string;
  slug: string;
  leadEmail: string;
  whatsappNumber: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

// const AMENITY_OPTIONS = [
//   'Swimming Pool', 'Gymnasium', '24×7 Security', 'Covered Parking',
//   'Power Backup', 'Clubhouse', 'Children Play Area', 'Jogging Track',
//   'Lift', 'Intercom', 'CCTV', 'Rainwater Harvesting',
// ];

const INITIAL_FORM: FormData = {
  projectName: '',
  developerName: '',
  address: '',
  reraNumber: '',

  cityId: null,
  cityName: null,

  stateId: null,
  stateName: null,

  localityName: null,

  latitude: null,
  longitude: null,

  mapsLink: '',

  propertyType: 'Residential Apartment',
  status: 'New Launch',
  totalUnits: '',
  availableUnits: '',
  possessionDate: '',
  launchDate: '',
  description: '',
  metaTitle: '',
  metaDesc: '',
  slug: '',
  leadEmail: 'leads@samriddhrealty.in',
  whatsappNumber: '+91 98XXX XXXXX',
};

const INITIAL_CONFIGS: Configuration[] = [
  {
    type: '2 BHK',
    area: '875-1050',
    carpetArea: '590-710 sq.ft.',
    bedRoom: '2 BedRooms + 2 BathRooms',
    livingArea: '240 sq.ft',
    kitchen: 'Semi-modular with utility',
    balconies: '1',
    floorHeight: '10 ft',
    flooring: 'Tiles',
    facing: 'North',
    pricePerArea: '₹7772-8000',
    price: '₹68,00,000',
    units: '60',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AddProjectTab({ onToast }: AddProjectTabProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const { mutate: createProject, isPending } = useCreateProject();
  const [configs, setConfigs] = useState<Configuration[]>([
    { type: '2 BHK', area: '875-1050',carpetArea: '590-710 sq.ft.',bedRoom: '2 BedRooms + 2 BathRooms',livingArea: '240 sq.ft',kitchen:'Semi-modular with utility',balconies:'1',floorHeight:'10 ft',flooring: 'Tiles',facing:'North',pricePerArea:'₹7772-8000' , price: '₹68,00,000', units: '60' },
    { type: '3 BHK', area: '1200-1450',carpetArea: '590-710 sq.ft.',bedRoom: '2 BedRooms + 2 BathRooms',livingArea: '240 sq.ft',kitchen:'Semi-modular with utility',balconies:'1',floorHeight:'10 ft',flooring: 'Tiles',facing:'North',pricePerArea:'₹7772-8000', price: '₹98,00,000', units: '50' },
  ]);
  // const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
  //   'Swimming Pool', 'Gymnasium', '24×7 Security', 'Covered Parking', 'Power Backup',
  // ]);
  const [customAmenity, setCustomAmenity] = useState('');
  const [wpAlerts, setWpAlerts] = useState(true);
  const [images, setImages] = useState<File[]>([]);

  const { data: amenities = [], isLoading } = useAmenities();
  const [selectedAmenityIds, setSelectedAmenityIds] =
  useState<number[]>([]);

  const { mutateAsync: geocodeAddress } =useGeocodeLocation();

  // ── Helpers ──────────────────────────────────────────────────────────────

  const update = (field: keyof FormData, val: string) =>
    setFormData(prev => ({ ...prev, [field]: val }));

  // const toggleAmenity = (a: string) =>
  //   setSelectedAmenities(prev =>
  //     prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
  //   );

  const addConfig = () =>
    setConfigs(prev => [...prev, { type: '', area: '',carpetArea: '',bedRoom: '',livingArea: '',kitchen:'',balconies:'',floorHeight:'',flooring: '',facing:'',pricePerArea:'', price: '', units: '' }]);

  const removeConfig = (i: number) =>
    setConfigs(prev => prev.filter((_, idx) => idx !== i));

  const updateConfig = (i: number, field: keyof Configuration, val: string) =>
    setConfigs(prev => prev.map((c, idx) => (idx === i ? { ...c, [field]: val } : c)));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeImage = (i: number) =>
    setImages(prev => prev.filter((_, idx) => idx !== i));

  // ── Build FormData & submit ───────────────────────────────────────────────

  const buildFormData = (): globalThis.FormData => {
    const fd = new globalThis.FormData();

    // Required backend fields
    fd.append('name', formData.projectName);
    fd.append('builderName', formData.developerName);

    fd.append('description', formData.description);
    fd.append('reraNumber', formData.reraNumber);

    fd.append('launchDate', formData.launchDate);
    fd.append('possessionDate', formData.possessionDate);
    fd.append('possessionStatus',formData.status);

    fd.append('metaTitle', formData.metaTitle);
    fd.append('metaDescription', formData.metaDesc);

    // Temporary until city/locality selectors are added
    fd.append('address', formData.address);

    if (formData.cityName)
      fd.append('cityName', formData.cityName);

    if (formData.localityName)
      fd.append('localityName', formData.localityName);

    if (formData.stateId)
      fd.append('stateId', String(formData.stateId));

    if (formData.latitude)
      fd.append('latitude', String(formData.latitude));

    if (formData.longitude)
      fd.append('longitude', String(formData.longitude));

    // Convert configs to backend format
   const transformedConfigs = configs.map((cfg) => ({
      unitType: cfg.type,
      buildAreaRange: cfg.area,

      carpetArea: cfg.carpetArea,
      bedRoom: cfg.bedRoom,
      livingArea: cfg.livingArea,
      kitchen: cfg.kitchen,
      balconies: cfg.balconies,
      floorHeight: cfg.floorHeight,
      flooring: cfg.flooring,
      facing: cfg.facing,
      pricePerArea: cfg.pricePerArea,

      price: cfg.price
        ? Number(cfg.price.replace(/[₹,\s]/g, ""))
        : undefined,

      units: cfg.units
        ? Number(cfg.units)
        : undefined,
    }));

    console.log(
      "CONFIGS PAYLOAD",
      JSON.stringify(transformedConfigs, null, 2)
    );

    fd.append(
      'configs',
      JSON.stringify(transformedConfigs)
    );

    fd.append(
      'amenityIds',
      JSON.stringify(selectedAmenityIds)
    );

    fd.append(
      'wpAlerts',
      String(wpAlerts)
    );

    images.forEach((file) => {
      fd.append('images', file, file.name);
    });

    return fd;
  };

  const logPayload = (fd: globalThis.FormData, label: string) => {
    const entries: Record<string, unknown> = {};
    fd.forEach((value, key) => {
      if (value instanceof File) {
        entries[key] = { __file: true, name: value.name, size: `${(value.size / 1024).toFixed(1)} KB`, type: value.type };
      } else {
        // try to pretty-print JSON fields
        try { entries[key] = JSON.parse(value as string); }
        catch { entries[key] = value; }
      }
    });
    console.group(`📦 ${label}`);
    console.table(
      Object.entries(entries).map(([key, value]) => ({
        key,
        value: typeof value === 'object' ? JSON.stringify(value) : value,
      }))
    );
    console.log('Full object:', entries);
    console.groupEnd();
    return entries;
  };

  const handleFetchLocation = async () => {
    if (!formData.address.trim()) {
      onToast("Please enter an address");
      return;
    }

    try {
      const location = await geocodeAddress(formData.address);

      setFormData(prev => ({
        ...prev,

        cityId: location.cityId,
        cityName: location.cityName,

        stateId: location.stateId,
        stateName: location.stateName,

        localityName: location.localityName,

        latitude: location.latitude,
        longitude: location.longitude,
      }));

      onToast("📍 Location fetched successfully");
    } catch (error) {
      console.error(error);
      onToast("❌ Failed to fetch location");
    }
  };

  const handlePublish = () => {
    const fd = buildFormData();

    createProject(fd, {
      onSuccess: (data) => {
        console.log(data);
        // Reset form
        setFormData(INITIAL_FORM);
        setConfigs(INITIAL_CONFIGS);
        setSelectedAmenityIds([]);
        setImages([]);
        setCustomAmenity('');
        setWpAlerts(true);
        onToast('✅ Project created successfully');
      },

      onError: (error) => {
        console.error(error);
        onToast('❌ Failed to create project');
      },
    });
  };
  const handleDraft = () => {
    const fd = buildFormData();
    fd.append('isDraft', 'true');
    logPayload(fd, 'Draft — multipart/form-data payload');
    onToast('📋 Draft payload logged — open Console to inspect');
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="form-layout">
      {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
      <div className="form-left">

        {/* Project Info */}
        <div className="card">
          <div className="card-head">Project Information</div>
          <div className="card-body">

            <div className="field">
              <label className="field-label">Project Name *</label>
              <input
                className="field-input"
                placeholder="e.g. Samriddh Heights Phase 2"
                value={formData.projectName}
                onChange={e => update('projectName', e.target.value)}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label">Developer Name</label>
                <input
                  className="field-input"
                  placeholder="Developer / Builder name"
                  value={formData.developerName}
                  onChange={e => update('developerName', e.target.value)}
                />
              </div>
              <div className="field">
                <label className="field-label">RERA Number *</label>
                <input
                  className="field-input"
                  placeholder="WBRERA/P/KOL/2024/XXX"
                  value={formData.reraNumber}
                  onChange={e => update('reraNumber', e.target.value)}
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label">Location</label>
                <input
                  className="field-input"
                  placeholder="Area, City"
                  value={formData.address}
                  onChange={e => update('address', e.target.value)}
                />
                <button
                  type="button"
                  className="btn-secondary mt-2"
                  onClick={handleFetchLocation}
                >
                  Fetch Location
                </button>
                {formData.cityName && (
                    <div style={{ marginTop: "10px" }}>
                      <p><strong>City:</strong> {formData.cityName}</p>
                      <p><strong>Locality:</strong> {formData.localityName}</p>
                      <p><strong>State:</strong> {formData.stateName}</p>
                    </div>
                  )}
              </div>

              <div className="field">
                <label className="field-label">Google Maps Link</label>
                <input
                  className="field-input"
                  placeholder="Paste maps URL"
                  value={formData.mapsLink}
                  onChange={e => update('mapsLink', e.target.value)}
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label">Property Type</label>
                <select
                  className="field-input"
                  value={formData.propertyType}
                  onChange={e => update('propertyType', e.target.value)}
                >
                  <option>Residential Apartment</option>
                  <option>Villa</option>
                  <option>Plot</option>
                  <option>Commercial</option>
                  <option>Mixed Use</option>
                </select>
              </div>
              <div className="field">
                <label className="field-label">Project Status</label>
                <select
                  className="field-input"
                  value={formData.status}
                  onChange={e => update('status', e.target.value)}
                >
                  <option>NEW_LAUNCH</option>
                  <option>UNDER_CONSTRUCTION</option>
                  <option>READY_TO_MOVE</option>
                </select>
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label">Total Units</label>
                <input
                  className="field-input"
                  type="number"
                  placeholder="e.g. 120"
                  value={formData.totalUnits}
                  onChange={e => update('totalUnits', e.target.value)}
                />
              </div>
              <div className="field">
                <label className="field-label">Available Units</label>
                <input
                  className="field-input"
                  type="number"
                  placeholder="e.g. 88"
                  value={formData.availableUnits}
                  onChange={e => update('availableUnits', e.target.value)}
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label className="field-label">Possession Date</label>
                <input
                  className="field-input"
                  type="month"
                  value={formData.possessionDate}
                  onChange={e => update('possessionDate', e.target.value)}
                />
              </div>
              <div className="field">
                <label className="field-label">Launch Date</label>
                <input
                  className="field-input"
                  type="date"
                  value={formData.launchDate}
                  onChange={e => update('launchDate', e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Project Description</label>
              <textarea
                className="field-input"
                rows={4}
                placeholder="Write a compelling description..."
                value={formData.description}
                onChange={e => update('description', e.target.value)}
              />
            </div>

          </div>
        </div>

        {/* Configurations */}
        <div className="card">
          <div className="card-head">Configurations & Pricing</div>
          <div className="card-body">
            <div className="config-list">
              {configs.map((cfg, i) => (
                <div key={i} className="config-card">
                  <div className="config-card-header">
                    <h4>Configuration #{i + 1}</h4>

                    <button
                      className="remove-btn"
                      onClick={() => removeConfig(i)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="config-grid">
                    <div className="field">
                      <label className="field-label">Type</label>
                      <input
                        className="field-input"
                        value={cfg.type}
                        onChange={(e) =>
                          updateConfig(i, "type", e.target.value)
                        }
                        placeholder="2 BHK"
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">Area (sq.ft)</label>
                      <input
                        className="field-input"
                        value={cfg.area}
                        onChange={(e) =>
                          updateConfig(i, "area", e.target.value)
                        }
                        placeholder="875-1050"
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">Carpet Area</label>
                      <input
                        className="field-input"
                        value={cfg.carpetArea}
                        onChange={(e) =>
                          updateConfig(i, "carpetArea", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">Bedrooms</label>
                      <input
                        className="field-input"
                        value={cfg.bedRoom}
                        onChange={(e) =>
                          updateConfig(i, "bedRoom", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">Living Area</label>
                      <input
                        className="field-input"
                        value={cfg.livingArea}
                        onChange={(e) =>
                          updateConfig(i, "livingArea", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">Kitchen</label>
                      <input
                        className="field-input"
                        value={cfg.kitchen}
                        onChange={(e) =>
                          updateConfig(i, "kitchen", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">Balconies</label>
                      <input
                        className="field-input"
                        value={cfg.balconies}
                        onChange={(e) =>
                          updateConfig(i, "balconies", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">Floor Height</label>
                      <input
                        className="field-input"
                        value={cfg.floorHeight}
                        onChange={(e) =>
                          updateConfig(i, "floorHeight", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">Flooring</label>
                      <input
                        className="field-input"
                        value={cfg.flooring}
                        onChange={(e) =>
                          updateConfig(i, "flooring", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">Facing</label>
                      <input
                        className="field-input"
                        value={cfg.facing}
                        onChange={(e) =>
                          updateConfig(i, "facing", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">Price / Sq.ft</label>
                      <input
                        className="field-input"
                        value={cfg.pricePerArea}
                        onChange={(e) =>
                          updateConfig(i, "pricePerArea", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">Starting Price</label>
                      <input
                        className="field-input"
                        value={cfg.price}
                        onChange={(e) =>
                          updateConfig(i, "price", e.target.value)
                        }
                      />
                    </div>

                    <div className="field">
                      <label className="field-label">Units</label>
                      <input
                        type="number"
                        className="field-input"
                        value={cfg.units}
                        onChange={(e) =>
                          updateConfig(i, "units", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-secondary" onClick={addConfig}>
              + Add Configuration
            </button>
          </div>
        </div>

        {/* Amenities */}
        <div className="card">
          <div className="card-head">Amenities</div>
          <div className="card-body">
            <div className="amenity-grid">
              {/* {AMENITY_OPTIONS.map(a => (
                <label key={a} className="amenity-check">
                  <input type="checkbox"
                    checked={selectedAmenities.includes(a)}
                    onChange={() => toggleAmenity(a)} />
                  <span>{a}</span>
                </label>
              ))} */}
              {amenities.map((amenity) => (
                <label key={amenity.id} className="amenity-check">
                  <input
                    type="checkbox"
                    checked={selectedAmenityIds.includes(amenity.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAmenityIds(prev => [...prev, amenity.id]);
                      } else {
                        setSelectedAmenityIds(prev =>
                          prev.filter(id => id !== amenity.id)
                        );
                      }
                    }}
                  />
                  <span>{amenity.name}</span>
                </label>
              ))}
            </div>
            {/* <div className="field" style={{ marginTop: 14 }}>
              <label className="field-label">Custom Amenity</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="field-input" placeholder="Add custom amenity..."
                  value={customAmenity}
                  onChange={e => setCustomAmenity(e.target.value)} />
                <button className="btn-secondary" style={{ flexShrink: 0 }}
                  onClick={() => {
                    if (customAmenity.trim()) {
                      setSelectedAmenityIds(p => [...p, amenity.id]);
                      setCustomAmenity('');
                    }
                  }}>Add</button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Publish Actions */}
        <div className="publish-row">
          <button
            className="btn-gold"
            onClick={handlePublish}
            disabled={isPending}
          >
            {isPending ? 'Publishing...' : 'Publish Project'}
          </button>
          <button className="btn-navy" onClick={handleDraft}>Save as Draft</button>
          <button className="btn-outline">Preview</button>
        </div>

      </div>

      {/* ── RIGHT COLUMN ────────────────────────────────────────────────── */}
      <div className="form-right">

        {/* Image Upload */}
        <div className="card">
          <div className="card-head">Project Images</div>
          <div className="card-body">
            <input
              id="img-input"
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageChange}
            />
            <div className="upload-zone" onClick={() => document.getElementById('img-input')?.click()}>
              <div className="upload-icon">📁</div>
              <div className="upload-text">
                Drop images here or <span className="upload-link">browse</span>
              </div>
              <div className="upload-hint">
                {images.length > 0
                  ? `${images.length} file(s) selected`
                  : 'PNG, JPG up to 5MB each'}
              </div>
            </div>
            <div className="image-grid">
              {images.map((file, i) => (
                <div key={i} className="image-slot image-slot--filled" style={{ position: 'relative', padding: 0, overflow: 'hidden' }}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <button
                    onClick={() => removeImage(i)}
                    style={{
                      position: 'absolute', top: 4, right: 4,
                      background: 'rgba(0,0,0,0.55)', color: '#fff',
                      border: 'none', borderRadius: '50%',
                      width: 20, height: 20, fontSize: 11,
                      cursor: 'pointer', lineHeight: '20px', padding: 0,
                    }}
                  >✕</button>
                </div>
              ))}
              <div
                className="image-slot image-slot--add"
                onClick={() => document.getElementById('img-input')?.click()}
              >
                + Add Image
              </div>
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="card">
          <div className="card-head">SEO Settings</div>
          <div className="card-body">
            <div className="field">
              <label className="field-label">Meta Title</label>
              <input className="field-input"
                placeholder="Samriddh Heights — 2,3 BHK in New Town..."
                value={formData.metaTitle}
                onChange={e => update('metaTitle', e.target.value)} />
            </div>
            <div className="field">
              <label className="field-label">Meta Description</label>
              <textarea className="field-input" rows={3}
                placeholder="Premium 2 & 3 BHK apartments in New Town..."
                value={formData.metaDesc}
                onChange={e => update('metaDesc', e.target.value)} />
            </div>
            <div className="field">
              <label className="field-label">URL Slug</label>
              <input className="field-input"
                value={formData.slug || 'samriddh-heights-new-town'}
                onChange={e => update('slug', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Enquiry Settings */}
        <div className="card">
          <div className="card-head">Enquiry Settings</div>
          <div className="card-body">
            <div className="field">
              <label className="field-label">Lead Email (gets enquiries)</label>
              <input className="field-input"
                value={formData.leadEmail}
                onChange={e => update('leadEmail', e.target.value)} />
            </div>
            <div className="field">
              <label className="field-label">WhatsApp Alert Number</label>
              <input className="field-input"
                value={formData.whatsappNumber}
                onChange={e => update('whatsappNumber', e.target.value)} />
            </div>
            <label className="wp-toggle">
              <input type="checkbox"
                checked={wpAlerts}
                onChange={() => setWpAlerts(p => !p)} />
              <span>Send WhatsApp alert on new enquiry</span>
            </label>
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
          font-family: 'Playfair Display', Georgia, serif;
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
        textarea.field-input { resize: vertical; }
        .table-wrap { overflow-x: auto; margin-bottom: 12px; }
        .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .data-table th {
          text-align: left;
          padding: 8px 10px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #8A8A8A;
          font-weight: 600;
          background: #FAF7F2;
        }
        .data-table td { padding: 8px 10px; border-bottom: 1px solid #FAF7F2; }
        .table-input {
          padding: 6px 9px;
          border: 1px solid #E5E7EB;
          border-radius: 4px;
          font-size: 12px;
          font-family: inherit;
          outline: none;
        }
        .table-input:focus { border-color: #C9A84C; }
        .remove-btn {
          background: transparent;
          border: none;
          color: #A32D2D;
          cursor: pointer;
          font-size: 14px;
          padding: 2px 6px;
          border-radius: 3px;
          transition: background 0.15s;
        }
        .remove-btn:hover { background: #FEE2E2; }
        .amenity-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .amenity-check {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #4A4A4A;
          cursor: pointer;
          padding: 5px 10px;
          border: 1px solid #E5E7EB;
          border-radius: 20px;
          transition: all 0.15s;
          user-select: none;
        }
        .amenity-check:has(input:checked) {
          background: rgba(201,168,76,0.1);
          border-color: #C9A84C;
          color: #0D1B2A;
        }
        .amenity-check input { width: 13px; height: 13px; accent-color: #C9A84C; }
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
        .btn-navy {
          padding: 11px 24px;
          background: #0D1B2A;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.18s;
        }
        .btn-navy:hover { background: #1A2F45; }
        .btn-outline {
          padding: 11px 24px;
          background: transparent;
          color: #4A4A4A;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-outline:hover { border-color: #C9A84C; color: #C9A84C; }
        .btn-secondary {
          padding: 8px 14px;
          background: #0D1B2A;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-secondary:hover { background: #1A2F45; }
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
        .image-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .image-slot {
          height: 80px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
        }
        .image-slot--filled { background: #F3F4F6; color: #9CA3AF; }
        .image-slot--add {
          background: transparent;
          border: 2px dashed #E5E7EB;
          color: #9CA3AF;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .image-slot--add:hover { border-color: #C9A84C; color: #C9A84C; }
        .wp-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #374151;
          cursor: pointer;
          margin-top: 10px;
        }
          .config-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .config-card {
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 16px;
          background: #FAFAFA;
        }

        .config-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .config-card-header h4 {
          margin: 0;
          font-size: 14px;
          color: #0D1B2A;
        }

        .config-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
          @media (max-width: 1200px) {
            .config-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 768px) {
            .config-grid {
              grid-template-columns: 1fr;
            }
          }
        .wp-toggle input { accent-color: #C9A84C; }
      `}</style>
    </div>
  );
}