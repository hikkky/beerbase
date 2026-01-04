"use client";

import { CogEightTooth, HomeIcon, UserIcon } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", Icon: HomeIcon, href: "/" },
  { label: "My Page", Icon: UserIcon, href: "#" },
  { label: "Setting", Icon: CogEightTooth, href: "#" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white md:hidden z-50">
      <nav className="w-full max-w-3xl mx-auto">
        <ul className="flex w-full">
          {navItems.map(({ label, Icon, href }) => {
            const isActive = pathname === href;

            return (
              <li key={label} className="flex-1">
                <Link
                  href={href}
                  aria-label={label}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-center py-3 transition ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
