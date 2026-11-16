// app/notifications/_components/NotificationList.tsx
"use client";

interface NotificationListProps {
  paginatedData: any[];
  notificationsLength: number;
  handleClick: (notif: any) => void;
  page: number;
  setPage: (val: number) => void;
  totalPages: number;
}

export default function NotificationList({ paginatedData, notificationsLength, handleClick, page, setPage, totalPages }: NotificationListProps) {
  return (
    <>
      <div className="bg-white rounded-b-2xl border border-gray-100 shadow-sm">
        {paginatedData.length === 0 ? (<div className="p-8 text-center text-gray-500">Tidak ada notifikasi.</div>) : (
          paginatedData.map((notif) => (
            <div key={notif.id} className={`flex items-start gap-4 p-5 border-b border-gray-50 relative cursor-pointer hover:bg-gray-50 ${!notif.isRead ? "bg-indigo-50/20" : ""}`} onClick={() => handleClick(notif)}>
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${notif.category === "Pesanan" ? "bg-indigo-500" : notif.category === "Stok Produk" ? "bg-orange-500" : "bg-blue-500"}`}></div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${notif.category === "Pesanan" ? "bg-indigo-100 text-indigo-600" : notif.category === "Stok Produk" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"}`}>{notif.category === "Pesanan" ? "🛍️" : notif.category === "Stok Produk" ? "📦" : "🚚"}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1"><h3 className="font-bold text-gray-900 text-sm">{notif.title}</h3><span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full">{notif.category}</span>{!notif.isRead && <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>}</div>
                <p className="text-xs text-gray-500 mb-2">{notif.message}</p>
                <div className="flex items-center gap-4 text-[11px] font-semibold text-indigo-500"><span>⏱ {new Date(notif.createdAt).toLocaleString("id-ID")}</span></div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between items-center mt-6 text-xs text-gray-500">
        <p>Menampilkan <b>{paginatedData.length}</b> dari <b>{notificationsLength}</b> notifikasi</p>
        <div className="flex gap-1">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1.5 border rounded-lg disabled:opacity-50">Sebelumnya</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (<button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg font-bold ${page === p ? "bg-indigo-600 text-white" : "border hover:bg-gray-50"}`}>{p}</button>))}
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1.5 border rounded-lg disabled:opacity-50">Berikutnya</button>
        </div>
      </div>
    </>
  );
}