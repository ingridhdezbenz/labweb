import React, { useState, useEffect } from "react";
import Header from "../components/header";
import axios from "axios";
const Ventas = () => {
  let [ventas, setVentas] = useState([]);
  let [loading, setLoading] = useState(true);
  const getData = async () => {
    return await axios.get("http://localhost:5000/api/sales/");
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let { data } = await getData();
      setVentas(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>LOADING</div>;
  }
  return (
    <React.Fragment>
      <Header currPage="Historial de Ventas"></Header>
      <div className="container margin_spaces">
        <table className="table">
          <tr>
            <th>ID de venta</th>
            <th>Total</th>
            <th>N° de productos</th>
          </tr>
          {ventas.map((venta) => (
            <tr>
              <td>{venta._id}</td>
              <td>${venta.total.toFixed(2)}</td>
              <td>{venta.arrayProducts.length}</td>
            </tr>
          ))}
        </table>
      </div>
    </React.Fragment>
  );
};

export default Ventas;
