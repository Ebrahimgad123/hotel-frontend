import React, { useState, useEffect } from "react";
import RoomContainer from "./RoomContainer";
import { Col, Container, Row, Dropdown, DropdownButton } from "react-bootstrap";
import Loader from "./Loader";
import Error from "./Error";
import './Home.css'
import { DatePicker } from "antd";
import moment from "moment";

const Home = () => {
  const [data, setData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("All"); // Added state for selected room type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5010/api/getAllRoom");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const fetchedData = await response.json();
        setData(fetchedData);
        setOriginalData(fetchedData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData(); 
  }, []);

  useEffect(() => {
    if (selectedRange) {
      const formattedFromDate = moment(
        selectedRange[0].format("YYYY-MM-DD")
      ).format("DD_MM_YYYY");
      const formattedToDate = moment(
        selectedRange[1].format("YYYY-MM-DD")
      ).format("DD_MM_YYYY");

      const tempRoom = originalData.filter((room) => {
        const startDate = moment(formattedFromDate, "DD_MM_YYYY");
        const endDate = moment(formattedToDate, "DD_MM_YYYY");
        return isRoomAvailable(room, startDate, endDate);
      });

      setData(tempRoom);
    }
  }, [selectedRange, originalData]);

  useEffect(() => {
    // Filter by selected room type
    if (selectedRoomType !== "All") {
      const filteredRooms = originalData.filter(
        (room) => room.type.toLowerCase() === selectedRoomType.toLowerCase()
      );
      setData(filteredRooms);
    } else {
      setData(originalData);
    }
  }, [selectedRoomType, originalData]);

  const isRoomAvailable = (room, startDate, endDate) => {
    return room.currentBookings.every((booking) => {
      const bookingStartDate = moment(booking.fromDate, "DD_MM_YYYY");
      const bookingEndDate = moment(booking.toDate, "DD_MM_YYYY");
      return (
        endDate.isBefore(bookingStartDate) || startDate.isAfter(bookingEndDate)
      );
    });
  };

  const filterDates = (dates) => {
    setSelectedRange(dates);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    const searchTerm = e.target.value.toLowerCase();

    const filteredRooms = originalData.filter((room) =>
      room.name.toLowerCase().startsWith(searchTerm)
    );

    setData(filteredRooms);
  };

  const handleRoomTypeChange = (roomType) => {
    setSelectedRoomType(roomType);
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <Container>
      <Row
        className="mt-4 bs"
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "rgba(0,0,0,0.35) 0px 0px 15px",
        }}
      >
        <Col
          xl={4}
      
          style={{ marginBottom: "20px", minWidth: "200px", padding: "0 10px" }}
        >
          <DatePicker.RangePicker
            format="DD_MM_YYYY"
         
            style={{ height: "40px", width: "100%"
              
             }}
            onChange={filterDates}
          />
        </Col>
        <Col
          xl={4}
          style={{ marginBottom: "20px", minWidth: "200px", padding: "0 10px" }}
        >
          <input
            style={{
              width: "100%",
              height: "40px",
              padding: "0 10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            placeholder="Search For Room"
            type="search"
            value={searchInput}
            onChange={handleSearch}
          />
        </Col>
        <Col
          xl={4}
          style={{ marginBottom: "20px", minWidth: "200px", padding: "0 10px" }}
        >
          <DropdownButton
            title={`Filter By Room: ${selectedRoomType}`}
            onSelect={handleRoomTypeChange}
            variant="success" // Set variant to primary
          >
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Item eventKey="Deluxe">Deluxe</Dropdown.Item>
            <Dropdown.Item eventKey="Non Deluxe">Non Deluxe</Dropdown.Item>
            <Dropdown.Item eventKey="Suite">Suite</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

      {data &&
        data.map((item) => (
          <RoomContainer
            key={item.id}
            data={item}
            fromDate={
              selectedRange ? selectedRange[0].format("DD_MM_YYYY") : ""
            }
            toDate={selectedRange ? selectedRange[1].format("DD_MM_YYYY") : ""}
          />
        ))}
    </Container>
  );
};

export default Home;

