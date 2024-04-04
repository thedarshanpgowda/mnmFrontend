import React from "react";
import Chart from "../components/Chart";
import "../components/Secondary.css";

export function StudentMessage(props) {
  return (
    <Chart className="messageBlock">
      <div className="question">Q: {props.newstate.question}</div>
      <div className="answer">
        A: {props.newstate.answer ? props.newstate.answer : "Not answered yet"}
      </div>
    </Chart>
  );
}

export default function Studentsecondary(props) {
  return (
    <Chart className="secondaryBlock">
      <div className="newblock">
        {props.state.slice().reverse().map((newstate, index) => (
          <StudentMessage key={index} newstate={newstate} />
        ))}
      </div>
    </Chart>
  );
}
