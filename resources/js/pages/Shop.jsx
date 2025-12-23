// import React, { useState } from "react";
// import { Link, usePage, router } from "@inertiajs/react";
// import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
// import { IoMdClose } from "react-icons/io";
// import { RiSoundModuleLine } from "react-icons/ri";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import CustomOrderBanner from "../components/CustomOrderBanner";
// import ProductCardTwo from "../components/ProductCardTwo";

// const Shop = () => {
//     const { products, categories, brands, colors, sizes, filters } = usePage().props;
//     console.log(products,categories,brands,colors,sizes,filters);
//     // States
//     const [filterOpen, setFilterOpen] = useState(false);
//     const [selectedCategories, setSelectedCategories] = useState(filters.category_ids || []);
//     const [selectedBrands, setSelectedBrands] = useState(filters.brand_ids || []);
//     const [selectedColors, setSelectedColors] = useState(filters.color_ids || []);
//     const [selectedSizes, setSelectedSizes] = useState(filters.size_ids || []);
//     const [rangeValues, setRangeValues] = useState([filters.min_price || 0, filters.max_price || 5000]);
//     const [sortBy, setSortBy] = useState(filters.sort_by || "");
//     const [activePage, setActivePage] = useState(products.current_page);

//     const applyFilters = () => {
//         router.get("/shop", {
//             category_ids: selectedCategories,
//             brand_ids: selectedBrands,
//             color_ids: selectedColors,
//             size_ids: selectedSizes,
//             min_price: rangeValues[0],
//             max_price: rangeValues[1],
//             sort_by: sortBy,
//             page: activePage,
//         }, { preserveState: true });
//     };

//     const toggleSelection = (id, selected, setSelected) => {
//         if (selected.includes(id)) setSelected(selected.filter(x => x !== id));
//         else setSelected([...selected, id]);
//     };

//     const handleRangeChange = (values) => {
//         setRangeValues(values);
//     };

//     const handlePageChange = (page) => {
//         setActivePage(page);
//         applyFilters();
//     };

//     const totalProducts = products.total || 0;

//     // Pagination logic
//     const getPageNumbers = () => {
//         const totalPages = products.last_page || 1;
//         const pages = [];
//         if (totalPages <= 5) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//         } else {
//             pages.push(1);
//             if (activePage > 3) pages.push("...");
//             const start = Math.max(2, activePage - 1);
//             const end = Math.min(totalPages - 1, activePage + 1);
//             for (let i = start; i <= end; i++) pages.push(i);
//             if (activePage < totalPages - 2) pages.push("...");
//             pages.push(totalPages);
//         }
//         return pages;
//     };

//     return (
//         <div className="xl:px-20 bg-dark1 pb-[140px]">
//             {/* Breadcrumb */}
//             <div className="px-4 py-4 lg:py-[47px]">
//                 <ul className="flex justify-end gap-4">
//                     <li>
//                         <Link to="/" className="text-cream text-[18px] font-mont">Home</Link>
//                     </li>
//                     <li className="text-cream text-[18px]">/</li>
//                     <li className="text-cream text-[18px] font-mont">Shop</li>
//                 </ul>
//             </div>

//             <div className="flex gap-4 relative">
//                 {/* Overlay */}
//                 {filterOpen && <div className="fixed inset-0 bg-dark1 bg-opacity-60 z-40 xl:hidden" onClick={() => setFilterOpen(false)} />}

//                 {/* Sidebar */}
//                 <div className={`fixed top-0 left-0 h-full w-full max-w-[350px] bg-dark1 z-50 transition-transform duration-300 ease-in-out xl:static xl:z-0 xl:translate-x-0 ${filterOpen ? "translate-x-0" : "-translate-x-full"}`}>
//                     <div className="p-4 h-full overflow-y-auto">
//                         <div className="flex justify-between items-center mb-6">
//                             <h3 className="font-bold text-xl text-cream font-mont">Filters</h3>
//                             <button onClick={() => setFilterOpen(false)} className="xl:hidden">
//                                 <IoMdClose className="text-cream text-2xl" />
//                             </button>
//                         </div>

//                         {/* Categories */}
//                         <div className="mb-8">
//                             <h4 className="font-semibold text-cream mb-3 font-mont">Categories</h4>
//                             <button onClick={() => setSelectedCategories([])} className={`flex items-center gap-3 w-full text-left font-mont ${selectedCategories.length === 0 ? "text-cream font-bold" : "text-gray"}`}>
//                                 <input type="checkbox" checked={selectedCategories.length === 0} readOnly className="accent-cream font-mont" />
//                                 All Categories ({totalProducts})
//                             </button>
//                             {categories.map((cat) => (
//                                 <button key={cat.id} onClick={() => toggleSelection(cat.id, selectedCategories, setSelectedCategories)} className={`flex items-center gap-3 w-full text-left mt-2 font-mont ${selectedCategories.includes(cat.id) ? "text-cream font-medium" : "text-gray"}`}>
//                                     <input type="checkbox" checked={selectedCategories.includes(cat.id)} readOnly className="accent-cream font-mont" />
//                                     {cat.name}
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Brands */}
//                         <div className="mb-8">
//                             <h4 className="font-semibold text-cream mb-3 font-mont">Brands</h4>
//                             {brands.map((brand) => (
//                                 <button key={brand.id} onClick={() => toggleSelection(brand.id, selectedBrands, setSelectedBrands)} className={`flex items-center gap-3 w-full text-left mt-2 ${selectedBrands.includes(brand.id) ? "text-cream font-medium" : "text-gray"}`}>
//                                     <input type="checkbox" checked={selectedBrands.includes(brand.id)} readOnly className="accent-cream" />
//                                     {brand.name}
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Colors */}
//                         <div className="mb-8">
//                             <h4 className="font-semibold text-cream mb-4">Colors</h4>
//                             <div className="flex flex-wrap gap-4">
//                                 {colors.map((color) => (
//                                     <button key={color.id} onClick={() => toggleSelection(color.id, selectedColors, setSelectedColors)} className={`w-10 h-10 rounded-full border-4 transition-all duration-200 shadow-lg hover:scale-110 ${selectedColors.includes(color.id) ? "border-cream scale-110 ring-4 ring-cream/30" : "border-gray-600"}`} style={{ backgroundColor: color.color_code }} title={color.color_name}>
//                                         {selectedColors.includes(color.id) && <svg className="w-5 h-5 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Sizes */}
//                         <div className="mb-8">
//                             <h4 className="font-semibold text-cream mb-4">Sizes</h4>
//                             <div className="flex flex-wrap gap-3">
//                                 {sizes.map((size) => (
//                                     <button key={size.id} onClick={() => toggleSelection(size.id, selectedSizes, setSelectedSizes)} className={`px-5 py-2 rounded-md font-semibold text-sm transition-all shadow-md ${selectedSizes.includes(size.id) ? "bg-cream text-black" : "bg-dark3 text-cream border border-gray-600 hover:border-cream"}`}>
//                                         {size.size_name.toUpperCase()}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Price Range */}
//                         <div className="mb-8 pr-5">
//                             <h4 className="font-semibold text-cream mb-3">Price Range</h4>
//                             <div className="flex justify-between text-gray mb-2">
//                                 <span>${rangeValues[0]}</span>
//                                 <span>${rangeValues[1]}</span>
//                             </div>
//                             <Slider range min={0} max={5000} value={rangeValues} onChange={handleRangeChange} />
//                         </div>

//                         <button onClick={applyFilters} className="w-full bg-cream text-black py-2 rounded font-bold mt-2">Apply Filters</button>
//                     </div>
//                 </div>

//                 {/* Main Content */}
//                 <div className="w-full xl:w-4/5 px-4">
//                     <button onClick={() => setFilterOpen(true)} className="xl:hidden fixed bottom-4 left-4 bg-dark2 text-cream px-5 py-3 rounded-full shadow-2xl z-30 flex items-center gap-2">
//                         <RiSoundModuleLine /> Filter
//                     </button>

//                     {/* Products Grid */}
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
//                         {products.data.length === 0 ? (
//                             <p className="col-span-full text-center text-cream text-2xl py-10">No products found</p>
//                         ) : (
//                             products.data.map((product) => <ProductCardTwo key={product.id} product={product} />)
//                         )}
//                     </div>

//                     {/* Pagination */}
//                     {products.last_page > 1 && (
//                         <div className="flex justify-center mt-10 gap-2">
//                             <button disabled={activePage === 1} onClick={() => handlePageChange(activePage - 1)} className="p-2 disabled:opacity-50"><TfiAngleLeft /></button>
//                             {getPageNumbers().map((p, i) => typeof p === "number" ? (
//                                 <button key={i} onClick={() => handlePageChange(p)} className={`w-10 h-10 rounded ${activePage === p ? "bg-cream text-black" : "bg-dark2 text-cream"}`}>{p}</button>
//                             ) : <span key={i}>...</span>)}
//                             <button disabled={activePage === products.last_page} onClick={() => handlePageChange(activePage + 1)} className="p-2 disabled:opacity-50"><TfiAngleRight /></button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <CustomOrderBanner />
//         </div>
//     );
// };

// export default Shop;



// import React, { useState, useEffect, useCallback } from "react";
// import { Link, usePage, router } from "@inertiajs/react";
// import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
// import { IoMdClose } from "react-icons/io";
// import { RiSoundModuleLine } from "react-icons/ri";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import CustomOrderBanner from "../components/CustomOrderBanner";
// import ProductCardTwo from "../components/ProductCardTwo";

// const Shop = () => {
//     const { products, categories, brands, colors, sizes, filters } = usePage().props;

//     const [filterOpen, setFilterOpen] = useState(false);
//     const [selectedCategories, setSelectedCategories] = useState(filters.category_ids || []);
//     const [selectedBrands, setSelectedBrands] = useState(filters.brand_ids || []);
//     const [selectedColors, setSelectedColors] = useState(filters.color_ids || []);
//     const [selectedSizes, setSelectedSizes] = useState(filters.size_ids || []);
//     const [rangeValues, setRangeValues] = useState([filters.min_price || 0, filters.max_price || 5000]);
//     const [sortBy, setSortBy] = useState(filters.sort_by || "");
//     const [activePage, setActivePage] = useState(products.current_page);

//     // Debounce function
//     const debounce = (func, wait = 300) => {
//         let timeout;
//         return (...args) => {
//             clearTimeout(timeout);
//             timeout = setTimeout(() => func(...args), wait);
//         };
//     };

//     // Apply filters without reload
//     const applyFilters = useCallback(() => {
//         router.get("/all-products", {
//             category_ids: selectedCategories,
//             brand_ids: selectedBrands,
//             color_ids: selectedColors,
//             size_ids: selectedSizes,
//             min_price: rangeValues[0],
//             max_price: rangeValues[1],
//             sort_by: sortBy,
//             page: activePage,
//         }, { preserveState: true, replace: true });
//     }, [selectedCategories, selectedBrands, selectedColors, selectedSizes, rangeValues, sortBy, activePage]);

//     const debouncedApplyFilters = useCallback(debounce(applyFilters, 300), [applyFilters]);

//     const toggleSelection = (id, selected, setSelected) => {
//         if (selected.includes(id)) setSelected(selected.filter(x => x !== id));
//         else setSelected([...selected, id]);
//     };

//     const handleRangeChange = (values) => {
//         setRangeValues(values);
//         setActivePage(1);
//         debouncedApplyFilters();
//     };

//     const handleSortChange = (value) => {
//         setSortBy(value);
//         setActivePage(1);
//         debouncedApplyFilters();
//     };

//     const handlePageChange = (page) => {
//         setActivePage(page);
//         debouncedApplyFilters();
//     };

//     // Whenever category, brand, color, size changes
//     useEffect(() => {
//         setActivePage(1);
//         debouncedApplyFilters();
//     }, [selectedCategories, selectedBrands, selectedColors, selectedSizes]);

//     const totalProducts = products.total || 0;

//     const getPageNumbers = () => {
//         const totalPages = products.last_page || 1;
//         const pages = [];
//         if (totalPages <= 5) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//         } else {
//             pages.push(1);
//             if (activePage > 3) pages.push("...");
//             const start = Math.max(2, activePage - 1);
//             const end = Math.min(totalPages - 1, activePage + 1);
//             for (let i = start; i <= end; i++) pages.push(i);
//             if (activePage < totalPages - 2) pages.push("...");
//             pages.push(totalPages);
//         }
//         return pages;
//     };

//     return (
//         <div className="xl:px-20 bg-dark1 pb-[140px]">
//             {/* Breadcrumb */}
//             <div className="px-4 py-4 lg:py-[47px]">
//                 <ul className="flex justify-end gap-4">
//                     <li>
//                         <Link to="/" className="text-cream text-[18px] font-mont">Home</Link>
//                     </li>
//                     <li className="text-cream text-[18px]">/</li>
//                     <li className="text-cream text-[18px] font-mont">Shop</li>
//                 </ul>
//             </div>

//             <div className="flex gap-4 relative">
//                 {/* Overlay */}
//                 {filterOpen && <div className="fixed inset-0 bg-dark1 bg-opacity-60 z-40 xl:hidden" onClick={() => setFilterOpen(false)} />}

//                 {/* Sidebar */}
//                 <div className={`fixed top-0 left-0 h-full w-full max-w-[350px] bg-dark1 z-50 transition-transform duration-300 ease-in-out xl:static xl:z-0 xl:translate-x-0 ${filterOpen ? "translate-x-0" : "-translate-x-full"}`}>
//                     <div className="p-4 h-full overflow-y-auto">
//                         <div className="flex justify-between items-center mb-6">
//                             <h3 className="font-bold text-xl text-cream font-mont">Filters</h3>
//                             <button onClick={() => setFilterOpen(false)} className="xl:hidden">
//                                 <IoMdClose className="text-cream text-2xl" />
//                             </button>
//                         </div>

//                         {/* Categories */}
//                         <div className="mb-8">
//                             <h4 className="font-semibold text-cream mb-3 font-mont">Categories</h4>
//                             <button onClick={() => setSelectedCategories([])} className={`flex items-center gap-3 w-full text-left font-mont ${selectedCategories.length === 0 ? "text-cream font-bold" : "text-gray"}`}>
//                                 <input type="checkbox" checked={selectedCategories.length === 0} readOnly className="accent-cream font-mont" />
//                                 All Categories ({totalProducts})
//                             </button>
//                             {categories.map((cat) => (
//                                 <button key={cat.id} onClick={() => toggleSelection(cat.id, selectedCategories, setSelectedCategories)} className={`flex items-center gap-3 w-full text-left mt-2 font-mont ${selectedCategories.includes(cat.id) ? "text-cream font-medium" : "text-gray"}`}>
//                                     <input type="checkbox" checked={selectedCategories.includes(cat.id)} readOnly className="accent-cream font-mont" />
//                                     {cat.name}
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Brands */}
//                         <div className="mb-8">
//                             <h4 className="font-semibold text-cream mb-3 font-mont">Brands</h4>
//                             {brands.map((brand) => (
//                                 <button key={brand.id} onClick={() => toggleSelection(brand.id, selectedBrands, setSelectedBrands)} className={`flex items-center gap-3 w-full text-left mt-2 ${selectedBrands.includes(brand.id) ? "text-cream font-medium" : "text-gray"}`}>
//                                     <input type="checkbox" checked={selectedBrands.includes(brand.id)} readOnly className="accent-cream" />
//                                     {brand.name}
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Colors */}
//                         <div className="mb-8">
//                             <h4 className="font-semibold text-cream mb-4">Colors</h4>
//                             <div className="flex flex-wrap gap-4">
//                                 {colors.map((color) => (
//                                     <button key={color.id} onClick={() => toggleSelection(color.id, selectedColors, setSelectedColors)} className={`w-10 h-10 rounded-full border-4 transition-all duration-200 shadow-lg hover:scale-110 ${selectedColors.includes(color.id) ? "border-cream scale-110 ring-4 ring-cream/30" : "border-gray-600"}`} style={{ backgroundColor: color.color_code }} title={color.color_name}>
//                                         {selectedColors.includes(color.id) && <svg className="w-5 h-5 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Sizes */}
//                         <div className="mb-8">
//                             <h4 className="font-semibold text-cream mb-4">Sizes</h4>
//                             <div className="flex flex-wrap gap-3">
//                                 {sizes.map((size) => (
//                                     <button key={size.id} onClick={() => toggleSelection(size.id, selectedSizes, setSelectedSizes)} className={`px-5 py-2 rounded-md font-semibold text-sm transition-all shadow-md ${selectedSizes.includes(size.id) ? "bg-cream text-black" : "bg-dark3 text-cream border border-gray-600 hover:border-cream"}`}>
//                                         {size.size_name.toUpperCase()}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Price Range */}
//                         <div className="mb-8 pr-5">
//                             <h4 className="font-semibold text-cream mb-3">Price Range</h4>
//                             <div className="flex justify-between text-gray mb-2">
//                                 <span>${rangeValues[0]}</span>
//                                 <span>${rangeValues[1]}</span>
//                             </div>
//                             <Slider range min={0} max={5000} value={rangeValues} onChange={handleRangeChange} />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main Content */}
//                 <div className="w-full xl:w-4/5 px-4">
//                     <button onClick={() => setFilterOpen(true)} className="xl:hidden fixed bottom-4 left-4 bg-dark2 text-cream px-5 py-3 rounded-full shadow-2xl z-30 flex items-center gap-2">
//                         <RiSoundModuleLine /> Filter
//                     </button>

//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
//                         {products.data.length === 0 ? (
//                             <p className="col-span-full text-center text-cream text-2xl py-10">No products found</p>
//                         ) : (
//                             products.data.map((product) => <ProductCardTwo key={product.id} product={product} />)
//                         )}
//                     </div>

//                     {products.last_page > 1 && (
//                         <div className="flex justify-center mt-10 gap-2">
//                             <button disabled={activePage === 1} onClick={() => handlePageChange(activePage - 1)} className="p-2 disabled:opacity-50"><TfiAngleLeft /></button>
//                             {getPageNumbers().map((p, i) => typeof p === "number" ? (
//                                 <button key={i} onClick={() => handlePageChange(p)} className={`w-10 h-10 rounded ${activePage === p ? "bg-cream text-black" : "bg-dark2 text-cream"}`}>{p}</button>
//                             ) : <span key={i}>...</span>)}
//                             <button disabled={activePage === products.last_page} onClick={() => handlePageChange(activePage + 1)} className="p-2 disabled:opacity-50"><TfiAngleRight /></button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <CustomOrderBanner />
//         </div>
//     );
// };

// export default Shop;


import React, { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { RiSoundModuleLine } from "react-icons/ri";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import CustomOrderBanner from "../components/CustomOrderBanner";
import ProductCardTwo from "../components/ProductCardTwo";
import { route } from "ziggy-js";

const Shop = () => {
    const { products, categories, brands, colors, sizes, filters } = usePage().props;
    console.log(products);
    // States
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(filters.category_ids || []);
    const [selectedBrands, setSelectedBrands] = useState(filters.brand_ids || []);
    const [selectedColors, setSelectedColors] = useState(filters.color_ids || []);
    const [selectedSizes, setSelectedSizes] = useState(filters.size_ids || []);
    const [rangeValues, setRangeValues] = useState([filters.min_price ?? 0, filters.max_price ?? 5000]);
    const [sortBy, setSortBy] = useState(filters.sort_by || "");
    const [activePage, setActivePage] = useState(1);

    const totalProducts = products.total || 0;

    // Apply filters function
    const applyFilters = () => {
        const params = {};

        if (selectedCategories.length) params.category_ids = selectedCategories;
        if (selectedBrands.length) params.brand_ids = selectedBrands;
        if (selectedColors.length) params.color_ids = selectedColors;
        if (selectedSizes.length) params.size_ids = selectedSizes;
        if (rangeValues[0] !== 0) params.min_price = rangeValues[0];
        if (rangeValues[1] !== 5000) params.max_price = rangeValues[1];
        if (sortBy) params.sort_by = sortBy;
        if (activePage !== 1) params.page = activePage;

        router.get(route("all.products"), params, { preserveState: true, replace: true });
    };

    const toggleSelection = (id, selected, setSelected) => {
        if (selected.includes(id)) setSelected(selected.filter(x => x !== id));
        else setSelected([...selected, id]);
    };

    const handleRangeChange = (values) => {
        setRangeValues(values);
    };

    const handlePageChange = (page) => {
        setActivePage(page);
        applyFilters();
    };

    // Pagination logic
    const getPageNumbers = () => {
        const totalPages = products.last_page || 1;
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (activePage > 3) pages.push("...");
            const start = Math.max(2, activePage - 1);
            const end = Math.min(totalPages - 1, activePage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (activePage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    // Auto apply filters whenever user selects anything
    useEffect(() => {
        applyFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategories, selectedBrands, selectedColors, selectedSizes, rangeValues, sortBy]);

    return (
        <div className="xl:px-20 bg-dark1 pb-[140px]">
            {/* Breadcrumb */}
            <div className="px-4 py-4 lg:py-[47px]">
                <ul className="flex justify-end gap-4">
                    <li>
                        <Link to="/" className="text-cream text-[18px] font-mont">Home</Link>
                    </li>
                    <li className="text-cream text-[18px]">/</li>
                    <li className="text-cream text-[18px] font-mont">Shop</li>
                </ul>
            </div>

            <div className="flex gap-4 relative">
                {/* Overlay */}
                {filterOpen && <div className="fixed inset-0 bg-dark1 bg-opacity-60 z-40 xl:hidden" onClick={() => setFilterOpen(false)} />}

                {/* Sidebar */}
                <div className={`fixed top-0 left-0 h-full w-full max-w-[350px] bg-dark1 z-50 transition-transform duration-300 ease-in-out xl:static xl:z-0 xl:translate-x-0 ${filterOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="p-4 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-xl text-cream font-mont">Filters</h3>
                            <button onClick={() => setFilterOpen(false)} className="xl:hidden">
                                <IoMdClose className="text-cream text-2xl" />
                            </button>
                        </div>

                        {/* Categories */}
                        <div className="mb-8">
                            <h4 className="font-semibold text-cream mb-3 font-mont">Categories</h4>
                            <button onClick={() => setSelectedCategories([])} className={`flex items-center gap-3 w-full text-left font-mont ${selectedCategories.length === 0 ? "text-cream font-bold" : "text-gray"}`}>
                                <input type="checkbox" checked={selectedCategories.length === 0} readOnly className="accent-cream font-mont" />
                                All Categories ({totalProducts})
                            </button>
                            {categories.map((cat) => (
                                <button key={cat.id} onClick={() => toggleSelection(cat.id, selectedCategories, setSelectedCategories)} className={`flex items-center gap-3 w-full text-left mt-2 font-mont ${selectedCategories.includes(cat.id) ? "text-cream font-medium" : "text-gray"}`}>
                                    <input type="checkbox" checked={selectedCategories.includes(cat.id)} readOnly className="accent-cream font-mont" />
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Brands */}
                        <div className="mb-8">
                            <h4 className="font-semibold text-cream mb-3 font-mont">Brands</h4>
                            {brands.map((brand) => (
                                <button key={brand.id} onClick={() => toggleSelection(brand.id, selectedBrands, setSelectedBrands)} className={`flex items-center gap-3 w-full text-left mt-2 ${selectedBrands.includes(brand.id) ? "text-cream font-medium" : "text-gray"}`}>
                                    <input type="checkbox" checked={selectedBrands.includes(brand.id)} readOnly className="accent-cream" />
                                    {brand.name}
                                </button>
                            ))}
                        </div>

                        {/* Colors */}
                        <div className="mb-8">
                            <h4 className="font-semibold text-cream mb-4">Colors</h4>
                            <div className="flex flex-wrap gap-4">
                                {colors.map((color) => (
                                    <button key={color.id} onClick={() => toggleSelection(color.id, selectedColors, setSelectedColors)} className={`w-10 h-10 rounded-full border-4 transition-all duration-200 shadow-lg hover:scale-110 ${selectedColors.includes(color.id) ? "border-cream scale-110 ring-4 ring-cream/30" : "border-gray-600"}`} style={{ backgroundColor: color.color_code }} title={color.color_name}>
                                        {selectedColors.includes(color.id) && <svg className="w-5 h-5 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="mb-8">
                            <h4 className="font-semibold text-cream mb-4">Sizes</h4>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map((size) => (
                                    <button key={size.id} onClick={() => toggleSelection(size.id, selectedSizes, setSelectedSizes)} className={`px-5 py-2 rounded-md font-semibold text-sm transition-all shadow-md ${selectedSizes.includes(size.id) ? "bg-cream text-black" : "bg-dark3 text-cream border border-gray-600 hover:border-cream"}`}>
                                        {size.size_name.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="mb-8 pr-5">
                            <h4 className="font-semibold text-cream mb-3">Price Range</h4>
                            <div className="flex justify-between text-gray mb-2">
                                <span>${rangeValues[0]}</span>
                                <span>${rangeValues[1]}</span>
                            </div>
                            <Slider range min={0} max={5000} value={rangeValues} onChange={handleRangeChange} />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full xl:w-4/5 px-4">
                    <button onClick={() => setFilterOpen(true)} className="xl:hidden fixed bottom-4 left-4 bg-dark2 text-cream px-5 py-3 rounded-full shadow-2xl z-30 flex items-center gap-2">
                        <RiSoundModuleLine /> Filter
                    </button>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
                        {products.data.length === 0 ? (
                            <p className="col-span-full text-center text-cream text-2xl py-10">No products found</p>
                        ) : (
                            products.data.map((product) => <ProductCardTwo key={product.id} product={product} />)
                        )}
                    </div>

                    {/* Pagination */}
                    {products.last_page > 1 && (
                        <div className="flex justify-center mt-10 gap-2">
                            <button disabled={activePage === 1} onClick={() => handlePageChange(activePage - 1)} className="p-2 disabled:opacity-50"><TfiAngleLeft /></button>
                            {getPageNumbers().map((p, i) => typeof p === "number" ? (
                                <button key={i} onClick={() => handlePageChange(p)} className={`w-10 h-10 rounded ${activePage === p ? "bg-cream text-black" : "bg-dark2 text-cream"}`}>{p}</button>
                            ) : <span key={i}>...</span>)}
                            <button disabled={activePage === products.last_page} onClick={() => handlePageChange(activePage + 1)} className="p-2 disabled:opacity-50"><TfiAngleRight /></button>
                        </div>
                    )}
                </div>
            </div>
            <CustomOrderBanner />
        </div>
    );
};

export default Shop;

