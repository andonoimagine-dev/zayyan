"use client";

import { useSyncExternalStore } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { AttemptSummary, TopicAccuracy } from "@/lib/stats";

const COLORS = {
  light: {
    surface: "#fcfcfb",
    text: "#0b0b0b",
    secondary: "#52514e",
    muted: "#898781",
    grid: "#e1e0d9",
    axis: "#c3c2b7",
    blue: "#2a78d6",
    aqua: "#1baf7a",
  },
  dark: {
    surface: "#1a1a19",
    text: "#ffffff",
    secondary: "#c3c2b7",
    muted: "#898781",
    grid: "#2c2c2a",
    axis: "#383835",
    blue: "#3987e5",
    aqua: "#199e70",
  },
};

function subscribeToColorScheme(callback: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getIsDarkSnapshot(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getIsDarkServerSnapshot(): boolean {
  return false;
}

function useIsDark(): boolean {
  return useSyncExternalStore(subscribeToColorScheme, getIsDarkSnapshot, getIsDarkServerSnapshot);
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex h-64 items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">{message}</div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">{title}</h3>
      {children}
    </div>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
  colors,
  valueSuffix,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  colors: (typeof COLORS)["light"];
  valueSuffix: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      className="rounded-lg border px-3 py-2 text-sm shadow-md"
      style={{ background: colors.surface, borderColor: colors.grid, color: colors.text }}
    >
      <p style={{ color: colors.muted }}>{label}</p>
      <p className="font-semibold">
        {payload[0].value}
        {valueSuffix}
      </p>
    </div>
  );
}

export function ScoreTrendChart({ attempts }: { attempts: AttemptSummary[] }) {
  const isDark = useIsDark();
  const colors = isDark ? COLORS.dark : COLORS.light;

  if (attempts.length === 0) return <EmptyState message="Belum ada latihan yang selesai." />;

  const data = attempts.map((a, i) => ({
    label: `#${i + 1}`,
    score: a.scorePercent,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={colors.grid} />
        <XAxis dataKey="label" stroke={colors.axis} tick={{ fill: colors.muted, fontSize: 12 }} tickLine={false} />
        <YAxis domain={[0, 100]} stroke={colors.axis} tick={{ fill: colors.muted, fontSize: 12 }} tickLine={false} />
        <Tooltip content={<CustomTooltip colors={colors} valueSuffix="%" />} />
        <Line
          type="monotone"
          dataKey="score"
          stroke={colors.blue}
          strokeWidth={2}
          dot={{ r: 4, fill: colors.blue, strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function TimeTrendChart({ attempts }: { attempts: AttemptSummary[] }) {
  const isDark = useIsDark();
  const colors = isDark ? COLORS.dark : COLORS.light;

  if (attempts.length === 0) return <EmptyState message="Belum ada latihan yang selesai." />;

  const data = attempts.map((a, i) => ({
    label: `#${i + 1}`,
    minutes: a.durationMs !== null ? Math.round((a.durationMs / 60000) * 10) / 10 : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={colors.grid} />
        <XAxis dataKey="label" stroke={colors.axis} tick={{ fill: colors.muted, fontSize: 12 }} tickLine={false} />
        <YAxis stroke={colors.axis} tick={{ fill: colors.muted, fontSize: 12 }} tickLine={false} />
        <Tooltip content={<CustomTooltip colors={colors} valueSuffix=" menit" />} />
        <Line
          type="monotone"
          dataKey="minutes"
          stroke={colors.aqua}
          strokeWidth={2}
          dot={{ r: 4, fill: colors.aqua, strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function TopicAccuracyChart({ topicAccuracy }: { topicAccuracy: TopicAccuracy[] }) {
  const isDark = useIsDark();
  const colors = isDark ? COLORS.dark : COLORS.light;

  if (topicAccuracy.length === 0) return <EmptyState message="Belum ada data per topik." />;

  const data = topicAccuracy.map((t) => ({ name: t.topicName, accuracy: t.accuracyPercent }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={colors.grid} />
        <XAxis dataKey="name" stroke={colors.axis} tick={{ fill: colors.muted, fontSize: 11 }} tickLine={false} />
        <YAxis domain={[0, 100]} stroke={colors.axis} tick={{ fill: colors.muted, fontSize: 12 }} tickLine={false} />
        <Tooltip content={<CustomTooltip colors={colors} valueSuffix="%" />} />
        <Bar dataKey="accuracy" fill={colors.blue} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export { ChartCard };
