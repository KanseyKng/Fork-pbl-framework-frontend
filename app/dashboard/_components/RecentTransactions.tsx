// app/dashboard/_components/RecentTransactions.tsx
"use client";

import { useRouter } from "next/navigation";

interface RecentTransactionsProps {
  transactions: any[];
  parseProductNames: (itemsString: string) => string;
  formatRupiah: (value: number) => string;
}

export default function RecentTransactions({ transactions, parseProductNames, formatRupiah }: RecentTransactionsProps) {
  const router = useRouter();

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div><h3 className="text-lg font-bold text-[#111C2D]">Transaksi Terbaru</h3><p className="text-xs text-[#434655]">Daftar pesanan masuk terakhir</p></div>
        <button onClick={() => router.push("/transactions")} className="text-sm text-[#004AC6] font-bold hover:underline">Lihat Semua Transaksi →</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#F0F3FF] text-[#737686] uppercase text-[11px] font-bold">
            <tr>
              <th className="p-4 rounded-l-lg">ID TRANSAKSI</th><th className="p-4">PELANGGAN</th><th className="p-4">PRODUK</th><th className="p-4">TANGGAL & WAKTU</th><th className="p-4">TOTAL</th><th className="p-4">STATUS</th><th className="p-4 text-center rounded-r-lg">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-gray-500">Belum ada data transaksi di database.</td></tr>
            ) : (
              transactions.slice(0, 5).map((trx: any) => {
                const initials = trx.customerName ? trx.customerName.substring(0, 2).toUpperCase() : "UN";
                return (
                  <tr key={trx.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-bold text-[#004AC6]">{trx.orderId}</td>
                    <td className="p-4"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-[#D5E3FF] text-[#001C3B] flex items-center justify-center text-[10px] font-bold">{initials}</div><span className="font-semibold text-[#111C2D]">{trx.customerName}</span></div></td>
                    <td className="p-4 text-[#434655] max-w-[200px] truncate" title={parseProductNames(trx.items)}>{parseProductNames(trx.items)}</td>
                    <td className="p-4 text-[#434655]">{new Date(trx.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="p-4 font-bold text-[#111C2D]">{formatRupiah(trx.totalPrice)}</td>
                    <td className="p-4"><span className={`px-3 py-1 rounded-full text-[11px] font-bold ${trx.status === "Selesai" ? "bg-green-100 text-green-700" : trx.status === "Diproses" ? "bg-blue-100 text-blue-700" : trx.status === "Dikirim" ? "bg-purple-100 text-purple-700" : trx.status === "Dibatalkan" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>{trx.status}</span></td>
                    <td className="p-4 text-center"><button onClick={() => router.push("/transactions")} className="bg-[#DEE8FF] text-[#111C2D] text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-blue-200">Detail</button></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}