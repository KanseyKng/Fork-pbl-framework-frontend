// app/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/services/auth.service";
import SettingsForm from "./_components/SettingsForm";
import ProfileCard from "./_components/ProfileCard";

export default function SettingsPage() {
  const { user, settings } = useAuth();
  const [form, setForm] = useState({ appName: "", businessName: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const handleSave = async () => {
    setIsLoading(true);
    await authService.updateSettings(form.appName, form.businessName, form.description);
    setIsLoading(false);
    setToast({ type: "success", msg: "Informasi Aplikasi berhasil diperbarui." });
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9FF]">
      <Sidebar />
      <main className="ml-[256px] flex-1 p-8">
        <div className="mb-6"><h1 className="text-2xl font-bold text-gray-900">Pengaturan Sistem</h1><p className="text-sm text-gray-500">Kelola konfigurasi aplikasi dan operasional Ikobana</p></div>

        <div className="grid grid-cols-2 gap-6">
          <SettingsForm 
            form={form} 
            setForm={setForm} 
            handleSave={handleSave} 
            isLoading={isLoading} 
          />
          <ProfileCard user={user} />
        </div>
      </main>

      {toast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[340px] flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${toast.type === "success" ? "bg-blue-600" : "bg-red-600"}`}>{toast.type === "success" ? "✓" : "!"}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{toast.type === "success" ? "Update Berhasil!" : "EROR"}</h2>
            <p className="text-xs text-gray-500 mb-6">{toast.msg}</p>
            <button onClick={() => setToast(null)} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl">Kembali</button>
          </div>
        </div>
      )}
    </div>
  );
}