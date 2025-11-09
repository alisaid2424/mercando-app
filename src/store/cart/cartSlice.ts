import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  updateCart,
  removeFromCart,
  getUserCart,
} from "@/server/actions/cart";
import { RootState } from "../index";
import { FlexibleCartItem } from "@/types/product";

const fetchUserCart = createAsyncThunk(
  "cart/fetch",
  async (clerkUserId: string) => {
    return await getUserCart(clerkUserId);
  }
);

const addCartItem = createAsyncThunk(
  "cart/add",
  async ({
    clerkUserId,
    productId,
    quantity,
  }: {
    clerkUserId: string;
    productId: string;
    quantity: number;
  }) => {
    return await addToCart(clerkUserId, productId, quantity);
  }
);

const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ cartId, quantity }: { cartId: string; quantity: number }) => {
    return await updateCart(cartId, quantity);
  }
);

const removeCartItem = createAsyncThunk(
  "cart/remove",
  async (cartId: string) => {
    return await removeFromCart(cartId);
  }
);

const initialState: {
  items: FlexibleCartItem[];
  loading: boolean;
  error: string | null;
} = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch User Cart
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      })
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        const existing = state.items.find(
          (item) => item.id === action.payload.id
        );
        if (existing) {
          existing.quantity = action.payload.quantity;
          existing.amount = action.payload.amount;
        } else {
          state.items.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.error =
          action.error.message || "Failed to add product. Try again later.";
        state.loading = false;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const payload = action.payload;

        // If the item was deleted (quantity <= 0), remove it from the cart
        if ("deleted" in payload) {
          state.items = state.items.filter((item) => item.id !== payload.id);
          return;
        }

        // Update the item directly
        state.items = state.items.map((item) =>
          item.id === payload.id ? payload : item
        );
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      });
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;

export { fetchUserCart, addCartItem, updateCartItem, removeCartItem };

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
