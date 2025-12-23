// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// // import ScrollToTopButton from "../UI/ScrollToTopButton";

// const Layout = ({ children, categories }) => {
//     return (
//         <>
//             <Navbar categories={categories} />
//             <main className="relative">
//                 {children}
//             </main>
//             <Footer />
//             {/* <ScrollToTopButton /> */}
//         </>
//     );
// };

// export default Layout;

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = ({ children, categories }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
