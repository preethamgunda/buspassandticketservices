import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";
import moment from "moment";
import { getTour } from "../redux/features/tourSlice";

const CardTour = ({
  imageFile,
  description,
  title,
  _id,
  name,
  gender,
  likes,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.googleId;
  const { tour } = useSelector((state) => ({ ...state.tour }));

  const dispatch = useDispatch();
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + " ...";
    }
    return str;
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        {/* <MDBCardImage
          src={imageFile}
          alt="Application"
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        /> */}
        <div className="top-left">{name}</div>
        <MDBCardBody>
          <MDBCardTitle className="text-start">Application no:</MDBCardTitle>
          {_id}
          {/* <small className="text-muted">
            {moment(tour.createdAt).fromNow()}
          </small> */}
          <MDBCardText className="text-start">
            <Link to={`/tour/${_id}`}>View More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
