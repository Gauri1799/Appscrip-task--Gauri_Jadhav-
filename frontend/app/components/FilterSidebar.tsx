"use client";

import { useState } from "react";
import Link from "next/link";
import "./filtersidebar.css";
import { FaChevronDown } from "react-icons/fa";
import { IDEAL, OCCASION, PRICE, DECORATIVE, type Option } from "@/lib/filters";
import {
  buildHref,
  toggleFilter,
  type FilterKey,
  type ProductQuery,
} from "@/lib/product-params";

const WORKING: { key: FilterKey; label: string; options: Option[] }[] = [
  { key: "category", label: "IDEAL FOR", options: IDEAL },
  { key: "occasion", label: "OCCASION", options: OCCASION },
  { key: "price", label: "PRICE", options: PRICE },
];

export default function FilterSidebar({ current }: { current: ProductQuery }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (k: string) => setOpenKey(openKey === k ? null : k);

  return (
    <div className="filters">
      {/* Sirf dikhne ke liye */}
      <div className="customizable">
        <input type="checkbox" />
        <label>CUSTOMIZABLE</label>
      </div>

      
      {WORKING.map((f) => {
        const selected = current[f.key];
        const text = f.options
          .filter((o) => selected.includes(o.value))
          .map((o) => o.label)
          .join(", ");

        return (
          <div className="filterItem" key={f.key}>
            <div className="filterHeader" onClick={() => toggle(f.key)}>
              <span>{f.label}</span>
              <FaChevronDown />
            </div>
            <p className="filter-selected">{text || "All"}</p>

            {openKey === f.key && (
              <ul className="filterOptions">
                {f.options.map((o) => (
                  <li key={o.value}>
                    <Link href={buildHref(toggleFilter(current, f.key, o.value))}>
                      <input
                        type="checkbox"
                        checked={selected.includes(o.value)}
                        readOnly
                      />{" "}
                      {o.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      
      {DECORATIVE.map((f) => (
        <div className="filterItem" key={f.key}>
          <div className="filterHeader" onClick={() => toggle(f.key)}>
            <span>{f.label}</span>
            <FaChevronDown />
          </div>
          <p className="filter-selected">All</p>

          {openKey === f.key && (
            <ul className="filterOptions">
              {f.options.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}




















