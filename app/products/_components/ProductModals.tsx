// app/products/_components/ProductModals.tsx
"use client";

interface ProductModalsProps {
  deleteTarget: any;
  setDeleteTarget: (val: any) => void;
  handleDelete: () => void;
  isDeleteSuccess: boolean;
  setIsDeleteSuccess: (val: boolean) => void;
  
  isBulkStockModalOpen: boolean;
  setIsBulkStockModalOpen: (val: boolean) => void;
  selectedIds: string[];
  products: any[];
  bulkUpdates: Record<string, string>;
  setBulkUpdates: (val: Record<string, string>) => void;
  handleSaveBulkStock: () => void;
  isStockSuccess: boolean;
  setIsStockSuccess: (val: boolean) => void;
}

export default function ProductModals({
  deleteTarget, setDeleteTarget, handleDelete, isDeleteSuccess, setIsDeleteSuccess,
  isBulkStockModalOpen, setIsBulkStockModalOpen, selectedIds, products, bulkUpdates, setBulkUpdates, handleSaveBulkStock, isStockSuccess, setIsStockSuccess
}: ProductModalsProps) {
  return (
    <>
      {/* Modal Konfirmasi Hapus */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[20px] shadow-2xl p-6 w-[338px] flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"><div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">!</div></div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Pemberitahuan</h2>
            <p className="text-[13px] text-gray-500 mb-6">Apakah Anda yakin ingin Menghapus Item ini?</p>
            <div className="flex gap-3 w-full">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 bg-red-600 text-white font-semibold py-2.5 rounded-lg">Batal</button>
              <button onClick={handleDelete} className="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-lg">Iya</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Berhasil Hapus */}
      {isDeleteSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[340px] flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-200"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Item Berhasil Dihapus</h2>
            <button onClick={() => setIsDeleteSuccess(false)} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl mt-4">Kembali</button>
          </div>
        </div>
      )}

      {/* Modal Bulk Update Stok */}
      {isBulkStockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-[576px] max-h-[80vh] overflow-y-auto">
             <div className="bg-[#F0F3FF] p-6 flex justify-between items-center sticky top-0"><h2 className="text-xl font-bold text-gray-900">Atur Stok Cepat</h2><button onClick={() => setIsBulkStockModalOpen(false)} className="text-gray-400 font-bold">✕</button></div>
            <div className="p-6 space-y-4">
              {selectedIds.map(id => {
                const p = products.find((prod: any) => prod.id === id);
                return (
                  <div key={id} className="bg-[#F0F3FF] p-4 rounded-xl flex justify-between items-center">
                    <div><p className="font-bold text-gray-900">{p?.name}</p><p className="text-xs text-gray-500">Stok Awal: {p?.stock}</p></div>
                    <input type="number" autoFocus className="w-24 p-2 rounded-lg border border-gray-200 text-center font-bold focus:outline-none focus:border-blue-500" value={bulkUpdates[id] || ""} onChange={(e) => setBulkUpdates({ ...bulkUpdates, [id]: e.target.value })} placeholder="0" />
                  </div>
                )
              })}
            </div>
            <div className="bg-[#F0F3FF] p-6 flex justify-end gap-3 sticky bottom-0">
              <button onClick={handleSaveBulkStock} className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg">Simpan Update Stok</button>
              <button onClick={() => setIsBulkStockModalOpen(false)} className="bg-red-600 text-white font-semibold px-6 py-2.5 rounded-lg">Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Berhasil Update Stok */}
      {isStockSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[340px] flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Update Berhasil!</h2>
            <div className="w-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-semibold py-2 rounded-lg mb-6">● Selamat datang di IKOBANA FROZEENFOOD</div>
            <button onClick={() => setIsStockSuccess(false)} className="w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-xl">Kembali</button>
          </div>
        </div>
      )}
    </>
  );
}