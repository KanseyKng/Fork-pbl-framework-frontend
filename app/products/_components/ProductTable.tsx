// app/products/_components/ProductTable.tsx
"use client";

import Link from "next/link";

interface ProductTableProps {
  products: any[];
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  toggleSelect: (id: string) => void;
  setDeleteTarget: (product: any) => void;
}

export default function ProductTable({ products, selectedIds, setSelectedIds, toggleSelect, setDeleteTarget }: ProductTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#F0F3FF] text-gray-500 uppercase text-[11px] font-bold">
          <tr>
            <th className="p-4 w-10"><input type="checkbox" onChange={(e) => setSelectedIds(e.target.checked ? products.map((p: any) => p.id) : [])} /></th>
            <th className="p-4">Foto</th>
            <th className="p-4">Produk</th>
            <th className="p-4">Harga</th>
            <th className="p-4">Stok</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: any) => (
            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="p-4"><input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggleSelect(p.id)} /></td>
              <td className="p-4">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-md object-cover border border-gray-200" />
                ) : (
                  <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No Img</div>
                )}
              </td>
              <td className="p-4"><p className="font-bold text-gray-800">{p.name}</p><p className="text-xs text-gray-500">{p.sku}</p></td>
              <td className="p-4 font-semibold">Rp {p.price.toLocaleString("id-ID")}</td>
              <td className="p-4 font-bold">{p.stock}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold ${p.stock > 5 ? "bg-green-100 text-green-700" : p.stock > 0 ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"}`}>
                  {p.stock > 5 ? "Tersedia" : p.stock > 0 ? "Stok Menipis" : "Habis"}
                </span>
              </td>
              <td className="p-4 text-right">
                <Link href={`/products/edit/${p.sku}`} className="text-blue-600 text-xs font-bold hover:underline mr-3">Edit</Link>
                <button onClick={() => setDeleteTarget(p)} className="text-red-600 text-xs font-bold hover:underline">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}