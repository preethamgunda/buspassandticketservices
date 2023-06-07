import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getTour } from "../redux/features/tourSlice";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour } = useSelector((state) => ({ ...state.tour }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <MDBContainer style={{ marginTop: "120px" }}>
        <MDBCard className="mb-3 mt-2">
          <MDBCardTitle>
            The following details have been submitted successfully.
          </MDBCardTitle>
          <MDBCardBody>
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/")}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
            </MDBBtn>
            <h3>{tour.title}</h3>
            {/* <span>
              <p className="text-start tourName">Created By: {tour.name}</p>
            </span> */}
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <h5>Submitted By </h5>
              <h6 className="text-muted">{user?.result?.name}</h6>
            </MDBCardText>
            <MDBCardText className="text-start mt-2">
              <h5>Submission Date </h5>
              <h6 className="text-muted">{moment(tour.createdAt).fromNow()}</h6>
            </MDBCardText>
            <h5>Application id: {id}</h5>
            <h5>First Name: {tour?.first_name}</h5>
            <h5>Last Name: {tour?.last_name}</h5>
            <h5>Father's Name: {tour?.father_name}</h5>
            <h5>Gender: {tour?.Gender}</h5>
            <h5>Age: {tour?.Age}</h5>
            <h5>College_Name :{tour?.College_Name}</h5>
            <h5>Current-Address: {tour?.Home_address}</h5>
            <h5>College Address: {tour?.Age}</h5>
            <h5>Tenure Of Pass (in months): {tour?.Pass_duration}</h5>
            <h5>Documents Uploaded:</h5>
            <MDBCardImage src={tour.imageFile} />
            <MDBCardImage src={tour.imageFile2} />
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default SingleTour;
