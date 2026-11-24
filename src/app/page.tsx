import { BottomNav } from "@/components/nav/BottomNav";
import { LeftRail } from "@/components/nav/LeftRail";
import { NoteProvider } from "@/components/nav/useNavAction";
import { AmbientLayer } from "@/components/AmbientLayer";
import { FirstFold, HeroOverlay } from "@/components/Hero";
import { HeroArt } from "@/components/HeroArt";
import { Footer } from "@/components/footer/Footer";
import { PageEffects } from "@/components/PageEffects";
import { SkipLink } from "@/components/SkipLink";
import { AboutSection } from "@/components/about/AboutSection";
import { Signature } from "@/components/about/Signature";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { WorkSection } from "@/components/work/WorkSection";

export default function HomePage() {
  return (
    <NoteProvider>
      <SkipLink />
      <LeftRail />
      <main id="main" className="relative z-10 lg:pl-16">
        {/* Hero: the illustration sits flush at the top; identity, eyebrow and headline overlay its top-left. */}
        <section id="hero" className="relative h-[clamp(380px,56svh,560px)] w-full overflow-hidden lg:-ml-16 lg:w-auto lg:h-[clamp(420px,calc(100svh-300px),780px)]">
          <HeroArt className="absolute inset-0" />
          <div
            aria-hidden
            className="hero-wash pointer-events-none absolute left-0 top-0 hidden h-[48%] w-[92%] sm:block lg:h-[min(52%,280px)] lg:w-[min(60vw,860px)]"
            style={{ background: "radial-gradient(ellipse 100% 100% at 0% 0%, rgb(var(--paper-rgb) / 0.88) 0%, rgb(var(--paper-rgb) / 0.7) 42%, rgb(var(--paper-rgb) / 0.3) 74%, rgb(var(--paper-rgb) / 0) 100%)" }}
          />
          {/* phones: a stronger, wider dark scrim so the light overlay text stays crisp where the tree leaves overlap */}
          <div aria-hidden className="hero-scrim pointer-events-none absolute left-0 top-0 h-[45%] w-full bg-gradient-to-b from-black/20 via-transparent to-transparent sm:hidden" />
          <div className="absolute left-4 right-3 top-4 z-10 sm:left-5 sm:right-5 lg:left-[max(104px,6vw)] lg:right-auto lg:top-5 lg:w-[min(60vw,860px)]">
            <HeroOverlay />
          </div>
        </section>
        <FirstFold />
        <WorkSection />
        <ExperienceSection />
        <Testimonials />
        <AboutSection />
        <Signature />
        <Footer />
      </main>
      <AmbientLayer />
      <BottomNav />
      <PageEffects />
    </NoteProvider>
  );
}
