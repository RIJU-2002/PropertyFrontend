'use client';

import { Heart, Share2, Camera, Play, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { mockProjects,Project } from "@/lib/mock-projects";
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [liked, setLiked] = useState(false);

  const statusColor =
    project.status === 'Ready to Move'
      ? 'bg-green-100 text-green-700 border border-green-300'
      : 'bg-amber-50 text-amber-700 border border-amber-300';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative md:w-[320px] md:min-w-[320px] h-56 md:h-auto overflow-hidden group">
        <img
          src={project.image_url ?? 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Exclusive Badge */}
        {project.is_exclusive && (
          <div className="absolute top-4 left-0">
            <div className="bg-[#1a2340] text-white text-xs font-semibold px-4 py-1.5 clip-ribbon">
              Exclusive
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors"
          >
            <Heart
              size={16}
              className={liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors">
            <Share2 size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Photo/Video Count */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {project.photo_count > 0 && (
            <div className="flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
              <Camera size={12} />
              <span>{project.photo_count}</span>
            </div>
          )}
          {project.video_count > 0 && (
            <div className="flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
              <Play size={12} />
              <span>{project.video_count}</span>
            </div>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor}`}>
              {project.status}
            </span>
            {project.possession_date && (
              <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                <CheckCircle2 size={12} className="text-green-600" />
                Possession: {project.possession_date}
              </span>
            )}
          </div>

          {/* Title Row */}
          <div className="flex items-start justify-between gap-4 mb-1">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">{project.name}</h2>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-amber-600 leading-tight">{project.price_display}</p>
              {project.rera_id && (
                <p className="text-[11px] text-gray-400 mt-0.5">RERA ID: {project.rera_id}</p>
              )}
            </div>
          </div>

          {/* Location & Builder */}
          <div className="flex flex-col gap-1 mb-4">
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <MapPin size={13} className="text-gray-400 shrink-0" />
              <span>{project.location}, {project.city}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Building2 size={13} className="text-gray-400 shrink-0" />
              <span>{project.builder}</span>
            </div>
          </div>

          {/* BHK Config */}
          {project.bhk_config && (
            <div className="flex items-start gap-6 mb-4 pb-4 border-b border-gray-100">
              <div>
                <p className="text-sm font-semibold text-gray-800">{project.bhk_config}</p>
                <p className="text-xs text-gray-500 mt-0.5">{project.bhk_availability}</p>
                {project.bhk_price && (
                  <p className="text-sm font-medium text-gray-700 mt-0.5">{project.bhk_price}</p>
                )}
              </div>
            </div>
          )}

          {/* Amenities */}
          {project.amenities && project.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.amenities.slice(0, 5).map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1 border border-gray-200"
                >
                  {amenity}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 mt-2">
          <Link
            href="/Pro-Details"
            className="flex-1 py-2.5 rounded-full border-2 border-[#1a2340] text-[#1a2340] font-semibold text-sm hover:bg-[#1a2340] hover:text-white transition-colors duration-200 text-center"
          >
            View Details
          </Link>

          <button className="flex-1 py-2.5 rounded-full bg-[#1a2340] text-white font-semibold text-sm hover:bg-[#0f1726] transition-colors duration-200">
            Get Callback
          </button>
        </div>
      </div>
    </div>
  );
}
