//older version 
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




//working version
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import axios from 'axios';
// import debounce from 'lodash/debounce';

// export const useCartStore = create(
//   persist(
//     (set, get) => ({
//       /* =====================
//          STATE
//       ====================== */
//       cartItems: [],
//       total: 0,
//       cartCount: 0,

//       /* =====================
//          HELPERS
//       ====================== */
//       recalculate: (items) => {
//         const total = items.reduce(
//           (sum, i) => sum + i.price * i.quantity,
//           0
//         );

//         const count = items.reduce(
//           (sum, i) => sum + i.quantity,
//           0
//         );

//         return {
//           cartItems: items,
//           total: total.toFixed(2),
//           cartCount: count,
//         };
//       },

//       /* =====================
//          SET CART (FROM SERVER)
//       ====================== */
//       setCart: (items) => {
//         const state = get().recalculate(items);
//         set(state);
//       },

//       /* =====================
//          INCREMENT
//       ====================== */
//       increment: (cartId, availableStock) => {
//         set((state) => {
//           const items = state.cartItems.map((item) => {
//             if (item.id === cartId) {
//               const qty = item.quantity + 1;
//               if (qty > availableStock) return item;
//               return { ...item, quantity: qty };
//             }
//             return item;
//           });

//           return state.recalculate(items);
//         });

//         debouncedSync();
//       },

//       /* =====================
//          DECREMENT
//       ====================== */
//       decrement: (cartId) => {
//         set((state) => {
//           const items = state.cartItems
//             .map((item) =>
//               item.id === cartId && item.quantity > 1
//                 ? { ...item, quantity: item.quantity - 1 }
//                 : item
//             )
//             .filter((item) => item.quantity >= 1);

//           return state.recalculate(items);
//         });

//         debouncedSync();
//       },

//       /* =====================
//          REMOVE ITEM
//       ====================== */
//       remove: (cartId) => {
//         set((state) => {
//           const items = state.cartItems.filter(
//             (item) => item.id !== cartId
//           );

//           return state.recalculate(items);
//         });

//         axios.delete(route('cart.remove', cartId));
//       },

//       /* =====================
//          CLEAR CART
//       ====================== */
//       clearCart: () => {
//         set({
//           cartItems: [],
//           total: 0,
//           cartCount: 0,
//         });

//         axios.post(route('cart.clear'));
//       },

//       /* =====================
//          SYNC WITH BACKEND
//       ====================== */
//       syncCart: async () => {
//         try {
//           await axios.post(route('cart.sync'), {
//             items: get().cartItems.map((i) => ({
//               id: i.id,
//               quantity: i.quantity,
//             })),
//           });
//         } catch (e) {
//           console.error('Cart sync failed', e);
//         }
//       },
//     }),
//     {
//       name: 'cart-storage',
//       partialize: (state) => ({
//         cartItems: state.cartItems,
//         total: state.total,
//         cartCount: state.cartCount,
//       }),
//     }
//   )
// );

//  DEBOUNCED SYNC

// const debouncedSync = debounce(() => {
//   useCartStore.getState().syncCart();
// }, 700);



//new update to check 
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { route } from 'ziggy-js';

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
      //calculate total & all count 
      // recalculate: (items) => {
      //   const total = items.reduce((sum, i) => {
      //     // variant_total + extra_price
      //     const basePrice = parseFloat(i.price || 0);
      //     const variantTotal = parseFloat(i.options?.variant_total || 0);
      //     const extraPrice = parseFloat(i.options?.extra_price || 0);

      //     const itemTotalPrice = basePrice + variantTotal + extraPrice;
      //     return sum + itemTotalPrice * i.quantity;
      //   }, 0);

      //   const count = items.reduce((sum, i) => sum + i.quantity, 0);

      //   return {
      //     cartItems: items,
      //     total: total.toFixed(2),
      //     cartCount: count,
      //   };
      // },

      // unique count
      recalculate: (items) => {
        const total = items.reduce((sum, i) => {
          const basePrice = parseFloat(i.price || 0);
          const variantTotal = parseFloat(i.options?.variant_total || 0);
          const extraPrice = parseFloat(i.options?.extra_price || 0);

          const itemTotalPrice = basePrice + variantTotal + extraPrice;
          return sum + itemTotalPrice * i.quantity;
        }, 0);
        
        const count = items.length;

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

          return get().recalculate(items);
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

          return get().recalculate(items);
        });

        debouncedSync();
      },

      /* =====================
         REMOVE ITEM
      ====================== */
      remove: (cartId) => {
        set((state) => {
          const items = state.cartItems.filter((item) => item.id !== cartId);
          return get().recalculate(items);
        });

        axios.delete(route('cart.remove', cartId));
      },

      // remove: async (cartId) => {
      //   set((state) => {
      //     const items = state.cartItems.filter((item) => item.id !== cartId);
      //     return get().recalculate(items);
      //   });

      //   try {
      //     await axios.delete(`/cart/remove/${cartId}`, {
      //       headers: {
      //         'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      //         'X-Requested-With': 'XMLHttpRequest',
      //       },
      //     });
      //   } catch (error) {
      //     console.error('Remove failed', error);
      //     // ঐচ্ছিক: error হলে আবার cart reload করতে পারো
      //     // get().loadCart(); // যদি loadCart function থাকে
      //   }
      // },

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


//new with additem
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import axios from 'axios';
// import debounce from 'lodash/debounce';
// import { route } from 'ziggy-js';

// export const useCartStore = create(
//   persist(
//     (set, get) => ({
//       /* =====================
//          STATE
//       ====================== */
//       cartItems: [],
//       total: 0,
//       cartCount: 0,

//       /* =====================
//          HELPERS
//       ====================== */
//       recalculate: (items) => {
//         const total = items.reduce((sum, i) => {
//           const basePrice = parseFloat(i.price || 0);
//           const variantTotal = parseFloat(i.options?.variant_total || 0);
//           const extraPrice = parseFloat(i.options?.extra_price || 0);

//           const itemTotalPrice = basePrice + variantTotal + extraPrice;
//           return sum + itemTotalPrice * i.quantity;
//         }, 0);

//         const count = items.reduce((sum, i) => sum + i.quantity, 0);

//         return {
//           cartItems: items,
//           total: total.toFixed(2),
//           cartCount: count,
//         };
//       },

//       /* =====================
//          SET CART (FROM SERVER)
//       ====================== */
//       setCart: (items) => {
//         const state = get().recalculate(items);
//         set(state);
//       },

//       /* =====================
//          ADD ITEM (নতুন যোগ করা – home page থেকে add করার জন্য)
//       ====================== */
//       addItem: (product, quantity = 1, options = {}) => {
//         const variant_total = parseFloat(options.variant_total || 0);
//         const extra_price = parseFloat(options.extra_price || 0);

//         set((state) => {
//           // Existing item খুঁজছি product.id দিয়ে
//           const existingItem = state.cartItems.find(item => item.product_id === product.id);

//           let newItems;
//           if (existingItem) {
//             // Already আছে → quantity বাড়াও
//             newItems = state.cartItems.map(item =>
//               item.product_id === product.id
//                 ? { ...item, quantity: item.quantity + quantity }
//                 : item
//             );
//           } else {
//             // নতুন item add করো
//             const newItem = {
//               id: Date.now(), // temporary id
//               product_id: product.id,
//               name: product.name || product.title,
//               price: product.offer_price || product.price,
//               image: product.thumb_image || product.image, // image save হবে
//               quantity: quantity,
//               options: {
//                 variant_total,
//                 extra_price,
//                 ...options,
//               },
//             };
//             newItems = [...state.cartItems, newItem];
//           }

//           return get().recalculate(newItems);
//         });

//         debouncedSync();
//       },

//       /* =====================
//          INCREMENT
//       ====================== */
//       increment: (cartId, availableStock) => {
//         set((state) => {
//           const items = state.cartItems.map((item) => {
//             if (item.id === cartId) {
//               const qty = item.quantity + 1;
//               if (qty > availableStock) return item;
//               return { ...item, quantity: qty };
//             }
//             return item;
//           });

//           return get().recalculate(items);
//         });

//         debouncedSync();
//       },

//       /* =====================
//          DECREMENT
//       ====================== */
//       decrement: (cartId) => {
//         set((state) => {
//           const items = state.cartItems
//             .map((item) =>
//               item.id === cartId && item.quantity > 1
//                 ? { ...item, quantity: item.quantity - 1 }
//                 : item
//             )
//             .filter((item) => item.quantity >= 1);

//           return get().recalculate(items);
//         });

//         debouncedSync();
//       },

//       /* =====================
//          REMOVE ITEM
//       ====================== */
//       remove: async (cartId) => {
//         set((state) => {
//           const items = state.cartItems.filter((item) => item.id !== cartId);
//           return get().recalculate(items);
//         });

//         try {
//           await axios.delete(`/cart/remove/${cartId}`, {
//             headers: {
//               'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
//               'X-Requested-With': 'XMLHttpRequest',
//             },
//           });
//         } catch (error) {
//           console.error('Remove failed', error);
//         }
//       },

//       /* =====================
//          CLEAR CART
//       ====================== */
//       clearCart: () => {
//         set({
//           cartItems: [],
//           total: 0,
//           cartCount: 0,
//         });

//         axios.post(route('cart.clear'));
//       },

//       /* =====================
//          SYNC WITH BACKEND
//       ====================== */
//       syncCart: async () => {
//         try {
//           await axios.post(route('cart.sync'), {
//             items: get().cartItems.map((i) => ({
//               id: i.id,
//               quantity: i.quantity,
//             })),
//           });
//         } catch (e) {
//           console.error('Cart sync failed', e);
//         }
//       },
//     }),
//     {
//       name: 'cart-storage',
//       partialize: (state) => ({
//         cartItems: state.cartItems,
//         total: state.total,
//         cartCount: state.cartCount,
//       }),
//     }
//   )
// );

// /* =====================
//    DEBOUNCED SYNC
// ====================== */
// const debouncedSync = debounce(() => {
//   useCartStore.getState().syncCart();
// }, 700);