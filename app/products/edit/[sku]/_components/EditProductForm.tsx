// app/products/edit/[sku]/_components/EditProductForm.tsx
"use client";

import Link from "next/link";

interface EditProductFormProps {
  name: string; setName: (val: string) => void;
  category: string; setCategory: (val: string) => void;
  price: string; setPrice: (val: string) => void;
  stock: string; setStock: (val: string) => void;
  description: string; setDescription: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function EditProductForm({
  name, setName, category, setCategory, price, setPrice, stock, setStock, description, setDescription, handleSubmit
}: EditProductFormProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="text-xs font-bold text-gray-700">Nama Produk</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" required /></div>
        <div><label className="text-xs font-bold text-gray-700">Kategori</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" required><option value="">Pilih kategori</option><option value="Nugget">Nugget</option><option value="Bakso">Bakso</option><option value="Sosis">Sosis</option><option value="Dimsum">Dimsum</option><option value="Kentang">Kentang</option><option value="Frozen Food">Frozen Food</option><option value="Ayam">Ayam</option></select></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-xs font-bold text-gray-700">Harga</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" required /></div>
          <div><label className="text-xs font-bold text-gray-700">Stok</label><input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" required /></div>
        </div>
        <div><label className="text-xs font-bold text-gray-700">Deskripsi</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" /></div>
        <div className="flex justify-end gap-3 mt-6"><Link href="/products" className="bg-red-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-red-700">Batal</Link><button type="submit" className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700">Simpan Perubahan</button></div>
      </form>
    </div>
  );
}