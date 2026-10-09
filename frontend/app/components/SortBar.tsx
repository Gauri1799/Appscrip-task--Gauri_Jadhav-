"use client";

import { useState } from "react";
import Link from "next/link";
import "./sortbar.css";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { buildHref, type ProductQuery } from "@/lib/product-params";

const OPTIONS = [
  { value: "relevance", label: "RECOMMENDED" },
  { value: "newest", label: "NEWEST FIRST" },
  { value: "price-asc", label: "PRICE: LOW TO HIGH" },
  { value: "price-desc", label: "PRICE: HIGH TO LOW" },
] as const;

export default function SortBar({
  current,
  total,
}: {
  current: ProductQuery;
  total: number;
}) {
  const [open, setOpen] = useState(false);
  const selected = OPTIONS.find((o) => o.value === current.sort) ?? OPTIONS[0];

  return (
    <div className="sortBar">
      <div className="left">
        <span className="items">{total} ITEMS</span>
        <Link
          className="hideFilter"
          href={buildHref({ ...current, showFilters: !current.showFilters })}
        >
          <FaChevronLeft className="h-arrow" />
          {current.showFilters ? "HIDE FILTER" : "SHOW FILTER"}
        </Link>
      </div>

      <div className="right">
        <span className="recommended" onClick={() => setOpen(!open)}>
          {selected.label} <FaChevronDown className="r-arrow" />
          {open && (
            <ul className="sortDropdown">
              {OPTIONS.map((o) => (
                <li key={o.value}>
                  <Link
                    href={buildHref({ ...current, sort: o.value, page: 1 })}
                    onClick={() => setOpen(false)}
                  >
                    {o.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </span>
      </div>
    </div>
  );
}












