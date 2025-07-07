import { FiCalendar, FiClipboard, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    description,
    requirements,
    location,
    category_name,
    date_posted,
    company_logo,
    company_name,
  } = data;

  const formattedDate = new Date(date_posted).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDetailsClick = () => {
    navigate(`/jobs/${data.id}`, { state: { job: data } });
  };

  const fullLogoUrl = company_logo
    ? `https://res.cloudinary.com/dsgoi1hul/${company_logo}`
    : "/images/Linear.png";

  return (
    <>
      <section className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col gap-4">
        {/* Job Info */}
        <Link
          to={`/jobs/${id}`}
          className="flex gap-4 items-start flex-col sm:flex-row"
        >
          <img
            src={fullLogoUrl}
            alt="Company Logo"
            className="w-16 h-16 object-cover rounded-md bg-white"
          />

          <div>
            <h4 className="text-blue-600 mb-1 font-medium">{category_name}</h4>
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <h4 className="text-base font-medium mb-2">{company_name}</h4>

            <div className="text-black/70 text-sm flex flex-wrap gap-4 mb-2">
              <span className="flex items-center gap-1">
                <FiMapPin className="text-blue-600" />
                {location}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar className="text-blue-600" />
                {formattedDate}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-1 line-clamp-2">
              {description}
            </p>

            <p className="text-sm text-gray-600 flex items-center gap-2">
              <FiClipboard className="text-blue-600" /> {requirements}
            </p>
          </div>
        </Link>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleDetailsClick}
            className="bg-white cursor-pointer border-1 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-800 hover:text-white transition"
          >
            Details
          </button>
        </div>
      </section>
    </>
  );
};

export default Card;
