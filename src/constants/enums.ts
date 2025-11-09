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
  LOGIN = "/signin",
  Register = "/signup",
  SHOP = "/all-products",
  CATEGORIES = "/categories",
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

const PRODUCTION_DOMAIN = "";

const DEVELOPMENT_DOMAIN = "http://localhost:3000";

export const DOMAIN =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_DOMAIN
    : DEVELOPMENT_DOMAIN;
