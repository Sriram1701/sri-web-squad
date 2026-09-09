import { Hero } from "@/components/home/hero";
import { StatsRow } from "@/components/home/stats-row";
import { TechStack } from "@/components/home/tech-stack";
import { ServicesRow } from "@/components/home/services-row";
import { About } from "@/components/home/about";
import { Services } from "@/components/home/services";
import { Portfolio } from "@/components/home/portfolio";
import { Reviews } from "@/components/home/reviews";
import { FAQ } from "@/components/home/faq";
import { Contact } from "@/components/home/contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-[#050505]">
      <Hero />
      <StatsRow />
      <TechStack />
      <ServicesRow />
      <About />
      <Services />
      <Portfolio />
      <Reviews />
      <FAQ />
      <Contact />
    </main>
  );
}
