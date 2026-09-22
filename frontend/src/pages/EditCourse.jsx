import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { COURSE_URL } from "../api/courses.js";
import CourseForm from "../components/CourseForm.jsx";
import Loader from "../components/Loader.jsx";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState(null);

  useEffect(() => {
    fetch(COURSE_URL(id))
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) throw new Error(res.message || "Could not load course");
        setCourse(res.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(COURSE_URL(id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((r) => r.json());

      if (!res.success) {
        setError(res.message || "Could not update course");
        setFieldErrors(res.errors || null);
        setSubmitting(false);
        return;
      }

      navigate(`/courses/${id}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) return <Loader text="Loading course..." />;
  if (!course) return <p className="mx-auto max-w-2xl px-4 py-16 text-center text-red-600">{error || "Course not found"}</p>;

  return (
    <div className="min-h-[calc(100vh-73px)] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <Link to={`/courses/${id}`} className="text-sm font-semibold text-blue-600 transition hover:text-blue-700">
          &larr; Back to course
        </Link>
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">Catalog management</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900">Edit Course</h1>
          {error && <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <div className="mt-7">
            <CourseForm
              initialValues={{
                name: course.name,
                description: course.description,
                price: String(course.price),
                duration: course.duration,
                instructor: course.instructor || "",
                level: course.level,
              }}
              submitLabel="Save Changes"
              submitting={submitting}
              onSubmit={handleSubmit}
              onCancel={() => navigate(`/courses/${id}`)}
              serverErrors={fieldErrors}
            />
          </div>
        </div>
      </div>
    </div>
  );
}