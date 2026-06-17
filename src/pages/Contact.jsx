import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinema-bg pt-20">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase">Contact & Locations</h1>
          <p className="text-cinema-gray text-sm mt-2">Get in touch with our team or find cinema branch locations</p>
          <div className="w-16 h-1 bg-cinema-red mt-2"></div>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Details & Inquiry Form */}
          <div className="space-y-8">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider">General Contacts</h2>
              <div className="space-y-4 text-sm text-cinema-gray">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-cinema-red/10 text-cinema-red rounded-xl">
                    <Phone size={18} />
                  </span>
                  <div>
                    <span className="block text-xs font-semibold text-cinema-gold">Call Center / UAN</span>
                    <span className="text-white">+92 (51) 111-246-372 (CINE)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-cinema-gold/10 text-cinema-gold rounded-xl">
                    <Mail size={18} />
                  </span>
                  <div>
                    <span className="block text-xs font-semibold text-cinema-gold">Email Queries</span>
                    <span className="text-white">support@cinegold.com.pk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-6">Send an Inquiry</h2>
              
              {submitted && (
                <div className="bg-green-950/80 border border-green-500/20 text-green-400 p-4 rounded-xl text-xs flex items-center gap-2 mb-4">
                  <Check size={16} /> Thank you! Your message was submitted successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-cinema-gold uppercase tracking-wider mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-cinema-bg border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cinema-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cinema-gold uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full bg-cinema-bg border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cinema-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cinema-gold uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full bg-cinema-bg border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cinema-gold resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-cinema-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl tracking-wider uppercase transition-all duration-300 text-xs flex items-center gap-1.5 glow-red"
                >
                  Send Message <Send size={14} />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Branch Addresses & Google Maps Placeholder */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider">Branch Locations</h2>
              
              <div className="space-y-4 text-xs text-cinema-gray">
                <div className="flex gap-2">
                  <MapPin size={16} className="text-cinema-red mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white text-sm block">Islamabad Centaurus</strong>
                    <span>4th Floor, Centaurus Mall, Jinnah Avenue, Sector F-8, Islamabad</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <MapPin size={16} className="text-cinema-gold mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white text-sm block">Lahore Packages</strong>
                    <span>2nd Floor, Packages Mall, Walton Road, Lahore</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <MapPin size={16} className="text-cinema-red mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white text-sm block">Karachi Clifton</strong>
                    <span>5th Floor, Ocean Mall, Clifton Block 9, Karachi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Placeholder */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 h-72 relative flex items-center justify-center bg-zinc-900">
              {/* Visual Map Simulation */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
              
              <div className="relative text-center p-6 space-y-2 z-10">
                <MapPin className="mx-auto text-cinema-red animate-bounce" size={40} />
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">Interactive Map Simulation</h4>
                <p className="text-[11px] text-cinema-gray max-w-xs mx-auto">
                  Map placeholders for Centaurus Mall Islamabad, packages Mall Lahore, and Clifton Karachi.
                </p>
                <div className="pt-2">
                  <span className="text-[10px] bg-cinema-gold/15 text-cinema-gold border border-cinema-gold/25 font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                    GPS Active (PKT)
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
