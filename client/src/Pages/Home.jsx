import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { StickyNavbar } from "../Components/Navbar";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <StickyNavbar />

      <main className="flex-grow">
        <section
          className="relative bg-cover bg-center bg-no-repeat py-60"
          style={{ backgroundImage: "url('/landing.avif')" }}
        >
           <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container mx-auto px-4 flex flex-col items-center relative z-10 text-center">
            <div className="md:w-3/4 lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-blue-900 ">
                City Central Pharmacy Management System
              </h1>
             
              <Link
                to="/products"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default Home;
