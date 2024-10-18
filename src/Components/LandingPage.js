import React from "react";
import { useNavigate } from "react-router-dom";
import "./stylesLandingPage/main.css";
import image1 from "./assetsLandingPage/images/image1.png";
import image2 from "./assetsLandingPage/images/image2.png";
import image3 from "./assetsLandingPage/images/image3.png";
import image4 from "./assetsLandingPage/images/image4.png";
import image5 from "./assetsLandingPage/images/image5.png";
import image6 from "./assetsLandingPage/images/image6.png";
import profile1 from "./assetsLandingPage/images/profile1.png";
import profile2 from "./assetsLandingPage/images/profile2.png";
import profile3 from "./assetsLandingPage/images/profile3.png";
import imgbg from "./assetsLandingPage/images/bg_feedback.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };
  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <div>
      <header className="d-flex align-items-center" id="home">
        <div className="container" data-aos="fade-right">
          <h1>
            Stay with us feel <br />
            like home
          </h1>
          <a
            href="#"
            className="btn btn-book-now px-4 mt-4"
            onClick={handleClick}
          >
            Book Now
          </a>
        </div>
      </header>

      <section className="section-gallery" id="section-gallery">
        <div className="header text-center">
          <h2>Gallery</h2>
          <p>The beautiful moment that we shot</p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4" data-aos="zoom-in-up">
              <img src={image1} alt="" />
            </div>
            <div className="col-12 col-md-4" data-aos="zoom-in-up">
              <img src={image2} alt="" />
            </div>
            <div className="col-12 col-md-4" data-aos="zoom-in-up">
              <img src={image3} alt="" />
            </div>
            <div className="col-12 col-md-4" data-aos="zoom-in-up">
              <img src={image4} alt="" />
            </div>
            <div className="col-12 col-md-4" data-aos="zoom-in-up">
              <img src={image5} alt="" />
            </div>
            <div className="col-12 col-md-4" data-aos="zoom-in-up">
              <img src={image6} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-feedback"
        id="section-feedback"
        style={{ backgroundImage: { imgbg }, backgroundRepeat: "no-repeat" }}
      >
        <div className="header text-center">
          <h2>Feedback</h2>
          <p>Feedback from our client for the Hotel</p>
        </div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            {/* First feedback card */}
            <div className="col-12 col-md-4 mb-4">
              <div
                className="card"
                style={{ color: "red", backgroundColor: "#002E50" }}
              >
                <div
                  className="card-body d-flex flex-column align-items-center border feedback-item"
                  data-aos="zoom-in-up"
                >
                  <div className="profile">
                    <img src={profile1} alt="" />
                  </div>
                  <span>Mamat Alcatroz</span>
                  <p
                    className="text-center feedback"
                    style={{ color: "white" }}
                  >
                    “ Wow, its a best Hotel ever i visit in My life. Thankyou
                    for the services ”
                  </p>
                </div>
              </div>
            </div>

            {/* Second feedback card */}
            <div className="col-12 col-md-4 mb-4">
              <div
                className="card"
                style={{ color: "red", backgroundColor: "#002E50" }}
              >
                <div
                  className="card-body d-flex flex-column align-items-center border feedback-item"
                  data-aos="zoom-in-up"
                >
                  <div className="profile">
                    <img src={profile2} alt="" />
                  </div>
                  <span>Sofia The Princes</span>
                  <p
                    className="text-center feedback"
                    style={{ color: "white" }}
                  >
                    “ The services in this Hotel very good, here I’m like a
                    princess. ”
                  </p>
                </div>
              </div>
            </div>

            {/* Third feedback card */}
            <div className="col-12 col-md-4 mb-4">
              <div
                className="card"
                style={{ color: "red", backgroundColor: "#002E50" }}
              >
                <div
                  className="card-body d-flex flex-column align-items-center border feedback-item"
                  data-aos="zoom-in-up"
                >
                  <div className="profile">
                    <img src={profile3} alt="" />
                  </div>
                  <span>Mamat Alcatroz</span>
                  <p
                    className="text-center feedback"
                    style={{ color: "white" }}
                  >
                    “ This Hotel has a good view in a Deluxe Room. ”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-help">
        <div className="container d-flex justify-content-center">
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-i-need-help mr-3"
              onClick={handleContact}
            >
              I Need Help
            </button>
            <button
              type="button"
              className="btn btn-book-now ml-3"
              onClick={handleClick}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3">
              <h5>Features</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Reviews</a>
                </li>
                <li>
                  <a href="#">Community</a>
                </li>
                <li>
                  <a href="#">Social Media Kit</a>
                </li>
                <li>
                  <a href="#">Affiliate</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-3 col-sm-6 col-md-3">
              <h5>Account</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Refund</a>
                </li>
                <li>
                  <a href="#">Security</a>
                </li>
                <li>
                  <a href="#">Awards</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <h5>Hotels</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Career</a>
                </li>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Media</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <h5>Get Connected</h5>
              <ul className="list-unstyled">
                <li>Bandung Barat</li>
                <li>Indonesia</li>
                <li>0812 - 3456 -7890</li>
                <li>support@panahotel.com</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-fluid copyright">
          <hr />
          <div className="d-flex justify-content-center align-items-center">
            <span>Copyright Pana Hotel - 2021 </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
