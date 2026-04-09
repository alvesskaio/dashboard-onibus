import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import type { BusData } from '../types/bus';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface TopLinesChartProps {
    data: BusData[];
}

export default function TopLinesChart({ data }: TopLinesChartProps) {
    const sorted = useMemo(() => {
        const counts: Record<string, number> = {};
        data.forEach((d) => { counts[d.linha] = (counts[d.linha] || 0) + 1; });
        return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
    }, [data]);

    const chartData = {
        labels: sorted.map(([l]) => l),
        datasets: [
            {
                label: 'Ônibus',
                data: sorted.map(([, c]) => c),
                backgroundColor: 'rgba(59, 130, 246, 0.35)',
                borderColor: '#3b82f6',
                borderWidth: 2,
                borderRadius: 6,
                barPercentage: 0.65,
            },
        ],
    };

    return (
        <div className="rounded-2xl overflow-hidden bg-[rgba(17,24,39,0.7)] backdrop-blur-xl border border-white/6">
            <div className="px-6 py-4 border-b border-white/6">
                <h2 className="text-sm font-semibold flex items-center gap-2.5">
                    <span>🏆</span> Top 10 Linhas
                </h2>
            </div>
            <div className="p-5 h-[340px]">
                <Bar
                    data={chartData}
                    options={{
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: '#1e293b',
                                titleColor: '#f1f5f9',
                                bodyColor: '#94a3b8',
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderWidth: 1,
                                cornerRadius: 8,
                                padding: 12,
                            },
                        },
                        scales: {
                            x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 11 } }, beginAtZero: true },
                            y: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 12, weight: 'bold' } } },
                        },
                    }}
                />
            </div>
        </div>
    );
}
