import React from "react";
import { useDispatch} from "react-redux";
import * as actions from "../../redux/actions";
import './Order.css'

export default function Order() {
  const dispatch = useDispatch();
  function handleOrder(e) {
    dispatch(actions.orderBy(e.target.value));
  }
  return (
    <div className="order">
      <span className="titleOrder">Order by: </span>
      <select className="selectOrder" onChange={(e) => handleOrder(e)}>
        <option defaultValue>Select...</option>
        <option value="asc">Name ↑</option>
        <option value="des">Name ↓</option>
        <option value="hasc">Health Score ↑</option>
        <option value="hdes">Health Score ↓</option>
      </select>
    </div>
  );
}
