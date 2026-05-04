"use client";

import { CogEightTooth, HomeIcon, UserIcon } from "@/components/icons";
import { useMyPageHref } from "@/hooks/useMyPageHref";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const myPageHref = useMyPageHref();
  const navItems = [
    { label: "Home", Icon: HomeIcon, href: "/" },
    { label: "My Page", Icon: UserIcon, href: myPageHref },
    { label: "Setting", Icon: CogEightTooth, href: "#" },
  ];

  return (
    <aside className="hidden md:flex w-72 shrink-0 h-[calc(100vh-4rem)] border-r border-gray-200 p-6 sticky top-16 bg-white flex-col overflow-y-auto">
      <nav>
        <ul className="space-y-2">
          {navItems.map(({ label, Icon, href }) => {
            const isActive = pathname === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 text-base font-medium rounded-lg px-4 py-3 transition ${
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
