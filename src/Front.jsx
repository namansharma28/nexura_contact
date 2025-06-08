import React, { useState } from "react";
import "./EvolvEdge.css";

export default function EvolvEdge() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: data.message });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <div className="evolvedge-container">
      {/* Logo and Heading */}
      <div className="header">
        <div className="logo">FE</div>
        <div className="brand-name">EvolvEdge</div>
        <div className="tagline">Innovate Design Deliver</div>
      </div>

      {/* About Us */}
      <div className="about-us">
        <h2>About Us</h2>
        <p>
          We are a creative agency specializing in crafting cutting-edge digital experiences.
          Our expertise lies in web development, 3D animation and UI design. We strive to
          transform ideas into visually engaging and functional solutions for businesses.
        </p>
      </div>

      {/* Services Section */}
      <div className="services">
        <div className="service-box">
          <div className="service-icon">💻</div>
          <h3>Web Development</h3>
          <p>Building modern, responsive websites tailored to your needs.</p>
        </div>
        <div className="service-box">
          <div className="service-icon">📦</div>
          <h3>3D Animation</h3>
          <p>Creating captivating and immersive 3D content.</p>
        </div>
        <div className="service-box">
          <div className="service-icon">🖼️</div>
          <h3>UI Design</h3>
          <p>Designing intuitive, and engaging user interfaces.</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-us">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="textarea"
            required
          ></textarea>
          <button type="submit" className="submit-button">
            {status.type === "loading" ? "Sending..." : "Send Message"}
          </button>
          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
