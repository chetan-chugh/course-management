import { useState, useEffect } from "react";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

const EMPTY = {
  name: "",
  description: "",
  price: "",
  duration: "",
  instructor: "",
  level: "Beginner",
};

// Basic validation. Backend validates again - this is just for fast feedback.
function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Course name is required";
  else if (values.name.trim().length < 3) errors.name = "Must be at least 3 characters";

  if (!values.description.trim()) errors.description = "Description is required";
  else if (values.description.trim().length < 10) errors.description = "Must be at least 10 characters";

  if (values.price === "") errors.price = "Price is required";
  else if (Number(values.price) < 0) errors.price = "Price cannot be negative";

  if (!values.duration.trim()) errors.duration = "Duration is required";

  return errors;
}

export default function CourseForm({ initialValues, submitLabel, submitting, onSubmit, onCancel, serverErrors }) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});

  // serverErrors is a prop that can change after a failed submit (e.g. duplicate
  // name from the backend). Merge it into local error state so there's one
  // source of truth that handleChange can clear from.
  useEffect(() => {
    if (serverErrors) {
      setErrors((prev) => ({ ...prev, ...serverErrors }));
    }
  }, [serverErrors]);

  const handleChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
    // Clear this field's error the moment the user edits it, whether it came
    // from local validate() or from the backend.
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;
    onSubmit({ ...values, price: Number(values.price) });
  };

  const fieldError = (field) => errors[field];

  const inputClass = (field) =>
    `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
      fieldError(field) ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "border-slate-300"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Course Name</label>
        <input type="text" value={values.name} onChange={handleChange("name")} className={inputClass("name")} />
        {fieldError("name") && <p className="mt-1.5 text-xs text-red-600">{fieldError("name")}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Description</label>
        <textarea
          rows={4}
          value={values.description}
          onChange={handleChange("description")}
          className={inputClass("description")}
        />
        {fieldError("description") && <p className="mt-1.5 text-xs text-red-600">{fieldError("description")}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">Price (USD)</label>
          <input
            type="number"
            min="0"
            value={values.price}
            onChange={handleChange("price")}
            className={inputClass("price")}
          />
          {fieldError("price") && <p className="mt-1.5 text-xs text-red-600">{fieldError("price")}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">Duration</label>
          <input
            type="text"
            placeholder="e.g. 6 weeks"
            value={values.duration}
            onChange={handleChange("duration")}
            className={inputClass("duration")}
          />
          {fieldError("duration") && <p className="mt-1.5 text-xs text-red-600">{fieldError("duration")}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">Instructor (optional)</label>
          <input
            type="text"
            value={values.instructor}
            onChange={handleChange("instructor")}
            className={inputClass("instructor")}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">Level</label>
          <select value={values.level} onChange={handleChange("level")} className={inputClass("level")}>
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}