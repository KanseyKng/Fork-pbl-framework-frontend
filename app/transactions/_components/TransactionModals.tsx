// app/transactions/_components/TransactionModals.tsx
"use client";

interface TransactionModalsProps {
  imagePreview: string | null;
  setImagePreview: (val: string | null) => void;
  statusTarget: any;
  setStatusTarget: (val: any) => void;
  newStatus: string;
  setNewStatus: (val: string) => void;
  handleUpdateStatus: () => void;
  deleteTarget: any;
  setDeleteTarget: (val: any) => void;
  handleDelete: () => void;
  isDeleteSuccess: boolean;
  setIsDeleteSuccess: (val: boolean) => void;
}

export default function TransactionModals({
  imagePreview, setImagePreview, statusTarget, setStatusTarget, newStatus, setNewStatus, handleUpdateStatus, deleteTarget, setDeleteTarget, handleDelete, isDeleteSuccess, setIsDeleteSuccess
}: TransactionModalsProps) {
  return (
    <>
      {/* Modal Gambar */}
      {imagePreview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out" onClick={() => setImagePreview(null)}>
          <div className="relative max-w-3xl w-full max-h-[90vh]">
            <img src={imagePreview} alt="Bukti Transfer" className="w-full h-full object-contain rounded-lg" />
            <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
          </div>
        </div>
      )}

      {/* Modal Ubah Status */}
      {statusTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[400px] flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ubah Status Pesanan</h2>
            <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100"><p className="text-xs font-bold text-gray-500 mb-1">ID TRANSAKSI</p><p className="font-bold text-blue-600">{statusTarget.orderId}</p><p className="text-sm text-gray-600 mt-1">{statusTarget.customerName}</p></div>
            <label className="text-xs font-bold text-gray-700 mb-1">Pilih Status Baru</label>
            
            <select className="w-full p-2.5 bg-gray-50 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
              <option value="Diproses">Diproses</option>
              <option value="Dikirim">Dikirim</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>

            <div className="flex gap-3">
              <button onClick={handleUpdateStatus} className="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700">Simpan Status</button>
              <button onClick={() => setStatusTarget(null)} className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-300">Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* Konfirmasi Hapus */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[20px] shadow-2xl p-6 w-[338px] flex flex-col items-center text-center">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Hapus Transaksi?</h2>
            <p className="text-[13px] text-gray-500 mb-6">Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="flex gap-3 w-full">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 bg-red-600 text-white font-semibold py-2.5 rounded-lg">Batal</button>
              <button onClick={handleDelete} className="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-lg">Iya</button>
            </div>
          </div>
        </div>
      )}

      {/* Berhasil Hapus */}
      {isDeleteSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[340px] flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Berhasil Dihapus</h2>
            <button onClick={() => setIsDeleteSuccess(false)} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl mt-4">Kembali</button>
          </div>
        </div>
      )}
    </>
  );
}