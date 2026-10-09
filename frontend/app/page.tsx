import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import SortBar from "@/app/components/SortBar";
import FilterSidebar from "@/app/components/FilterSidebar";
import ProductCard from "@/app/components/ProductCard";
import Footer from "@/app/components/Footer";
import api from "@/app/api/axios";
import { parseQuery, buildHref } from "@/lib/product-params";

interface Product {
  _id: string;
  title: string;
  price: number;
}

type ProductsResponse = {
  products: Product[];
  total: number;
  totalPages: number;
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: Props) {
  const q = parseQuery(await searchParams);

  const res = await api.get<ProductsResponse>("/products", {
    params: {
      sort: q.sort,
      page: q.page,
      category: q.category.join(",") || undefined,
      occasion: q.occasion.join(",") || undefined,
      price: q.price.join(",") || undefined,
    },
  });
  const { products, total, totalPages } = res.data;

  return (
    <main>
      <Navbar />
      <Hero />

      <SortBar current={q} total={total} />

      <div className="plplayout">
        {q.showFilters && <FilterSidebar current={q} />}

        <div className="productGrid">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>

      <nav aria-label="Pagination">
        {q.page > 1 && (
          <Link href={buildHref({ ...q, page: q.page - 1 })} rel="prev">Previous</Link>
        )}
        {q.page < totalPages && (
          <Link href={buildHref({ ...q, page: q.page + 1 })} rel="next">Next</Link>
        )}
      </nav>

      <Footer />
    </main>
  );
}




























