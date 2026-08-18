import { useState } from "react";
import SchemaForm from "../components/SchemaForm.jsx";
import { APPLICATION_SCHEMA, JOB } from "../data/schema.js";

export default function Home() {
  const [lastApplication, setLastApplication] = useState(null);

  return (
    <section className="ja-page" data-testid="home-page">
      <h1 className="ja-page-title">Apply for {JOB.title}</h1>
      <p className="ja-page-sub">
        {JOB.company} · {JOB.location}
      </p>
      {/* The feature under construction lives here. */}
      <SchemaForm schema={APPLICATION_SCHEMA} onSubmit={setLastApplication} />

      {lastApplication && (
        <div className="ja-receipt" data-testid="apply-receipt">
          <h3>Application received ✅</h3>
          <p>
            Thanks {lastApplication.name}, we&apos;ll email {lastApplication.email}.
          </p>
        </div>
      )}
    </section>
  );
}
