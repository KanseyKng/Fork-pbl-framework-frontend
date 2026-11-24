// app/dashboard/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { useProducts } from "@/hooks/use-products";
import { useTransactions } from "@/hooks/use-transactions";
import { productService } from "@/services/product.service";

// Import Komponen Baru
import DashboardMetrics from "./_components/DashboardMetrics";
import SalesChart from "./_components/SalesChart";
import LowStockList from "./_components/LowStockList";
import RecentTransactions from "./_components/RecentTransactions";
import DashboardModals from "./_components/DashboardModals";

export default function DashboardPage() {
  const router = useRouter();
  const { products, refresh: refreshProducts } = useProducts();
  const { transactions } = useTransactions();
  
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [stockUpdates, setStockUpdates] = useState<Record<string, string>>({});
  const [salesFilter, setSalesFilter] = useState<"Hari ini" | "Minggu ini" | "Bulan ini">("Minggu ini");

  const lowStock = products.filter((p: any) => p.stock <= 5);
  
  // ✅ Revenue HANYA dari transaksi berstatus "Selesai"
  const revenue = transactions
    .filter((t: any) => t.status === "Selesai")
    .reduce((acc: number, t: any) => acc + t.totalPrice, 0);

  const salesData = useMemo(() => {
    const completedTrx = transactions.filter((t: any) => t.status === "Selesai");
    const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
    const today = new Date();
    
    if (salesFilter === "Minggu ini") {
      const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek);
      startOfWeek.setHours(0, 0, 0, 0);

      return days.map((day, i) => {
        const dayStart = new Date(startOfWeek);
        dayStart.setDate(startOfWeek.getDate() + i);
        const dayEnd = new Date(dayStart);
        dayEnd.setHours(23, 59, 59, 999);

        const total = completedTrx
          .filter((trx: any) => {
            const trxDate = new Date(trx.createdAt);
            return trxDate >= dayStart && trxDate <= dayEnd;
          })
          .reduce((sum: number, trx: any) => sum + trx.totalPrice, 0);
        
        return { label: day, value: total };
      });
    } else if (salesFilter === "Hari ini") {
      return completedTrx
        .filter((trx: any) => new Date(trx.createdAt).toDateString() === today.toDateString())
        .reduce((acc: any[], trx: any) => {
          const hour = new Date(trx.createdAt).getHours();
          const existing = acc.find(item => item.label === `${hour}:00`);
          if (existing) existing.value += trx.totalPrice;
          else acc.push({ label: `${hour}:00`, value: trx.totalPrice });
          return acc;
        }, [])
        .sort((a: any, b: any) => parseInt(a.label) - parseInt(b.label));
    } else {
      const weekData = [0, 0, 0, 0, 0];
      completedTrx.forEach((trx: any) => {
        const trxDate = new Date(trx.createdAt);
        if (trxDate.getMonth() === today.getMonth() && trxDate.getFullYear() === today.getFullYear()) {
          const weekIndex = Math.floor((trxDate.getDate() - 1) / 7);
          if (weekIndex < 5) weekData[weekIndex] += trx.totalPrice;
        }
      });
      return weekData.map((value, i) => ({ label: `Mgg ${i + 1}`, value }));
    }
  }, [transactions, salesFilter]);

  const avgDaily = salesData.length > 0 
    ? salesData.reduce((sum: number, d: any) => sum + d.value, 0) / salesData.length 
    : 0;
  const peakSale = salesData.reduce((max: any, d: any) => d.value > max.value ? d : max, { label: "-", value: 0 });
  const maxValue = Math.max(...salesData.map((d: any) => d.value), 1);

  const openStockModal = (product: any) => {
    setSelectedProducts([product]);
    setStockUpdates({ [product.id]: "" });
    setIsStockModalOpen(true);
  };

  const handleSaveStock = async () => {
    const updates = selectedProducts.map((p) => ({ id: p.id, newStock: Number(stockUpdates[p.id]) || 0 }));
    await productService.bulkUpdateStock(updates);
    setIsStockModalOpen(false);
    setIsSuccessModalOpen(true);
    refreshProducts();
  };

  // ✅ PERBAIKAN: Membaca productName dengan benar dan menangani jika kosong
  const parseProductNames = (itemsString: string) => {
    try {
      const items = JSON.parse(itemsString);
      if (Array.isArray(items)) {
        return items.map((item: any) => {
          const name = item.productName || item.name || "Produk Tanpa Nama";
          return `${name} (${item.qty || 1}x)`;
        }).join(", ");
      }
      return "-";
    } catch (e) {
      return "-";
    }
  };

  const formatRupiah = (value: number) => "Rp " + value.toLocaleString("id-ID");

  return (
    <div className="flex min-h-screen bg-[#F9F9FF] font-sans">
      <Sidebar />
      <main className="ml-[256px] flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#111C2D]">Dashboard</h1>
            <p className="text-sm text-[#434655]">Ringkasan aktivitas dan performa Ikobana Frozen Food</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2">
            <span className="text-blue-600 font-bold text-lg">📅</span>
            <span className="text-sm font-semibold text-gray-700">Hari ini: {new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* ALERT BANNER */}
        {lowStock.length > 0 && (
          <div className="bg-[#D5E3FF] p-4 rounded-xl flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#B5D0FD] rounded-full flex items-center justify-center text-[#3E5980] font-bold">!</div>
            <p className="text-sm text-[#001C3B]">Perhatian: Ada <b>{lowStock.length} produk</b> dengan stok menipis (≤ 5) dan perlu restock segera.</p>
          </div>
        )}

        {/* 4 METRIC CARDS */}
        <DashboardMetrics 
          productsLength={products.length}
          lowStockLength={lowStock.length}
          transactionsLength={transactions.length}
          revenue={revenue}
          formatRupiah={formatRupiah}
        />

        {/* GRAFIK & STOK MENIPIS */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          <SalesChart 
            salesData={salesData}
            salesFilter={salesFilter}
            setSalesFilter={setSalesFilter}
            maxValue={maxValue}
            avgDaily={avgDaily}
            peakSale={peakSale}
            formatRupiah={formatRupiah}
          />
          <LowStockList 
            lowStock={lowStock}
            openStockModal={openStockModal}
          />
        </div>

        {/* TABEL TRANSAKSI TERBARU */}
        <RecentTransactions 
          transactions={transactions}
          parseProductNames={parseProductNames}
          formatRupiah={formatRupiah}
        />
      </main>

      {/* MODALS */}
      <DashboardModals 
        isStockModalOpen={isStockModalOpen}
        setIsStockModalOpen={setIsStockModalOpen}
        isSuccessModalOpen={isSuccessModalOpen}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
        selectedProducts={selectedProducts}
        stockUpdates={stockUpdates}
        setStockUpdates={setStockUpdates}
        handleSaveStock={handleSaveStock}
      />
    </div>
  );
}