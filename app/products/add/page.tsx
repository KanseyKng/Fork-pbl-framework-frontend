// app/products/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import { tokenStorage } from "@/services/api-client";
import ProductForm from "./_components/ProductForm";

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "", description: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const token = tokenStorage.getToken();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setIsSuccess(true);
      } else {
        alert(json.message || "Gagal menambah produk");
      }
    } catch (err) {
      alert("Koneksi gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9FF]">
      <Sidebar />
      <main className="ml-[256px] flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs text-gray-500 mb-1"><Link href="/products" className="hover:underline">Produk & Stok</Link> / Tambah Produk Baru</p>
            <h1 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h1>
          </div>
          <div className="flex gap-3">
            <button type="submit" form="add-product-form" disabled={isLoading} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50">{isLoading ? "Menyimpan..." : "Publikasikan"}</button>
            <Link href="/products" className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-red-700">Batal</Link>
          </div>
        </div>

        <ProductForm handleSubmit={handleSubmit} setForm={setForm} />
      </main>

      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[340px] flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-200"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Publikasi Berhasil!</h2>
            <button onClick={() => router.push("/products")} className="w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-xl mt-4 hover:bg-blue-50">Kembali</button>
          </div>
        </div>
      )}
    </div>
  );
}