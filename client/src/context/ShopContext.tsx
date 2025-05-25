import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import {
  Product,
  ProductBrand,
  ProductCategory,
  ProductFlag,
} from "../../../types";
import { fetchAllProducts } from "../api/shop";
import {
  fetchAllBrands,
  fetchAllCategories,
  fetchAllFlags,
  fetchAllSubcategories,
} from "../api/tags";

interface ShopContextType {
  products: Product[];
  brands: ProductBrand[];
  flags: ProductFlag[];
  categories: ProductCategory[];
  subcategories: ProductCategory[];
  error: string | null;
  isLoading: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a Shop Provider");
  }
  return context;
};

const ShopProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [subcategories, setSubategories] = useState<ProductCategory[]>([]);
  const [flags, setFlags] = useState<ProductFlag[]>([]);
  const [brands, setBrands] = useState<ProductBrand[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchAllData = async () => {
      try {
        const [products, categoires, subcategories, flags, brands] =
          await Promise.all([
            fetchAllProducts(),
            fetchAllCategories(),
            fetchAllSubcategories(),
            fetchAllFlags(),
            fetchAllBrands(),
          ]);
        setProducts(products);
        setCategories(categoires);
        setSubategories(subcategories);
        setFlags(flags);
        setBrands(brands);
      } catch (err: any) {
        throw new Error(err.message);
      }
    };
    fetchAllData()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        subcategories,
        flags,
        brands,
        error,
        isLoading,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export { useShop, ShopProvider };
