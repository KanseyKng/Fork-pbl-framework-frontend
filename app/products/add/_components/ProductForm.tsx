// app/products/add/_components/ProductForm.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setForm: (form: any) => void;
}

export default function ProductForm({ handleSubmit, setForm }: ProductFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <form id="add-product-form" onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Informasi Dasar Produk</h2>
          <div className="space-y-4">
            <div><label className="text-xs font-bold text-gray-700">Nama Produk Beku *</label><input type="text" name="name" required onChange={(e) => setForm((prev: any) => ({...prev, name: e.target.value}))} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" placeholder="Nugget Ayam Crispy Golden 500g" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs font-bold text-gray-700">Kode SKU *</label><input type="text" disabled className="w-full mt-1 p-2.5 bg-gray-100 rounded-lg text-sm border border-gray-200" placeholder="Auto-generate" /></div>
              <div><label className="text-xs font-bold text-gray-700">Kategori Produk *</label><select name="category" required onChange={(e) => setForm((prev: any) => ({...prev, category: e.target.value}))} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200"><option value="">Pilih Kategori</option><option value="Nugget">Olahan Ayam</option><option value="Bakso">Olahan Daging</option><option value="Dimsum">Camilan & Siap Masak</option><option value="Kentang">Camilan & Kentang</option></select></div>
            </div>
            <div><label className="text-xs font-bold text-gray-700">Deskripsi (Opsional)</label><textarea name="description" rows={4} onChange={(e) => setForm((prev: any) => ({...prev, description: e.target.value}))} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200"></textarea></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Penetapan Harga & Stok</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-bold text-gray-700">Harga Jual Satuan (Rp) *</label><input type="number" name="price" required onChange={(e) => setForm((prev: any) => ({...prev, price: e.target.value}))} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" /></div>
            <div><label className="text-xs font-bold text-gray-700">Jumlah Stok Awal *</label><input type="number" name="stock" required onChange={(e) => setForm((prev: any) => ({...prev, stock: e.target.value}))} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" /></div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Foto Produk</h2>
          <label className="relative border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center bg-gray-50 text-gray-400 mb-4 cursor-pointer hover:bg-gray-100 transition overflow-hidden">
            {imagePreview ? <Image src={imagePreview} alt="Preview" fill className="object-cover" /> : <><span className="text-4xl mb-2">📷</span><p className="text-xs font-semibold">Klik untuk upload foto</p></>}
            <input type="file" name="image" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
          <p className="text-[10px] text-gray-500 text-center">Format JPG, PNG, WEBP. Maks 5MB.</p>
        </div>
      </div>
    </form>
  );
}