import Link from "next/link";
import {
  CogEightTooth,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@/components/icons";

const navItems = [
  { label: "Home", Icon: HomeIcon, href: "/" },
  { label: "Search", Icon: MagnifyingGlassIcon, href: "#" },
  { label: "My Page", Icon: UserIcon, href: "#" },
  { label: "Setting", Icon: CogEightTooth, href: "#" },
];

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 h-[calc(100vh-4rem)] border-r border-gray-200 p-4 sticky top-16 bg-white flex flex-col overflow-y-auto">
      <nav>
        <ul className="space-y-4">
          {navItems.map(({ label, Icon, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-gray-900"
              >
                <Icon className="h-5 w-5 text-gray-500" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
