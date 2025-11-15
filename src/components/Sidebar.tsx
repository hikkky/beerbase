import {
  CogEightTooth,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@/components/icons";

const navItems = [
  { label: "Home", Icon: HomeIcon },
  { label: "Search", Icon: MagnifyingGlassIcon },
  { label: "My Page", Icon: UserIcon },
  { label: "Setting", Icon: CogEightTooth },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-full border-r border-gray-200 p-4 sticky top-16 bg-white">
      <nav>
        <ul className="space-y-4">
          {navItems.map(({ label, Icon }) => (
            <li key={label}>
              <a
                href="#"
                className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-gray-900"
              >
                <Icon className="h-5 w-5 text-gray-500" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
