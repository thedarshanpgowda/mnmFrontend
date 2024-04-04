import React from "react";
import Chart from "../components/Chart";

export default function HODForm(props) {
  return (
    <Chart className="hodmessage">
      <div className="question">Q: {props.newstate.question}</div>
      <div className="replpyBlock">
        <Chart>
          <div className="namesBlock">{props.newstate.name}</div>
          <div className="namesBlock">{props.newstate.hideUsn ? "Anonymous" : props.newstate.usn}</div>
        </Chart>
        <button className="replyBlock">
          {props.newstate.id}
        </button>
      </div>
    </Chart>
  );
}


