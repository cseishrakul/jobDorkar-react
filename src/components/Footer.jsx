import { FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Left: Brand */}
        <div>
          <a href="/" className="text-blue-700 text-4xl font-bold">
            <img src="fav.png" className="w-10 h-10" alt="" />
          </a>
          <p className="text-sm text-gray-300 mt-5">
            Your trusted job portal to connect seekers & employers.
          </p>
        </div>

        {/* Center: Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline hover:text-blue-300">
                Home
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline hover:text-blue-300">
                Login
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="hover:underline hover:text-blue-300"
              >
                Signup
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:underline hover:text-blue-300">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Creator Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Developed By</h2>
          <p className="font-medium">Md. Ishrakul Islam</p>
          <div className="flex justify-center md:justify-start gap-4 mt-3 text-xl">
            <a
              href="https://ishrakul-islam.great-site.net/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portfolio"
            >
              <FaGlobe className="hover:text-blue-300 transition" />
            </a>
            <a
              href="https://www.linkedin.com/in/md-ishrakul-islam-efaz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="hover:text-blue-300 transition" />
            </a>
            <a
              href="https://x.com/EfazMd91503"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="hover:text-blue-300 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} JobDorkar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
