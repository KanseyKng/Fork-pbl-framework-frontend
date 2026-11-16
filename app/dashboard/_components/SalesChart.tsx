// app/dashboard/_components/SalesChart.tsx
"use client";

interface SalesChartProps {
  salesData: any[];
  salesFilter: "Hari ini" | "Minggu ini" | "Bulan ini";
  setSalesFilter: (filter: "Hari ini" | "Minggu ini" | "Bulan ini") => void;
  maxValue: number;
  avgDaily: number;
  peakSale: any;
  formatRupiah: (value: number) => string;
}

export default function SalesChart({ salesData, salesFilter, setSalesFilter, maxValue, avgDaily, peakSale, formatRupiah }: SalesChartProps) {
  return (
    <div className="col-span-7 bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div><h3 className="text-lg font-bold text-[#111C2D]">Ringkasan Penjualan</h3><p className="text-xs text-[#434655]">Performa penjualan Ikobana (dari pesanan Selesai)</p></div>
        <div className="flex bg-[#F0F3FF] p-1 rounded-lg">
          {(["Hari ini", "Minggu ini", "Bulan ini"] as const).map((filter) => (
            <button key={filter} onClick={() => setSalesFilter(filter)} className={`px-3 py-1 text-[11px] font-bold rounded-md transition ${salesFilter === filter ? "bg-[#2563EB] text-white shadow-sm" : "text-gray-500"}`}>{filter}</button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-end justify-between gap-2 h-[200px] border-b border-gray-100 pb-2 relative">
        {salesData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs italic">Tidak ada data penjualan pada periode ini.</div>
        ) : (
          salesData.map((data: any, i: number) => {
            const barHeight = maxValue > 0 ? Math.max((data.value / maxValue) * 100, data.value > 0 ? 5 : 0) : 0;
            return (
              <div key={i} className="flex flex-col items-center gap-2 w-full h-full justify-end group relative">
                {data.value > 0 && (
                  <div className="absolute -top-8 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">{formatRupiah(data.value)}</div>
                )}
                <div className={`w-8 rounded-t-md transition-all ${data.value > 0 ? "bg-[#2563EB] hover:bg-[#1E40AF]" : "bg-gray-100"}`} style={{ height: `${barHeight}%` }}></div>
                <span className="text-[11px] font-bold text-[#434655]">{data.label}</span>
              </div>
            );
          })
        )}
      </div>
      <div className="flex justify-between items-center bg-[#F0F3FF] p-3 rounded-lg mt-4">
        <div className="flex items-center gap-2 text-xs text-[#434655]">Rata-rata: <b className="text-[#111C2D]">{formatRupiah(avgDaily)}</b></div>
        <div className="flex items-center gap-2 text-xs text-[#434655]">Puncak Penjualan: <b className="text-[#004AC6]">{peakSale.value > 0 ? `${peakSale.label} (${formatRupiah(peakSale.value)})` : "Tidak ada data"}</b></div>
      </div>
    </div>
  );
}