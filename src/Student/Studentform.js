import React, { useState } from "react";
import Chart from "../components/Chart";
import styles from "../components/Form.module.css";

export default function Studentform(props) {
  const [formdata, setformdata] = useState({
    question: "",
    id: "",
    hideUsn: false,
    isFile: false
  });
  const changeHandler = (data, val) => {
    if (data === "message") {
      setformdata({ ...formdata, question: val });
    }
    if (data === "teacher") {
      setformdata({ ...formdata, id: val.toUpperCase() });
    }
    if (data === "checkbox") {
      setformdata({ ...formdata, hideUsn: !val });
    }
    if (data === "checkbox2") {
      setformdata({ ...formdata, isFile: !val });
    }
  };
  const submitform = (e) => {
    if (formdata.question === "" || formdata.id === "")
      return
    props.submitHandler(e, formdata);
    setformdata({
      question: "",
      id: "",
      hideUsn: false,
      isFile: false
    })
  }
  return (
    <Chart className={styles.primaryBlock}>
      <Chart className={styles.primaryContainer}>
        <Chart className={styles.inputBlock}>
          <textarea
            type="text"
            className={styles.message}
            placeholder="Message"
            value={formdata.question}
            onChange={(e) => {
              changeHandler("message", e.target.value);
            }}
          />
        </Chart>
        <Chart className={styles.inputBlock}>
          <input
            type="text"
            placeholder="Lecturer Name"
            value={formdata.id}
            required
            className="inputBlock1"
            onChange={(e) => {
              changeHandler("teacher", e.target.value);
            }}
          />
        </Chart>
        <Chart className={styles.blockCheckbox}>
          <input
            type="checkbox"
            name="hide"
            id="hide"
            className={styles.checkbox}
            checked={formdata.hideUsn}
            onChange={(e) => {
              changeHandler("checkbox", formdata.hideUsn);
            }}
          />
          <label htmlFor="hide" className={styles.checkboxMessage}>
            Hide to details to lecturer
          </label>
        </Chart>
        <Chart className={styles.blockCheckbox}>
          <input
            type="checkbox"
            name="notfile"
            id="notfile"
            className={styles.checkbox}
            checked={formdata.isFile}
            onChange={(e) => {
              changeHandler("checkbox2", formdata.isFile);
            }}
          />
          <label htmlFor="notfile" className={styles.checkboxMessage}>
            Do you need a file as an answer
          </label>
        </Chart>
        <input
          type="submit"
          value="Submit"
          className={styles.button}
          onClick={submitform}
        />
      </Chart>
    </Chart>
  );
}
