// app/transactions/_components/TransactionTable.tsx
"use client";

interface TransactionTableProps {
  transactions: any[];
  setImagePreview: (url: string | null) => void;
  setStatusTarget: (trx: any) => void;
  setNewStatus: (status: string) => void;
  setDeleteTarget: (trx: any) => void;
  getValidImageUrl: (url: string) => string;
  getStatusStyle: (status: string) => string;
  parseItems: (itemsString: string) => string;
}

export default function TransactionTable({
  transactions, setImagePreview, setStatusTarget, setNewStatus, setDeleteTarget, getValidImageUrl, getStatusStyle, parseItems
}: TransactionTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#F0F3FF] text-gray-500 uppercase text-[11px] font-bold">
          <tr>
            <th className="p-4">ID Transaksi</th>
            <th className="p-4">Pelanggan</th>
            <th className="p-4">Produk Dipesan</th>
            <th className="p-4">Total Bayar</th>
            <th className="p-4 text-center">Bukti</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr><td colSpan={7} className="p-8 text-center text-gray-500">Belum ada transaksi masuk.</td></tr>
          ) : (
            transactions.map((trx: any) => (
              <tr key={trx.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-4"><p className="font-bold text-blue-600">{trx.orderId}</p><p className="text-xs text-gray-500">{new Date(trx.createdAt).toLocaleDateString("id-ID")}</p></td>
                <td className="p-4"><p className="font-semibold text-gray-800">{trx.customerName}</p><p className="text-xs text-gray-500">{trx.customerPhone}</p></td>
                <td className="p-4 text-xs text-gray-600 max-w-[200px] truncate" title={parseItems(trx.items)}>{parseItems(trx.items)}</td>
                <td className="p-4 font-bold text-gray-900">Rp {trx.totalPrice.toLocaleString("id-ID")}</td>
                <td className="p-4 text-center">
                  {trx.paymentProof ? (
                    <div className="relative w-12 h-12 mx-auto cursor-pointer group" onClick={() => setImagePreview(getValidImageUrl(trx.paymentProof))}>
                      <img src={getValidImageUrl(trx.paymentProof)} alt="Bukti" className="w-full h-full object-cover rounded-md border border-gray-200 group-hover:opacity-75 transition" />
                    </div>
                  ) : (<span className="text-xs text-gray-400 italic">-</span>)}
                </td>
                <td className="p-4"><span className={`px-2 py-1 rounded text-[10px] font-bold ${getStatusStyle(trx.status)}`}>{trx.status}</span></td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => { setStatusTarget(trx); setNewStatus(trx.status); }} className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-blue-200">Ubah Status</button>
                    <button onClick={() => setDeleteTarget(trx)} className="text-red-600 text-xs font-bold hover:underline">Hapus</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}