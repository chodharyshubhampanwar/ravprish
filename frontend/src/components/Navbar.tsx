import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Products", href: "#" },
  { name: "Solutions", href: "#" },
  { name: "Resources", href: "#" },
  { name: "Enterprise", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Pricing", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-[hsla(0,0%,93%,1)]">
          MyBrand
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden space-x-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[hsla(0,0%,93%,1)] hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden space-x-4 md:flex">
          <button className="text-[hsla(0,0%,93%,1)] hover:text-white transition-colors">
            Log In
          </button>
          <button className="rounded border border-gray-600 px-3 py-1 text-[hsla(0,0%,93%,1)] hover:bg-white hover:text-black transition-colors">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[hsla(0,0%,93%,1)] hover:text-white transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {/* Hamburger Icon */}
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5h16v2H4V5zm0 12h16v2H4v-2z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 7h16v2H4V7zm0 8h16v2H4v-2z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Items */}
      {isOpen && (
        <div className="mt-2 flex flex-col space-y-2 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block border-b border-gray-800 px-2 py-2 text-[hsla(0,0%,93%,1)] hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
          <div className="flex flex-col items-start space-y-2 border-t border-gray-800 pt-2">
            <button className="w-full text-left text-[hsla(0,0%,93%,1)] hover:text-white transition-colors">
              Log In
            </button>
            <button className="w-full rounded border border-gray-600 px-3 py-1 text-left text-[hsla(0,0%,93%,1)] hover:bg-white hover:text-black transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
