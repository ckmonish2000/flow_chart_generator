import { useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5"

export default function Modals({ toggleModal, push, Remove, setprev_succ, setElements }) {

  const [Id, setId] = useState(0)
  const [NodeType, setNodeType] = useState("")

  const handleOk = () => {
    if (Id !== "" && NodeType !== "") {
      if (NodeType === "start") {
        push({
          id: Id,
          type: 'input',
          sourcePosition: 'right',
          targetPosition: 'left',
          data: {
            label: <div className="split-box">
              {Id}
              <button className="remove_btn"
                onClick={() => { Remove(Id) }}
              ><IoCloseCircleOutline /></button>
            </div>
          },
          position: { x: 0, y: 0 },
        })
      } else if (NodeType === "end") {
        push({
          id: Id,
          type: 'output',
          sourcePosition: 'right',
          targetPosition: 'left',
          data: {
            label: <div className="split-box">
              {Id}
              <button
                className="remove_btn"
                onClick={() => { Remove(Id) }}
              ><IoCloseCircleOutline /></button>
            </div>
          },
          position: { x: 0, y: 0 },
        })
      } else {
        push({
          id: Id,
          sourcePosition: 'right',
          targetPosition: 'left',
          data: {
            label: <div className="split-box">
              {Id}
              <button
                onClick={() => { Remove(Id) }}
                className="remove_btn"><IoCloseCircleOutline /></button>
            </div>
          },
          position: { x: 0, y: 0 },
        })
      }
      handleCancel()
    }
  }

  const handleCancel = () => {
    toggleModal()
    setId("")
    setNodeType("")
  }

  return (
    // className="modal_design_back"
    <div >
      <div className="modal">
        {/* <h3 className="modal-title">Add Node</h3> */}
        <input placeholder="Node ID/Name" type="number" className="modal_ip" value={Id} onChange={e => setId(e.target.value)} />

        <select placeholder="Node Type" className="modal_ip" value={NodeType} onChange={e => setNodeType(e.target.value)}>
          {NodeType === "" && <option>Select a Node Type</option>}
          <option value="start">Start</option>
          <option value="node">Node</option>
          <option value="end">End</option>
        </select>

        <button className="btn" onClick={handleOk} style={{ right: "60pt" }}>Add</button>

        <button
          onClick={() => {
            setprev_succ([])
            setElements([])
          }}
          style={{ position: "relative", marginRight: "10pt" }}
          className="btn">Clear Slate</button>
        {/* <button className="btn" onClick={handleCancel}>Close</button> */}
      </div>
    </div>
  )
}
