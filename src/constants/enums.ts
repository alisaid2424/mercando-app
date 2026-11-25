export enum Routes {
  ROOT = "/",
  CATEGORIE = "/category",
  CATEGORIES = "/admin/categories",
  PRODUCTS = "/admin/products",
  USERS = "/admin/users",
  ORDERS = "/admin/orders",
  AUTH = "/auth",
  ADMIN = "/admin",
}

export enum Pages {
  LOGIN = "/sign-in",
  Register = "/signup",
  SHOP = "/all-products",
  CATEGORIES = "/categories",
  FAVORITES = "/favorites",
  ABOUT = "/about",
  CONTACT = "/contact",
  CART = "/cart",
  PROFILE = "/profile",
  NEW = "/new",
  EDIT = "/edit",
}

export const CATEGORIES_PER_PAGE = 3;
export const USERS_PER_PAGE = 3;
export const PRODUCTS_PER_PAGE = 3;
export const ORDERS_PER_PAGE = 3;
//https://mercando-app-vg58.vercel.app
const PRODUCTION_DOMAIN = "https://roseately-patternless-jensen.ngrok-free.dev";

const DEVELOPMENT_DOMAIN =
  "https://roseately-patternless-jensen.ngrok-free.dev";
//http://localhost:3000
export const DOMAIN =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_DOMAIN
    : DEVELOPMENT_DOMAIN;
