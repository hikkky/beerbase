export function Sidebar() {
  return (
    <aside className="w-64 h-full border-r border-gray-200 p-4">
      <nav>
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Search
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Events
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              My Page
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Setting
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
