import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content">
      <div className="footer p-10 container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Brand */}
        <aside>
          <h2 className="text-xl font-bold mb-2">Chef Bazaar</h2>
          <p className="text-sm">
            Your trusted platform for delicious meals and professional chefs.
          </p>
        </aside>

        {/* Contact Details */}
        <nav>
          <h6 className="footer-title">Contact</h6>
          <p>Email: support@chefbazaar.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </nav>

        {/* Working Hours */}
        <nav>
          <h6 className="footer-title">Working Hours</h6>
          <p>Sat – Thu: 9:00 AM – 10:00 PM</p>
          <p>Friday: 3:00 PM – 11:00 PM</p>
        </nav>

        {/* Social Media */}
        <nav>
          <h6 className="footer-title">Follow Us</h6>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-primary">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-primary">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-primary">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-primary">
              <FaLinkedin />
            </a>
          </div>
        </nav>

      </div>

      {/* Copyright */}
      <div className="text-center py-4 border-t border-base-content/10">
        <p className="text-sm">
          © {new Date().getFullYear()} Chef Bazaar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
