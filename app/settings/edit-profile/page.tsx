// app/settings/edit-profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { authService } from "@/services/auth.service";
import EditProfileForm from "./_components/EditProfileForm";

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", photoUrl: "" });
  const [originalForm, setOriginalForm] = useState({ name: "", email: "", phone: "" });
  const [modal, setModal] = useState<{ type: "success" | "error"; msg?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await authService.getProfile();
      if (res.success) {
        setForm({ ...res.data, photoUrl: res.data.photoUrl || "" });
        setOriginalForm(res.data);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (form.name === originalForm.name && form.email === originalForm.email && form.phone === originalForm.phone) {
      setModal({ type: "error", msg: "Tidak ada perubahan data." });
      return;
    }

    setIsLoading(true);
    const res = await authService.updateProfile(form.name, form.email, form.phone);
    setIsLoading(false);

    if (res.success) {
      setModal({ type: "success" });
      setOriginalForm({ name: form.name, email: form.email, phone: form.phone });
      window.dispatchEvent(new Event("profileUpdated"));
    } else {
      setModal({ type: "error", msg: res.message });
    }
  };

  const handleAvatarUpdate = (newPhotoUrl: string) => {
    setForm({ ...form, photoUrl: newPhotoUrl });
    window.dispatchEvent(new Event("profileUpdated"));
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9FF]">
      <Sidebar />
      {/* Menggunakan flex-col dan items-center agar konten ke tengah */}
      <main className="ml-[256px] flex-1 p-8 flex flex-col items-center">
        <div className="w-full max-w-2xl mb-6">
          <p className="text-xs text-gray-500 mb-1">Pengaturan Sistem / Edit Profil</p>
          <h1 className="text-2xl font-bold text-gray-900">Edit Profil</h1>
        </div>

        <div className="w-full max-w-2xl">
          <EditProfileForm
            form={form}
            setForm={setForm}
            handleSave={handleSave}
            isLoading={isLoading}
            router={router}
            onAvatarUpdate={handleAvatarUpdate}
          />
        </div>
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[340px] flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${modal.type === "success" ? "bg-blue-600" : "bg-red-600"} text-white text-2xl font-bold`}>{modal.type === "success" ? "✓" : "!"}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{modal.type === "success" ? "Update Berhasil!" : "EROR"}</h2>
            {modal.type === "error" && <p className="text-xs text-gray-500 mb-6">{modal.msg}</p>}
            <button onClick={() => { setModal(null); if (modal.type === "success") router.push("/settings"); }} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl mt-2 hover:bg-blue-700 transition">Kembali</button>
          </div>
        </div>
      )}
    </div>
  );
}