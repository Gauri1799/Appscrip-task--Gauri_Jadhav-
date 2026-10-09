import { IDEAL, OCCASION, PRICE, type Option } from "./filters";

const SORTS = ["relevance", "price-asc", "price-desc", "newest"] as const;
export type Sort = (typeof SORTS)[number];

export type ProductQuery = {
  sort: Sort;
  category: string[]; // IDEAL FOR
  occasion: string[];
  price: string[];
  page: number;
  showFilters: boolean;
};

export type FilterKey = "category" | "occasion" | "price";

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

// "men,women" -> ["men","women"] (sirf valid values)
const list = (v: string | string[] | undefined, allowed: Option[]) =>
  (first(v)?.split(",") ?? []).filter((x) => allowed.some((o) => o.value === x));

export function parseQuery(sp: RawParams): ProductQuery {
  const sort = first(sp.sort) as Sort;
  const page = parseInt(first(sp.page) ?? "1", 10);
  return {
    sort: SORTS.includes(sort) ? sort : "relevance",
    category: list(sp.category, IDEAL),
    occasion: list(sp.occasion, OCCASION),
    price: list(sp.price, PRICE),
    page: Number.isFinite(page) && page > 0 ? page : 1,
    showFilters: first(sp.filters) !== "0",
  };
}

export function buildHref(q: Partial<ProductQuery>) {
  const p = new URLSearchParams();
  if (q.category?.length) p.set("category", q.category.join(","));
  if (q.occasion?.length) p.set("occasion", q.occasion.join(","));
  if (q.price?.length) p.set("price", q.price.join(","));
  if (q.sort && q.sort !== "relevance") p.set("sort", q.sort);
  if (q.page && q.page > 1) p.set("page", String(q.page));
  if (q.showFilters === false) p.set("filters", "0");
  const s = p.toString().replace(/%2C/g, ",");
  return s ? `/?${s}` : "/";
}

// Ek option on/off, aur page 1 par reset
export function toggleFilter(
  q: ProductQuery,
  key: FilterKey,
  value: string
): ProductQuery {
  const cur = q[key];
  const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
  return { ...q, [key]: next, page: 1 };
}