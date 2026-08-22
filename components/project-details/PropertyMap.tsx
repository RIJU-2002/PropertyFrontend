"use client";

import { memo, useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useNearbyPlaces, PLACE_CATEGORIES, type NearbyPlace } from "@/hooks/useNearbyPlaces";
import styles from "./PropertyMap.module.css";

const libraries: ("places" | "marker")[] = ["places", "marker"];

const mapOptions: google.maps.MapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  zoomControl: true,
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
};

interface Props {
  propertyName: string;
  center: { lat: number; lng: number };
}

function PropertyMap({ propertyName, center }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activePlace, setActivePlace] = useState<NearbyPlace | null>(null);
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  const { places, loading } = useNearbyPlaces(center, map);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const filtered = filter ? places.filter((p) => p.category === filter) : places;

  /* ── InfoWindow singleton ── */
  useEffect(() => {
    if (!map) return;
    infoWindowRef.current = new google.maps.InfoWindow();
    return () => {
      infoWindowRef.current?.close();
    };
  }, [map]);

  /* ── Property marker (gold pin) ── */
  useEffect(() => {
    if (!map || !isLoaded) return;

    const el = document.createElement("div");
    el.innerHTML = `
      <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0C8.95 0 0 8.95 0 20c0 14.86 20 32 20 32s20-17.14 20-32C40 8.95 31.05 0 20 0z" fill="#f59e0b" stroke="#fff" stroke-width="2"/>
        <circle cx="20" cy="20" r="8" fill="#fff"/>
      </svg>
    `;
    el.style.cursor = "pointer";

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: center,
      content: el,
      title: propertyName,
    });

    const clickListener = () => {
      setActivePlace(null);
      setShowPropertyInfo(true);
      infoWindowRef.current?.setContent(`
        <div style="font-family:system-ui,sans-serif;padding:4px;min-width:160px;">
          <strong style="font-size:14px;color:#0f172a;display:block;margin-bottom:4px;">${propertyName}</strong>
          <span style="font-size:12px;color:#64748b;">Property Location</span>
        </div>
      `);
      infoWindowRef.current?.open({ anchor: marker, map });
    };

    el.addEventListener("click", clickListener);

    return () => {
      el.removeEventListener("click", clickListener);
      marker.map = null;
    };
  }, [map, isLoaded, center.lat, center.lng, propertyName]);

  /* ── Nearby place markers ── */
  useEffect(() => {
    if (!map || !isLoaded) return;

    const markers: google.maps.marker.AdvancedMarkerElement[] = [];

    filtered.forEach((p) => {
      const el = document.createElement("div");
      el.style.cssText = `
        width:16px;height:16px;border-radius:50%;
        background:${p.color};border:2px solid #fff;
        box-shadow:0 2px 6px rgba(0,0,0,0.25);
        cursor:pointer;
      `;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: p.lat, lng: p.lng },
        content: el,
        title: p.name,
      });

      const clickListener = () => {
        setShowPropertyInfo(false);
        setActivePlace(p);
        infoWindowRef.current?.setContent(`
          <div style="font-family:system-ui,sans-serif;padding:4px;min-width:180px;">
            <strong style="font-size:14px;color:#0f172a;display:block;margin-bottom:2px;">${p.name}</strong>
            <span style="font-size:12px;color:${p.color};display:block;margin-bottom:4px;">${p.category}</span>
            ${p.rating ? `<span style="font-size:12px;color:#64748b;">⭐ ${p.rating.toFixed(1)}</span><br/>` : ""}
            ${p.vicinity ? `<small style="font-size:11px;color:#94a3b8;">${p.vicinity}</small>` : ""}
          </div>
        `);
        infoWindowRef.current?.open({ anchor: marker, map });
      };

      el.addEventListener("click", clickListener);
      markers.push(marker);
    });

    return () => {
      markers.forEach((m) => (m.map = null));
    };
  }, [map, isLoaded, filtered]);

  /* ── Close info window when filter changes ── */
  useEffect(() => {
    infoWindowRef.current?.close();
    setActivePlace(null);
    setShowPropertyInfo(false);
  }, [filter]);

  if (!isLoaded) {
    return <div className={styles.skeleton}>Loading map…</div>;
  }

  return (
    <div className={styles.wrapper}>
      {/* Category filter */}
      <div className={styles.filterBar}>
        <button
          className={`${styles.pill} ${!filter ? styles.pillActive : ""}`}
          onClick={() => setFilter(null)}
        >
          All Places
        </button>
        {PLACE_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`${styles.pill} ${
              filter === cat.label ? styles.pillActive : ""
            }`}
            onClick={() => setFilter(cat.label)}
          >
            <span style={{ color: cat.color }}>●</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Map */}
      <GoogleMap
        mapContainerClassName={styles.mapContainer}
        center={center}
        zoom={15}
        options={mapOptions}
        onLoad={setMap}
      />

      {loading && <div className={styles.toast}>Finding nearby places…</div>}
    </div>
  );
}

export default memo(PropertyMap);
