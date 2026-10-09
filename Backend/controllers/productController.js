import Product from '../models/product.js';

// Create a new product
export const createProduct = async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.json({
            message: 'Product created successfully',
            product,
        })
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get all products
const IDEAL = ["men", "women", "unisex", "kids"];
const OCCASION = ["traditional", "casual", "summer", "winter", "formal"];
const PRICE_RANGES = {
  "under-500": { price: { $lt: 500 } },
  "500-1000": { price: { $gte: 500, $lte: 1000 } },
  "1000-2000": { price: { $gte: 1000, $lte: 2000 } },
  "above-2000": { price: { $gt: 2000 } },
};
const SORT_MAP = {
  relevance: { createdAt: -1 },
  newest: { createdAt: -1 },
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
};
const LIMIT = 20;


const toRegexList = (value, allowed) =>
  String(value || "")
    .split(",")
    .filter((v) => allowed.includes(v))
    .map((v) => new RegExp(`^${v}$`, "i"));



export const getProducts = async (req, res) => {
  try {
    const { search, sort = "relevance", page = 1, category, occasion, price } = req.query;

    const filter = {};

    if (search) filter.title = { $regex: search, $options: "i" };

    const cat = toRegexList(category, IDEAL);
    if (cat.length) filter.category = { $in: cat };

    const occ = toRegexList(occasion, OCCASION);
    if (occ.length) filter.occasion = { $in: occ };

    const priceConds = String(price || "")
      .split(",")
      .filter((v) => PRICE_RANGES[v])
      .map((v) => PRICE_RANGES[v]);
    if (priceConds.length) filter.$or = priceConds;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(SORT_MAP[sort] ?? SORT_MAP.relevance)
        .skip((pageNum - 1) * LIMIT)
        .limit(LIMIT),
      Product.countDocuments(filter),
    ]);

    res.json({ products, total, totalPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};



//Update a product
export const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({
            message: 'Product updated successfully',
            updated,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}

