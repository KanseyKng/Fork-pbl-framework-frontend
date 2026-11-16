// app/dashboard/_components/LowStockList.tsx
"use client";

interface LowStockListProps {
  lowStock: any[];
  openStockModal: (product: any) => void;
}

export default function LowStockList({ lowStock, openStockModal }: LowStockListProps) {
  return (
    <div className="col-span-5 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div><h3 className="text-lg font-bold text-[#111C2D]">Produk Stok Menipis</h3><p className="text-xs text-[#434655]">Segera lakukan restock sebelum kehabisan</p></div>
        <span className="bg-[#FFDAD6] text-[#93000A] text-[11px] font-bold px-2 py-1 rounded-full">{lowStock.length} Item</span>
      </div>
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
        {lowStock.map((p: any) => (
          <div key={p.id} className="flex justify-between items-center bg-[#F0F3FF] p-3 rounded-lg">
            <div><p className="text-xs font-bold text-[#111C2D]">{p.name}</p><p className="text-[11px] text-[#434655] mt-1">Sisa: <span className="text-[#BA1A1A] font-bold">{p.stock}</span> / Min: 20</p></div>
            <button onClick={() => openStockModal(p)} className="bg-white text-[#004AC6] font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-sm hover:bg-gray-50">Update Stok</button>
          </div>
        ))}
        {lowStock.length === 0 && <p className="text-center text-xs text-gray-500 py-4">Semua stok aman.</p>}
      </div>
    </div>
  );
}