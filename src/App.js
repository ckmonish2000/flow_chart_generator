import React, { useState } from 'react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { CSVLink, CSVDownload } from "react-csv";
import Modals from "./Modal"

const App = () => {
  const [elements, setElements] = useState([]);
  const [openModal, setopenModal] = useState(false)
  const [prev_succ, setprev_succ] = useState([])

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) => {

    // prev and successor track
    const x = [...prev_succ]
    x.push({ prev: params?.source, succ: params?.target })
    setprev_succ(x)

    // flow chart track
    setElements((els) => addEdge(params, els))
  };

  const toggleModal = () => {
    setopenModal(!openModal)
  }

  const push = (e) => {
    console.log(e)
    const ele = [...elements]
    ele.push(e)
    setElements(ele)
  }

  const Remove = (id) => {
    const ele = [...elements]
    setElements(ele?.filter(e => e?.id !== id))

    const x = [...prev_succ]
    setprev_succ(x.filter(v => v?.succ !== id || v?.prev !== id))
  }

  const CSV_Data = [["Predecessor", "Successor"], ...prev_succ?.map(v => { return [v?.prev, v?.succ] })]

  return (
    <div style={{ height: "100vh" }}>

      <button
        onClick={toggleModal}
        style={{ width: "fit-content", position: "relative", margin: "10pt" }}
        className="btn">ADD BLOCK</button>

      <CSVLink data={CSV_Data}>
        <button
          style={{ width: "fit-content", position: "relative", margin: "10pt", marginLeft: "0px" }}
          className="btn">Download Excel</button>
      </CSVLink>

      {openModal && <Modals toggleModal={toggleModal} push={push} Remove={Remove} />}

      {!openModal &&
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          deleteKeyCode={46} /* 'delete'-key */
        />}
    </div>
  );
};

export default App;