// app/dashboard/_components/DashboardMetrics.tsx
"use client";

interface DashboardMetricsProps {
  productsLength: number;
  lowStockLength: number;
  transactionsLength: number;
  revenue: number;
  formatRupiah: (value: number) => string;
}

export default function DashboardMetrics({ productsLength, lowStockLength, transactionsLength, revenue, formatRupiah }: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-5 rounded-xl border border-gray-100 flex flex-col justify-between shadow-sm">
        <div className="flex justify-between items-start"><div><p className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">TOTAL PRODUK</p><h2 className="text-3xl font-bold text-[#111C2D] mt-2">{productsLength}</h2></div><div className="w-11 h-11 bg-[#E7EEFF] rounded-full flex items-center justify-center text-[#004AC6] text-xl">📦</div></div>
        <p className="text-[11px] font-bold text-[#004AC6] mt-4">+4 produk baru</p>
      </div>
      <div className="bg-white p-5 rounded-xl border border-gray-100 flex flex-col justify-between shadow-sm">
        <div className="flex justify-between items-start"><div><p className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">STOK MENIPIS</p><h2 className="text-3xl font-bold text-[#111C2D] mt-2">{lowStockLength}</h2></div><div className="w-11 h-11 bg-[#FFDAD6]/60 rounded-full flex items-center justify-center text-[#BA1A1A] text-xl">⚠️</div></div>
        <span className="bg-[#FFDAD6] text-[#93000A] text-[11px] font-bold px-2 py-1 rounded-full w-fit mt-4">Perhatian Segera</span>
      </div>
      <div className="bg-white p-5 rounded-xl border border-gray-100 flex flex-col justify-between shadow-sm">
        <div className="flex justify-between items-start"><div><p className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">TOTAL TRANSAKSI</p><h2 className="text-3xl font-bold text-[#111C2D] mt-2">{transactionsLength}</h2></div><div className="w-11 h-11 bg-[#D5E3FF] rounded-full flex items-center justify-center text-[#2D486D] text-xl">🧾</div></div>
        <p className="text-[11px] font-bold text-[#004AC6] mt-4">Data hari ini</p>
      </div>
      <div className="bg-white p-5 rounded-xl border border-gray-100 flex flex-col justify-between shadow-sm">
        <div className="flex justify-between items-start"><div><p className="text-[11px] font-bold text-[#737686] uppercase tracking-wider">TOTAL PENDAPATAN</p><h2 className="text-2xl font-bold text-[#111C2D] mt-2">{formatRupiah(revenue)}</h2></div><div className="w-11 h-11 bg-[#DEE8FF] rounded-full flex items-center justify-center text-[#004AC6] text-xl">💵</div></div>
        <p className="text-[11px] font-bold text-[#004AC6] mt-4">Dari Pesanan Selesai</p>
      </div>
    </div>
  );
}