import { useDispatch, useSelector } from "react-redux";
import WrapperForSection from "../Wrapper and Button/WrapperForSection";
import {
  setAddProductsPrice,
  setReduceProductsPrice,
} from "../../state/slices/cartProductsPriceSlice";
import {
  setMinusOneProductsQuantity,
  setPlusOneProductsQuantity,
} from "../../state/slices/cartProductsQuantitySlice";
import { setProduct } from "../../state/slices/cartTotalProductsSlice";

export default function ShopCart() {
  const dispatch = useDispatch();
  const cartTotalProducts = useSelector((state) => state.cartTotalProducts.cartTotalProducts);
  const totalPrice = useSelector((state) => state.cartProductsPrice.cartProductsPrice);
  const totalQuantity = useSelector((state) => state.cartProductsQuantity.cartProductsQuantity);

  function addToCartProduct(product) {
    dispatch(setAddProductsPrice(product.price / product.quantity));
    dispatch(setPlusOneProductsQuantity());
    dispatch(setProduct({ ...product, price: product.price / product.quantity, quantity: 1 }));
  }
  function deleteFormCartProduct(product) {
    dispatch(setReduceProductsPrice(product.price / product.quantity));
    dispatch(setMinusOneProductsQuantity());
    dispatch(setProduct({ ...product, price: -(product.price / product.quantity), quantity: -1 }));
  }
  return (
    <WrapperForSection
      styleSection={{ minHeight: "33vh" }}
      content={
        <div>
          {cartTotalProducts.map((product) => (
            <div key={product.name}>
              <div>Chosen Product {product.name}</div>
              <div>Quntity: {product.quantity}</div>
              <div>$ {product.price}</div>
              <button onClick={() => addToCartProduct(product)}>+</button>
              <button
                onClick={() => deleteFormCartProduct(product)}
                disabled={product.quantity === 1}
              >
                -
              </button>
            </div>
          ))}
          <h3>Total Price: ${totalPrice}</h3>
          <h3>Total Quantity: {totalQuantity}</h3>
        </div>
      }
    />
  );
}
