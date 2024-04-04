import React from "react";
import Chart from "../components/Chart";
import "../components/Secondary.css";

export function Message(props) {
  return (
    <Chart className="messageBlock">
      <div className="question">Q: {props.newstate.question}</div>
      <div className="replpyBlock">
        <Chart>
          <div className="namesBlock">{props.newstate.name}</div>
          <div className="namesBlock">{props.newstate.hideUsn ?  "Anonymous" : props.newstate.usn}</div>
        </Chart>
        <button
          className="replyBlock"
          onClick={() => {
            props.questionHandler(props.newstate.question, props.newstate.qid, props.newstate.isFile);
            // console.log(props.newstate);
          }}
        >
          Reply
        </button>
      </div>
    </Chart>
  );
}

export default function Secondary(props) {
  return (
    <Chart className="secondaryBlock">
      <div className="newblock">
        {props.state.map((newstate, index) => (
          <Message
            key={index}
            newstate={newstate}
            questionHandler={props.questionHandler}
          />
        ))}
      </div>
    </Chart>
  );
}
