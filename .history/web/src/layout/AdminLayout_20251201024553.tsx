import { Outlet } from "react-router-dom";
import { Bell } from "lucide-react";
import { Sidebar } from "../components/Admin/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white border-b p-4">
          <h1 className="text-xl font-semibold">Trang quản trị</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 cursor-pointer" />
            <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/women/65.jpg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6">
      {children}
    </div>
  );
}
