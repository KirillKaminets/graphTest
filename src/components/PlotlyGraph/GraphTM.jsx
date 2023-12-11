import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import serverUrlPath from "../../server/serverUrlPath";

const GraphTM = () => {
  const [points, setPoints] = useState([]);
  const [dataTermo, setDataTermo] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [criticalEndDate, setCriticalEndDate] = useState([]);
  const mapData = new Map()
  const dataTermoResp=[] 


  useEffect(() => {
    fetchTermo();
  }, []);


const fetchTermo = async () => {
    const response = await fetch(`${serverUrlPath}/termo_response`);
    const dataTermo = await response.json();
    mapDataTermo(dataTermo.data);
    console.log(dataTermo.data);
};


function mapDataTermo(dataTermo){
    dataTermo.map(item=>(
        dataTermoResp.push(Object.values(item.data))
          ))
          console.log(dataTermoResp)
        }

        


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
                x: points ? Object.keys(points) : null,
                y: points ? Object.values(points) : null,
                mode: "markers",
                type: "scatter",
                name: "температура, С",
              },
          {
            x: dataTermoResp.value,
            y: averageTemperature ? averageTemperature : null,
            mode: "lines+markers",
            type: "scatter",
            name: "Глубина, м",
            marker: { color: "red" },
          },
          
        ]}
        layout={{
          title: "Термокоса",
          xaxis: {
            title: "Температура С",
            range: [-7, 7],
          },
          yaxis: {
            title: "Глубина, м ",
            range:[0, 25] ,
          },
          width: 600,
          height: 500,
        }}
      />
    </div>
  );
};
export default GraphTM;
