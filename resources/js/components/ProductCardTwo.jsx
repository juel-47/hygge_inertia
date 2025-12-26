import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";

import { toast } from "react-toastify";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { router } from "@inertiajs/react";
// import { useCartStore } from '../stores/cartStore';


const ProductCardTwo = ({ product }) => {
    const { props } = usePage();
    // const { setCart, recalculate } = useCartStore();
    const [quantity, setQuantity] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    const isOutOfStock = !product.qty || product.qty <= 0;
    const hasOptions =
        product?.colors?.length > 0 || product?.sizes?.length > 0;

    const [message, setMessage] = useState("");

    const handleAddToCart = () => {
        router.post(
            route("cart.add"),
            {
                product_id: product.id,
                qty: 1,
                size_id:null,
                color_id:null,
                customization_id: null,
            },
            {
                showProgress: false, // ✅ NO progress bar
                preserveState: true,
                preserveScroll: true,

                onSuccess: () => {
                    toast.success("Product added to cart!");
                    // setTimeout(() => {
                    //     setMessage("");
                    // }, 2000);
                    // const newCartItems = props.cart_items;
                    // const newTotal = props.total;

                    // if (newCartItems) {
                    //     const updatedState = recalculate(newCartItems);
                    //     useCartStore.setState({
                    //         cartItems: newCartItems,
                    //         total: newTotal || updatedState.total,
                    //         cartCount: updatedState.cartCount,
                    //     });
                    // }
                },
                onError: (errors) => {
                    toast.error("Failed to add to cart");
                    console.log(errors);
                }
            }
        );
    };

    // const handleAddToCart = () => {
    //     router.post(
    //         route("cart.add"),
    //         {
    //             product_id: product.id,
    //             name: product.name,
    //             price: product.price,
    //             quantity: 1,
    //         },
    //         {
    //             showProgress: false, // no progress bar
    //             preserveScroll: true,
    //             preserveState: true,

    //             // ✅ Catch JSON response
    //             onFinish: (event) => {
    //                 if (event.detail?.response) {
    //                     event.detail.response.json().then((data) => {
    //                         if (data.message) {
    //                             toast.success(data.message);
    //                         }
    //                     });
    //                 }
    //             },

    //             onError: () => {
    //                 toast.error("Failed to add product");
    //             },
    //         }
    //     );
    // };

    return (
        <div className="w-full  mx-auto transition-all duration-500 overflow-hidden hover:-translate-y-1 relative">
            {/* Out of Stock Badge  */}
            {isOutOfStock && (
                <div className="absolute top-3 left-3 z-10 bg-red text-cream text-xs font-mont font-semibold px-3 py-1 rounded-full shadow-lg">
                    Out of Stock
                </div>
            )}

            {/* Product Image Container */}
            <div
                className={`relative overflow-hidden rounded-xl ${
                    isOutOfStock ? "opacity-70" : ""
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={`/${product.thumb_image}`}
                    alt={product.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 hover:scale-105 h-full rounded-xl"
                />

                {/* Hover Overlay */}
                {isHovered && (
                    <div className="absolute inset-0 bg-dark2/70 flex items-center justify-center">
                        <div className="flex flex-col space-y-3">
                            {isOutOfStock ? (
                                // Out of stock হলে বাটন ডিজেবল + লাল
                                <button
                                    disabled
                                    className="w-full flex font-mont justify-between items-center text-[12px] md:text-[18px] border border-red bg-red/80 text-cream rounded-[10px] mb-4 px-4 py-2 md:px-[30px] md:py-[15px] cursor-not-allowed opacity-80"
                                >
                                    Out of Stock
                                    <span>
                                        <GoArrowRight />
                                    </span>
                                </button>
                            ) : !hasOptions ? (
                                <button
                                    onClick={handleAddToCart}
                                    className={`w-full flex justify-between items-center text-[10px] md:text-[14px] border border-transparent hover:border-cream rounded-[10px] text-cream mb-4 px-4 py-2 md:px-5 md:py-2.5 cursor-pointer  `}
                                >
                                    Add to cart
                                    <span>
                                        <GoArrowRight />
                                    </span>
                                </button>
                            ) : (
                                <Link
                                    href={`/product-detail/${product?.slug}`}
                                    className="w-full flex justify-between font-mont items-center text-[12px] md:text-[14px] bg-red border border-transparent hover:border-cream rounded-[10px] text-cream mb-4 px-4 py-2 md:px-2.5 md:py-[7px]"
                                >
                                    Select Option
                                    <span>
                                        <GoArrowRight />
                                    </span>
                                </Link>
                            )}

                            <Link
                                href={`/product-details/${product?.slug}`}
                                className="w-full flex justify-between font-mont items-center text-[12px] md:text-[14px] bg-dark2 border border-transparent hover:border-cream rounded-[10px] text-cream mb-4 px-4 py-2 md:px-5 md:py-2.5"
                            >
                                Details
                                <span>
                                    <GoArrowRight />
                                </span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="px-2 mt-2">
                <h4 className="text-cream text-[12px] xl:text-[14px] font-normal md:font-semibold font-mont mb-2.5">
                    <Link
                        href={`/product-details/${product?.slug}`}
                        className="font-mont truncate"
                    >
                        {product?.name}
                    </Link>
                </h4>

                <div className="">
                    <p className="text-[12px] xl:text-[17px] text-cream font-mont">
                        {/* {currency?.settings?.currency_icon} */}
                        {product?.offer_price
                            ? product?.offer_price
                            : product?.price}
                    </p>
                    {product?.offer_price && (
                        <p className="text-red line-through decoration-cream text-[12px] xl:text-[14px] font-mont font-medium">
                            {/* {currency?.settings?.currency_icon} */}
                            {product?.price}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCardTwo;


// import React, { useState } from "react";
// import { GoArrowRight } from "react-icons/go";
// import { toast } from "react-toastify";
// import { Link } from "@inertiajs/react";
// import { route } from "ziggy-js";
// import axios from "axios";
// import { useCartStore } from "../stores/cartStore";

// const ProductCardTwo = ({ product }) => {
//     const [isHovered, setIsHovered] = useState(false);

//     const addToCartStore = useCartStore((state) => state.addToCart);

//     const isOutOfStock = !product?.qty || product.qty <= 0;
//     const hasOptions =
//         (product?.colors?.length ?? 0) > 0 ||
//         (product?.sizes?.length ?? 0) > 0;

//     const handleAddToCart = async () => {
//         if (isOutOfStock) {
//             toast.error("This product is out of stock!");
//             return;
//         }

//         /* ============================
//            1️⃣ INSTANT UI UPDATE (Zustand)
//         ============================ */
//         addToCartStore({
//             id: `local-${product.id}`, // temporary id
//             product_id: product.id,
//             product: product,
//             quantity: 1,
//             price: product.offer_price ?? product.price,
//         });

//         toast.success("Product added to cart!");

//         /* ============================
//            2️⃣ BACKEND SYNC (Silent)
//         ============================ */
//         try {
//             await axios.post(route("cart.add"), {
//                 product_id: product.id,
//                 qty: 1,
//                 size_id: null,
//                 color_id: null,
//                 customization_id: null,
//             });
//         } catch (error) {
//             console.error(error);
//             toast.error("Cart sync failed!");
//         }
//     };

//     return (
//         <div className="w-full mx-auto transition-all duration-500 overflow-hidden hover:-translate-y-1 relative">
//             {/* Out of Stock Badge */}
//             {isOutOfStock && (
//                 <div className="absolute top-3 left-3 z-10 bg-red text-cream text-xs font-semibold px-3 py-1 rounded-full">
//                     Out of Stock
//                 </div>
//             )}

//             {/* Image */}
//             <div
//                 className={`relative overflow-hidden rounded-xl ${
//                     isOutOfStock ? "opacity-70" : ""
//                 }`}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//             >
//                 <img
//                     src={`/${product?.thumb_image}`}
//                     alt={product?.name}
//                     loading="lazy"
//                     className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 rounded-xl"
//                 />

//                 {/* Hover Actions */}
//                 {isHovered && (
//                     <div className="absolute inset-0 bg-dark2/70 flex items-center justify-center">
//                         <div className="flex flex-col space-y-3">
//                             {isOutOfStock ? (
//                                 <button
//                                     disabled
//                                     className="w-full flex justify-between items-center text-sm border border-red bg-red/80 text-cream rounded-[10px] px-4 py-2 cursor-not-allowed"
//                                 >
//                                     Out of Stock <GoArrowRight />
//                                 </button>
//                             ) : !hasOptions ? (
//                                 <button
//                                     onClick={handleAddToCart}
//                                     className="w-full flex justify-between items-center text-sm border border-transparent hover:border-cream rounded-[10px] text-cream px-4 py-2"
//                                 >
//                                     Add to cart <GoArrowRight />
//                                 </button>
//                             ) : (
//                                 <Link
//                                     href={`/product-detail/${product?.slug}`}
//                                     className="w-full flex justify-between items-center text-sm bg-red rounded-[10px] text-cream px-4 py-2"
//                                 >
//                                     Select Option <GoArrowRight />
//                                 </Link>
//                             )}

//                             <Link
//                                 href={`/product-details/${product?.slug}`}
//                                 className="w-full flex justify-between items-center text-sm bg-dark2 rounded-[10px] text-cream px-4 py-2"
//                             >
//                                 Details <GoArrowRight />
//                             </Link>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Product Info */}
//             <div className="px-2 mt-2">
//                 <h4 className="text-cream text-sm font-semibold mb-2 truncate">
//                     <Link href={`/product-details/${product?.slug}`}>
//                         {product?.name}
//                     </Link>
//                 </h4>

//                 <div>
//                     <p className="text-cream text-sm">
//                         {product?.offer_price ?? product?.price}
//                     </p>
//                     {product?.offer_price && (
//                         <p className="text-red line-through text-xs">
//                             {product?.price}
//                         </p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCardTwo;


// import React, { useState } from "react";
// import { GoArrowRight } from "react-icons/go";
// import { toast } from "react-toastify";
// import { Link } from "@inertiajs/react"; // usePage, router লাগবে না এখানে
// import { useCartStore } from '@/stores/cartStore'; // তোমার path ঠিক করো (যেমন '../stores/cartStore' বা '@/stores/cartStore')

// const ProductCardTwo = ({ product }) => {
//     const [isHovered, setIsHovered] = useState(false);

//     // Zustand থেকে addItem নিচ্ছি
//     const addItem = useCartStore((state) => state.addItem);

//     const isOutOfStock = !product.qty || product.qty <= 0;
//     const hasOptions = product?.colors?.length > 0 || product?.sizes?.length > 0;

//     // Simple product add করার function (Zustand দিয়ে)
//     const handleAddToCart = () => {
//         if (isOutOfStock) {
//             toast.error("এই প্রোডাক্ট স্টকে নেই!");
//             return;
//         }

//         // Client-side store-এ add করছি → navbar count instantly বাড়বে
//         addItem(
//             {
//                 id: product.id,
//                 name: product.name,
//                 price: product.offer_price || product.price,
//                 thumb_image: product.thumb_image, // image save হবে
//                 // title যদি name না থাকে তাহলে product.title use করতে পারো
//             },
//             1, // quantity
//             {}  // options empty (simple product)
//         );

//         toast.success("কার্টে যোগ হয়েছে! 🛒");
//     };

//     return (
//         <div className="w-full mx-auto transition-all duration-500 overflow-hidden hover:-translate-y-1 relative">
//             {/* Out of Stock Badge */}
//             {isOutOfStock && (
//                 <div className="absolute top-3 left-3 z-10 bg-red text-cream text-xs font-mont font-semibold px-3 py-1 rounded-full shadow-lg">
//                     Out of Stock
//                 </div>
//             )}

//             {/* Product Image Container */}
//             <div
//                 className={`relative overflow-hidden rounded-xl ${isOutOfStock ? "opacity-70" : ""}`}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//             >
//                 <img
//                     src={`/${product.thumb_image}`}
//                     alt={product.name || product.title}
//                     loading="lazy"
//                     className="w-full object-cover transition-transform duration-500 hover:scale-105 h-full rounded-xl"
//                 />

//                 {/* Hover Overlay */}
//                 {isHovered && (
//                     <div className="absolute inset-0 bg-dark2/70 flex items-center justify-center">
//                         <div className="flex flex-col space-y-3">
//                             {isOutOfStock ? (
//                                 <button
//                                     disabled
//                                     className="w-full flex font-mont justify-between items-center text-[12px] md:text-[18px] border border-red bg-red/80 text-cream rounded-[10px] mb-4 px-4 py-2 md:px-[30px] md:py-[15px] cursor-not-allowed opacity-80"
//                                 >
//                                     Out of Stock
//                                     <span><GoArrowRight /></span>
//                                 </button>
//                             ) : !hasOptions ? (
//                                 // Simple product → Zustand দিয়ে add
//                                 <button
//                                     onClick={handleAddToCart}
//                                     className="w-full flex justify-between items-center text-[10px] md:text-[14px] border border-transparent hover:border-cream rounded-[10px] text-cream mb-4 px-4 py-2 md:px-5 md:py-2.5 cursor-pointer"
//                                 >
//                                     Add to cart
//                                     <span><GoArrowRight /></span>
//                                 </button>
//                             ) : (
//                                 // Variant product → details page-এ যাও
//                                 <Link
//                                     href={`/product-detail/${product?.slug}`}
//                                     className="w-full flex justify-between font-mont items-center text-[12px] md:text-[14px] bg-red border border-transparent hover:border-cream rounded-[10px] text-cream mb-4 px-4 py-2 md:px-2.5 md:py-[7px]"
//                                 >
//                                     Select Option
//                                     <span><GoArrowRight /></span>
//                                 </Link>
//                             )}

//                             {/* Details button */}
//                             <Link
//                                 href={`/product-details/${product?.slug}`}
//                                 className="w-full flex justify-between font-mont items-center text-[12px] md:text-[14px] bg-dark2 border border-transparent hover:border-cream rounded-[10px] text-cream mb-4 px-4 py-2 md:px-5 md:py-2.5"
//                             >
//                                 Details
//                                 <span><GoArrowRight /></span>
//                             </Link>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* Product Info */}
//             <div className="px-2 mt-2">
//                 <h4 className="text-cream text-[12px] xl:text-[14px] font-normal md:font-semibold font-mont mb-2.5">
//                     <Link href={`/product-details/${product?.slug}`} className="font-mont truncate">
//                         {product?.name}
//                     </Link>
//                 </h4>

//                 <div className="">
//                     <p className="text-[12px] xl:text-[17px] text-cream font-mont">
//                         {product?.offer_price ? product?.offer_price : product?.price}
//                     </p>
//                     {product?.offer_price && (
//                         <p className="text-red line-through decoration-cream text-[12px] xl:text-[14px] font-mont font-medium">
//                             {product?.price}
//                         </p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCardTwo;