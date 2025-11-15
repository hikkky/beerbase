"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 h-[calc(100vh-4rem)] border-r border-gray-200 p-4 sticky top-16 bg-white flex flex-col overflow-y-auto">
      <nav>
        <ul className="space-y-4">
          {navItems.map(({ label, Icon, href }) => {
            const isActive = pathname === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 text-lg font-medium rounded px-3 py-2 transition ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-gray-900" : "text-gray-700"
                    }`}
                  />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
