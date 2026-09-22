import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { COURSE_URL } from "../api/courses.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { formatPrice } from "../utils/format.js";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const load = () => {
    setLoading(true);
    fetch(COURSE_URL(id))
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) throw new Error(res.message || "Could not load course");
        setCourse(res.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(COURSE_URL(id), { method: "DELETE" }).then((r) => r.json());
      if (!res.success) throw new Error(res.message || "Could not delete course");
      navigate("/");
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (!showDeleteDialog) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !deleting) setShowDeleteDialog(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showDeleteDialog, deleting]);

  if (loading) return <Loader text="Loading course..." />;

  if (error && !course) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <ErrorMessage message={error} onRetry={load} />
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700">
          &larr; Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-73px)] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-between">
          <Link to="/" className="text-sm font-semibold text-blue-600 transition hover:text-blue-700">
            &larr; Back to course list
          </Link>
          <Link
            to="/courses/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Add New Course
          </Link>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
          <div className="bg-slate-900 px-6 py-8 text-white sm:px-10 sm:py-10">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-300">Course details</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{course.name}</h1>
            <p className="mt-4 max-w-2xl text-slate-300">{course.description}</p>
          </div>
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Price</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{formatPrice(course.price)}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Duration</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{course.duration}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Level</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{course.level}</p>
              </div>
            </div>

            {course.instructor && <p className="mt-5 text-sm text-slate-500">Taught by <span className="font-semibold text-slate-700">{course.instructor}</span></p>}

            {error && <ErrorMessage message={error} />}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/courses/${id}/edit`} className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                Edit course
              </Link>
              <button onClick={() => setShowDeleteDialog(true)} disabled={deleting} className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50">
                Delete course
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deleting) setShowDeleteDialog(false);
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-7"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-course-title"
            aria-describedby="delete-course-description"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600" aria-hidden="true">
              <span className="text-xl font-bold">!</span>
            </div>
            <h2 id="delete-course-title" className="mt-5 font-display text-xl font-bold text-slate-900">Delete this course?</h2>
            <p id="delete-course-description" className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure want to permanently delete <span className="font-semibold text-slate-700">{course.name}</span> Course?
            </p>
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteDialog(false)}
                disabled={deleting}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, delete course"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}