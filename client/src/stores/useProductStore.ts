// import { create } from "zustand";
// import {
//   Product,
//   ProductBrand,
//   ProductCategory,
//   ProductFlag,
//   ProductImage,
//   ProductVariants,
// } from "../../../shared/types";
// import {

// } from "../api/products";
// import {
//   fetchAllBrands,
//   fetchAllCategories,
//   fetchAllFlags,
//   fetchAllSubcategories,
// } from "../api/tags";

// interface ProductStore {
//   products: Record<number, Product>;
//   productCategories: Record<number, ProductCategory>;
//   productSubcategories: Record<number, ProductCategory>;
//   productBrands: Record<number, ProductBrand>;
//   productImages: Record<number, ProductImage[]>;
//   productVariants: Record<number, ProductVariants>;
//   categories: ProductCategory[];
//   subcategories: ProductCategory[];
//   flags: ProductFlag[];
//   brands: ProductBrand[];
//   productFlags: Record<number, ProductFlag[]>;
//   isLoading: boolean;
//   error: string | null;

//   getProductById: (id: number) => Promise<void>;

//   getProductCategory: (id: number) => Promise<void>;
//   getProductSubcategory: (id: number) => Promise<void>;
//   getProductImages: (id: number) => Promise<void>;
//   getProductFlags: (id: number) => Promise<void>;
//   getProductBrand: (id: number) => Promise<void>;
//   getProductVariants: (id: number) => Promise<void>;
//   getProductMetadata: () => Promise<void>;
// }
// export const useProductStore = create<ProductStore>((set, get) => ({
//   products: {},
//   productFlags: {},
//   productCategories: {},
//   productSubcategories: {},
//   productVariants: {},
//   productImages: {},
//   categories: [],
//   subcategories: [],
//   productBrands: {},
//   flags: [],
//   brands: [],
//   isLoading: true,
//   error: null,

//   getProductById: async (id: number) => {
//     if (get().products[id]) return;
//     set({ isLoading: true, error: null });
//     try {
//       const [product, category, subcategory, flags, brand, images, variants] =
//         await Promise.all([

//         ]);

//       set((state) => ({
//         products: {
//           ...state.products,
//           [id]: {
//             ...product,
//             category,
//             subcategory,
//             brand,
//             images,
//             flags,
//             variants,
//           },
//         },
//         isLoading: false,
//       }));
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },

//   getProductCategory: async (id: number) => {
//     if (get().productCategories[id]) return;
//     set({ isLoading: true, error: null });

//     try {
//       const res = await fetchProductCategory(id);

//       set((state) => ({
//         productCategories: { ...state.productCategories, [id]: res },
//         isLoading: false,
//       }));
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },
//   getProductMetadata: async () => {
//     set({ isLoading: true, error: null });
//     try {
//       const [categories, subcategories, flags, brands] = await Promise.all([
//         fetchAllCategories(),
//         fetchAllSubcategories(),
//         fetchAllFlags(),
//         fetchAllBrands(),
//       ]);
//       set({
//         categories,
//         subcategories,
//         flags,
//         brands,
//         isLoading: false,
//       });
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },
//   getProductVariants: async (id: number) => {
//     if (get().productVariants[id]) return;

//     try {
//       const res = await fetchProductVariants(id);
//       set((state) => ({
//         productVariants: {
//           ...state.productVariants,
//           [id]: res,
//         },
//       }));
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },
//   getProductImages: async (id: number) => {
//     if (get().productImages[id]) return;

//     try {
//       const res = await fetchProductImages(id);
//       set((state) => ({
//         productImages: {
//           ...state.productImages,
//           [id]: res || [],
//         },
//         isLoading: false,
//       }));
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },
//   getProductSubcategory: async (id: number) => {
//     if (get().productSubcategories[id]) return;

//     try {
//       const res = await fetchProductSubcategory(id);
//       set((state) => ({
//         productSubcategories: {
//           ...state.productSubcategories,
//           [id]: res,
//         },
//       }));
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },
//   getProductBrand: async (id: number) => {
//     if (get().productCategories[id]) return;

//     try {
//       const res = await fetchProductBrand(id);
//       set((state) => ({
//         productBrands: {
//           ...state.productBrands,
//           [id]: res,
//         },
//       }));
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },

//   getProductFlags: async (id: number) => {
//     if (get().productFlags[id]) return;

//     try {
//       const res = await fetchProductFlags(id);
//       set((state) => ({
//         productFlags: {
//           ...state.productFlags,
//           [id]: res || [],
//         },
//       }));
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },
// }));
