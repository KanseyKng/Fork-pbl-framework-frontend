// app/notifications/_components/NotificationFilters.tsx
"use client";

interface NotificationFiltersProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  search: string;
  setSearch: (val: string) => void;
  selectedMonth: string;
  setSelectedMonth: (val: string) => void;
  setPage: (val: number) => void;
  handleMarkAllRead: () => void;
  formatMonthDisplay: (val: string) => string;
  tabs: string[];
}

export default function NotificationFilters({
  activeTab, setActiveTab, search, setSearch, selectedMonth, setSelectedMonth, setPage, handleMarkAllRead, formatMonthDisplay, tabs
}: NotificationFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-t-2xl border border-gray-100 border-b-0">
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => { setActiveTab(tab); setPage(1); }} className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${activeTab === tab ? "bg-indigo-600 text-white shadow-md" : "bg-gray-50 text-gray-500"}`}>{tab}</button>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <input type="text" placeholder="Cari notifikasi..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="flex-1 p-2.5 border rounded-xl text-sm" />
        <div className="relative">
          <input type="month" value={selectedMonth} onChange={(e) => { setSelectedMonth(e.target.value); setPage(1); }} className="p-2.5 border rounded-xl text-sm w-48 text-transparent absolute inset-0 cursor-pointer z-10 opacity-0" />
          <div className="p-2.5 border rounded-xl text-sm w-48 bg-white flex items-center justify-between"><span className="text-gray-700 font-medium truncate">{formatMonthDisplay(selectedMonth)}</span><span className="text-gray-400">📅</span></div>
        </div>
        <button onClick={() => { setSearch(""); setSelectedMonth(""); }} className="text-sm font-semibold text-indigo-600">Reset</button>
        <button onClick={handleMarkAllRead} className="ml-auto text-sm font-semibold text-gray-600 hover:text-indigo-600">Tandai Semua Dibaca</button>
      </div>
    </div>
  );
}