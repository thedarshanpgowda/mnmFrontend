import React from "react";
import Chart from "../components/Chart";
import styles from "../components/Form.module.css";

export default function Form(props) {
  const submitformevent = (e) => {
    // console.log(props.message)
    if (props.message.answer === "")
      return
    props.setmessage({question: props.message.question, qid : props.message.qid, answer : props.message.answer})
    props.submitHandler(e);
    console.log("object")
    props.setDisplay(prev=>!prev)
  }

  return (
    <Chart className={styles.primaryBlock}>
      {!props.display ? (
        <Chart className={styles.primaryContainer}>
          <div className="question">Q: {props.message.question}</div>
          <Chart className={styles.inputBlock}>
            <textarea
              type="text"
              className={styles.message}
              value={props.message.answer}
              placeholder="Message"
              onChange={(e) => {
                props.setmessage({ ...props.message, answer: e.target.value });
                // console.log(props.message);
              }}
            />
          </Chart>
          {props.message.isFile ?
            (<input type="file" name="myfile" id="myfile" className={styles.fileblock} />) : (<></>)}
          <input
            type="submit"
            value="Submit"
            className={styles.button}
            onClick={submitformevent}
          />
        </Chart>
      ) : (
        <Chart className="answer extracolumn"> Hello {props.name}, Hope you are having a great day. </Chart>
      )}
    </Chart>
  );
}
