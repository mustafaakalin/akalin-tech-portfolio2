import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
      
      <nav className="space-y-2">
        <Link 
          href="/admin/projects"
          className="block px-4 py-2 rounded hover:bg-gray-800"
        >
          Projects
        </Link>
        <Link 
          href="/admin/settings"
          className="block px-4 py-2 rounded hover:bg-gray-800"
        >
          Site Settings
        </Link>
        <Link 
          href="/admin/social"
          className="block px-4 py-2 rounded hover:bg-gray-800"
        >
          Social Media
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar; 