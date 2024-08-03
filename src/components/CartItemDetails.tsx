import { CartItem, useCart } from "@/contexts/CartContext";
import RemoveItemSVG from "./RemoveItemSVG";
import axios from "axios";
import { Separator } from "./ui/separator";

interface CartItemDetailsProps {
  item: CartItem;
}
function CartItemDetails(props: CartItemDetailsProps) {
  const { item } = props;
  const { setCartItems } = useCart();
  async function removeItemFromCart(itemId: string) {
    try {
      await axios.delete(`http://localhost:8001/cart/${itemId}`);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className=" flex items-center justify-between ">
        <div>
          <h3 className=" font-customBold text-customTextMain mb-2">
            {item.name}
          </h3>
          <div className=" flex gap-4">
            <span className=" font-customBold text-customAccent">
              {item.quantity}x
            </span>
            <p className=" flex gap-2 items-center">
              <span className=" text-customCategory">
                @ ${item.price.toFixed(2)}
              </span>
              <span className=" font-customBold text-customCategory">
                ${item.totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              removeItemFromCart(item.id);
            }}
          >
            <div className="w-4 h-4 flex items-center justify-center border border-customCategory rounded-full transition-colors">
              <RemoveItemSVG />
            </div>
          </button>
        </div>
      </div>
      <Separator className=" my-4 bg-customSeparator" />
    </>
  );
}

export default CartItemDetails;
