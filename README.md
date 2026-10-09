Product listing page 

A server-rendered product listing page with URL-driven filters, sorting and pagination. All state lives in the URL, so pages are shareable, crawlable and work without client-side JavaScript.

## 1. Live URLs

Frontend: https://appscrip-task-gauri-jadhav.vercel.app
API : https://appscrip-task-gauri-jadhav.onrender.com/api 
example: https://appscrip-task-gauri-jadhav.onrender.com/api/products

>The API runs on render

## 2. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 16 (App Router) + TypeScript | Server components render real HTML for SEO; `searchParams` makes URL state simple; types catch bugs early |
| Backend | Node.js + Express | Simple, minimal REST API |
| Database | MongoDB (Atlas) + Mongoose | Flexible documents, easy filter / sort / paginate queries |
| Hosting | Vercel, Render, MongoDB Atlas | Free tiers, easy env management |

## 3. Run locally

Requires Node 18+ and a MongoDB database (Atlas or local Community).

```bash
git clone https://github.com/Gauri1799/Appscrip-task--Gauri_Jadhav-.git
cd Appscrip-task--Gauri_Jadhav-
```

**Backend**

```bash
cd Backend
npm install
cp .env.example .env      # Windows: copy .env.example .env
```

Edit `Backend/.env`:

```
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

**Start the API:**

```bash
npm run dev
```

**Frontend** (new terminal):

```bash
cd frontend
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

`frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Open http://localhost:3000. Both servers must run at the same time.

## 4. Architecture and folders

```
Browser → Next.js server component → Express API → MongoDB
          (reads URL, fetches data, renders HTML)
```

```
Backend/
  controllers/   getProducts (filter/sort/paginate), createProduct
  models/        Mongoose schema
  routes/        /api/products
  data/          products.json (seed data)
  seed.js  server.js
frontend/
  app/page.tsx             server component: URL → fetch → render
  app/components/          SortBar, FilterSidebar, ProductCard, Navbar, Hero, Footer
  app/api/axios.ts         axios instance (baseURL from env)
  lib/filters.ts           filter options (single source of truth)
  lib/product-params.ts    parseQuery, buildHref, toggleFilter
```

## 5. API

Base path: `/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | List products with filter, sort, pagination |
| POST | `/products` | Create a product |

`GET /products` query params:

- `category`: `men`, `women`, `unisex`, `kids`
- `occasion`: `traditional`, `casual`, `summer`, `winter`, `formal`
- `price`: `under-500`, `500-1000`, `1000-2000`, `above-2000`
- `sort`: `relevance`, `newest`, `price-asc`, `price-desc`
- `page` (20 per page) and `search` (title)

Multiple values are comma-separated: OR within one filter, AND across filters.

Response: `{ "products": [...], "total": 12, "totalPages": 1 }`

## 6. SSR and SEO

- `page.tsx` is an async server component, so View Source shows real product HTML.
- Sort, filters and pagination are `<Link>`s with real hrefs, so crawlers can follow them and they work without JS.
- Params are whitelisted, defaults are omitted and key order is fixed, so each state has one clean URL.
- Changing a filter or sort resets `page` to 1. Pagination uses `rel="prev"` / `rel="next"`.
- Check SSR: `curl -s "http://localhost:3000/?category=men" | grep productGrid`
- **Planned:** `generateMetadata`, canonical URLs, `noindex` for noisy filter combinations, sitemap.

## 7. Dependencies

- **Frontend:** `next`, `react`, `typescript` (framework and types), `axios` (HTTP client), `react-icons` (icons).
- **Backend:** `express` (server), `mongoose` (MongoDB models), `dotenv` (env vars), `cors` (cross-origin requests), `nodemon` (dev restart).

> Edit to match each `package.json`.


## 9. Limitations and next steps

 can add
- Add SEO metadata, canonicals and a sitemap.
- Add fabric/pattern fields and make those filters real; add DB indexes.

