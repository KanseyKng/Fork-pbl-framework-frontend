// app/products/edit/[sku]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { productService } from "@/services/product.service";
import { apiFetch } from "@/services/api-client";
import EditProductForm from "./_components/EditProductForm";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const sku = params.sku as string;
  const [productId, setProductId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await productService.getAll();
      if (res.success) {
        const found = res.data.find((p: any) => p.sku === sku);
        if (found) {
          setProductId(found.id);
          setName(found.name);
          setCategory(found.category);
          setPrice(String(found.price));
          setStock(String(found.stock));
          setDescription(found.description || "");
        }
      }
      setLoading(false);
    };
    fetchProduct();
  }, [sku]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;
    const res = await apiFetch(`/products/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ name, category, price: Number(price), stock: Number(stock), description }),
    });
    if (res.ok) { alert("Produk berhasil diperbarui!"); router.push("/products"); }
    else { alert("Gagal memperbarui produk"); }
  };

  if (loading) return <div className="p-8 text-center">Memuat data produk...</div>;

  return (
    <div className="p-8 bg-[#F9F9FF] min-h-screen">
      <header className="mb-6"><h1 className="text-2xl font-bold text-gray-900">Edit Produk</h1><p className="text-sm text-gray-500">Ubah informasi produk dan stok</p></header>
      <Link href="/products" className="text-blue-600 font-semibold hover:underline mb-6 inline-block">← Kembali ke Produk</Link>

      <EditProductForm 
        name={name} setName={setName}
        category={category} setCategory={setCategory}
        price={price} setPrice={setPrice}
        stock={stock} setStock={setStock}
        description={description} setDescription={setDescription}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}