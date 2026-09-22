const BASE_URL = import.meta.env.Backend_URL || "http://localhost:5000";

export const COURSES_URL = `${BASE_URL}/api/courses`;
export const COURSE_URL = (id) => `${BASE_URL}/api/courses/${id}`;