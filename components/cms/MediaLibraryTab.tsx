'use client';

interface MediaLibraryTabProps {
  onToast: (msg: string) => void;
}

const MOCK_IMAGES = [
  { name: 'samriddh-heights-ext.jpg', gradient: 'linear-gradient(135deg,#1A2F45,#0D4A3A)', project: 'Heights' },
  { name: 'samriddh-lobby.jpg', gradient: 'linear-gradient(135deg,#2A1845,#0D1B2A)', project: 'Heights' },
  { name: 'crown-render.jpg', gradient: 'linear-gradient(135deg,#3A2000,#5A3500)', project: 'Crown' },
  { name: 'amenities-pool.jpg', gradient: 'linear-gradient(135deg,#003A2A,#001A10)', project: 'Grandeur' },
  { name: 'grandeur-facade.jpg', gradient: 'linear-gradient(135deg,#1A0030,#0D1B2A)', project: 'Grandeur' },
  { name: 'heights-lobby.jpg', gradient: 'linear-gradient(135deg,#002A3A,#0D1B2A)', project: 'Heights' },
  { name: 'crown-amenities.jpg', gradient: 'linear-gradient(135deg,#3A1000,#5A2000)', project: 'Crown' },
  { name: 'villa-exterior.jpg', gradient: 'linear-gradient(135deg,#003A10,#001A08)', project: 'Villa' },
];

export default function MediaLibraryTab({ onToast }: MediaLibraryTabProps) {
  return (
    <div className="tab-content">
      <div className="card">
        <div className="card-head">
          Media Library
          <button
            className="btn-upload"
            onClick={() => onToast('📁 Upload dialog opened!')}
          >
            Upload Images
          </button>
        </div>
        <div className="card-body">
          <div className="media-grid">
            {/* Add slot */}
            <div
              className="media-add"
              onClick={() => onToast('📁 Upload dialog opened!')}
            >
              <span className="media-add-icon">+</span>
              <span className="media-add-label">Upload</span>
            </div>

            {/* Existing images */}
            {MOCK_IMAGES.map((img) => (
              <div key={img.name} className="media-item">
                <div
                  className="media-thumb"
                  style={{ background: img.gradient }}
                >
                  <div className="media-overlay">
                    <button
                      className="media-action"
                      onClick={() => onToast(`🗑 Deleted ${img.name}`)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="media-info">
                  <div className="media-name">{img.name}</div>
                  <div className="media-project">{img.project}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .tab-content {
          padding: 28px;
        }

        .card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(13, 27, 42, 0.07);
          border: 1px solid #F0EAE0;
          overflow: hidden;
        }

        .card-head {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 17px;
          color: #0D1B2A;
          padding: 16px 22px;
          border-bottom: 1px solid #F0EAE0;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .btn-upload {
          background: #C9A84C;
          color: #0D1B2A;
          border: none;
          border-radius: 5px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s;
        }

        .btn-upload:hover {
          background: #9B7A2A;
          color: #fff;
        }

        .card-body {
          padding: 22px;
        }

        .media-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }

        .media-add {
          aspect-ratio: 4/3;
          border: 2px dashed #E5E7EB;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          gap: 4px;
          transition: all 0.15s;
        }

        .media-add:hover {
          border-color: #C9A84C;
          background: rgba(201, 168, 76, 0.04);
        }

        .media-add-icon {
          font-size: 24px;
          color: #9CA3AF;
          line-height: 1;
        }

        .media-add-label {
          font-size: 11px;
          color: #9CA3AF;
        }

        .media-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .media-thumb {
          aspect-ratio: 4/3;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }

        .media-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 6px;
          opacity: 0;
          transition: opacity 0.15s;
        }

        .media-thumb:hover .media-overlay {
          opacity: 1;
        }

        .media-action {
          width: 22px;
          height: 22px;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          border-radius: 50%;
          color: #fff;
          font-size: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
        }

        .media-action:hover {
          background: #E94560;
        }

        .media-info {
          padding: 0 2px;
        }

        .media-name {
          font-size: 11px;
          color: #4A4A4A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .media-project {
          font-size: 10px;
          color: #C9A84C;
          font-weight: 500;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}
