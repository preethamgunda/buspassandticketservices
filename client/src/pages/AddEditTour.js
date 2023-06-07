import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";
import SettingsIcon from "@mui/icons-material/Settings";
import BusImg from "./bus.jpg";
import Footer from "./Footer";
import BgPass from "./bgpass.jpg";
import PassBack from "./passback.jpg";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import emailjs from "@emailjs/browser";
const initialState = {
  first_name: "",
  last_name: "",
  father_name: "",
  Gender: "",
  Age: "",
  College_Name: "",
  Home_address: "",
  College_Address: "",
  Pass_duration: 0,
  tags: [],
};

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const { error, userTourss } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vfn, setvfn] = useState(false);
  const [vln, setvln] = useState(false);
  const [vfan, setvfan] = useState(false);
  const [vgen, setgven] = useState(false);
  const [vyrs, setvyrs] = useState(false);
  const [vcona, setvcona] = useState(false);
  const [vhona, setvhona] = useState(false);
  const [vcoad, setvcoad] = useState(false);
  const [vpd, setvpd] = useState(false);
  const [dis, setDis] = useState("");

  const {
    first_name,
    last_name,
    father_name,
    Gender,
    Age,
    College_Name,
    Home_address,
    College_Address,
    Pass_duration,
    tags,
  } = tourData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userTourss.find((tour) => tour._id === id);
      console.log(singleTour);
      setTourData({ ...singleTour });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const customPass = (event, value) => {
    setDis(value.label);
  };

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };
  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_By0ovCBn7Mzp2R",
      currency: "INR",
      amount: amount * 100,
      name: "Bus Pass",
      description: "Thanks for purchasing",
      image:
        "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

      handler: function (response) {
        window.location.href = "http://localhost:3000/bus_pass_payment_success";

        if (!tags.length) {
          setTagErrMsg("Please provide some tags");
        }
        if (
          first_name &&
          last_name &&
          father_name &&
          Gender &&
          Age &&
          College_Name &&
          Home_address &&
          College_Address &&
          Pass_duration &&
          tags
        ) {
          const updatedTourData = { ...tourData, name: user?.result?.name };

          if (!id) {
            dispatch(createTour({ updatedTourData, navigate }));
          } else {
            dispatch(updateTour({ id, updatedTourData, navigate }));
          }
          handleClear();
        }
      },
      prefill: {
        name: "Vivek Vardhan",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = (e) => {
    if (first_name === "") {
      setvfn(true);
    }
    displayRazorpay(Pass_duration * 100);
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setTagErrMsg(null);
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };
  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };
  const datasuccess = (event, value) => {
    setTourData({ ...tourData, Gender: event.target.value });
  };
  const checkform = () => {};

  const handleClear = () => {
    setTourData({
      first_name: "",
      last_name: "",
      father_name: "",
      Gender: "",
      Age: "",
      College_Name: "",
      Home_address: "",
      College_Address: "",
      Pass_duration: "",
      tags: [],
    });
  };
  localStorage.setItem("PassPay", Pass_duration);

  return (
    <>
      <div
        style={{
          padding: "15px",
          alignContent: "center",
          marginTop: "-100px",
          height: "1400px",
          background: `url(${PassBack})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "1900px 1250px",
          backgroundPosition: "1% 0%",
          backgroundBlendMode: "lighten",
        }}
        // className="container"
      >
        <div className="forminput">
          <MDBCard
            alignment="center"
            style={{
              marginTop: "200px",
              opacity: "0.8",
              border: "5px solid",
              backgroundColor: "#ffffff",
            }}
          >
            <MDBCardBody>
              <MDBValidation
                onSubmit={handleSubmit}
                className="row g-3"
                noValidate
              >
                <div className="col-md-6">
                  <span>First Name</span>
                  <MDBInput
                    placeholder="Enter First Name"
                    type="text"
                    value={first_name}
                    name="first_name"
                    onChange={onInputChange}
                    className="form-control"
                    required
                    invalid
                    validation="Please provide title"
                  />
                </div>
                <div className="col-md-6">
                  <span>Last Name</span>
                  <MDBInput
                    placeholder="Enter Last Name"
                    type="text"
                    value={last_name}
                    name="last_name"
                    onChange={onInputChange}
                    className="form-control"
                    required
                    invalid
                    textarea
                    rows={4}
                    validation="Please provide description"
                  />
                </div>
                <div className="col-md-12">
                  <span style={{ marginRight: "500px" }}>Father's Name</span>
                  <MDBInput
                    placeholder="Father's Name"
                    type="text"
                    value={father_name}
                    name="father_name"
                    onChange={onInputChange}
                    className="form-control"
                    required
                    invalid
                    textarea
                    rows={4}
                    validation="Please provide description"
                  />
                </div>
                <div className="col-md-6">
                  <span>Gender</span>
                  {/* <MDBInput
                    placeholder="Gender"
                    value={Gender}
                    name="Gender"
                    onChange={onInputChange}
                    className="form-control"
                    required
                    invalid
                    textarea
                    rows={4}
                    validation="Please provide description"
                  /> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    style={{ marginLeft: "60px" }}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      onChange={datasuccess}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      onChange={datasuccess}
                    />
                  </RadioGroup>
                </div>
                <div className="col-md-6">
                  <span style={{ margin: "auto" }}>Age</span>
                  <MDBInput
                    placeholder="Age"
                    type="text"
                    value={Age}
                    name="Age"
                    onChange={onInputChange}
                    className="form-control"
                    required
                    invalid
                    textarea
                    rows={4}
                    validation="Please provide description"
                  />
                </div>
                <div className="col-md-12">
                  <span style={{ marginRight: "500px" }}>College Name:</span>
                  <MDBInput
                    placeholder="College Name"
                    type="text"
                    value={College_Name}
                    name="College_Name"
                    onChange={onInputChange}
                    className="form-control"
                    required
                    invalid
                    textarea
                    rows={4}
                    validation="Please provide description"
                  />
                </div>
                <div className="col-md-12">
                  <span style={{ marginRight: "500px" }}>Current Address:</span>
                  {/* <MDBInput
                placeholder="ha"
                type="text"
                value={Home_address}
                name="Home_address"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide description"
              /> */}
                  <textarea
                    class="form-control rounded-0"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    value={Home_address}
                    name="Home_address"
                    onChange={onInputChange}
                  ></textarea>
                </div>
                <div className="col-md-12">
                  <span style={{ marginRight: "500px" }}>College Address:</span>
                  {/* <MDBInput
                placeholder="Ca"
                type="text"
                value={College_Address}
                name="College_Address"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide description"
              /> */}
                  <textarea
                    class="form-control rounded-0"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    value={College_Address}
                    name="College_Address"
                    onChange={onInputChange}
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <span>Pass Duration (months)</span>
                  <MDBInput
                    placeholder="Pass_duration"
                    type="text"
                    value={Pass_duration}
                    name="Pass_duration"
                    onChange={onInputChange}
                    className="form-control"
                    required
                    invalid
                    textarea
                    rows={4}
                    validation="Please provide description"
                  />
                </div>
                <div className="col-md-6">
                  Pass Type
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    onChange={customPass}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Passtype" />
                    )}
                  />
                </div>

                <div className="d-flex justify-content-start">
                  <span style={{ marginRight: "10px" }}>{dis} Id</span>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setTourData({ ...tourData, imageFile: base64 })
                    }
                  />
                </div>
                <div className="d-flex justify-content-start">
                  <span style={{ marginRight: "10px" }}>{dis} Photo </span>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setTourData({ ...tourData, imageFile2: base64 })
                    }
                  />
                </div>

                <div className="col-12">
                  <MDBBtn
                    style={{ width: "100%", height: "50px", fontSize: "20px" }}
                  >
                    {id ? "Update" : `Proceed to Pay ${Pass_duration * 100}`}
                  </MDBBtn>

                  <MDBBtn
                    style={{ width: "100%" }}
                    className="mt-2"
                    color="danger"
                    onClick={handleClear}
                  >
                    Clear
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
      <Footer />
    </>
  );
};
const top100Films = [
  { label: "Student", value: 10 },
  { label: "Employee", value: 20 },
];

export default AddEditTour;
