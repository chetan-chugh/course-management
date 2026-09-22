import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COURSES_URL } from "../api/courses.js";
import CourseCard from "../components/CourseCard.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    setError("");
    fetch(COURSES_URL)
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) throw new Error(res.message || "Could not load courses");
        setCourses(res.data || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[radial-gradient(circle_at_80%_0%,#e8f1ff_0,rgba(232,241,255,0)_32rem)] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-8 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-blue-600">Learn something useful</p>
            <h1 className="font-display text-4xl font-bold leading-none tracking-[-0.04em] text-slate-900 sm:text-5xl md:text-6xl">Course List</h1>
          </div>
          <Link to="/courses/new" className="inline-flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-[0.65rem] bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 sm:w-auto">
            <span aria-hidden="true" className="text-xl font-normal leading-none">+</span>
            Add Course
          </Link>
        </div>

        {/* {error && <ErrorMessage message={error} onRetry={load} />} */}

        {loading ? (
          <Loader text="Loading courses..." />
        ) : courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-white/70 px-6 py-16 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-blue-100 text-2xl text-blue-600" aria-hidden="true">+</div>
            <h2 className="font-display text-xl font-semibold text-slate-900">No courses yet</h2>
            <p className="my-2 text-slate-500">Add your first course to start building the catalog.</p>
            <Link to="/courses/new" className="text-sm font-bold text-blue-600 hover:text-blue-700">Create a course</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div key={course._id} className="rounded-[0.85rem] border border-slate-200 bg-white/90 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}