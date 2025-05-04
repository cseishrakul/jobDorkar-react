import { FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left */}
        <div className="text-xl font-bold">JobDorkar</div>

        {/* Center */}
        <div className="flex gap-6 text-sm md:text-base">
          <a href="/" className="hover:underline">Home</a>
          <a href="/login" className="hover:underline">Login</a>
          <a href="/signup" className="hover:underline">Signup</a>
          <a href="/blog" className="hover:underline">Blog</a>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="font-semibold">Md. Ishrakul Islam</p>
          <div className="flex gap-4 text-xl">
            <a href="https://ishrakul-islam.great-site.net/" target="_blank" rel="noopener noreferrer">
              <FaGlobe className="hover:text-gray-300" />
            </a>
            <a href="https://www.linkedin.com/in/md-ishrakul-islam-efaz/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-gray-300" />
            </a>
            <a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-gray-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
