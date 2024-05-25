import React from "react";
import Contactbg from './contactbg.png'
const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // يمكنك إضافة رمز لمعالجة إرسال النموذج هنا
  };

  return (
<div >
      <div
      style={{
        textAlign: "center",
        padding: "50px",
        backgroundColor: "#f4f4f4",
      }}
    >   
     <div >
        <img src={Contactbg} style={{maxWidth:'100%',height:'300px'}}></img>
    </div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5em", marginBottom: "30px", color: "#333" }}>
          Get in Touch
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "50px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: "1",
              minWidth: "300px",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontSize: "1.2em",
                color: "#555",
                marginBottom: "10px",
                whiteSpace: "nowrap",
              }}
            >
              You can reach us:
            </p>
            <ul style={{ listStyle: "none", padding: "0" }}>
              <li style={{ marginBottom: "10px" }}>
                Email: example@example.com
              </li>
              <li style={{ marginBottom: "10px" }}>Phone: +1234567890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
          </div>

          <div style={{ flex: "1", minWidth: "300px", marginBottom: "20px" }}>
            <iframe
              title="Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.661783004528!2d31.37284231511277!3d31.03793398152947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585565f5e1c9f1%3A0x2e4bb89bd1fb1f30!2sMansoura%2C%20Dakahlia%20Governorate!5e0!3m2!1sen!2seg!4v1621934747449!5m2!1sen!2seg"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "500px", margin: "0 auto" }}
        >
          <input type="text" placeholder="Your Name" style={inputStyle} />
          <input type="email" placeholder="Your Email" style={inputStyle} />
          <textarea
            placeholder="Your Message"
            style={{ ...inputStyle, height: "150px" }}
          />
          <button type="submit" style={buttonStyle}>
            Send Message
          </button>
        </form>
      </div>
    </div>
</div>
  
  );
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "5px",
  border: "none",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  fontSize: "1em",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  fontSize: "1em",
  fontWeight: "bold",
  textTransform: "uppercase",
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

export default Contact;
