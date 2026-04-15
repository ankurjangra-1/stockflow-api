import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 rounded-[2rem] bg-white/70 p-4 md:p-6 lg:p-8">
          <Header onMenuToggle={() => setSidebarOpen(true)} />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
