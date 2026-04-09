import type { BusData } from '../types/bus';
import { useMemo } from 'react';

interface StatsGridProps {
    data: BusData[];
}

interface StatCardProps {
    label: string;
    value: string | number;
    sub: string;
    gradient: string;
    textColor: string;
}

function StatCard({ label, value, sub, gradient, textColor }: StatCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-[rgba(17,24,39,0.7)] backdrop-blur-xl border border-white/6 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
            <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl ${gradient}`} />
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">{label}</p>
            <p className={`text-3xl font-extrabold tracking-tight ${textColor}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-1.5">{sub}</p>
        </div>
    );
}

export default function StatsGrid({ data }: StatsGridProps) {
    const stats = useMemo(() => {
        const total = data.length;
        const linhas = new Set(data.map((d) => d.linha)).size;
        const avgVel = total ? (data.reduce((s, d) => s + d.velocidade, 0) / total).toFixed(1) : '0';
        const parados = data.filter((d) => d.velocidade === 0).length;
        const pct = total ? ((parados / total) * 100).toFixed(0) : '0';
        return { total, linhas, avgVel, parados, pct };
    }, [data]);

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
                label="Total de Ônibus"
                value={stats.total}
                sub="veículos registrados"
                gradient="bg-gradient-to-r from-blue-500 to-purple-500"
                textColor="text-blue-400"
            />
            <StatCard
                label="Linhas Únicas"
                value={stats.linhas}
                sub="linhas em operação"
                gradient="bg-gradient-to-r from-cyan-500 to-emerald-500"
                textColor="text-emerald-400"
            />
            <StatCard
                label="Velocidade Média"
                value={stats.avgVel}
                sub="km/h"
                gradient="bg-gradient-to-r from-amber-500 to-rose-500"
                textColor="text-amber-400"
            />
            <StatCard
                label="Ônibus Parados"
                value={stats.parados}
                sub={`${stats.pct}% da frota parada`}
                gradient="bg-gradient-to-r from-purple-500 to-pink-500"
                textColor="text-purple-400"
            />
        </section>
    );
}
