import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Props {
  summary: {
    income: number;
    expense: number;
    balance: number;
  };
  incomeByCategory: {
    [key: string]: number;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: route('dashboard') },
  { title: 'Finance', href: route('finances.index') },
  { title: 'Distribution', href: route('finances.distribution') },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value || 0);

export default function FinanceDistribution({
  summary = { income: 0, expense: 0, balance: 0 },
  incomeByCategory = {},
}: Props) {
  const chartData: ChartData<'doughnut'> = {
    labels: Object.keys(incomeByCategory),
    datasets: [
      {
        data: Object.values(incomeByCategory),
        backgroundColor: [
          '#8b5cf6',
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#ec4899',
        ],
        borderColor: '#111827',
        borderWidth: 4,
        hoverOffset: 12,
      },
    ],
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${formatCurrency(context.parsed)}`,
        },
      },
      datalabels: {
        color: '#ffffff',
        font: { weight: 'bold', size: 12 },
        formatter: (value, context) => {
          if (!context.chart.data.datasets[0].data) return '';
          const total = (context.chart.data.datasets[0].data as number[]).reduce(
            (a, b) => a + b,
            0,
          );
          const percentage = total > 0 ? (value / total) * 100 : 0;
          if (percentage < 4) return null;
          return `${percentage.toFixed(0)}%`;
        },
      },
    },
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Finance Distribution" />

      <div className="flex h-full flex-1 flex-col gap-6 p-4">
        {/* --- Ringkasan Atas --- */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl p-5 bg-emerald-900/40 border border-emerald-500/30 backdrop-blur-xl shadow-lg">
            <span className="text-emerald-400 font-semibold text-sm">
              Total Pemasukan
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-white mt-1">
              {formatCurrency(summary.income)}
            </div>
          </div>
          <div className="rounded-2xl p-5 bg-rose-900/40 border border-rose-500/30 backdrop-blur-xl shadow-lg">
            <span className="text-rose-400 font-semibold text-sm">
              Total Pengeluaran
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-white mt-1">
              {formatCurrency(summary.expense)}
            </div>
          </div>
          <div className="rounded-2xl p-5 bg-sky-900/40 border border-sky-500/30 backdrop-blur-xl shadow-lg">
            <span className="text-sky-400 font-semibold text-sm">
              Saldo Akhir
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-white mt-1">
              {formatCurrency(summary.balance)}
            </div>
          </div>
        </section>

        {/* --- Diagram Distribusi --- */}
        <section className="rounded-2xl p-6 shadow-xl border border-white/10 bg-black/30 backdrop-blur-lg">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Diagram */}
            <div className="md:w-1/2 flex flex-col items-center">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
                Distribusi Pemasukan
              </h3>
              {summary.income > 0 ? (
                <div className="relative h-64 w-64 md:h-80 md:w-80 p-2">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              ) : (
                <div className="flex h-64 w-64 items-center justify-center text-center text-white/60">
                  <p>Belum ada data pemasukan untuk ditampilkan.</p>
                </div>
              )}
            </div>

            {/* Rincian */}
            <div className="md:w-1/2 flex flex-col">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
                Rincian Pemasukan
              </h3>
              <div className="space-y-3 overflow-y-auto pr-2 flex-grow max-h-80">
                {(chartData.labels as string[] | undefined)?.map(
                  (label, index) => {
                    if (!chartData.datasets[0]) return null;
                    const value = chartData.datasets[0].data[index] as number;
                    const color = (
                      chartData.datasets[0].backgroundColor as string[]
                    )[index];
                    return (
                      <div
                        key={label}
                        className="flex items-center justify-between bg-white/5 hover:bg-white/10 transition p-3 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="font-medium text-white/90 truncate">
                            {label}
                          </span>
                        </div>
                        <span className="font-bold text-white text-sm md:text-base">
                          {formatCurrency(value)}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
