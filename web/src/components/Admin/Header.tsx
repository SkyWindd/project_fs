import { Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

export const Header = () => {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">Trang quản trị</h2>
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-500" />
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/40" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
