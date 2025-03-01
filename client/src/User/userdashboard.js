import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", incidents: 30 },
  { month: "Feb", incidents: 45 },
  { month: "Mar", incidents: 25 },
  { month: "Apr", incidents: 50 },
  { month: "May", incidents: 40 },
  { month: "Jun", incidents: 35 },
];

const UserDashboard = () => {
  const handleAddPolice = () => {
    alert("Add Police button clicked");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAddPolice}>
        Add Police
      </button>
      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Past Incident Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="incidents" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserDashboard;
