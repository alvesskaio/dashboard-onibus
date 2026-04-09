import type { BusRaw, BusData, SpeedCategory } from '../types/bus';

export function parseCoord(str: string): number {
    return parseFloat(String(str).replace(',', '.'));
}

export function parseTimestamp(ms: string | number): Date {
    const num = typeof ms === 'string' ? parseInt(ms, 10) : ms;
    return new Date(num);
}

const pad = (n: number) => String(n).padStart(2, '0');

export function formatDateTime(d: Date): string {
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function formatDate(d: Date): string {
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function formatTime(d: Date): string {
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function processRawData(raw: BusRaw[]): BusData[] {
    return raw.map((item) => {
        const dt = parseTimestamp(item.datahora);
        return {
            ordem: item.ordem,
            linha: item.linha,
            latitude: parseCoord(item.latitude),
            longitude: parseCoord(item.longitude),
            velocidade: parseInt(item.velocidade, 10) || 0,
            datahora: dt,
            datahoraenvio: parseTimestamp(item.datahoraenvio),
            datahoraservidor: parseTimestamp(item.datahoraservidor),
            datahoraStr: formatDateTime(dt),
            dataStr: formatDate(dt),
            horaStr: formatTime(dt),
        };
    });
}

export function speedCategory(vel: number): SpeedCategory {
    if (vel === 0) return 'stopped';
    if (vel <= 15) return 'slow';
    if (vel <= 35) return 'normal';
    if (vel <= 55) return 'fast';
    return 'very-fast';
}

export function speedColor(vel: number): string {
    if (vel === 0) return '#a78bfa';
    if (vel <= 15) return '#22d3ee';
    if (vel <= 35) return '#34d399';
    if (vel <= 55) return '#fbbf24';
    return '#fb7185';
}

export const SPEED_BADGE_CLASSES: Record<SpeedCategory, string> = {
    stopped: 'bg-purple-500/15 text-purple-400',
    slow: 'bg-cyan-500/15 text-cyan-400',
    normal: 'bg-emerald-500/15 text-emerald-400',
    fast: 'bg-amber-500/15 text-amber-400',
    'very-fast': 'bg-rose-500/15 text-rose-400',
};
