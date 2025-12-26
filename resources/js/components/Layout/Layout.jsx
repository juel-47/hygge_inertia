// working code : 

// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import { usePage } from "@inertiajs/react";


// const Layout = ({ children, categories }) => {
//     const {logos} = usePage().props;
//     return (
//         <>
//             <Navbar logos={logos}/>
//             <main>{children}</main>
//             <Footer />
//         </>
//     );
// };

// export default Layout;

//check if work cart count or not 
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useCartStore } from "../../stores/cartStore";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
    const { props } = usePage();
    const { cart } = props;

    const { setCart } = useCartStore();
    //this is for cart summery item : 
    // useEffect(() => {
    //     if (cart?.items) {
    //         setCart(cart.items);
    //     }
    // }, [cart]);

    useEffect(() => {
  if (cart) {
    useCartStore.setState({
      cartCount: cart.count,
      total: cart.total,
    });
  }
}, [cart]);
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
