import Axios from "axios"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

//ACTION NAMES
const GET_PRODUCTS = "cart/GET_PRODUCTS"
const SHOW_ITEMS = "cart/SHOW_ITEMS"

//REDUCER
const initialState = {
  products: [],
  items: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload }
    case SHOW_ITEMS:
      return { ...state, items: action.payload }
    default:
      return state
  }
}

//CUSTOM HOOKS
export function useCart() {
  const dispatch = useDispatch()
  const products = useSelector((appState) => appState.cartState.products)
  const items = useSelector((appState) => appState.cartState.items)
  const cart = useSelector((appState) => appState.cartState.items)
  const addItem = (item) => dispatch(addToCart(item))
  const removeItem = (id) => dispatch(removeFromCart(id))

  useEffect(() => {
    dispatch(showCartItems())
    dispatch(getProducts())
  }, [dispatch])
  return { products, items, cart, addItem, removeItem }
}

//ACTIONS
function getProducts() {
  return (dispatch) => {
    Axios.get("./products").then((resp) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: resp.data
      })
    })
  }
}
function addToCart(item) {
  return (dispatch) => {
    Axios.post(`/cart`, { item, quantity: 1 }).then((resp) => {
      dispatch(showCartItems(resp.data))
    })
  }
}
function removeFromCart(id) {
  return (dispatch) => {
    Axios.delete(`/cart/${id}`).then((resp) => {
      dispatch(showCartItems(resp.data))
    })
  }
}
function showCartItems() {
  return (dispatch) => {
    Axios.get(`/cart`).then((resp) => {
      dispatch({
        type: SHOW_ITEMS,
        payload: resp.data
      })
    })
  }
}
