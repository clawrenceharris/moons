import React from "react";
import "./About.css";
import { Link } from "react-router-dom";
function About() {
  return (
    <div className="about-container">
      <div>
        <h2>About Us</h2>
        <div className="content-body">
          <p>
            At Moons we make and sell shoes designed to feel like you’re
            floating on the moon. They’re light on your feet and comfortable,
            yet built for durability. We are a leading footwear retailer that
            uncovers the inner “sneakerhead” in all of us. With a strong history
            of sneaker prominence, we spark discovery and ignite the power of
            sneaker culture through our portfolio of innovative designs for men
            and woman.{" "}
            <Link to={"/"} className="link">
              Learn More
            </Link>
            .
          </p>
        </div>
        <div>
          <div className="content-row justify-between">
            <div>
              <span>
                <h4>Moons Inc. Headquaters</h4>
              </span>
              <p>
                1028 2nd Street
                <br />
                Sacramento, CA 95814
                <br />
              </p>
              <a href="tel:555-555-8888">555-555-8888</a>
              <br />
              <a href="mailto:customerservice@moons.com">
                customerservice@moons.com
              </a>
            </div>
            <img
              src={require("../../assets/images/about.png")}
              alt="Big shoe with a bunch of smaller shoes attached to it"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
