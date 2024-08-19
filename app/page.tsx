import Hero from "./components/Hero/Hero";
import GameFeatures from "./components/Game Features/GameFeatures";
export default function Home() {
  return (
    <>
      <div>
        <div id="hero">
          <Hero />
        </div>
        <div id="gameFeatures">
          <GameFeatures />
        </div>
      </div>
    </>
  );
}
