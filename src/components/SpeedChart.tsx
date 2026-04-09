import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import type { BusData } from '../types/bus';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface SpeedChartProps {
    data: BusData[];
}

const BINS = [
    { label: '0 (Parado)', min: 0, max: 0 },
    { label: '1–15', min: 1, max: 15 },
    { label: '16–30', min: 16, max: 30 },
    { label: '31–45', min: 31, max: 45 },
    { label: '46–60', min: 46, max: 60 },
    { label: '60+', min: 61, max: Infinity },
];

const COLORS = ['#a78bfa', '#22d3ee', '#34d399', '#fbbf24', '#fb923c', '#fb7185'];

export default function SpeedChart({ data }: SpeedChartProps) {
    const counts = useMemo(
        () =>
            BINS.map((b) =>
                data.filter((d) =>
                    b.max === 0 ? d.velocidade === 0 : d.velocidade >= b.min && d.velocidade <= b.max
                ).length
            ),
        [data]
    );

    const chartData = {
        labels: BINS.map((b) => b.label),
        datasets: [
            {
                label: 'Quantidade',
                data: counts,
                backgroundColor: COLORS.map((c) => c + '33'),
                borderColor: COLORS,
                borderWidth: 2,
                borderRadius: 6,
                barPercentage: 0.7,
            },
        ],
    };

    return (
        <div className="rounded-2xl overflow-hidden bg-[rgba(17,24,39,0.7)] backdrop-blur-xl border border-white/6">
            <div className="px-6 py-4 border-b border-white/6">
                <h2 className="text-sm font-semibold flex items-center gap-2.5">
                    <span>📊</span> Distribuição de Velocidade
                </h2>
            </div>
            <div className="p-5 h-[340px]">
                <Bar
                    data={chartData}
                    options={{
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
                            x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 11 } } },
                            y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 11 } }, beginAtZero: true },
                        },
                    }}
                />
            </div>
        </div>
    );
}
