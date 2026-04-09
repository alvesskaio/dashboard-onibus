import { useState, useMemo } from 'react';
import type { BusData } from '../types/bus';
import { speedCategory, SPEED_BADGE_CLASSES } from '../utils/helpers';
import type { Filters } from '../hooks/useBusData';

interface DataTableProps {
    data: BusData[];
    totalCount: number;
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

type SortDir = 'asc' | 'desc';

export default function DataTable({ data, totalCount, filters, setFilters }: DataTableProps) {
    const [sortCol, setSortCol] = useState<keyof BusData | null>(null);
    const [sortDir, setSortDir] = useState<SortDir>('asc');

    const sorted = useMemo(() => {
        if (!sortCol) return data;
        return [...data].sort((a, b) => {
            let va: string | number | Date = a[sortCol] as string | number | Date;
            let vb: string | number | Date = b[sortCol] as string | number | Date;
            if (typeof va === 'string') va = va.toLowerCase();
            if (typeof vb === 'string') vb = vb.toLowerCase();
            if (va < vb) return sortDir === 'asc' ? -1 : 1;
            if (va > vb) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortCol, sortDir]);

    function handleSort(col: keyof BusData) {
        if (sortCol === col) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortCol(col);
            setSortDir('asc');
        }
    }

    const thClass =
        'sticky top-0 bg-[#111827] px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-wide text-slate-500 text-left cursor-pointer select-none transition-colors hover:text-blue-400 whitespace-nowrap';

    const columns: { key: keyof BusData; label: string }[] = [
        { key: 'ordem', label: 'Ordem' },
        { key: 'linha', label: 'Linha' },
        { key: 'velocidade', label: 'Velocidade' },
        { key: 'latitude', label: 'Latitude' },
        { key: 'longitude', label: 'Longitude' },
        { key: 'dataStr', label: 'Data' },
        { key: 'horaStr', label: 'Hora' },
    ];

    return (
        <div className="rounded-2xl overflow-hidden bg-[rgba(17,24,39,0.7)] backdrop-blur-xl border border-white/6">
            <div className="px-6 py-4 border-b border-white/6 flex items-center justify-between">
                <h2 className="text-sm font-semibold flex items-center gap-2.5">
                    <span>📋</span> Tabela de Dados
                </h2>
                <input
                    type="text"
                    placeholder="Buscar por ordem, linha…"
                    value={filters.search}
                    onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                    className="bg-[#111827] border border-white/6 rounded-[10px] text-slate-100 px-3.5 py-2 text-sm outline-none transition-all focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] w-64"
                />
            </div>

            <div className="max-h-[480px] overflow-y-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`${thClass} ${sortCol === col.key ? (sortDir === 'asc' ? 'text-blue-400' : 'text-blue-400') : ''}`}
                                    onClick={() => handleSort(col.key)}
                                >
                                    {col.label}
                                    {sortCol === col.key && (
                                        <span className="ml-1 text-[0.6rem]">{sortDir === 'asc' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((bus, i) => {
                            const cat = speedCategory(bus.velocidade);
                            return (
                                <tr
                                    key={`${bus.ordem}-${i}`}
                                    className="border-b border-white/3 transition-colors hover:bg-blue-500/5"
                                >
                                    <td className="px-4 py-2.5 text-sm text-slate-100 font-medium whitespace-nowrap">{bus.ordem}</td>
                                    <td className="px-4 py-2.5 text-sm whitespace-nowrap">
                                        <span className="text-cyan-400 font-semibold">{bus.linha}</span>
                                    </td>
                                    <td className="px-4 py-2.5 text-sm whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${SPEED_BADGE_CLASSES[cat]}`}>
                                            {bus.velocidade} km/h
                                        </span>
                                    </td>
                                    <td className="px-4 py-2.5 text-sm text-slate-400 whitespace-nowrap">{bus.latitude.toFixed(5)}</td>
                                    <td className="px-4 py-2.5 text-sm text-slate-400 whitespace-nowrap">{bus.longitude.toFixed(5)}</td>
                                    <td className="px-4 py-2.5 text-sm text-slate-400 whitespace-nowrap">{bus.dataStr}</td>
                                    <td className="px-4 py-2.5 text-sm text-slate-400 whitespace-nowrap">{bus.horaStr}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-3 border-t border-white/6 text-xs text-slate-500">
                Mostrando {data.length} de {totalCount} registros
            </div>
        </div>
    );
}
