import Hero from "./components/Hero/Hero";
import GameFeatures from "./components/Game Features/GameFeatures";
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
