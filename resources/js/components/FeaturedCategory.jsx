
import React from "react";
import { router } from "@inertiajs/react"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FeaturedCategory = ({ categories }) => {

    const handleCategoryClick = (categoryId) => {
        // React Router use করবো না, Inertia visit করবে
        router.get('/shop', { category_ids: [categoryId] });
    };

    if (!categories || categories.length === 0) return null;

    return (
        <div className="bg-dark2 pt-8">
            <div className="px-4 sm:px-6 lg:px-10 xl:px-20 max-w-[1200px] mx-auto relative">
                <h2 className="text-3xl md:text-4xl font-bold text-cream text-center mb-4 tracking-wide font-mont">
                    Featured Categories
                </h2>

                <div className="flex absolute inset-y-0 left-0 items-center z-10">
                    <button className="featured-prev-btn w-12 h-12 bg-red/30 rounded-full flex items-center justify-center text-cream">
                        <FaChevronLeft size={24} />
                    </button>
                </div>
                <div className="flex absolute inset-y-0 right-0 items-center z-10">
                    <button className="featured-next-btn w-12 h-12 bg-red/30 rounded-full flex items-center justify-center text-cream">
                        <FaChevronRight size={24} />
                    </button>
                </div>

                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={24}
                    slidesPerView={2}
                    autoplay={{ delay: 4000 }}
                    loop={categories.length > 6}
                    navigation={{
                        nextEl: ".featured-next-btn",
                        prevEl: ".featured-prev-btn",
                    }}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                        1280: { slidesPerView: 6 },
                    }}
                    className="featured-category-swiper pb-10"
                >
                    {categories.map((cat) => (
                        <SwiperSlide key={cat.id}>
                            <div
                                onClick={() => handleCategoryClick(cat.id)}
                                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-3 mt-8"
                            >
                                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                                    <div className="aspect-square w-full">
                                        <img
                                            src={cat.image ?? "/placeholder-category.jpg"}
                                            alt={cat.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-center mt-4 text-cream font-mont font-semibold text-sm md:text-base">
                                    {cat.name}
                                </h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default FeaturedCategory;

