import Stepper from "../components/Stepper.jsx";
import { STEPS } from "../data/steps.js";

export default function Home() {
  return (
    <section className="ow-page" data-testid="home-page">
      <h1 className="ow-page-title">Let's get you set up</h1>
      <p className="ow-page-sub">{STEPS.length} quick steps</p>
      <Stepper steps={STEPS} />
    </section>
  );
}
