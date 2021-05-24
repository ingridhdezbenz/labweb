import React, { useState, useEffect } from "react";
import axios from "axios";

import Nota from "../components/nota";
import List from "../components/list";
import Header from '../components/header'

import "../css/compra.css";
import "../css/home.css";

const Compra = () => {
  let [keyword, setKeyword] = useState("");
  let [total, setTotal] = useState(0);
  let [items, setItems] = useState([]);

  let [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    calculateTotal();
  }, [selectedItems]);

  const getData = async () => {
    return await axios.get("http://localhost:5000/api/products/");
  };

  useEffect(async () => {
    let { data } = await getData();
    setItems(data);
  }, []);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const calculateTotal = () => {
    let auxTotal = 0;
    selectedItems.forEach((item) => {
      auxTotal += item.unitPrice * item.quantity;
    });
    setTotal(auxTotal);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      let idEntered = e.target.value;
      let newItems = [...selectedItems];

      if (!selectedItems.some((e) => e._id === idEntered)) {
        let { data } = await axios.get(
          `http://localhost:5000/api/products/${idEntered}`
        );
        data = data[0];
        newItems.push({
          _id: data._id,
          name: data.name,
          unitPrice: data.unitPrice,
          category: data.category,
          quantity: 1,
        });
      } else {
        let index = newItems.findIndex((element) => element._id === idEntered);
        newItems[index].quantity++;
      }
      setSelectedItems(newItems);
    }
  };
  const handleVenta = () => {
    let dataSale = {
      total: total,
      arrayProducts: selectedItems,
    };
    axios.post("http://localhost:5000/api/sales/save", dataSale);
  };

  return (
    <React.Fragment>
      <Header currPage="Compra"></Header>
      <div className="container main-content">
        <div className="column">
          <input
            id="cityname"
            type="text"
            value={keyword}
            className="form-control"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Escanee o busque artículo"
          />
          <List items={items} producto={false} className="margin_spaces" />
        </div>
        <div className="column">
          <Nota items={selectedItems} total={total} />
          <input
            type="button"
            onClick={handleVenta}
            className="hacer-compra-btn"
            value="Hacer Compra"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Compra;
