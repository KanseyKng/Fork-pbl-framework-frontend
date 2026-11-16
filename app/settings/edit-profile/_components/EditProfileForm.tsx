// app/settings/edit-profile/_components/EditProfileForm.tsx
"use client";

interface EditProfileFormProps {
  form: { name: string; email: string; phone: string };
  setForm: (val: any) => void;
  handleSave: () => void;
  isLoading: boolean;
  router: any;
}

export default function EditProfileForm({ form, setForm, handleSave, isLoading, router }: EditProfileFormProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Informasi Profil</h2>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-700">Nama Lengkap</label>
          <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-700">Alamat Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-700">No. Handphone / WhatsApp</label>
          <input type="text" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button onClick={() => router.push("/settings")} className="bg-red-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-red-700">Batal</button>
        <button onClick={handleSave} disabled={isLoading} className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50">{isLoading ? "Menyimpan..." : "Simpan Perubahan"}</button>
      </div>
    </div>
  );
}