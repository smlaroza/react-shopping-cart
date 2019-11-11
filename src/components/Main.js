import React, { useState } from "react"
import { useCart } from "../redux/ducks/cart"
import "semantic-ui-css/semantic.min.css"
import { Button, Menu, Sidebar } from "semantic-ui-react"
import Cart from "./actualCart"

export default function(props) {
  const { products, addItem } = useCart()
  const [visible, setVisible] = useState(false)

  function handleAdd(item) {
    addItem(item)
  }

  return (
    <div className="sideContainer">
      <Button
        icon="shop"
        onClick={(e) => (!visible ? setVisible(true) : setVisible(false))}
        className="cart"
        secondary
      />
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible={visible}
          direction="right"
          id="sidebar"
        >
          <Cart />
        </Sidebar>
        <Sidebar.Pusher>
          <div className="cartContainer">
            <div className="lowToHigh">
              <div className="header">{products.length} Product(s) Found</div>
              <div className="orderContain">
                <div className="order">Order by</div>
                <select>
                  <option>Select</option>
                  <option>Lowest to highest</option>
                  <option>Highest to lowest</option>
                </select>
              </div>
            </div>
            <div className="productDisplay">
              {products.map((product, i) => (
                <div className="imgContainer" key={"key" + i}>
                  <div className="freeShip">
                    <p
                      className={
                        product.isFreeShipping === true ? "free" : "notfree"
                      }
                    >
                      Free Shipping
                    </p>
                  </div>
                  <img width="100%" src={`/assets/${product.sku}_1.jpg`} />
                  <div className="prodCaption">
                    <p>{product.title}</p>
                    <p className="dash">—</p>
                    <div className="prodPrice">
                      <p>${product.price.toFixed(2)}</p>
                    </div>
                    <div className="orPrice">or</div>
                    <div className="mult">
                      {product.installments} x $
                      {(product.price / product.installments).toFixed(2)}
                    </div>
                  </div>
                  <div
                    className="addButton"
                    onClick={(e) => handleAdd(product)}
                  >
                    <button className="mainButton">Add to cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}
