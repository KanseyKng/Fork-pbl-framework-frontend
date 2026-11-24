// app/transactions/[id]/_components/TransactionDetailView.tsx
"use client";

import Link from "next/link";
import { Transaction } from "@/types";

interface TransactionDetailViewProps {
  transaction: Transaction;
  status: string;
  setStatus: (val: string) => void;
  handleUpdateStatus: () => void;
}

export default function TransactionDetailView({ transaction, status, setStatus, handleUpdateStatus }: TransactionDetailViewProps) {
  // ✅ PERBAIKAN: Safe parse items
  let products: any[] = [];
  try {
    products = typeof transaction.items === 'string' 
      ? JSON.parse(transaction.items || "[]") 
      : (transaction.items as any) || [];
  } catch (e) { products = []; }

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-6"><div><h1 className="text-2xl font-bold text-gray-900">Detail Transaksi</h1><p className="text-sm text-gray-500">Informasi lengkap transaksi pelanggan</p></div></header>
      <Link href="/transactions" className="text-blue-600 font-semibold hover:underline mb-6 inline-block">← Kembali ke Transaksi</Link>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-start mb-4"><div><h2 className="text-xl font-bold text-gray-900">{transaction.orderId}</h2><p className="text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleString("id-ID")}</p></div><span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">{status}</span></div>
        <div className="mt-4"><p className="text-xs font-bold text-gray-500 mb-2">BUKTI TRANSFER</p>{transaction.paymentProof ? <img src={transaction.paymentProof} alt="Bukti Transfer" className="w-full max-w-md h-64 object-contain border rounded-lg bg-gray-50" /> : <p className="text-sm text-red-500">Belum ada bukti transfer.</p>}</div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><h3 className="font-bold text-gray-900 mb-4">Informasi Pelanggan</h3><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-500">Nama</span><strong>{transaction.customerName}</strong></div><div className="flex justify-between"><span className="text-gray-500">Telepon</span><strong>{transaction.customerPhone}</strong></div></div></div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><h3 className="font-bold text-gray-900 mb-4">Alamat Pengiriman</h3><p className="text-sm text-gray-700 leading-relaxed">{transaction.customerAddress}</p></div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h3 className="font-bold text-gray-900 mb-4">Update Status Transaksi</h3>
        <div className="flex gap-4 items-center">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="Menunggu Verifikasi">Menunggu Verifikasi</option><option value="Diproses">Diproses</option><option value="Dikirim">Dikirim</option><option value="Selesai">Selesai</option><option value="Dibatalkan">Dibatalkan</option></select>
          <button onClick={handleUpdateStatus} className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700">Update Status</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h3 className="font-bold text-gray-900 mb-4">Produk yang Dibeli</h3>
        {products.length === 0 ? <p className="text-sm text-gray-500">Tidak ada data produk.</p> : (
          <div className="space-y-4">{products.map((product: any, index: number) => {
            // ✅ PERBAIKAN: Antisipasi nama key
            const name = product.productName || product.product_name || product.name || "Produk Tanpa Nama";
            const qty = product.qty || product.quantity || 1;
            const price = product.price || 0;

            return (
              <div key={index} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">🍗</div>
                  <div>
                    <strong className="text-gray-900">{name}</strong>
                    <p className="text-sm text-gray-500">{qty} × Rp {price.toLocaleString("id-ID")}</p>
                  </div>
                </div>
                <strong className="text-gray-900">Rp {(price * qty).toLocaleString("id-ID")}</strong>
              </div>
            );
          })}</div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Ringkasan Pembayaran</h3>
        <div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-500">Metode Pembayaran</span><strong>{transaction.paymentMethod}</strong></div><div className="flex justify-between border-t pt-2 mt-2"><span className="font-bold text-gray-900">Total Pembayaran</span><strong className="text-blue-600 text-lg">Rp {transaction.totalPrice.toLocaleString("id-ID")}</strong></div></div>
      </div>
    </div>
  );
}