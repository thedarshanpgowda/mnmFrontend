import "../App.css";
import Studentform from "./Studentform";
import styles from "../components/Form.module.css";
import Chart from "../components/Chart";
import Studentsecondary from "./Studentsecondarypage";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "../components/Modal";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StudentProfileContext from "../context/Newcontext";
import { BASE_URL } from "../helper";

function Mainstudentblock() {
  const [studentstate, setstudentState] = useState([]);
  const [view, setview] = useState(false);
  const user = useContext(StudentProfileContext)
  const navigate = useNavigate()
  const [modal, setmodal] = useState({
    message: "",
    status: ""
  })

  useEffect(() => {
    if (user.user.isSuccess && JSON.parse(localStorage.getItem("data")).isSuccess) {
      // console.log("mainstudentblock.js/22")
      navigate("/mnm/student");
    }
    else {
      navigate("/mnm/")
    }
  }, [user.user.isSuccess, navigate])

  const updateQuestion = (res) => {
    setstudentState(res.data.data)
  }

  useEffect(() => {
    const main = async () => {
      // console.log(user.user)
      // console.log(user.user.tok en);
      await axios
        .get(`${BASE_URL}/api/home`, {
          headers: {
            "Authorization": `Bearer ${user.user.token}`
          }
        })
        .then((res) => {
          updateQuestion(res)
        })
        .catch((err) => console.log("error while getting student questions"));
    }

    if (user.user.isSuccess) {
      main()
    }

  }, [view]);


  const submitHandler = async (e, data) => {
    e.preventDefault();
    console.log(data);
    // return

    await axios
      .post(`${BASE_URL}/api/home`, data,
        {
          headers: {
            "Authorization": `Bearer ${user.user.token}`
          }
        })
      .then((res) => {
        setmodal({
          message: "Your querry is submitt",
          status: "Success"
        })
        setview(true);
        console.log("success ")
      })
      .catch((err) => {
        setmodal({
          message: "Your querry is not submitt",
          status: "Failure"
        })
        console.log("error while posting the data ", err)
      });
  };

  const onClose = () => {
    setview(false);
    setmodal({
      message: "",
      status: ""
    })
    // window.location.reload();
  };

  const logouthandler = () => {
    localStorage.removeItem("data")
    user.updateUser(null)
    navigate("/mnm/")
  }

  return (
    <>
      <Chart className="flexbox">
        <Chart className="nameBlock">{user.user.name}{" | "}{user.user.id}</Chart>
        <div className="flexbutton">
          <div className="button question" onClick={logouthandler}>Log-Out</div>
        </div>
      </Chart>
      <Chart className={styles.mainBlock}>
        <Studentform submitHandler={submitHandler} />
        <hr />
        <Studentsecondary state={studentstate} />
        <Modal view={view} onClose={onClose} setview={setview} status={modal.status} message={modal.message}>
        </Modal>
      </Chart>
    </>
  );
}

export default Mainstudentblock;
