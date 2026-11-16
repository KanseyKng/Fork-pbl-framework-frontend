// app/notifications/_components/NotificationStats.tsx
"use client";

interface NotificationStatsProps {
  totalNotif: number;
  unreadCount: number;
  importantCount: number;
}

export default function NotificationStats({ totalNotif, unreadCount, importantCount }: NotificationStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"><div><p className="text-xs font-bold text-gray-500 uppercase">Total Notifikasi</p><h2 className="text-3xl font-bold text-gray-900 mt-1">{totalNotif}</h2></div><div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-xl">🔔</div></div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between relative overflow-hidden"><div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500"></div><div><p className="text-xs font-bold text-indigo-500 uppercase">Belum Dibaca</p><h2 className="text-3xl font-bold text-gray-900 mt-1">{unreadCount}</h2></div><div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-xl">⏰</div></div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between relative overflow-hidden"><div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500"></div><div><p className="text-xs font-bold text-orange-500 uppercase">Notifikasi Penting</p><h2 className="text-3xl font-bold text-gray-900 mt-1">{importantCount}</h2></div><div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 text-xl">⚠️</div></div>
    </div>
  );
}