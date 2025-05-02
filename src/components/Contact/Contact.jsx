import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-content">
      <h2>
        Contact Us
      </h2>
      <br />
      <span>
        <h4>Moons Inc. Headquaters</h4>
      </span>
      <p>1028 2nd Street
      <br />

        Sacramento, CA 95814
        <br />

        <a href="tel:555-555-8888">555-555-8888</a>

        <a href="mailto:customerservice@moons.com">customerservice@moons.com</a>

      </p>
    </div>
  );
}

export default Contact;
