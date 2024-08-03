export interface IProduct {
  image: {
    desktop: string;
    mobile: string;
    tablet: string;
    thumbnail: string;
  };
  category: string;
  name: string;
  price: number;
}
