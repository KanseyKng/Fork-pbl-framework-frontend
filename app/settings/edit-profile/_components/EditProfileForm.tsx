// app/settings/edit-profile/_components/EditProfileForm.tsx
"use client";

import { useState, useRef } from "react";
import { authService } from "@/services/auth.service";

interface EditProfileFormProps {
  form: { name: string; email: string; phone: string; photoUrl: string };
  setForm: (val: any) => void;
  handleSave: () => void;
  isLoading: boolean;
  router: any;
  onAvatarUpdate: (newPhotoUrl: string) => void;
}

export default function EditProfileForm({ form, setForm, handleSave, isLoading, router, onAvatarUpdate }: EditProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const res = await authService.uploadAvatar(file);
    setIsUploading(false);

    if (res.success) {
      onAvatarUpdate(res.data.photoUrl);
      setForm({ ...form, photoUrl: res.data.photoUrl });
      alert("Foto profil berhasil diperbarui!");
    } else {
      alert(res.message || "Gagal mengunggah foto");
    }
  };

  const handleDeleteAvatar = async () => {
    if (!confirm("Hapus foto profil?")) return;
    setIsUploading(true);
    const res = await authService.deleteAvatar();
    setIsUploading(false);

    if (res.success) {
      onAvatarUpdate("");
      setForm({ ...form, photoUrl: "" });
      alert("Foto profil berhasil dihapus!");
    } else {
      alert(res.message || "Gagal menghapus foto");
    }
  };

  const initials = form.name ? form.name.substring(0, 2).toUpperCase() : "AD";

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div
            className={`w-24 h-24 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl ${form.photoUrl ? "cursor-pointer" : ""}`}
            onClick={() => form.photoUrl && setShowPreview(true)}
          >
            {form.photoUrl ? (
              <img src={form.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          {form.photoUrl && (
            <button
              onClick={handleDeleteAvatar}
              disabled={isUploading}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600"
              title="Hapus foto"
            >
              ✕
            </button>
          )}
        </div>

        <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
        <button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="mt-4 text-sm font-semibold text-blue-600 hover:underline disabled:opacity-50">
          {isUploading ? "Mengunggah..." : "Ubah Foto Profil"}
        </button>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-6">Informasi Profil</h2>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-700">Nama Lengkap</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-700">Alamat Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-700">No. Handphone / WhatsApp</label>
          <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button onClick={() => router.push("/settings")} className="bg-red-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-red-700">Batal</button>
        <button onClick={handleSave} disabled={isLoading} className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50">{isLoading ? "Menyimpan..." : "Simpan Perubahan"}</button>
      </div>

      {showPreview && form.photoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setShowPreview(false)}>
          <img src={form.photoUrl} alt="Preview" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
        </div>
      )}
    </div>
  );
}