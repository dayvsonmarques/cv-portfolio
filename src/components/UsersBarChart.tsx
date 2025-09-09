"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Admin', users: 1 },
  { name: 'Editor', users: 1 },
  { name: 'Viewer', users: 1 },
];

export default function UsersBarChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="users" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  );
}
