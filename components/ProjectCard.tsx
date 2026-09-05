'use client';

import { useState } from 'react';
import { Heart, Share2, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { Project } from "@/lib/api/types";
import Link from 'next/link';
import { useSavedProject } from "@/hooks/useSavedProperty";
import EnquiryModal from "@/components/project-details/EnquiryModal"; // <-- adjust path if needed

interface ProjectCardProps {
  project: Project;
  initialSaved?: boolean;
}

function formatPropertyType(type?: string) {
  if (!type) return "";
  return type
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ProjectCard({ project, initialSaved = false }: ProjectCardProps) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false); // <-- modal state
  const { isSaved, isLoading, toggleSave } = useSavedProject(project.id, initialSaved);

  const statusColor =
    project.possessionStatus === 'READY_TO_MOVE'
      ? 'bg-green-100 text-green-700 border border-green-300'
      : 'bg-amber-50 text-amber-700 border border-amber-300';

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative md:w-[320px] md:min-w-[320px] aspect-[4/3] overflow-hidden">
          <img
            src={project.images[0]?.url ?? 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {project.isTrending && (
            <div className="absolute top-4 left-0">
              <div className="bg-[#1a2340] text-white text-xs font-semibold px-4 py-1.5 clip-ribbon">
                Trending
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={toggleSave}
              disabled={isLoading}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors disabled:opacity-50"
            >
              <Heart
                size={16}
                className={isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors">
              <Share2 size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {project.projectType && (
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#1a2340]/5 text-[#1a2340] border border-[#1a2340]/15">
                  {formatPropertyType(String(project.projectType))}
                </span>
              )}
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor}`}>
                {project.possessionStatus}
              </span>
              {project.possessionDate && (
                <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                  <CheckCircle2 size={12} className="text-green-600" />
                  Possession: {project.possessionDate}
                </span>
              )}
            </div>

            <div className="flex items-start justify-between gap-4 mb-1">
              <h2 className="text-2xl font-semibold text-gray-900 leading-tight">{project.name}</h2>
              <div className="text-right shrink-0">
                {project.reraNumber && (
                  <p className="text-[11px] text-gray-400 mt-0.5">RERA ID: {project.reraNumber}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <MapPin size={13} className="text-gray-400 shrink-0" />
                <span>{project.locality.name}, {project.city.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Building2 size={13} className="text-gray-400 shrink-0" />
                <span>{project.builder.name}</span>
              </div>
            </div>

            {project.configs.length > 0 && (
              <div className="mb-4 pb-4 border-b border-gray-100">
                {project.configs.map((config) => (
                  <p key={config.id} className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">{config.unitType}</span>
                    {" • "}
                    {config.buildAreaRange} sq.ft.
                    {" • "}
                    ₹{Number(config.price).toLocaleString()}
                  </p>
                ))}
              </div>
            )}

            {project.amenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.amenities.slice(0, 5).map((item) => (
                  <span
                    key={item.amenity.id}
                    className="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1 border border-gray-200"
                  >
                    {item.amenity.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-2">
            <Link
              href={`/Projects/${project.slug}`}
              className="flex-1 py-2.5 rounded-full border-2 border-[#1a2340] text-[#1a2340] font-semibold text-sm hover:bg-[#1a2340] hover:text-white transition-colors duration-200 text-center"
            >
              View Details
            </Link>

            {/* ← CHANGED: button now opens modal */}
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="flex-1 py-2.5 rounded-full bg-[#1a2340] text-white font-semibold text-sm hover:bg-[#0f1726] transition-colors duration-200"
            >
              Get Callback
            </button>
          </div>
        </div>
      </div>

      {/* ← Enquiry Modal */}
      {isEnquiryOpen && (
        <EnquiryModal
          propName={project.name}
          projectId={project.id}
          source="callback_request"
          onClose={() => setIsEnquiryOpen(false)}
        />
      )}
    </>
  );
}
