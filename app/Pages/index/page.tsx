import Hero from "@/app/components/Hero/Hero";
import GameFeatures from "@/app/components/Game Features/GameFeatures";
export default function Home() {
  return (
    <>
      <div>
        <Hero />
        <div id="gameFeatures">
          <GameFeatures />
        </div>
      </div>
    </>
  );
}
