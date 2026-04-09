import type { Filters } from '../hooks/useBusData';

interface FiltersProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    resetFilters: () => void;
    linhas: string[];
}

export default function Filters({ filters, setFilters, resetFilters, linhas }: FiltersProps) {
    const update = (key: keyof Filters, value: string) =>
        setFilters((prev) => ({ ...prev, [key]: value }));

    const inputClass =
        'bg-[#111827] border border-white/6 rounded-[10px] text-slate-100 px-3.5 py-2.5 text-sm font-[Inter,sans-serif] outline-none transition-all focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] min-w-[180px]';

    return (
        <section className="flex flex-wrap gap-3 items-end mb-6">
            <div className="flex flex-col gap-1">
                <label className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500">Linha</label>
                <select
                    value={filters.linha}
                    onChange={(e) => update('linha', e.target.value)}
                    className={inputClass}
                >
                    <option value="">Todas as linhas</option>
                    {linhas.map((l) => (
                        <option key={l} value={l}>{l}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500">Vel. Mínima (km/h)</label>
                <input
                    type="number"
                    placeholder="0"
                    min={0}
                    value={filters.velMin}
                    onChange={(e) => update('velMin', e.target.value)}
                    className={inputClass}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500">Vel. Máxima (km/h)</label>
                <input
                    type="number"
                    placeholder="100"
                    min={0}
                    value={filters.velMax}
                    onChange={(e) => update('velMax', e.target.value)}
                    className={inputClass}
                />
            </div>

            <button
                onClick={resetFilters}
                className="bg-transparent border border-white/6 rounded-[10px] text-slate-400 px-4 py-2.5 text-sm cursor-pointer transition-all hover:bg-white/5 hover:border-rose-500 hover:text-rose-400"
            >
                Limpar filtros
            </button>
        </section>
    );
}
