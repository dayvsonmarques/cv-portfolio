"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type AnalyticsOverview = {
  totalPageviews: number;
  dailyPageviews: { day: string; count: number }[];
  topPages: { path: string; title: string; count: number }[];
  browsers: { name: string; count: number }[];
  systems: { name: string; count: number }[];
  sizes: { name: string; count: number }[];
  countries: { code: string; name: string; count: number }[];
  referrers: { name: string; count: number }[];
};

const PERIODS = [
  { label: "7 dias", value: 7 },
  { label: "30 dias", value: 30 },
  { label: "90 dias", value: 90 },
];

const COLORS = ["#2563eb", "#10b981", "#f59e42", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"];

function formatDay(day: string) {
  const [, month, d] = day.split("-");
  return `${d}/${month}`;
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value.toLocaleString("pt-BR")}</p>
    </div>
  );
}

function ListCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; count: number }[];
}) {
  const max = items[0]?.count || 1;
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-sm text-gray-500 font-medium mb-3">{title}</p>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400">Sem dados no período.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.label}>
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span className="truncate pr-2">{item.label}</span>
                <span className="font-medium shrink-0">{item.count.toLocaleString("pt-BR")}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${Math.max(4, (item.count / max) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PieCard({ title, items }: { title: string; items: { name: string; count: number }[] }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-sm text-gray-500 font-medium mb-2">{title}</p>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400">Sem dados no período.</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={items} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={75} label>
              {items.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/analytics?days=${days}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Falha ao carregar dados");
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500">Dados de visitas do site, via GoatCounter</p>
        </div>
        <div className="flex gap-2">
          {PERIODS.map((period) => (
            <button
              key={period.value}
              onClick={() => setDays(period.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                days === period.value
                  ? "bg-blue-700 text-white"
                  : "bg-white text-gray-600 hover:bg-blue-50 border"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-gray-500">Carregando...</p>}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
          Não foi possível carregar os dados do GoatCounter: {error}
        </div>
      )}

      {!loading && !error && data && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Visualizações totais" value={data.totalPageviews} />
            <StatCard
              title="Média diária"
              value={Math.round(data.totalPageviews / Math.max(1, data.dailyPageviews.length))}
            />
            <StatCard title="Páginas distintas visitadas" value={data.topPages.length} />
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-gray-500 font-medium mb-3">Visualizações por dia</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={data.dailyPageviews}>
                <defs>
                  <linearGradient id="pvGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickFormatter={formatDay} fontSize={12} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip labelFormatter={formatDay} />
                <Area type="monotone" dataKey="count" name="Visualizações" stroke="#2563eb" fill="url(#pvGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ListCard
              title="Páginas mais visitadas"
              items={data.topPages.map((p) => ({ label: p.title || p.path, count: p.count }))}
            />
            <ListCard
              title="Origem do tráfego"
              items={data.referrers.map((r) => ({ label: r.name, count: r.count }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PieCard title="Navegadores" items={data.browsers} />
            <PieCard title="Sistemas operacionais" items={data.systems} />
            <PieCard title="Dispositivos" items={data.sizes} />
          </div>

          <ListCard
            title="Países"
            items={data.countries.map((c) => ({ label: c.name, count: c.count }))}
          />
        </div>
      )}
    </div>
  );
}
