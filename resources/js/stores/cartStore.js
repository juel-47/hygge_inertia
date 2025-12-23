import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import debounce from 'lodash/debounce'; // npm install lodash

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      total: 0,

      // Cart লোড করার সময় (পেজ লোডে)
      setCart: (items, total) => {
        set({ cartItems: items.map(item => ({ ...item, id: item.id })), total });
      },

      // Increment (প্লাস)
      increment: (cartId, availableStock) => {
        set((state) => {
          const newItems = state.cartItems.map((item) => {
            if (item.id === cartId) {
              const newQty = item.quantity + 1;
              if (newQty > availableStock) return item; // স্টক চেক
              return { ...item, quantity: newQty };
            }
            return item;
          });

          const newTotal = newItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          );

          return { cartItems: newItems, total: newTotal.toFixed(2) };
        });
        debouncedSync(); // debounce sync
      },

      // Decrement (মাইনাস)
      decrement: (cartId) => {
        set((state) => {
          const newItems = state.cartItems
            .map((item) => {
              if (item.id === cartId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            })
            .filter((item) => item.quantity >= 1); // ১ এর নিচে গেলে রাখবো না

          const newTotal = newItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          );

          return { cartItems: newItems, total: newTotal.toFixed(2) };
        });
        debouncedSync();
      },

      // Remove
      remove: (cartId) => {
        set((state) => {
          const newItems = state.cartItems.filter((item) => item.id !== cartId);
          const newTotal = newItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          );

          return { cartItems: newItems, total: newTotal.toFixed(2) };
        });
        debouncedSync();
      },

      // সার্ভারে sync করা (debounce)
      syncCart: async () => {
        const items = get().cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        }));

        try {
          await axios.post(route('cart.sync'), { items });
          // sync সফল হলে কোনো কিছু করার দরকার নেই (কারণ ফ্রন্টএন্ডে আলরেডি আপডেট হয়ে গেছে)
        } catch (err) {
          console.error('Cart sync failed:', err);
          // ইচ্ছা করলে rollback করতে পারো
        }
      },
    }),
    {
      name: 'cart-storage', // localStorage-এ সেভ হবে
      partialize: (state) => ({ cartItems: state.cartItems, total: state.total }),
    }
  )
);

// debounce sync
const debouncedSync = debounce(() => {
  useCartStore.getState().syncCart();
}, 800); // ৮০০ ms পর sync