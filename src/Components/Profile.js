import React, { useEffect, useState } from 'react';
import { Button, Card, Space, Tabs } from 'antd';
import userPic from "./pic user.jpg";
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

const { TabPane } = Tabs;

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('currentUser')).temp;

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  return (
    <Tabs defaultActiveKey="1" className='ml-3 mt-3'>
      <TabPane  tab="Profile" key="1">
        <div style={{ padding: '2rem', color: '#333', border: '2px solid #ccc', borderRadius: '1rem', background: '#f8f8f8' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}><b>My Profile</b></h1>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <img src={userPic} style={{ width: '100%', maxWidth: '150px', maxHeight: '100%', marginBottom: '1rem' }} alt="User Profile" />
            <div style={{ marginLeft: '1rem', flex: '1' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Name:</h2>
                <p style={{ fontSize: '1rem' }}>{user.username}</p>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Email:</h2>
                <p style={{ fontSize: '1rem' }}>{user.email}</p>
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>isAdmin:</h2>
                <p style={{ fontSize: '1rem', color: user.isAdmin ? 'green' : 'red' }}>
                  {user.isAdmin ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane tab="Bookings" key="2">
        <MyBookings />
      </TabPane>
    </Tabs>
  );
};

export default Profile;

const storedUser = JSON.parse(localStorage.getItem('currentUser'));
const user = storedUser ? storedUser.temp : null;



const MyBookings = () => {
  const { Meta } = Card;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://backendhotel-1.onrender.com/api/getBookingByUserId', { userId: user._id });
        setRooms(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [user._id]);

  const handleCancelBooking = async (roomId) => {
    try {
      // Make a request to cancel the booking using the roomId
      await axios.post('http://localhost:5010/api/cancelBooking', { roomId });

      // Update the state or refetch the bookings
      const updatedRooms = rooms.filter((room) => room._id !== roomId);
      setRooms(updatedRooms);

      // Display SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Booking Canceled',
        text: 'Your booking has been canceled successfully!',
      });
    } catch (error) {
      console.log(error.message);

      // Display SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {rooms.map((room) => (
          <Card
            key={room._id}
            style={{ width: '100%', maxWidth: '300px', margin: '16px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          >
            <Meta
              title={<span style={{ color: '#1890ff', fontSize: '1.2rem', fontWeight: 'bold' }}>{room.room}</span>}
              description={<span style={{ color: '#666' }}><b>Status</b>: { room.status?'Confirmed':'canceled'}</span>}
            />
            <Space direction="vertical" style={{ marginTop: 16 }}>
              <p style={{ color: '#333' }}><b>Transaction ID</b>: {room.transactionId}</p>
              <p style={{ color: '#333' }}><b>Total Amount</b>: ${room.totalAmount}</p>
              <p style={{ color: '#333' }}><b>Total Days</b>: {room.totalDays}</p>
              <p style={{ color: '#333' }}>
              <b>Booking Dates</b>  : {room.fromDate} to {room.toDate}
              </p>
              <Button
                type="primary"
                onClick={() => handleCancelBooking(room._id)}
                style={{ backgroundColor: '#d9534f', borderColor: '#d9534f' }}
              >
                Cancel Booking
              </Button>
            </Space>
          </Card>
        ))}
      </div>
    </>
  );
};



