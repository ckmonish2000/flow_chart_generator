import React, { useState } from 'react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
import { CSVLink } from "react-csv";
import Modals from "./Modal"
import { get_possible_endpoints } from "./functions"

const App = () => {
  const [elements, setElements] = useState([]);
  const [openModal, setopenModal] = useState(false)
  const [prev_succ, setprev_succ] = useState([])

  const [skipState, setskipState] = useState([])

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) => {

    // prev and successor track
    const x = [...prev_succ]
    x.push({ prev: params?.source, succ: params?.target })
    setprev_succ(x)

    // flow tracker
    const possible_endpoints = get_possible_endpoints(prev_succ, elements, { prev: params?.source, succ: params?.target })
    let skip = [...skipState, ...possible_endpoints]
    setskipState(skip)

    // flow chart track
    params = { ...params }
    params["animated"] = true
    setElements((els) => addEdge(params, els))
  };

  const toggleModal = () => {
    setopenModal(!openModal)
  }

  const push = (e) => {
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
  const skip_CSV_Data = [["Predecessor", "Successor"], ...skipState?.map(v => { return [v?.prev, v?.succ] })]

  return (
    <div style={{ height: "100vh" }}>
      <br />
      <button
        onClick={toggleModal}
        style={{ width: "fit-content", position: "relative", margin: "10pt" }}
        className="btn">ADD BLOCK</button>

      <button
        onClick={() => {
          setprev_succ([])
          setElements([])
        }}
        style={{ width: "fit-content", position: "relative", marginRight: "10pt" }}
        className="btn">Clear Slate</button>

      {prev_succ?.length > 0 && <CSVLink data={CSV_Data}>
        <button
          style={{ width: "fit-content", position: "relative", margin: "10pt", marginLeft: "0px" }}
          className="btn">Download Excel For No Skip</button>
      </CSVLink>}

      {prev_succ?.length > 0 && <CSVLink data={skip_CSV_Data}>
        <button
          style={{ width: "fit-content", position: "relative", margin: "10pt", marginLeft: "0px" }}
          className="btn">Download Excel For Skip</button>
      </CSVLink>}

      <br />
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