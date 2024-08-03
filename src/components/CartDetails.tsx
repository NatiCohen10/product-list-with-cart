import { CartItem, useCart } from "@/contexts/CartContext";
import CartItemDetails from "./CartItemDetails";
import CarbonNeutralSVG from "./CarbonNeutralSVG";
import CartEmptySVG from "./CartEmptySVG";

interface CartDetailsProps {
  cartItems: CartItem[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CartDetails(props: CartDetailsProps) {
  const { cartItems, setIsModalOpen } = props;
  const { calculateTotalPrice } = useCart();
  console.log(cartItems);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-md max-w-full">
      <h2 className="text-customAccent font-customBold text-xl mb-6 sm:mb-8">
        Your Cart ({cartItems.length})
      </h2>
      {cartItems.length === 0 ? (
        <div className="flex items-center flex-col justify-center">
          <CartEmptySVG />
          <p className="font-customBold text-customCategory text-center">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {cartItems.map((item) => (
              <CartItemDetails key={item.id} item={item} />
            ))}
          </div>
          <div className="my-6 sm:my-8 flex items-center justify-between">
            <p>Order Total</p>
            <p className="font-customBold text-xl">
              ${calculateTotalPrice().toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-customBackgroundMain py-4 px-4 sm:py-5 sm:px-6 rounded-md">
            <CarbonNeutralSVG />
            <p className="text-[13px] lg:text-[16px]">
              This is a <span className="font-customBold">carbon-neutral</span>{" "}
              delivery
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="py-3 mt-6 w-full flex items-center justify-center px-4 text-customBackgroundMain font-custom gap-1 bg-customAccent rounded-full"
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartDetails;
