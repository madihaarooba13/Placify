"use client";
import React, { useState } from "react";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support Form Submitted:", formData);
    alert("Your message has been sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const faqs = [
    {
      question: "How do I register for placements?",
      answer: "Go to the Placement section and fill in your details. Our mentors will guide you further.",
    },
    {
      question: "Can I access AI chatbot for interview prep?",
      answer: "Yes! Navigate to the AI Chatbot section to get instant answers and practice questions.",
    },
    {
      question: "How to contact mentors?",
      answer: "You can use the contact form below or join our Discord community for real-time support.",
    },
  ];

  return (
    <main className="min-h-screen bg-sky-50 p-20">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-800 mb-4">
          Need Help? We are Here!
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Placify support makes your placement journey smooth. Chat, read FAQs, or contact us directly.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-sky-700 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <summary className="font-medium text-gray-800">{faq.question}</summary>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-sky-700 mb-6 text-center">Contact Us</h2>
        <form
          className="bg-white p-8 rounded-xl shadow-lg space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-sky-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-sky-700 transition-transform duration-300 hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* AI Chatbot Placeholder */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-sky-700 mb-6 text-center">AI Chatbot</h2>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-gray-700 mb-4">Ask your placement questions here!</p>
          <button className="bg-sky-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-sky-700 transition-transform duration-300 hover:scale-105">
            Launch Chatbot 🤖
          </button>
        </div>
      </section>
    </main>
  );
};

export default SupportPage;
