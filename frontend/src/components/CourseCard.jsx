import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format.js";

export default function CourseCard({ course }) {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{course.name}</h2>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{course.description}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
          <span className="rounded bg-gray-100 px-2 py-1">{course.duration}</span>
          <span className="rounded bg-gray-100 px-2 py-1">{course.level}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">{formatPrice(course.price)}</span>
        <Link
          to={`/courses/${course._id}`}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}