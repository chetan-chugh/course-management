import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { COURSES_URL } from "../api/courses.js";
import CourseForm from "../components/CourseForm.jsx";

export default function AddCourse() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState(null);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(COURSES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((r) => r.json());

      if (!res.success) {
        setError(res.message || "Could not create course");
        setFieldErrors(res.errors || null);
        setSubmitting(false);
        return;
      }

      navigate(`/courses/${res.data._id}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="text-sm font-semibold text-blue-600 transition hover:text-blue-700">
          &larr; Back to course list
        </Link>
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          {/* <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">Catalog management</p> */}
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900">Add a Course</h1>
          <p className="mt-2 text-sm text-slate-500">Create a clear, useful listing for your learners.</p>
          {error && <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <div className="mt-7">
            <CourseForm
              submitLabel="Create Course"
              submitting={submitting}
              onSubmit={handleSubmit}
              onCancel={() => navigate("/")}
              serverErrors={fieldErrors}
            />
          </div>
        </div>
      </div>
    </div>
  );
}