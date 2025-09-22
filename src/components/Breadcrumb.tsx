import React from "react";
import Link from "next/link";

interface BreadcrumbProps {
  items: { href: string; label: string; active?: boolean }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <nav className="mb-10 pb-10 text-sm text-gray-500 flex items-center gap-2 pt-10 mt-5" aria-label="Breadcrumb">
    {items.map((item, idx) => (
      <React.Fragment key={item.href + item.label}>
        {idx > 0 && <span>/</span>}
        {item.active ? (
          <span className="text-black dark:text-white font-bold text-md">{item.label}</span>
        ) : (
          <Link href={item.href} className="hover:underline text-yellow-600">{item.label}</Link>
        )}
      </React.Fragment>
    ))}
  </nav>
);

export default Breadcrumb;
