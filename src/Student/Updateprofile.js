import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import StudentProfileContext from "../context/Newcontext";
import { BASE_URL, universalImage } from "../helper";
import axios from "axios";
import ModalContext from "../context/Modalcontext";

export default function Updateprofile() {
    const user = useContext(StudentProfileContext);
    const { updateModal } = useContext(ModalContext)
    const imageRef = useRef()
    const [url, seturl] = useState("")
    const [isEditable, setIsEditable] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [userInfo, setUserInfo] = useState({
        name: undefined,
        id: undefined,
        blood: undefined,
        email: undefined,
        branch: undefined,
        phone: undefined,
        mentorId: undefined,
        dob: undefined,
        addr: undefined,
        mother: undefined,
        father: undefined,
        token: undefined,
        sem: undefined,
        isUpdated: false,
    });

    useEffect(() => {
        const data = localStorage.getItem("data");
        if (data) {
            const userData = JSON.parse(data);
            setUserInfo((prev) => ({ ...prev, ...userData }));
        }
        // console.log(userInfo)
    }, []);

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        if (name === "password") {
            setUserInfo((prevState) => ({
                ...prevState,
                [name]: value,
                isUpdated: true
            }));
        }
        else {
            setUserInfo((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(userInfo)
        const isEmpty = Object.values(userInfo).some(value => String(value).trim() === '');

        if (isEmpty) {
            setError("Please fill in all fields");
            setMessage("")
            setIsEditable(true)
            updateModal("Please dont leave any fields Empty", "Failed to Process the data")

            return 'true';
        } else {
            console.log(userInfo);
            await axios.post(`${BASE_URL}/api/update`, userInfo, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
                .then(res => {
                    console.log(res)
                    setError("");
                    setMessage("Successfully updated the data")
                    setUserInfo(p => ({ ...p, isUpdated: false }))
                    user.updateUser(res.data)
                    updateModal(res.data.message, res.data.status)
                    return 'false'
                })
                .catch((e) => {
                    console.log(e)
                    updateModal(e.response?.data.message, e.response.data.status)
                    setError("Unable to update the data");
                    return 'true'

                })
        }
    };

    useEffect(() => {
        seturl(user.user.img)
    }, [])

    const handleDivClick = () => {
        if (isEditable) {
            imageRef.current.click()
        }
        else return
    }

    const onChangeHandler = async (e) => {
        e.preventDefault()
        setMessage(`Uploading please wait....\n Please dont save the file`)
        const photo = imageRef.current.files[0]
        console.log(photo)

        // const updatedpic = URL.createObjectURL(photo)
        // seturl(updatedpic)

        const data = new FormData()
        data.append("file", photo)
        data.append("upload_preset", "Mentors-n-Mentee");
        data.append("cloud_name", "dcxdz0kfq");

        try {
            await axios.post("https://api.cloudinary.com/v1_1/dcxdz0kfq/image/upload", data)
                .then(res => {
                    console.log(res.data.url)
                    seturl(res.data.url)
                    setUserInfo(prev => ({
                        ...prev, img: res.data.url
                    }))
                })
        }
        catch (e) {
            updateModal(e.response.data.error.message, e.response.statusText);
        }
        finally {
            setMessage(`Now you can save your file`)

        }
    }

    return (
        <div className="updateProfileBlock">
            <div className="mainnavbartop">
                <div className="studentDataInfoNavbar">
                    <div className="imageContainerBlock">
                        <img
                            src={url ? url : universalImage} alt="profile"
                            onClick={() => {
                                const navigationBarBlock = document.querySelector('.navigationBarBlock');
                                if (navigationBarBlock) {
                                    navigationBarBlock.style.marginTop = "0%";
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="mainContentblock">
                <div className="studentInfoName ">
                    <div className="detailsBlockStudent nunito">
                        <div className="inputholdingContainer">
                            <div className="file" style={{ opacity: !isEditable ? "1" : "0.5" }} onClick={handleDivClick}>
                                {isEditable && <>
                                    <div className="extracontainer">+</div>
                                    <input
                                        type="file"
                                        id="profile"
                                        ref={imageRef}
                                        readOnly={!isEditable}
                                        style={{ display: "none" }}
                                        onChange={onChangeHandler}
                                        name="profilePic"
                                        className="inputfolder"
                                    />
                                </>}
                                {url !== "" ? <img className="imageblock" src={url} alt="" /> : "+"}
                            </div>
                        </div>
                    </div>
                    <div className="studentCredentials">
                        <h1 className="h1 nunito">{user.user.name}</h1>
                        <p className="p nunito">{user.user.id}</p>
                    </div>
                    {user.user.addr ? (
                        <p className="addr nunito">{user.user.addr}</p>
                    ) : (
                        <p className="addr nunito">Malnad College of Engineering</p>
                    )}
                </div>

                {!isEditable ? <div className="editoption" onClick={() => { setIsEditable(true) }}>
                    <button><p>Edit your Profile</p> <img
                        src="https://cdn-icons-png.flaticon.com/128/2355/2355330.png"
                        alt="update"
                    /></button>
                </div> :
                    <div className="editoption" onClick={async (e) => {
                        const er = await handleSubmit(e)
                        if (er === 'true') {
                            // console.log(er)
                            setIsEditable(true)
                            // console.log("set to true")
                        } else {
                            // console.log(er)
                            // console.log("set to false")
                            setIsEditable(false)
                        }
                    }}>
                        <button><p>Save your Profile</p> <img
                            src="https://cdn-icons-png.flaticon.com/128/2874/2874050.png"
                            alt="save"
                        /></button>
                    </div>}
                {error && <p className="error nunito">{error}</p>}
                {message && <p className="success nunito">{message}</p>}
                <form>
                    <div className="studentDetailsBlock2">

                        <div className="detailsBlockStudent nunito">
                            <div className="querry">Name</div>
                            <div className="inputholdingContainer">
                                <input
                                    className="studentBlockContainer"
                                    name="name"
                                    value={userInfo.name || ""}
                                    onChange={handleInputChange}
                                    readOnly={!isEditable}
                                    placeholder="Name"
                                />
                            </div>
                        </div>
                        <div className="detailsBlockStudent nunito">
                            <div className="querry">Email</div>
                            <div className="inputholdingContainer">
                                <input
                                    className="studentBlockContainer"
                                    name="email"
                                    value={userInfo.email || ""}
                                    onChange={handleInputChange}
                                    readOnly={!isEditable}
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="detailsBlockStudent nunito">
                            <div className="querry">Password</div>
                            <div className="inputholdingContainer">
                                <input
                                    className="studentBlockContainer"
                                    name="password"

                                    onChange={handleInputChange}
                                    readOnly={!isEditable}
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className="detailsBlockStudent nunito">
                            <div className="querry">Mentor Id</div>
                            <div className="inputholdingContainer">
                                <input
                                    className="studentBlockContainer"
                                    name="mentorId"
                                    value={userInfo.mentorId || ""}
                                    onChange={handleInputChange}
                                    readOnly={!isEditable}
                                    placeholder="Mentor ID"
                                />
                            </div>
                        </div>
                        <div className="detailsBlockStudent nunito">
                            <div className="querry">Department</div>
                            <div className="inputholdingContainer">
                                <input
                                    className="studentBlockContainer"
                                    name="branch"
                                    value={userInfo.branch || ""}
                                    onChange={handleInputChange}
                                    readOnly={!isEditable}
                                    placeholder="Department"
                                />
                            </div>
                        </div>
                        <div className="detailsBlockStudent nunito">
                            <div className="querry">Phone no</div>
                            <div className="inputholdingContainer">
                                <input
                                    className="studentBlockContainer"
                                    name="phone"
                                    value={userInfo.phone || ""}
                                    onChange={handleInputChange}
                                    readOnly={!isEditable}
                                    placeholder="Phone no"
                                />
                            </div>
                        </div>
                        <div className="detailsBlockStudent nunito">
                            <div className="querry">Date of Birth</div>
                            <div className="inputholdingContainer">
                                <input
                                    className="studentBlockContainer"
                                    name="dob"
                                    value={userInfo.dob || ""}
                                    onChange={handleInputChange}
                                    readOnly={!isEditable}
                                    placeholder="Date of Birth"
                                />
                            </div>
                        </div>
                        <div className="detailsBlockStudent nunito">
                            <div className="querry">Address</div>
                            <div className="inputholdingContainer">
                                <input
                                    className="studentBlockContainer"
                                    name="addr"
                                    value={userInfo.addr || ""}
                                    onChange={handleInputChange}
                                    readOnly={!isEditable}
                                    placeholder="Address"
                                />
                            </div>
                        </div>
                        <div className="detailsBlockStudent nunito">
                            <div className="querry">Semester</div>
                            <div className="inputholdingContainer">
                                <input
                                    className="studentBlockContainer"
                                    name="sem"
                                    value={userInfo.sem || ""}
                                    onChange={handleInputChange}
                                    readOnly={!isEditable}
                                    placeholder="Semester"
                                />
                            </div>
                        </div>
                        <div className="detailsBlockStudent nunito">
                            <div className="querry">Father Name</div>
                            <div className="inputholdingContainer">
                                <input
                                    className="studentBlockContainer"
                                    name="father"
                                    value={userInfo.father || ""}
                                    onChange={handleInputChange}
                                    readOnly={!isEditable}
                                    placeholder="Father Name"
                                />
                            </div>
                        </div>
                        <div className="detailsBlockStudent nunito">
                            <div className="querry">Mother Name</div>
                            <div className="inputholdingContainer">
                                <input
                                    className="studentBlockContainer"
                                    name="mother"
                                    value={userInfo.mother || ""}
                                    onChange={handleInputChange}
                                    readOnly={!isEditable}
                                    placeholder="Mother Name"
                                />
                            </div>
                        </div>
                        <div className="detailsBlockStudent nunito">
                            <div className="querry">Blood group</div>
                            <div className="inputholdingContainer">
                                <input
                                    className="studentBlockContainer"
                                    name="blood"
                                    value={userInfo.blood || ""}
                                    onChange={handleInputChange}
                                    readOnly={!isEditable}
                                    placeholder="Blood group"
                                />
                            </div>
                        </div>
                        {/* Similarly for other fields */}
                    </div>
                    {error && <p className="error nunito">{error}</p>}

                    {isEditable && (
                        <div className="submitbutton" onClick={handleSubmit}>
                            <button type="submit">Save Changes</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
