"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/layout/AdminSidebar";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { endpoints, api, ContactMessage } from "../../../lib/api";
import { Search, Mail, Inbox } from "lucide-react";
import { useApp } from "../../../contexts/AppContext";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { addNotification } = useApp();

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await api.getWithQuery<ContactMessage[]>(
        endpoints.contact.list,
        {
          page: 1,
          limit: 20,
          search: search || undefined,
        }
      );
      setMessages(res.data || []);
    } catch (err: any) {
      addNotification({
        type: "error",
        title: "Gagal memuat",
        message: err?.message || "Pastikan Anda sudah login sebagai admin.",
      });
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <main className="flex-1 p-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Pesan Kontak
          </h1>
          <p className="text-neutral-600">Kelola pesan kontak dari pengguna</p>
        </div>

        <Card className="p-0 overflow-hidden">
          {isLoading ? (
            <div className="p-10 text-center text-neutral-500">Memuat...</div>
          ) : messages.length === 0 ? (
            <div className="p-10 text-center text-neutral-500 flex flex-col items-center gap-3">
              <Inbox className="w-8 h-8" />
              Belum ada pesan
            </div>
          ) : (
            <div className="divide-y">
              {messages.map((m) => (
                <div key={String(m.id)} className="p-4 hover:bg-neutral-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{m.subject}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                          {m.status}
                        </span>
                      </div>
                      <div className="text-sm text-neutral-600 mt-1">
                        <Mail className="inline w-4 h-4 mr-1" /> {m.name} •{" "}
                        {m.email}
                      </div>
                      <p className="mt-2 text-neutral-800 line-clamp-2">
                        {m.message}
                      </p>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {new Date(m.created_at).toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
