// Local dataset for the SettingsTabs mini-app. Works fully offline.
// Kept here (not shared) so the module is self-contained.
//
//   home    General — welcome copy
//   profile Profile — your profile
//   billing Billing — plan + invoices
import type { Tab } from "../components/Tabs.tsx";

export const DEFAULT_TABS: Tab[] = [
  { id: "home", label: "General", content: "Welcome to your settings" },
  { id: "profile", label: "Profile", content: "Your profile details" },
  { id: "billing", label: "Billing", content: "Plan and invoices" },
];
