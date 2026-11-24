// app/transactions/page.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useTransactions } from "@/hooks/use-transactions";
import { transactionService } from "@/services/transaction.service";
import TransactionTable from "./_components/TransactionTable";
import TransactionModals from "./_components/TransactionModals";

export default function TransactionsPage() {
  const { transactions, refresh } = useTransactions();
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [statusTarget, setStatusTarget] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const getValidImageUrl = (url: string) => url || "";

  const handleUpdateStatus = async () => {
    if (!statusTarget) return;
    await transactionService.updateStatus(statusTarget.id, newStatus);
    setStatusTarget(null);
    refresh();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await transactionService.delete(deleteTarget.id); 
    setIsDeleteSuccess(true);
    setDeleteTarget(null);
    refresh();
  };

  const getStatusStyle = (status: string) => {
    if (status === "Selesai") return "bg-green-100 text-green-700";
    if (status === "Diproses") return "bg-blue-100 text-blue-700";
    if (status === "Dikirim") return "bg-purple-100 text-purple-700";
    if (status === "Dibatalkan") return "bg-red-100 text-red-700";
    return "bg-orange-100 text-orange-700";
  };

  // ✅ PERBAIKAN TOTAL: Membaca items dengan aman (String / Array)
  const parseItems = (itemsData: any) => {
    if (!itemsData) return "-";
    
    let items = [];
    try {
      // Cek jika items berupa string JSON, jika sudah array langsung pakai
      items = typeof itemsData === 'string' ? JSON.parse(itemsData) : itemsData;
      
      if (Array.isArray(items)) {
        return items.map((i: any) => {
          // Antisipasi perbedaan nama key dari backend
          const productName = i.productName || i.product_name || i.name || "Produk Tidak Dikenal";
          const qty = i.qty || i.quantity || 1;
          return `${productName} (${qty}x)`;
        }).join(", ");
      }
      return "-";
    } catch (e) {
      console.error("Gagal parse items:", e);
      return "-";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9FF]">
      <Sidebar />
      <main className="ml-[256px] flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Monitoring Transaksi</h1>
            <p className="text-sm text-gray-500">Pantau seluruh transaksi yang masuk ke Ikobana Frozen Food</p>
          </div>
        </div>

        <TransactionTable
          transactions={transactions}
          setImagePreview={setImagePreview}
          setStatusTarget={setStatusTarget}
          setNewStatus={setNewStatus}
          setDeleteTarget={setDeleteTarget}
          getValidImageUrl={getValidImageUrl}
          getStatusStyle={getStatusStyle}
          parseItems={parseItems}
        />
      </main>

      <TransactionModals
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        statusTarget={statusTarget}
        setStatusTarget={setStatusTarget}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        handleUpdateStatus={handleUpdateStatus}
        deleteTarget={deleteTarget}
        setDeleteTarget={setDeleteTarget}
        handleDelete={handleDelete}
        isDeleteSuccess={isDeleteSuccess}
        setIsDeleteSuccess={setIsDeleteSuccess}
      />
    </div>
  );
} 
`













































`