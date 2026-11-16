// app/settings/_components/SettingsForm.tsx
"use client";

interface SettingsFormProps {
  form: { appName: string; businessName: string; description: string };
  setForm: (val: any) => void;
  handleSave: () => void;
  isLoading: boolean;
}

export default function SettingsForm({ form, setForm, handleSave, isLoading }: SettingsFormProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Informasi Aplikasi & Bisnis</h2>
      <div className="space-y-4">
        <div><label className="text-xs font-bold text-gray-700">Nama Aplikasi</label><input type="text" value={form.appName} onChange={(e) => setForm({...form, appName: e.target.value})} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" /></div>
        <div><label className="text-xs font-bold text-gray-700">Nama Bisnis Resmi</label><input type="text" value={form.businessName} onChange={(e) => setForm({...form, businessName: e.target.value})} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" /></div>
        <div><label className="text-xs font-bold text-gray-700">Deskripsi Toko</label><textarea rows={3} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full mt-1 p-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200" /></div>
        <div className="flex justify-end mt-4"><button onClick={handleSave} disabled={isLoading} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50">{isLoading ? "Menyimpan..." : "Simpan Perubahan"}</button></div>
      </div>
    </div>
  );
}