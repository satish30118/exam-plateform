import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-14 pt-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Mock-App */}
          <div>
            <h4 className="text-xl font-semibold text-white">Mock-App</h4>
            <p className="mt-4 text-gray-400">
              Mock-App is your one-stop solution for mock test papers for O Level, CCC, ADCA, DCA, A Level, and other competitive exams. Prepare better, perform best!
            </p>
          </div>

          {/* Important Links */}
          <div className="ml-6 "> 
            <h4 className="text-xl font-semibold text-white">Important Links</h4>
            <ul className="mt-4 text-gray-400">
              <li>
                <Link href="/exams/olevel" className="hover:text-white">
                  O Level Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/exams/ccc" className="hover:text-white">
                  CCC Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/exams/adca" className="hover:text-white">
                  ADCA Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/exams/dca" className="hover:text-white">
                  DCA Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/exams/alevel" className="hover:text-white">
                  A Level Mock Tests
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold text-white">Contact Us</h4>
            <ul className="mt-4">
              <li>
                <p className="text-gray-400">123 Mock Street, Exam City, India</p>
              </li>
              <li>
                <a href="mailto:contact@mockapp.com" className="hover:text-white">
                  contact@mockapp.com
                </a>
              </li>
              <li>
                <a href="tel:+911234567890" className="hover:text-white">
                  +91 123 456 7890
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold text-center text-white">Follow Us</h4>
            <div className="flex justify-evenly items-center mt-4">
              <Link href="https://facebook.com" className="text-blue-600 hover:text-blue-800">
                <FaFacebook size={24} />
              </Link>
              <Link href="https://twitter.com" className="text-blue-400 hover:text-blue-600">
                <FaTwitter size={24} />
              </Link>
              <Link href="https://instagram.com" className="text-pink-600 hover:text-pink-800">
                <FaInstagram size={24} />
              </Link>
              <Link href="https://linkedin.com" className="text-blue-700 hover:text-blue-900">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Mock-App. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;