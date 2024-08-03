import { IProduct } from "@/types/porduct.types";
import { Button } from "./ui/button";
import ChangeQuantityBtn from "./ChangeQuantityBtn";
import { useEffect, useState } from "react";
import AddToCartSvg from "./AddToCartSvg";
import { useCart } from "@/contexts/CartContext";

interface productItemProps {
  product: IProduct;
}

function ProductItem(props: productItemProps) {
  const [isSelected, setIsSelected] = useState(false);
  const { product } = props;
  const { addNewItemToCart, isItemInCart } = useCart();

  useEffect(() => {
    setIsSelected(isItemInCart(product.name));
  }, [product.name, isItemInCart]);

  return (
    <div className="mb-7">
      <div className="relative mb-8">
        <div
          className={`overflow-hidden ${
            isSelected && "border-2 border-customAccent rounded-md"
          }`}
        >
          <img
            src={product.image.desktop}
            alt={product.name}
            className="rounded-md hidden lg:block w-full"
          />
          <img
            src={product.image.mobile}
            alt={product.name}
            className="rounded-md md:hidden w-full"
          />
          <img
            src={product.image.tablet}
            alt={product.name}
            className="rounded-md hidden md:block lg:hidden w-full"
          />
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          {isSelected ? (
            <ChangeQuantityBtn
              dessert={product}
              setIsSelected={setIsSelected}
            />
          ) : (
            <Button
              className="w-[148px] py-2 px-4 flex items-center gap-2 border border-gray-400 font-custom bg-white text-customTextMain font-bold rounded-full hover:bg-white"
              onClick={() => {
                setIsSelected(true);
                addNewItemToCart(
                  product.name,
                  product.price,
                  product.image.thumbnail
                );
              }}
            >
              <AddToCartSvg /> Add to Cart
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-customCategory">{product.category}</p>
        <p className="text-lg font-customBold">{product.name}</p>
        <p className="text-lg text-customAccent font-customBold">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
