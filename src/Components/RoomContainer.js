import React from "react";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomContainer = ({ data, fromDate, toDate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columnStyle = {
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
  };

  return (
    <Row className="justify-content-center mt-3">
      <Col
        xs={12}
        md={10}
        xl={5}
        style={{ ...columnStyle, marginRight: "5px" }}
      >
        <img
          onClick={handleShow}
          src={data.imageUrl[1]}
          alt=""
          style={{ width: "100%", height: "200px", borderRadius: "5px" }}
        />
      </Col>
      <Col xs={12} md={10} lg={3} style={{ ...columnStyle, marginLeft: "5px" }}>
        <div className="d-flex flex-column">
          <h4>{data.name}</h4>
          <b>
            <p>MaxCount: {data.maxCount}</p>
            <p>PhoneNumber: {data.phoneNumber}</p>
            <p>Type: {data.type}</p>
          </b>
          <div>
            {/* ببعت مع اللينك القيم دى */}
            <Link
              to={`./book/${data._id}/${fromDate ? fromDate : "unknown"}/${toDate ? toDate : "unknown"}`}
            >
              {fromDate == "" && toDate == "" ? (
                ""
              ) : (
                <button className="btn btn-success">Book Now</button>
              )}
            </Link>

            <button className="btn btn-success m-2" onClick={handleShow}>
              View Details
            </button>
          </div>
        </div>
      </Col>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={data.imageUrl[0]}
                alt="First slide"
                style={{ height: "400px", width: "900" }}
              />

              <h3>lorem ispsm cghc vvogv</h3>
              <p>{data.description}</p>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={data.imageUrl[1]}
                alt="Second slide"
                style={{ height: "400px", width: "900" }}
              />

              <h3>nknlb vvhjv</h3>
              <p>{data.description}</p>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={data.imageUrl[2]}
                alt="Third slide"
                style={{ height: "400px", width: "900" }}
              />

              <h3>vgvgvjh hbhbjbkbk</h3>
              <p>{data.description}</p>
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default RoomContainer;
