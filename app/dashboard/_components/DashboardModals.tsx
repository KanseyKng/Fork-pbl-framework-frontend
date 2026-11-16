// app/dashboard/_components/DashboardModals.tsx
"use client";

interface DashboardModalsProps {
  isStockModalOpen: boolean;
  setIsStockModalOpen: (val: boolean) => void;
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (val: boolean) => void;
  selectedProducts: any[];
  stockUpdates: Record<string, string>;
  setStockUpdates: (val: Record<string, string>) => void;
  handleSaveStock: () => void;
}

export default function DashboardModals({
  isStockModalOpen,
  setIsStockModalOpen,
  isSuccessModalOpen,
  setIsSuccessModalOpen,
  selectedProducts,
  stockUpdates,
  setStockUpdates,
  handleSaveStock
}: DashboardModalsProps) {
  return (
    <>
      {/* MODAL UPDATE STOK */}
      {isStockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-[576px] overflow-hidden">
            <div className="bg-[#F0F3FF] p-6 flex justify-between items-center border-b border-gray-100"><div><span className="text-[10px] font-bold bg-[#DBE1FF] text-[#00174B] px-2 py-0.5 rounded">IKOBANA FROZEN FOOD INVENTORY</span><h2 className="text-xl font-bold text-[#111C2D] mt-1">Update Stok Produk</h2></div><button onClick={() => setIsStockModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-bold">✕</button></div>
            <div className="p-6 space-y-4">
              <div className="bg-[#F0F3FF] p-4 rounded-xl flex justify-between items-center"><div><p className="font-bold text-[#111C2D]">{selectedProducts[0]?.name}</p><p className="text-xs text-[#737686] mt-1">SKU: {selectedProducts[0]?.sku}</p></div><div className="text-right"><p className="text-[10px] font-bold text-[#737686] uppercase">Stok Saat Ini</p><p className="text-lg font-bold text-[#004AC6]">{selectedProducts[0]?.stock} box</p></div></div>
              <div><label className="text-xs font-bold text-[#111C2D]">Jumlah Penyesuaian Baru</label><div className="flex items-center mt-1 bg-[#F0F3FF] rounded-lg p-2 border border-transparent focus-within:border-blue-500 transition-colors"><input type="number" autoFocus className="flex-1 bg-transparent border-none focus:outline-none font-bold text-[#111C2D] pl-2 placeholder-gray-400" value={stockUpdates[selectedProducts[0]?.id] ?? ""} onChange={(e) => setStockUpdates({ ...stockUpdates, [selectedProducts[0].id]: e.target.value })} placeholder="Masukkan jumlah..." /><span className="text-sm font-semibold text-[#737686] pr-2">box</span></div></div>
              <div className="bg-[#DEE8FF]/60 p-3 rounded-lg flex items-center gap-2 text-sm text-[#111C2D]"><span className="text-[#004AC6]">📊</span> Proyeksi Total Stok Akhir: <b>{stockUpdates[selectedProducts[0]?.id] || 0} box</b></div>
            </div>
            <div className="bg-[#F0F3FF] p-6 flex justify-end gap-3"><button onClick={handleSaveStock} className="bg-[#2563EB] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700">Simpan Update Stok</button><button onClick={() => setIsStockModalOpen(false)} className="bg-[#DC2626] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-red-700">Batal</button></div>
          </div>
        </div>
      )}

      {/* MODAL BERHASIL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[340px] flex flex-col items-center text-center animate-fade-in"><h2 className="text-xl font-bold text-gray-900 mb-2">Update Berhasil!</h2><div className="w-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-semibold py-2 rounded-lg mb-6">● Selamat datang di IKOBANA FROZEENFOOD</div><button onClick={() => setIsSuccessModalOpen(false)} className="w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50">Kembali</button></div>
        </div>
      )}
    </>
  );
}