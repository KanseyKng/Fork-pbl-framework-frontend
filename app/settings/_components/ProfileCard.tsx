// app/settings/_components/ProfileCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/services/api-client";

interface ProfileCardProps {
  user: any;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);

  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : "AD";

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Profil Akun Pengelola</h2>
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl mb-4">
          <div
            className={`w-16 h-16 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl ${user?.photoUrl ? "cursor-pointer" : ""}`}
            onClick={() => user?.photoUrl && setShowPreview(true)}
          >
            {user?.photoUrl ? (
              <img src={user.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div>
            <p className="font-bold text-gray-900">{user?.name || "Administrator"}</p>
            <p className="text-xs text-gray-500">{user?.email || "admin@ikobana.com"}</p>
          </div>
        </div>
        <Link href="/settings/edit-profile" className="block w-full text-center bg-[#DEE8FF] text-[#111C2D] font-semibold py-2.5 rounded-lg hover:bg-blue-100">Edit Profil</Link>
      </div>
      <button onClick={() => { tokenStorage.clear(); router.push("/login"); }} className="w-full mt-6 bg-red-50 text-red-600 font-semibold py-3 rounded-xl hover:bg-red-100">Keluar dari Akun</button>

      {showPreview && user?.photoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setShowPreview(false)}>
          <img src={user.photoUrl} alt="Preview" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
        </div>
      )}
    </div>
  );
}