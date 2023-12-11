import React, { useState, useEffect } from "react";
import serverUrlPath from "../../server/serverUrlPath";


const TableDeformation = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTermoResponse = async () => {
      const response = await fetch(`${serverUrlPath}/deformation_response`);
      const data = await response.json();
      setData(data);
    };
    fetchTermoResponse();
  }, []);

  return (
    <div className="table-block">
      <table className="table table-striped">
        <thead className="thead-fixed">
          <tr>
            <th scope="col" className="table-primary">
              Дата и время измерения
            </th>
            <th scope="col" className="table-primary">
              Цикл измерения
            </th>
            <th scope="col" className="table-primary">
              Отметка, м
            </th>
            <th scope="col" className="table-primary">
              ▲, м
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data?.map((item, index) => (
            <tr key={index}>
              <th scope="row" className="table-secondary">
                {new Date(item.time).toLocaleDateString()}
              </th>
              <td>{item.state ? item.state : null}</td>
              <td>{item.data.value}</td>
              <td>{item.data.delta?.toFixed(5)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableDeformation;
