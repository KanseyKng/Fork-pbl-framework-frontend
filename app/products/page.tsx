// app/products/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import { useProducts } from "@/hooks/use-products";
import { productService } from "@/services/product.service";
import ProductTable from "./_components/ProductTable";
import ProductModals from "./_components/ProductModals";

export default function ProductsPage() {
  const { products, refresh } = useProducts();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  
  const [isBulkStockModalOpen, setIsBulkStockModalOpen] = useState(false);
  const [bulkUpdates, setBulkUpdates] = useState<Record<string, string>>({});
  const [isStockSuccess, setIsStockSuccess] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await productService.delete(deleteTarget.id);
    setIsDeleteSuccess(true);
    setDeleteTarget(null);
    refresh();
  };

  const openBulkStock = () => {
    if (selectedIds.length === 0) {
      alert("Pilih minimal satu produk untuk diatur stoknya!");
      return;
    }
    const initialUpdates: Record<string, string> = {};
    selectedIds.forEach(id => { initialUpdates[id] = ""; });
    setBulkUpdates(initialUpdates);
    setIsBulkStockModalOpen(true);
  };

  const handleSaveBulkStock = async () => {
    const updates = selectedIds.map(id => ({ id, newStock: Number(bulkUpdates[id]) || 0 }));
    await productService.bulkUpdateStock(updates);
    setIsBulkStockModalOpen(false);
    setIsStockSuccess(true);
    setSelectedIds([]);
    refresh();
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9FF]">
      <Sidebar />
      
      <main className="ml-[256px] flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Produk & Stok</h1>
            <p className="text-sm text-gray-500">Kelola semua produk frozen food</p>
          </div>
          <div className="flex gap-3">
            <button onClick={openBulkStock} className="bg-white border border-gray-200 text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50">Atur Stok Cepat</button>
            <Link href="/products/add" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700">+ Tambah Produk</Link>
          </div>
        </div>

        <ProductTable 
          products={products}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          toggleSelect={toggleSelect}
          setDeleteTarget={setDeleteTarget}
        />
      </main>

      <ProductModals 
        deleteTarget={deleteTarget}
        setDeleteTarget={setDeleteTarget}
        handleDelete={handleDelete}
        isDeleteSuccess={isDeleteSuccess}
        setIsDeleteSuccess={setIsDeleteSuccess}
        isBulkStockModalOpen={isBulkStockModalOpen}
        setIsBulkStockModalOpen={setIsBulkStockModalOpen}
        selectedIds={selectedIds}
        products={products}
        bulkUpdates={bulkUpdates}
        setBulkUpdates={setBulkUpdates}
        handleSaveBulkStock={handleSaveBulkStock}
        isStockSuccess={isStockSuccess}
        setIsStockSuccess={setIsStockSuccess}
      />
    </div>
  );
}