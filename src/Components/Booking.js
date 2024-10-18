// Import necessary libraries
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {Button,Col,Container,Row,Spinner,ProgressBar,} from "react-bootstrap";
import "./Booking.css";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Loader from "./Loader";

const Booking = () => {
  let { roomId, fromDate, toDate } = useParams();

  // State variables
  const [data, setData] = useState(null);
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState(70); // State for progress bar
  const toDateMoment = moment(toDate, "DD_MM_YYYY");
  const fromDateMoment = moment(fromDate, "DD_MM_YYYY");
  const totalDays = toDateMoment.diff(fromDateMoment, "days") + 1;
  const totalAmount = totalDays * room.rentPerDay;
  const currentUserData = localStorage.getItem("currentUser");
  const username = currentUserData? JSON.parse(currentUserData)?.temp?.username: "";

  // Fetch data and set loading state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://hotel--backend.up.railway.app/api/getAllRoom",);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        // Handle error if needed
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    fetchData();
  }, []);

  // Set room details when data and roomId are available
  useEffect(() => {
    if (data && roomId) {
      const foundRoom = data.find((item) => item._id === roomId);
      setRoom(foundRoom);
    }
  }, [data, roomId]);

  // Handle payment processing
  async function onToken(token) {
    setIsProcessing(true);
    setShowLoader(true);

    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      if (parsedUser && parsedUser.temp) {
        const bookingDetails = {
          room,
          userId: parsedUser.temp._id,
          fromDate,
          toDate,
          totalAmount,
          totalDays,
          token,
        };

        try {
          // Simulate progress with a timer
          const progressInterval = setInterval(() => {
            setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
          }, 500);

          const result = await axios.post(
            "https://hotel--backend.up.railway.app/api/bookings",
            bookingDetails,
          );

          clearInterval(progressInterval); // Clear the progress interval

          if (result) {
            Swal.fire({
              icon: "success",
              title: "Congratulations..!",
              text: `The operation has been completed successfully. We are so happy and ${totalAmount}$ has been deducted from your credit.`,
            }).then(() => {
              setIsProcessing(false);
              setShowLoader(false);
              setProgress(0);
              window.location.replace("/profile");
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...!",
            text: "An error occurred during payment. Please try again.",
          }).then(() => {
            setIsProcessing(false);
            setShowLoader(false);
            setProgress(0);
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...!",
          text: "Please log in or register first.",
        }).then(() => {
          setIsProcessing(false);
          setShowLoader(false);
          setProgress(0);
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...!",
        text: "Please log in or register first.",
      }).then(() => {
        setIsProcessing(false);
        setShowLoader(false);
        setProgress(0);
      });
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Container
      style={{
        marginTop: "30px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.7)",
      }}
    >
      <Row xs={1} xl={2}>
        <Col>
          <h1>{room.name}</h1>
          {room.imageUrl && (
            <img
              id="img"
              style={{
                marginBottom: "30px",
                borderRadius: "5px",
              }}
              src={room.imageUrl[1]}
              alt="Room"
            />
          )}
        </Col>
        <Col>
          <div style={{ marginTop: "30px" }}>
            <h3>Booking Details</h3>
            <hr></hr>
            <b>
              <p>Name: {username}</p>
              <p>FromDate: {fromDate}</p>
              <p>ToDate: {toDate}</p>
              <p>MaxCount: {room.maxCount}</p>
            </b>
          </div>
          <div id="has">
            <div>
              <h3>Amount</h3>
              <hr></hr>
              <b>
                <p>Total Days: {totalDays + " Days"}</p>
                <p>Rent per Days: {room.rentPerDay}</p>
                <p>Total Amount: {totalAmount}$</p>
              </b>
            </div>
            <div>
              {localStorage.getItem("currentUser") ? (
                <>
                  <StripeCheckout
                    token={onToken}
                    stripeKey="pk_test_51Oeb4QGKxFmziudOyHXfdMKk0BEdBfLtYZmwlYkyEgN5zvEH0Usk9dFMUV68RmBzKEbs5Xg3vGUestw4CPiMST5g00kSHQ6EV6"
                    name={room.name}
                    amount={totalAmount * 100}
                    currency="USD"
                    disabled={isProcessing}
                  />
                  {showLoader && (
                    <>
                      <div style={{ marginTop: "10px" }}>
                        <ProgressBar now={progress} label={`${progress}%`} />
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <Spinner animation="border" variant="primary" />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Button variant="danger">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/login"
                  >
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Booking;
