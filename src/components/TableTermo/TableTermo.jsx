import React, { useState, useEffect } from "react";
import serverUrlPath from "../../server/serverUrlPath";
import "./TableTermo.css";

const TableTermo = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [sortTable, setSortTable] = useState();
  const [searchTable, setSearchTable] = useState();
  const htmlTdHead = [];
  const htmlTd = [];

  let mapData = new Map();

  useEffect(() => {
    const fetchTermoResponse = async () => {
      const response = await fetch(`${serverUrlPath}/termo_response`);
      const data = await response.json();
      setData(data);
      mapDataTermo(data);
    };
    fetchTermoResponse();
  }, []);

  function mapDataTermo(dataTermo) {
    dataTermo.data.map((item) =>
      mapData.set(Object.keys(item.data), Object.values(item.data))
    );
  }

  for (let i = 0; i < 25; i = i + 0.5) {
    htmlTdHead.push(
      <td className="table-success" key={i}>
        {i}
      </td>
    );
  }

  return (
    <div className="table-block">
      <table className="table table-striped">
        <thead className="thead-fixed">
          <tr>
            <th scope="col" rowSpan={2} className="table-primary">
              Дата и время измерения
            </th>
            <th scope="col" rowSpan={2} className="table-primary">
              Те
            </th>
            <th scope="col" colSpan={50} className="table-primary">
              Глубина, м
            </th>
          </tr>
          <tr>{htmlTdHead}</tr>
        </thead>
        <tbody>
          {data.data?.map((item, index) => (
            <tr key={index}>
              <th scope="row" className="table-secondary">
                {new Date(item.time).toLocaleDateString()}
              </th>
              <td>{item.averageTemperature.toFixed(2)}</td>
              {Object.keys(item.data)}
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};
export default TableTermo;
