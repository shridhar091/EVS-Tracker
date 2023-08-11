import React from "react"
const Home = (props) => {
  // Function to generate a random color in hexadecimal format
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  };
  // Generate a random color for the welcome text
  const welcomeColor = getRandomColor()

  return (
    <div className="container">
      {/* <h1 style={{color:welcomeColor}}>welcome</h1> */}
      <div className="row divPadding">
        <div className="col-md-6">
          <header>
            <h3 className="display-6  mb-6" style={{ color: welcomeColor }}>Welcome to our Electric Vehicle Charging Station Tracker</h3>
          </header>
          <section>
            <h2 className="h4">About Us</h2>
            <p className="lead">
              Here at our charging station, we offer a wide range of charging
              options for electric vehicles from various manufacturers. Our
              stations are strategically located for your convenience.
            </p>
          </section>
          <section>
            <h2 className="h4">How to Book</h2>
            <p className="lead">
              To make a booking, you need to sign up or log in to your account.
              We offer different roles with specific privileges.
            </p>
            <p className="lead">
              Once logged in, you can choose a station, select a charging
              option, and specify the start and end date/time for your charging session.
              The booking will be confirmed, and you can start charging your vehicle
              at the selected station.
            </p>
          </section>
        </div>
        <div className="col-md-6">
          <img
            // src="https://t4.ftcdn.net/jpg/04/96/72/57/240_F_496725738_rLoyzy9qGeTUkqCVn5D7pW7ZA5ONiyiC.jpg"
            src="https://as1.ftcdn.net/v2/jpg/05/08/40/78/1000_F_508407822_XLb7LGJpPsXlLpCKg62DdsArQnd5EKvD.jpg"
            // src="https://t3.ftcdn.net/jpg/05/77/10/62/240_F_577106282_3B7CPA57xiU58xKv1H6OljGvOXfONHAu.jpg"
            alt="Electric"
            className="img-fluid rounded shadow"
            style={{ width: "100%", height: "auto", maxWidth: "600px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home