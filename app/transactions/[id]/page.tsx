// app/transactions/[id]/page.tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { transactionService } from "@/services/transaction.service";
import { Transaction } from "@/types";
import TransactionDetailView from "./_components/TransactionDetailView";

export default function TransactionDetail() {
  const params = useParams();
  const transactionId = String(params.id);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await transactionService.getAll();
        if (res.success) {
          const found = res.data.find((t: Transaction) => t.orderId === transactionId || t.id === transactionId);
          if (found) { setTransaction(found); setStatus(found.status); }
        }
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchDetail();
  }, [transactionId]);

  const handleUpdateStatus = async () => {
    if (!transaction) return;
    await transactionService.updateStatus(transaction.id, status);
    alert("Status transaksi berhasil diperbarui!");
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat Detail Transaksi...</div>;
  if (!transaction) return <div className="p-8"><h1 className="text-2xl font-bold">Transaksi Tidak Ditemukan</h1><Link href="/transactions" className="text-blue-600 font-semibold hover:underline mt-4 inline-block">← Kembali</Link></div>;

  return (
    <TransactionDetailView 
      transaction={transaction}
      status={status}
      setStatus={setStatus}
      handleUpdateStatus={handleUpdateStatus}
    />
  );
}