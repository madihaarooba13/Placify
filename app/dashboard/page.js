"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const Dashboard = () => {
  // Example data
  const placementData = [
    { month: "Jan", placements: 10 },
    { month: "Feb", placements: 15 },
    { month: "Mar", placements: 8 },
    { month: "Apr", placements: 20 },
    { month: "May", placements: 18 },
    { month: "Jun", placements: 25 },
  ];

  const aiActivityData = [
    { day: "Mon", queries: 12 },
    { day: "Tue", queries: 18 },
    { day: "Wed", queries: 9 },
    { day: "Thu", queries: 14 },
    { day: "Fri", queries: 20 },
    { day: "Sat", queries: 8 },
    { day: "Sun", queries: 5 },
  ];

  return (
    <div className="min-h-screen bg-sky-100 p-35">
      {/* Welcome */}
      <h1 className="text-3xl font-bold mb-6 text-sky-800">Welcome to Placify Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold text-gray-700">Total Placements</h2>
          <p className="text-3xl font-bold text-sky-600 mt-2">150</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold text-gray-700">AI Interactions</h2>
          <p className="text-3xl font-bold text-sky-600 mt-2">320</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold text-gray-700">Active Users</h2>
          <p className="text-3xl font-bold text-sky-600 mt-2">75</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Placement Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Monthly Placements</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={placementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="placements" stroke="#0ea5e9" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Activity Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">AI Queries This Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={aiActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="queries" fill="#0ea5e9" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Task Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Tasks & Actions</h2>
        <ul className="space-y-3">
          <li className="flex justify-between items-center p-3 bg-sky-50 rounded hover:bg-sky-100 transition-colors">
            <span>Complete AI Chatbot Training</span>
            <button className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700 transition">Start</button>
          </li>
          <li className="flex justify-between items-center p-3 bg-sky-50 rounded hover:bg-sky-100 transition-colors">
            <span>Upload Resume Templates</span>
            <button className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700 transition">Upload</button>
          </li>
          <li className="flex justify-between items-center p-3 bg-sky-50 rounded hover:bg-sky-100 transition-colors">
            <span>Check Placement Applications</span>
            <button className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700 transition">Review</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
