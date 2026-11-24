// app/notifications/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { useNotifications } from "@/hooks/use-notifications";
import { notificationService } from "@/services/notification.service";
import NotificationStats from "./_components/NotificationStats";
import NotificationFilters from "./_components/NotificationFilters";
import NotificationList from "./_components/NotificationList";

export default function NotificationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(""); // Kosong = Semua data
  const [page, setPage] = useState(1);
  const perPage = 4;

  let startDate = undefined;
  let endDate = undefined;
  
  if (selectedMonth) {
    const [year, month] = selectedMonth.split("-").map(Number);
    startDate = `${selectedMonth}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    endDate = `${selectedMonth}-${lastDay.toString().padStart(2, '0')}`;
  }

  const { notifications, unreadCount, refresh } = useNotifications({
    category: activeTab === "Semua" ? undefined : activeTab,
    search,
    startDate: startDate,
    endDate: endDate,
  });

  const handleClick = async (notif: any) => {
    await notificationService.markAsRead(notif.id);
    refresh();
    if (notif.category === "Pesanan" || notif.category === "Pengiriman") router.push("/transactions");
    else if (notif.category === "Stok Produk") router.push("/products");
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    refresh();
  };

  const tabs = ["Semua", "Pesanan", "Stok Produk", "Pengiriman", "Sistem"];
  const totalPages = Math.ceil(notifications.length / perPage);
  const paginatedData = notifications.slice((page - 1) * perPage, page * perPage);
  const importantCount = notifications.filter((n) => (n.category === "Pesanan" && !n.isRead) || n.category === "Stok Produk").length;

  const formatMonthDisplay = (monthString: string) => {
    if (!monthString) return "Pilih Bulan";
    const [year, month] = monthString.split("-").map(Number);
    const date = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0).getDate();
    const monthName = date.toLocaleString("id-ID", { month: "short" });
    return `${monthName} ${year} / 1 - ${lastDay} ${monthName} ${year}`;
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9FF]">
      <Sidebar />
      <main className="ml-[256px] flex-1 p-8">
        <div className="mb-6"><h1 className="text-3xl font-bold text-gray-900">Pusat Notifikasi</h1><p className="text-sm text-gray-500 mt-1">Pantau seluruh aktivitas dan pembaruan sistem</p></div>

        <NotificationStats 
          totalNotif={notifications.length} 
          unreadCount={unreadCount} 
          importantCount={importantCount} 
        />

        <NotificationFilters 
          activeTab={activeTab} setActiveTab={setActiveTab}
          search={search} setSearch={setSearch}
          selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
          setPage={setPage}
          handleMarkAllRead={handleMarkAllRead}
          formatMonthDisplay={formatMonthDisplay}
          tabs={tabs}
        />

        <NotificationList 
          paginatedData={paginatedData}
          notificationsLength={notifications.length}
          handleClick={handleClick}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
}