import React from "react"
import "normalize.css/normalize.css"
import "../styles/App.css"
import { Provider } from "react-redux"
import store from "../redux/store"
import Main from "./Main"
import Sizing from "./Sizing"

export default (props) => {
  return (
    <Provider store={store}>
      <div className="mainPage">
        <Sizing />
        <Main />
      </div>
    </Provider>
  )
}
