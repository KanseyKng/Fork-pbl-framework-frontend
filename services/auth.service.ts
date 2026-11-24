// services/auth.service.ts
import { apiFetch, tokenStorage } from "./api-client";

export const authService = {
  async login(identifier: string, password: string) {
    const isEmail = identifier.includes("@");
    const body = isEmail ? { email: identifier, password } : { phone: identifier, password };
    // ✅ Gunakan apiFetch (yang sudah mengarah ke proxy)
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok && data.success) tokenStorage.save(data.data.token, data.data.user);
    return data;
  },

  async register(name: string, email: string, phone: string, password: string) {
    // ✅ Gunakan apiFetch
    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, phone, password }),
    });
    return await res.json();
  },

  async getProfile() {
    const res = await apiFetch("/auth/me");
    return await res.json();
  },

  async updateProfile(name: string, email: string, phone: string) {
    const res = await apiFetch("/auth/profile", {
      method: "PUT",
      body: JSON.stringify({ name, email, phone }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      const currentUser = tokenStorage.getUser();
      if (currentUser) tokenStorage.save(tokenStorage.getToken()!, { ...currentUser, name, email, phone });
    }
    return data;
  },

  async uploadAvatar(file: File) {
    const token = tokenStorage.getToken();
    if (!token) return { success: false, message: "Sesi berakhir. Silakan login ulang." };

    const formData = new FormData();
    formData.append("avatar", file);

    // ✅ Gunakan apiFetch (Content-Type akan di-handle otomatis untuk FormData)
    const res = await apiFetch("/auth/upload-avatar", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }, // Hapus Content-Type manual
      body: formData,
    });
    const data = await res.json();
    
    if (res.ok && data.success && data.data && data.data.photoUrl) {
      const currentUser = tokenStorage.getUser();
      if (currentUser) {
        tokenStorage.save(token, { ...currentUser, photoUrl: data.data.photoUrl });
      }
    }
    return data;
  },

  async deleteAvatar() {
    const res = await apiFetch("/auth/delete-avatar", { method: "DELETE" });
    const data = await res.json();
    if (res.ok && data.success) {
      const currentUser = tokenStorage.getUser();
      const token = tokenStorage.getToken();
      if (currentUser && token) {
        tokenStorage.save(token, { ...currentUser, photoUrl: "" });
      }
    }
    return data;
  },

  async getSettings() {
    const res = await apiFetch("/auth/settings");
    return await res.json();
  },

  async updateSettings(appName: string, businessName: string, description: string) {
    const res = await apiFetch("/auth/settings", {
      method: "PUT",
      body: JSON.stringify({ appName, businessName, description }),
    });
    return await res.json();
  },
};