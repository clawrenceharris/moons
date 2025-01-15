import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-content">
      <h2>
        Contact <span>Us</span>
      </h2>
      <br />
      <span>
        <h4>Moons Inc. Headquaters</h4>
      </span>
      <br />
      <p>1028 2nd Street Sacramento, CA 95814</p>
      <br />
      <a href="tel:555-555-8888">555-555-8888</a>
      <br />
      <a href="mailto:customerservice@moons.com">customerservice@moons.com</a>
    </div>
  );
}

export default Contact;
