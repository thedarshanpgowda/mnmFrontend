import React, { useContext, useRef, useState } from "react";
import styles from "./Signup.module.css";
import Chart from "../components/Chart";
import ModalContext from "../context/Modalcontext";
import axios from "axios";

export default function Registration({
    signup,
    setsignup,
    setstudent,
    submithandler,
}) {
    const [newview, setnewview] = useState({
        first: true,
        second: false,
    });
    const { updateModal } = useContext(ModalContext);
    const [url, setUrl] = useState("");
    const imageRef = useRef();

    const [photo, setPhoto] = useState();
    const handleInputChange = (fieldName, value) => {
        setsignup((prevSignup) => ({
            ...prevSignup,
            [fieldName]: value,
        }));
    };

    const photoChangeHandler = async (e) => {
        e.preventDefault();
        console.log(photo);

        const data = new FormData();
        data.append("file", photo);
        data.append("upload_preset", "Mentors-n-Mentee");
        data.append("cloud_name", "dcxdz0kfq");
        console.log(data);
        try {
            if (photo === null) {
                console.log("image cannot be null");
                return;
            } else {
                await axios
                    .post("https://api.cloudinary.com/v1_1/dcxdz0kfq/image/upload", data)
                    .then((res) => {
                        console.log(res.data.url);
                        setUrl(res.data.url);
                        setsignup((prev) => ({ ...prev, profilepic: res.data.url }));
                    });
            }
        } catch (e) {
            console.log(e);
            updateModal(e.response.data.error.message, e.response.statusText);
        }
    };

    const onChangeHandler = (e) => {
        e.preventDefault();
        setPhoto(e.target.files[0]);
        const uploadedFile = imageRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setUrl(cachedURL);
        // photoChangeHandler(e)
    };

    const handleDivClick = () => {
        imageRef.current.click();
    };

    const oncllickhandler = (e) => {
        e.preventDefault();
        if (
            signup.address === "" ||
            signup.name === "" ||
            signup.email === "" ||
            signup.phone === "" ||
            signup.usn === ""
        ) {
            updateModal("Please fill all the fields", "Fail");

            return;
        }
        if (photo) {
            photoChangeHandler(e);
        }
        setnewview({ first: false, second: false });
    };

    const onsecondClick = (e) => {
        e.preventDefault();
        if (
            signup.blood === "" ||
            signup.dob === "" ||
            signup.mother === "" ||
            signup.father === "" ||
            signup.mid === ""
        ) {
            updateModal("Please fill all the fields", "Fail");

            return;
        }
        if (photo) {
            photoChangeHandler(e);
        }
        setnewview({ first: false, second: true });
    };

    return (
        <>
            <span className={styles.span}>Sign-Up to Student dashboard</span>
            <div className={styles.file} onClick={handleDivClick}>
                <input
                    type="file"
                    id="profile"
                    ref={imageRef}
                    style={{ display: "none" }}
                    onChange={onChangeHandler}
                    className={styles.fileInput}
                />
                {url !== "" ? <img className={styles.image} src={url} alt="" /> : "+"}
            </div>
            {newview.first && !newview.second && (
                <>
                    <Chart isset="true" val="3px" className={styles.inputBlockContainer}>
                        <input
                            type="text"
                            id="name"
                            value={signup.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className={styles.inputBlock}
                            placeholder="Name"
                        />
                    </Chart>
                    <Chart isset="true" val="3px" className={styles.inputBlockContainer}>
                        <input
                            type="email"
                            id="email"
                            value={signup.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className={styles.inputBlock}
                            placeholder="Email"
                        />
                    </Chart>
                    <Chart isset="true" val="3px" className={styles.inputBlockContainer}>
                        <input
                            type="number"
                            id="phone"
                            value={signup.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className={styles.inputBlock}
                            placeholder="Phone Number"
                        />
                    </Chart>
                    <Chart isset="true" val="3px" className={styles.inputBlockContainer}>
                        <input
                            type="text"
                            id="usn"
                            value={signup.usn}
                            onChange={(e) =>
                                handleInputChange("usn", e.target.value.toUpperCase())
                            }
                            className={styles.inputBlock}
                            placeholder="USN"
                        />
                    </Chart>
                    <Chart isset="true" val="3px" className={styles.inputBlockContainer}>
                        <input
                            type="text"
                            id="mid"
                            value={signup.mid}
                            onChange={(e) =>
                                handleInputChange("mentorId", e.target.value.toUpperCase())
                            }
                            className={styles.inputBlock}
                            placeholder="Mentor ID"
                            required
                        />
                    </Chart>

                    <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                        <input
                            type="submit"
                            id="submit"
                            className={`${styles.inputBlock1} ${styles.submit}`}
                            value="Move Next"
                            onClick={oncllickhandler}
                        />
                    </Chart>
                    <span className={styles.span}>
                        Already have an account{" "}
                        <button onClick={() => setstudent(false)}>Log-In</button>?
                    </span>
                </>
            )}
            {!newview.first &&
                !newview.second &&(
                    <>
                        <Chart
                            isset="true"
                            val="3px"
                            className={styles.inputBlockContainer}
                        >
                            <input
                                type="text"
                                id="dob"
                                value={signup.dob}
                                onChange={(e) => handleInputChange("dob", e.target.value)}
                                className={styles.inputBlock}
                                placeholder="Date of Birth Eg: DD-MM-YYYY"
                                required
                            />
                        </Chart>
                        <Chart
                            isset="true"
                            val="3px"
                            className={styles.inputBlockContainer}
                        >
                            <input
                                type="text"
                                id="addr"
                                value={signup.addr}
                                onChange={(e) => handleInputChange("addr", e.target.value)}
                                className={styles.inputBlock}
                                placeholder="Address"
                                required
                            />
                        </Chart>
                        <Chart
                            isset="true"
                            val="3px"
                            className={styles.inputBlockContainer}
                        >
                            <input
                                type="text"
                                id="father"
                                value={signup.father}
                                onChange={(e) => handleInputChange("father", e.target.value)}
                                className={styles.inputBlock}
                                placeholder="Father Name"
                                required
                            />
                        </Chart>
                        <Chart
                            isset="true"
                            val="3px"
                            className={styles.inputBlockContainer}
                        >
                            <input
                                type="text"
                                id="mother"
                                value={signup.mother}
                                onChange={(e) => handleInputChange("mother", e.target.value)}
                                className={styles.inputBlock}
                                placeholder="Mother Name"
                                required
                            />
                        </Chart>
                        <Chart
                            isset="true"
                            val="3px"
                            className={styles.inputBlockContainer}
                        >
                            <input
                                type="text"
                                id="blood"
                                value={signup.blood}
                                onChange={(e) => handleInputChange("blood", e.target.value)}
                                className={styles.inputBlock}
                                placeholder="Blood Group"
                                required
                            />
                        </Chart>

                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <input
                                type="submit"
                                id="submit"
                                className={`${styles.inputBlock1} ${styles.submit}`}
                                value="Move Next"
                                onClick={onsecondClick}
                            />
                        </Chart>

                        <span className={styles.span}>
                            Already have an account{" "}
                            <button onClick={() => setstudent(false)}>Log-In</button>?
                        </span>
                    </>
                )}
            {!newview.first && newview.second && (
                <>
                    <Chart isset="true" val="3px" className={styles.inputBlockContainer}>
                        <input
                            type="password"
                            id="password"
                            value={signup.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className={styles.inputBlock}
                            placeholder="Password"
                            required
                        />
                    </Chart>
                    <Chart isset="true" val="3px" className={styles.inputBlockContainer}>
                        <input
                            type="password"
                            id="cpassword"
                            value={signup.confirmPassword}
                            onChange={(e) =>
                                handleInputChange("confirmPassword", e.target.value)
                            }
                            className={styles.inputBlock}
                            placeholder="Confirm Password"
                        />
                    </Chart>
                    <Chart isset="true" val="3px" className={styles.inputBlockContainer}>
                        <select
                            id="branch"
                            className={styles.inputBlock}
                            value={signup.branch}
                            onChange={(e) => handleInputChange("branch", e.target.value)}
                            required
                        >
                            <option value="">Select your branch</option>
                            <option value="Computer Science and Engineering">
                                Computer Science and Engineering
                            </option>
                            <option value="Information Science and Engineering">
                                Information Science and Engineering
                            </option>
                            <option value="Electronics & Communication and Engineering">
                                Electronics & Communication and Engineering
                            </option>
                            <option value="Electronics & Electricals and Engineering">
                                Electronics & Electricals and Engineering
                            </option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Mechanical Engineering">
                                Mechanical Engineering
                            </option>
                            <option value="Electricals and Information Engineering">
                                Electricals and Information Engineering
                            </option>
                            <option value="Artificial Intelligence and Engineering">
                                Artificial Intelligence and Engineering
                            </option>
                            <option value="Computer Science and Business Studies">
                                Computer Science and Business Studies
                            </option>
                        </select>
                    </Chart>
                    <Chart isset="true" val="3px" className={styles.inputBlockContainer}>
                        <select
                            id="sem"
                            className={styles.inputBlock}
                            value={signup.sem}
                            onChange={(e) => handleInputChange("sem", e.target.value)}
                            required
                        >
                            <option value="">Select your semester</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </Chart>
                    <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                        <input
                            type="submit"
                            id="submit"
                            className={`${styles.inputBlock1} ${styles.submit}`}
                            value="Submit"
                            onClick={submithandler}
                        />
                    </Chart>
                </>
            )}
        </>
    );
}
