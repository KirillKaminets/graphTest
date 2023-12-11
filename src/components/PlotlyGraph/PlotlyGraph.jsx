import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import serverUrlPath from "../../server/serverUrlPath";

const PlotlyGraph = () => {
  const [points, setPoints] = useState([]);
  const [dataTermo, setDataTermo] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [criticalEndDate, setCriticalEndDate] = useState([]);

  useEffect(() => {
    fetchTermoTrendResponse();
    fetchTermo();
  }, []);

  const fetchTermoTrendResponse = async () => {
    const response = await fetch(`${serverUrlPath}/termo_trend_response`);
    const data = await response.json();
    setPoints(data.data.points);
    setStartDate(data.data.startDate);
    setCriticalEndDate(data.data.criticalEndDate);
  };

  const fetchTermo = async () => {
    const response = await fetch(`${serverUrlPath}/termo_response`);
    const dataTermo = await response.json();
    setDataTermo(dataTermo);
  };

  function addTermoToArray(dataTermo) {
    let averageTemperature = [];
    let time = [];
    dataTermo.data?.map(
      (item, index) => (
        averageTemperature.push(item.averageTemperature), time.push(item.time)
      )
    );
    return [averageTemperature, time];
  }

  const [averageTemperature, timeTermo] = addTermoToArray(dataTermo);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {}
      <Plot
        data={[
          {
            x: timeTermo ? Object.values(timeTermo) : null,
            y: averageTemperature ? averageTemperature : null,
            mode: "lines+markers",
            type: "scatter",
            name: "Те",
            marker: { color: "red" },
          },
          {
            x: points ? Object.keys(points) : null,
            y: points ? Object.values(points) : null,
            mode: "lines+markers",
            type: "scatter",
            name: "Тренд Те",
          },
        ]}
        layout={{
          title: "Построение графиков тренда и Te",
          xaxis: {
            title: "Дата",
            type: "date",
            range: [startDate, criticalEndDate],
          },
          yaxis: {
            title: "Температура С",
            range: [-7, 0],
          },
          width: 600,
          height: 500,
        }}
      />
    </div>
  );
};
export default PlotlyGraph;
