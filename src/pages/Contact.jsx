import React from 'react';
import { Mail, Phone, MapPin, Send, Heart, Smartphone } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-8 h-8 text-yellow-500" />,
      title: "Email Us",
      content: "wangigehotstar@gmail.com",
      link: "mailto:wangigehotstar@gmail.com"
    },
    {
      icon: <Phone className="w-8 h-8 text-yellow-500" />,
      title: "Call Us",
      content: "+254 718 266 432 / +254 724 013 599",
      link: "tel:+254718266432"
    },
    {
      icon: <MapPin className="w-8 h-8 text-yellow-500" />,
      title: "Visit Us",
      content: "Wangige, Kiambu, Kenya",
      link: "#"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/30 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have a question, a suggestion, or just want to say hello, we're here for you.
          </p>
        </div>
      </section>

      {/* Contact Info and Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-bold mb-8 text-yellow-500">Contact Information</h2>
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <a href={item.link} className="text-gray-300 hover:text-yellow-400 transition-colors text-lg break-all">
                        {item.content}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
              <h2 className="text-4xl font-bold mb-8 text-yellow-500">Send a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input type="text" id="name" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea id="message" rows="5" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <Send size={20} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-yellow-500">Support the Team</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
            Your generous support helps us nurture local talent, maintain our facilities, and compete at the highest level. Every contribution, big or small, makes a huge difference.
          </p>
          <div className="max-w-md mx-auto bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl border border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <Heart className="w-10 h-10 text-red-500" />
              <h3 className="text-3xl font-bold text-white">Donate via M-Pesa</h3>
            </div>
            <p className="text-gray-400 mb-4">
              You can send your donation to our official M-Pesa Till Number.
            </p>
            <div className="bg-green-600 text-white p-4 rounded-xl mb-6">
              <p className="text-lg">Till Number:</p>
              <p className="text-4xl font-bold tracking-widest">123456</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-400">
                <Smartphone size={20} />
                <span>Lipa na M-Pesa</span>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-96 bg-gray-800">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.869042855446!2d36.70988931475916!3d-1.249672999087695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f19341954f5e1%3A0x770223559a083a4!2sWangige%2C%20Kenya!5e0!3m2!1sen!2sus!4v1678886797849!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </section>
    </div>
  );
};

export default Contact;