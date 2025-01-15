import React from "react";
import moons_shoes from "../../assets/images/moons-shoe-rack.webp";
import "./About.css";
function About() {
  return (
    <div className="about-content">
      <div>
        <h2>
          About <span>Us</span>
        </h2>
        <br />
        <p>
          At Moons we make and sell shoes designed to feel like you’re floating
          on the moon. They’re light on your feet and comfortable, yet built for
          durability. We are a leading footwear retailer that uncovers the inner
          “sneakerhead” in all of us. With a strong history of sneaker
          prominence, we spark discovery and ignite the power of sneaker culture
          through our portfolio of innovative designs for men and woman.{" "}
          <a href=""> Learn More</a>.
        </p>
      </div>
      <img src={moons_shoes} alt="Shoe rack at Moons store" />
    </div>
  );
}

export default About;
