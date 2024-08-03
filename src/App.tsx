import axios from "axios";
import { useEffect, useState } from "react";
import { IProduct } from "./types/porduct.types";
import ProductItem from "./components/ProductItem";
import { useCart } from "./contexts/CartContext";
import CartDetails from "./components/CartDetails";
import ConfirmationModal from "./components/ConfirmationModal";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems } = useCart();
  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get("http://localhost:8001/products");
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] font-custom bg-customBackgroundMain">
      <div className="px-4 sm:px-6 lg:pl-14 lg:pr-8">
        <h1 className="font-customBold text-4xl py-10">Desserts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((product) => (
            <ProductItem key={product.name} product={product} />
          ))}
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:pr-14 lg:pl-8 w-full lg:w-[500px] mt-8 lg:mt-10">
        <CartDetails setIsModalOpen={setIsModalOpen} cartItems={cartItems} />
        {isModalOpen && (
          <ConfirmationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        )}
      </div>
    </div>
  );
}

export default App;
