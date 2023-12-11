
import './App.css';
import React from 'react'
import TableTermo from './components/TableTermo/TableTermo';
import PlotlyGraph from "./components/PlotlyGraph/PlotlyGraph"
import TableDeformation from './components/TableDeformation/TableDeformation';
import GraphTM from './components/PlotlyGraph/GraphTM'
import GraphDeltaTime from './components/PlotlyGraph/GraphDeltaTime'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <GraphDeltaTime/>
      {/* <GraphTM/> */}
      {/* <TableTermo/> */}
      <TableDeformation/>
      <PlotlyGraph/>
    </>
  );
}

export default App;
