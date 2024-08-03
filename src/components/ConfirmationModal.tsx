import { useCart } from "@/contexts/CartContext";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import OrderConfirmedSVG from "./OrderConfirmedSVG";

interface ConfirmationModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function ConfirmationModal({ isOpen, setIsOpen }: ConfirmationModalProps) {
  const { cartItems, calculateTotalPrice, setCartItems } = useCart();

  const handleStartNewOrder = () => {
    setCartItems([]);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <OrderConfirmedSVG />
          <DialogTitle className=" text-start font-customBold text-2xl">
            Order Confirmed
          </DialogTitle>
          <DialogDescription className=" text-customCategory text-start">
            We hope you enjoy your food
          </DialogDescription>
        </DialogHeader>

        <div className="bg-customBackgroundMain p-6 rounded-md">
          <div className="flex flex-col gap-2">
            {cartItems.map((item) => (
              <div key={item.id}>
                <div className="flex items-center justify-between">
                  <div className=" flex gap-2 items-center ">
                    <div className=" h-12 w-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div>
                      <h3 className=" text-[13px] font-customBold text-customTextMain mb-2">
                        {item.name}
                      </h3>
                      <div className="flex gap-4">
                        <span className="font-customBold text-customAccent">
                          {item.quantity}x
                        </span>
                        <p className="flex gap-2 items-center">
                          <span className="text-customCategory">
                            @ ${item.price.toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="font-customBold text-customTextMain">
                      ${item.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Separator className="my-4 bg-customSeparator" />
              </div>
            ))}
          </div>

          <div className="my-1 flex items-center justify-between">
            <p>Order Total</p>
            <p className="font-customBold text-xl">
              ${calculateTotalPrice().toFixed(2)}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleStartNewOrder}
            className="py-3 w-full flex items-center justify-center px-4 text-customBackgroundMain font-custom gap-1 bg-customAccent rounded-full"
          >
            Start New Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationModal;
