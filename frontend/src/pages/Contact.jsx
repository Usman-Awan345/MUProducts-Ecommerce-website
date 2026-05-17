import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  FaClock,
  FaEnvelope,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";
import Footer from "../components/Footer";
import Title from "../components/Title";

const contactCards = [
  {
    icon: <FaPhone />,
    label: "Call Us",
    value: "+92 320 5477 000",
    detail: "Mon to Sat, 9:00 AM - 8:00 PM",
  },
  {
    icon: <FaEnvelope />,
    label: "Email Support",
    value: "ua3205477@gmail.com",
    detail: "We usually reply within 24 hours",
  },
  {
    icon: <FaLocationDot />,
    label: "Store Location",
    value: "Lahore, Pakistan",
    detail: "Online orders available nationwide",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      toast.error("Please fill all contact fields");
      return;
    }

    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:ua3205477@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    toast.success("Opening your email app");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      <section className="bg-primary mb-16">
        <div className="max-padd-container py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-14 items-start">
            <div className="flex flex-col gap-7">
              <Title
                title1={"Get In"}
                title2={" Touch"}
                titleStyles={"pb-2"}
                paraStyles={"!block max-w-lg"}
              />

              <div className="bg-white rounded-xl p-5 sm:p-7">
                <h4 className="h4">How can we help?</h4>
                <p className="mb-6">
                  Have a question about products, sizing, delivery, or your
                  order? Send us a message and our team will guide you.
                </p>

                <div className="grid grid-cols-1 gap-4">
                  {contactCards.map((card) => (
                    <div
                      key={card.label}
                      className="flex items-start gap-4 rounded-lg bg-primary p-4"
                    >
                      <span className="flexCenter h-11 w-11 shrink-0 rounded-full bg-secondary text-white">
                        {card.icon}
                      </span>
                      <div>
                        <h5 className="h5">{card.label}</h5>
                        <p className="medium-14 !text-tertiary">{card.value}</p>
                        <p className="regular-14">{card.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 bg-tertiary text-white rounded-xl p-5">
                <span className="flexCenter h-11 w-11 shrink-0 rounded-full bg-white text-secondary">
                  <FaClock />
                </span>
                <div>
                  <h5 className="h5 !text-white">Support Hours</h5>
                  <p className="!text-gray-10">
                    Monday to Saturday, 9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl p-5 sm:p-8 shadows"
            >
              <h3 className="h3">Send Message</h3>
              <p className="mb-7">
                Fill out the form and we will get back to you as soon as
                possible.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="medium-14 text-tertiary">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg bg-primary px-4 py-3 outline-none ring-1 ring-slate-900/5 focus:ring-secondary"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="medium-14 text-tertiary">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg bg-primary px-4 py-3 outline-none ring-1 ring-slate-900/5 focus:ring-secondary"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="medium-14 text-tertiary">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg bg-primary px-4 py-3 outline-none ring-1 ring-slate-900/5 focus:ring-secondary"
                  placeholder="Order, product, delivery..."
                />
              </div>

              <div className="mt-4">
                <label className="medium-14 text-tertiary">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="mt-2 w-full resize-none rounded-lg bg-primary px-4 py-3 outline-none ring-1 ring-slate-900/5 focus:ring-secondary"
                  placeholder="Write your message here"
                />
              </div>

              <button type="submit" className="btn-secondary mt-6">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
