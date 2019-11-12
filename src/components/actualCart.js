import React from "react"
import { useCart } from "../redux/ducks/cart"
import ICON from "../lib/Icon"

export default function Cart() {
  const { products, items, cart, addItem, removeItem } = useCart()

  let prices = cart.map((e) => {
    return e.item.price
  })
  function sum(a, b) {
    return a + b
  }

  function handleDelete(id) {
    removeItem(id)
  }
  let subtotal = prices.reduce(sum, 0).toFixed(2)

  return (
    <div className="cartSide">
      <div className="cartIcon">
        <ICON icon="shopping-cart"></ICON>
        <div className="cartTitle">Cart</div>
      </div>
      {cart.map((item) => {
        return (
          <div className="sectionCart">
            <img
              className="itemPhoto"
              src={`/assets/${item.item.sku}_2.jpg`}
            ></img>
            <div className="shirtName">
              <div
                className="removeButton"
                onClick={(e) => handleDelete(item.id)}
              >
                <button className="eraseCart">X</button>
              </div>
              {item.item.title}
              <div className="shirtDesc">{item.item.style}</div>
              <div className="shirtPrice">${item.item.price.toFixed(2)}</div>
            </div>
          </div>
        )
      })}
      <div className="checkOut">
        <div className="totalDiv">SUBTOTAL</div>
        <div className="subT">${subtotal}</div>
      </div>
      <div className="sbtInstallments">
        OR UP TO 5 x ${(subtotal / 5).toFixed(2)}
      </div>
      <button className="checkOutBut">CHECKOUT</button>
    </div>
  )
}
