import React, { useEffect, useRef, useState, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin, Layers3 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { COUNTRY_REGISTRY, type CountryRegistryItem } from '../../data/countryRegistry';
import { COUNTRY_COORDINATES } from '../../data/countryCoordinates';
import { CountryModal } from '../ui/CountryModal';
import { STATUS_COLORS, capacityToRadius } from './statusStyle';

// Free, tokenless vector tile style — no API key required.
const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

interface InfrastructureMapProps {
  selectedRegion: string;
  searchQuery: string;
}

export const InfrastructureMap: React.FC<InfrastructureMapProps> = ({
  selectedRegion,
  searchQuery,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryRegistryItem | null>(null);
  const [overlayMode, setOverlayMode] = useState<'status' | 'capacity'>('status');

  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return COUNTRY_REGISTRY.filter((c) => {
      const regionMatch = selectedRegion === 'All Regions' || c.region === selectedRegion;
      const queryMatch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.alpha2.toLowerCase().includes(q) ||
        c.alpha3.toLowerCase().includes(q);
      return regionMatch && queryMatch && COUNTRY_COORDINATES[c.id];
    });
  }, [selectedRegion, searchQuery]);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({
        container: containerRef.current,
        style: MAP_STYLE_URL,
        center: [30, 20],
        zoom: 1.4,
        pitch: 0,
        attributionControl: { compact: true },
      });

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      map.on('load', () => setMapReady(true));
      map.on('error', () => setMapFailed(true));

      mapRef.current = map;
    } catch {
      setMapFailed(true);
    }

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Render / refresh markers whenever filtered data or overlay mode changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    filteredCountries.forEach((country) => {
      const coords = COUNTRY_COORDINATES[country.id];
      if (!coords) return;

      const radius =
        overlayMode === 'capacity'
          ? capacityToRadius(country.dataCenterCapacityMW)
          : 10;
      const color = STATUS_COLORS[country.sovereignAiStatus];

      const el = document.createElement('button');
      el.type = 'button';
      el.setAttribute('aria-label', `${country.name} infrastructure marker`);
      el.style.width = `${radius * 2}px`;
      el.style.height = `${radius * 2}px`;
      el.style.borderRadius = '9999px';
      el.style.background = `${color}33`;
      el.style.border = `2px solid ${color}`;
      el.style.boxShadow = `0 0 12px ${color}66`;
      el.style.cursor = 'pointer';
      el.style.padding = '0';

      // Popup content built via DOM nodes + textContent only (no innerHTML) to avoid XSS.
      const popupNode = document.createElement('div');
      popupNode.style.fontFamily = 'inherit';
      popupNode.style.fontSize = '12px';
      popupNode.style.color = '#0f172a';
      popupNode.style.lineHeight = '1.5';

      const title = document.createElement('div');
      title.style.fontWeight = '700';
      title.style.marginBottom = '4px';
      title.textContent = `${country.name} (${country.alpha3})`;
      popupNode.appendChild(title);

      const statusLine = document.createElement('div');
      statusLine.textContent = `Sovereign AI: ${country.sovereignAiStatus}`;
      popupNode.appendChild(statusLine);

      const capacityLine = document.createElement('div');
      capacityLine.textContent = `Data Center Capacity: ${country.dataCenterCapacityMW} MW`;
      popupNode.appendChild(capacityLine);

      const gridLine = document.createElement('div');
      gridLine.textContent = `Grid Readiness: ${country.gridReadinessScore}/100`;
      popupNode.appendChild(gridLine);

      const projLine = document.createElement('div');
      projLine.textContent = `Active Projects: ${country.activeProjectsCount}`;
      popupNode.appendChild(projLine);

      const popup = new maplibregl.Popup({ offset: 14, closeButton: false, maxWidth: '220px' }).setDOMContent(
        popupNode
      );

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(map);

      el.addEventListener('click', () => setSelectedCountry(country));

      markersRef.current.push(marker);
    });
  }, [filteredCountries, mapReady, overlayMode]);

  return (
    <GlassCard className="p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Global Infrastructure Map</h3>
            <p className="text-[11px] text-slate-400 font-mono">
              {filteredCountries.length} countries plotted · overlay:{' '}
              {overlayMode === 'status' ? 'Sovereign AI Status' : 'Data Center Capacity'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <Layers3 className="w-3.5 h-3.5 text-cyan-400" />
          <button
            type="button"
            onClick={() => setOverlayMode('status')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              overlayMode === 'status'
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                : 'border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Status Overlay
          </button>
          <button
            type="button"
            onClick={() => setOverlayMode('capacity')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              overlayMode === 'capacity'
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                : 'border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Capacity Overlay
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-slate-800">
        {mapFailed ? (
          <div className="h-[480px] flex items-center justify-center bg-slate-900/60 text-slate-400 text-sm">
            Map tiles unavailable. Please check your connection and reload.
          </div>
        ) : (
          <div ref={containerRef} className="h-[480px] w-full" />
        )}

        {/* Legend overlay */}
        {!mapFailed && overlayMode === 'status' && (
          <div className="absolute bottom-3 left-3 z-10 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 px-3 py-2 space-y-1">
            {(Object.keys(STATUS_COLORS) as Array<keyof typeof STATUS_COLORS>).map((status) => (
              <div key={status} className="flex items-center space-x-2 text-[10px] text-slate-300">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: STATUS_COLORS[status] }}
                />
                <span>{status}</span>
              </div>
            ))}
          </div>
        )}
        {!mapFailed && overlayMode === 'capacity' && (
          <div className="absolute bottom-3 left-3 z-10 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 px-3 py-2 text-[10px] text-slate-300">
            Marker size scales with data center capacity (MW)
          </div>
        )}
      </div>

      <p className="text-[10px] text-slate-500 font-mono">
        Map tiles © OpenFreeMap, © OpenMapTiles, © OpenStreetMap contributors. Markers reflect curated registry
        data, not live telemetry.
      </p>

      <CountryModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />
    </GlassCard>
  );
};
