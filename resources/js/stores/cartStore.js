// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import axios from 'axios';
// import debounce from 'lodash/debounce';

// export const useCartStore = create(
//   persist(
//     (set, get) => ({
//       cartItems: [],
//       total: 0,

//       // Cart 
//       setCart: (items, total) => {
//         set({ cartItems: items.map(item => ({ ...item, id: item.id })), total });
//       },

//       // Increment
//       increment: (cartId, availableStock) => {
//         set((state) => {
//           const newItems = state.cartItems.map((item) => {
//             if (item.id === cartId) {
//               const newQty = item.quantity + 1;
//               if (newQty > availableStock) return item; 
//               return { ...item, quantity: newQty };
//             }
//             return item;
//           });

//           const newTotal = newItems.reduce(
//             (sum, i) => sum + i.price * i.quantity,
//             0
//           );

//           return { cartItems: newItems, total: newTotal.toFixed(2) };
//         });
//         debouncedSync(); 
//       },

//       // Decrement ()
//       decrement: (cartId) => {
//         set((state) => {
//           const newItems = state.cartItems
//             .map((item) => {
//               if (item.id === cartId && item.quantity > 1) {
//                 return { ...item, quantity: item.quantity - 1 };
//               }
//               return item;
//             })
//             .filter((item) => item.quantity >= 1); 

//           const newTotal = newItems.reduce(
//             (sum, i) => sum + i.price * i.quantity,
//             0
//           );

//           return { cartItems: newItems, total: newTotal.toFixed(2) };
//         });
//         debouncedSync();
//       },

//       // Remove
//       remove: (cartId) => {
//         set((state) => {
//           const newItems = state.cartItems.filter((item) => item.id !== cartId);
//           const newTotal = newItems.reduce(
//             (sum, i) => sum + i.price * i.quantity,
//             0
//           );

//           return { cartItems: newItems, total: newTotal.toFixed(2) };
//         });
//         debouncedSync();
//       },

//       // sync (debounce)
//       syncCart: async () => {
//         const items = get().cartItems.map((item) => ({
//           id: item.id,
//           quantity: item.quantity,
//         }));

//         try {
//           await axios.post(route('cart.sync'), { items });

//         } catch (err) {
//           console.error('Cart sync failed:', err);

//         }
//       },
//     }),
//     {
//       name: 'cart-storage', 
//       partialize: (state) => ({ cartItems: state.cartItems, total: state.total }),
//     }
//   )
// );

// // debounce sync
// const debouncedSync = debounce(() => {
//   useCartStore.getState().syncCart();
// }, 800); 


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import debounce from 'lodash/debounce';

export const useCartStore = create(
  persist(
    (set, get) => ({
      /* =====================
         STATE
      ====================== */
      cartItems: [],
      total: 0,
      cartCount: 0,

      /* =====================
         HELPERS
      ====================== */
      recalculate: (items) => {
        const total = items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );

        const count = items.reduce(
          (sum, i) => sum + i.quantity,
          0
        );

        return {
          cartItems: items,
          total: total.toFixed(2),
          cartCount: count,
        };
      },

      /* =====================
         SET CART (FROM SERVER)
      ====================== */
      setCart: (items) => {
        const state = get().recalculate(items);
        set(state);
      },

      /* =====================
         INCREMENT
      ====================== */
      increment: (cartId, availableStock) => {
        set((state) => {
          const items = state.cartItems.map((item) => {
            if (item.id === cartId) {
              const qty = item.quantity + 1;
              if (qty > availableStock) return item;
              return { ...item, quantity: qty };
            }
            return item;
          });

          return state.recalculate(items);
        });

        debouncedSync();
      },

      /* =====================
         DECREMENT
      ====================== */
      decrement: (cartId) => {
        set((state) => {
          const items = state.cartItems
            .map((item) =>
              item.id === cartId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity >= 1);

          return state.recalculate(items);
        });

        debouncedSync();
      },

      /* =====================
         REMOVE ITEM
      ====================== */
      remove: (cartId) => {
        set((state) => {
          const items = state.cartItems.filter(
            (item) => item.id !== cartId
          );

          return state.recalculate(items);
        });

        axios.delete(route('cart.remove', cartId));
      },

      /* =====================
         CLEAR CART
      ====================== */
      clearCart: () => {
        set({
          cartItems: [],
          total: 0,
          cartCount: 0,
        });

        axios.post(route('cart.clear'));
      },

      /* =====================
         SYNC WITH BACKEND
      ====================== */
      syncCart: async () => {
        try {
          await axios.post(route('cart.sync'), {
            items: get().cartItems.map((i) => ({
              id: i.id,
              quantity: i.quantity,
            })),
          });
        } catch (e) {
          console.error('Cart sync failed', e);
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cartItems: state.cartItems,
        total: state.total,
        cartCount: state.cartCount,
      }),
    }
  )
);

/* =====================
   DEBOUNCED SYNC
====================== */
const debouncedSync = debounce(() => {
  useCartStore.getState().syncCart();
}, 700);




// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axios from "axios";
// import debounce from "lodash/debounce";

// export const useCartStore = create(
//   persist(
//     (set, get) => ({
//       cartItems: [],
//       total: 0,
//       count: 0,

//       /* ======================
//          ADD TO CART
//       ====================== */
//       addToCart: (newItem) => {
//         set((state) => {
//           const existing = state.cartItems.find(
//             (i) => i.product_id === newItem.product_id
//           );

//           let updatedItems;

//           if (existing) {
//             // একই product হলে quantity বাড়াও
//             updatedItems = state.cartItems.map((i) =>
//               i.product_id === newItem.product_id
//                 ? { ...i, quantity: i.quantity + 1 }
//                 : i
//             );
//           } else {
//             updatedItems = [
//               ...state.cartItems,
//               { ...newItem, quantity: 1 },
//             ];
//           }

//           return {
//             cartItems: updatedItems,
//             total: calcTotal(updatedItems),
//             count: calcCount(updatedItems),
//           };
//         });
//         debouncedSync();
//       },

//       /* ======================
//          INCREMENT
//       ====================== */
//       increment: (productId, stock) => {
//         set((state) => {
//           const items = state.cartItems.map((i) =>
//             i.product_id === productId && i.quantity < stock
//               ? { ...i, quantity: i.quantity + 1 }
//               : i
//           );
//           return {
//             cartItems: items,
//             total: calcTotal(items),
//             count: calcCount(items),
//           };
//         });
//         debouncedSync();
//       },

//       /* ======================
//          DECREMENT
//       ====================== */
//       decrement: (productId) => {
//         set((state) => {
//           const items = state.cartItems
//             .map((i) =>
//               i.product_id === productId && i.quantity > 1
//                 ? { ...i, quantity: i.quantity - 1 }
//                 : i
//             )
//             .filter((i) => i.quantity > 0);

//           return {
//             cartItems: items,
//             total: calcTotal(items),
//             count: calcCount(items),
//           };
//         });
//         debouncedSync();
//       },

//       /* ======================
//          REMOVE ITEM
//       ====================== */
//       remove: (productId) => {
//         set((state) => {
//           const items = state.cartItems.filter(
//             (i) => i.product_id !== productId
//           );
//           return {
//             cartItems: items,
//             total: calcTotal(items),
//             count: calcCount(items),
//           };
//         });
//         debouncedSync();
//       },

//       /* ======================
//          SYNC TO BACKEND
//       ====================== */
//       syncCart: async () => {
//         const payload = get().cartItems.map((i) => ({
//           product_id: i.product_id,
//           quantity: i.quantity,
//         }));

//         try {
//           await axios.post(route("cart.sync"), { items: payload });
//         } catch (e) {
//           console.error("Cart sync failed:", e);
//         }
//       },
//     }),
//     {
//       name: "cart-storage",
//       onRehydrateStorage: () => (state) => {
//         if (state) {
//           state.count = calcCount(state.cartItems);
//           state.total = calcTotal(state.cartItems);
//         }
//       },
//     }
//   )
// );

// /* ======================
//    HELPERS
// ====================== */
// const calcTotal = (items) =>
//   items.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2);

// const calcCount = (items) =>
//   items.reduce((s, i) => s + i.quantity, 0);

// const debouncedSync = debounce(() => {
//   useCartStore.getState().syncCart();
// }, 800);
