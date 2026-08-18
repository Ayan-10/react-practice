import { useState } from "react";
import SettingsForm from "../components/SettingsForm.jsx";

export default function Home() {
  // Keeps the last-saved profile so the page has somewhere to store it.
  const [savedProfile, setSavedProfile] = useState(null);

  return (
    <section className="ps-page" data-testid="home-page">
      <h1 className="ps-page-title">Profile</h1>
      <p className="ps-page-sub">Edit your public profile. Changes preview live.</p>

      <SettingsForm onSave={setSavedProfile} />

      {savedProfile && (
        <p className="ps-hint" data-testid="last-saved">
          Last saved as {savedProfile.name} ({savedProfile.email})
        </p>
      )}
    </section>
  );
}
