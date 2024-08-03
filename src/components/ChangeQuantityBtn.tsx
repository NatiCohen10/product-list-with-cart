import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/types/porduct.types";
import IncrementQuantitySVG from "./IncrementQuantitySVG";
import DecrementQuantitySVG from "./DecrementQuantitySVG";

interface ChangeQuantityBtnProps {
  dessert: IProduct;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChangeQuantityBtn({ dessert, setIsSelected }: ChangeQuantityBtnProps) {
  const { cartItems, increaseItemQuantity, reduceItemQuantity } = useCart();

  const dessertQuantity =
    cartItems.find((item) => item.name === dessert.name)?.quantity || 0;

  return (
    <div className="w-[148px] py-2 px-4 text-customBackgroundMain flex justify-between items-center font-custom gap-1 bg-customAccent rounded-full">
      <button
        className="w-6 h-6 flex items-center justify-center border border-white rounded-full transition-colors"
        onClick={() => {
          if (dessertQuantity === 1) {
            setIsSelected(false);
          }
          reduceItemQuantity(dessert.name);
        }}
      >
        <DecrementQuantitySVG />
      </button>
      <span>{dessertQuantity}</span>
      <button
        className="w-6 h-6 flex items-center justify-center border border-white rounded-full transition-colors"
        onClick={() => {
          increaseItemQuantity(dessert.name);
        }}
      >
        <IncrementQuantitySVG />
      </button>
    </div>
  );
}

export default ChangeQuantityBtn;
