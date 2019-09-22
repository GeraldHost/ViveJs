import { combineReducers } from "redux";
import { default as cartReducer } from "./cart.js";

const rootReducer = combineReducers({
  cart: cartReducer
});

export default rootReducer;
