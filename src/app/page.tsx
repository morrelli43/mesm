import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { About } from "@/components/about";
import { QuickMessage } from "@/components/quick-message";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <About />
      <QuickMessage />
    </main>
  );
}
