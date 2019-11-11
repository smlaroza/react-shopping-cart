import store from "../redux/store"

export function greet(greeting) {
  store.dispatch({
    type: "GREETING",
    payload: greeting
  })
}
