import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import serverUrlPath from "../../server/serverUrlPath";

const GraphDeltaTime = () => {
  const [points, setPoints] = useState([]);
  const [dataDeformation, setDataDeformation] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [criticalEndDate, setCriticalEndDate] = useState([]);

  useEffect(() => {
    fetchDeformationTrendResponse();
    fetchDeformation();
  }, []);

  const fetchDeformationTrendResponse = async () => {
    const response = await fetch(`${serverUrlPath}/deformation_trend_response`);
    const data = await response.json();
    setPoints(data.data.points);
    console.log(data.data.points);
  };

  const fetchDeformation = async () => {
    const response = await fetch(`${serverUrlPath}/deformation_response`);
    const dataDeformation = await response.json();
    setDataDeformation(dataDeformation.data);
    console.log(dataDeformation);
  };

  function addTermoToArray(dataDeformation) {
    let delta = [];
    let time = [];
    dataDeformation?.map(
      (item, index) => (delta.push(item.data.delta), time.push(item.time))
    );
    console.log(delta);
    return [delta, time];
  }

  const [delta, time] = addTermoToArray(dataDeformation);

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
            x: time ? Object.values(time) : null,
            y: delta ? delta : null,
            mode: "lines+markers",
            type: "scatter",
            name: "▲",
            marker: { color: "red" },
          },
          {
            x: Object.keys(points),
            y: Object.values(points),
            mode: "lines+markers",
            type: "scatter",
            name: "Тренд ▲",
          },
        ]}
        layout={{
          title: "Смещение по деформационной марке: dm5",
          xaxis: {
            title: "Дата",
            type: "date",
            range: [startDate, criticalEndDate],
          },
          yaxis: {
            title: "Смещение (▲), м",
            range: [0.04, 0],
          },
          width: 600,
          height: 500,
        }}
      />
    </div>
  );
};
export default GraphDeltaTime;
