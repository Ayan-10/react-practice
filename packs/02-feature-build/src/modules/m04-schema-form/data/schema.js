// Local schema for the JobApply mini-app. Works fully offline.
// The application form is DATA — a plain array of field descriptors that the
// feature component (components/SchemaForm.jsx) turns into a live form.
//
// Field shape: { name, label, type, required }
//   - type    : "text" | "email" | "number"
//   - required: required fields must be non-empty on submit
//   - email   : email fields must contain "@"
//
// The candidate applying:
//   name  (text, required)
//   email (email, required)
//   age   (number, optional — coerced to Number in the emitted payload)

export const APPLICATION_SCHEMA = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "age", label: "Age", type: "number", required: false },
];

/** Job the candidate is applying for (used by the pages for flavour). */
export const JOB = {
  title: "Frontend Engineer",
  company: "Acme Corp",
  location: "Remote",
};
