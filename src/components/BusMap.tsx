import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { BusData } from '../types/bus';
import { speedColor } from '../utils/helpers';
import { useEffect } from 'react';

interface BusMapProps {
    data: BusData[];
}

function createBusIcon(vel: number) {
    const color = speedColor(vel);
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="
      width:14px; height:14px; border-radius:50%;
      background:${color}; border:2px solid rgba(255,255,255,0.7);
      box-shadow: 0 0 8px ${color}80;
    "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
    });
}

function FitBounds({ data }: { data: BusData[] }) {
    const map = useMap();
    useEffect(() => {
        if (data.length > 0) {
            const bounds = L.latLngBounds(data.map((d) => [d.latitude, d.longitude] as [number, number]));
            map.fitBounds(bounds, { padding: [30, 30] });
        }
    }, [data, map]);
    return null;
}

export default function BusMap({ data }: BusMapProps) {
    return (
        <div className="rounded-2xl overflow-hidden bg-[rgba(17,24,39,0.7)] backdrop-blur-xl border border-white/6 mb-6">
            <div className="px-6 py-4 border-b border-white/6 flex items-center justify-between">
                <h2 className="text-sm font-semibold flex items-center gap-2.5">
                    <span>🗺️</span> Mapa de Posições
                </h2>
                <span className="text-xs text-slate-500">{data.length} ônibus no mapa</span>
            </div>
            <MapContainer
                center={[-22.91, -43.3]}
                zoom={11}
                scrollWheelZoom
                style={{ height: 480, width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
                />
                <FitBounds data={data} />
                {data.map((bus, i) => (
                    <Marker key={`${bus.ordem}-${i}`} position={[bus.latitude, bus.longitude]} icon={createBusIcon(bus.velocidade)}>
                        <Popup maxWidth={280}>
                            <div className="font-bold text-base text-cyan-400 mb-1">🚌 {bus.linha}</div>
                            <div className="flex justify-between gap-4 py-0.5"><span className="text-slate-400">Ordem</span><span className="font-semibold">{bus.ordem}</span></div>
                            <div className="flex justify-between gap-4 py-0.5"><span className="text-slate-400">Velocidade</span><span className="font-semibold">{bus.velocidade} km/h</span></div>
                            <div className="flex justify-between gap-4 py-0.5"><span className="text-slate-400">Horário</span><span className="font-semibold">{bus.horaStr}</span></div>
                            <div className="flex justify-between gap-4 py-0.5"><span className="text-slate-400">Lat / Lon</span><span className="font-semibold">{bus.latitude.toFixed(5)}, {bus.longitude.toFixed(5)}</span></div>
                        </Popup>
                        <Tooltip direction="top" offset={[0, -10]}>
                            {bus.linha} — {bus.velocidade} km/h
                        </Tooltip>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
