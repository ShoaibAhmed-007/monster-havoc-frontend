// import Image from "next/image";
// import { Bebas_Neue } from "next/font/google";

// const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

// function Hero() {
//   return (
//     <div className="h-[90vh]">
//       <div className="px-5 flex justify-center gap-24 items-center">
//         <div className="flex flex-col justify-center items-center">
//           <Image
//             src={"/images/logo-lg.png"}
//             alt="logo-large"
//             width={300}
//             height={300}
//           />
//           <div
//             className={`text-3xl text-shadow shadow-primary font-semibold text-white -mt-12 text-center ${bebas.className}`}
//           >
//             <h1>Unleash the Beasts,</h1>
//             <h1>Conquer the Wild!</h1>
//           </div>
//           <div className="w-fit bg-transparent mt-[2rem] border border-primary shadow-md shadow-primary rounded-tl-lg rounded-br-lg">
//             <iframe
//               src="https://giphy.com/embed/8Kj78iCr0kIfekE57b"
//               frameBorder="0"
//               allowFullScreen
//               className="w-full h-full pointer-events-none"
//             ></iframe>
//             {/* <p style={{ margin: "5px 0", textAlign: "center" }}>
//               <a
//                 href="https://giphy.com/gifs/Capcom-capcom-monster-hunter-wilds-8Kj78iCr0kIfekE57b"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 via GIPHY
//               </a>
//             </p> */}
//           </div>
//         </div>
//         <Image
//           src={"/images/bg-hero.png"}
//           alt="bg-hero"
//           width={600}
//           height={600}
//         />
//       </div>
//     </div>
//   );
// }
// export default Hero;

import Image from "next/image";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

function Hero() {
  return (
    <div className="h-[100vh] flex items-center justify-center bg-[url('/images/bg-pattern.png')] bg-cover bg-center px-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center p-5 ">
        {/* Logo and Text */}
        <div className="flex flex-col justify-center items-center text-center gap-3">
          <Image
            src={"/images/logo-lg.png"}
            alt="logo-large"
            width={200}
            height={200}
            className="mb-4 "
            priority={true} // Ensure the logo loads quickly
          />
          <div
            className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl; text-shadow-lg shadow-primary font-semibold text-white ${bebas.className}`}
          >
            <h1>Unleash the Beasts,</h1>
            <h1>Conquer the Wild!</h1>
          </div>
          <div className="w-fit bg-transparent mt-8 border border-primary shadow-lg shadow-primary rounded-tl-lg rounded-br-lg overflow-hidden">
            <iframe
              src="https://giphy.com/embed/8Kj78iCr0kIfekE57b"
              frameBorder="0"
              allowFullScreen
              className="w-[300px] h-[200px] md:w-[400px] md:h-[300px] lg:w-[500px] lg:h-[350px] pointer-events-none"
            ></iframe>
          </div>
        </div>

        {/* Background Hero Image */}
        <Image
          src={"/images/bg-hero.png"}
          alt="bg-hero"
          width={600}
          height={600}
          className="hidden md:block max-w-full h-auto"
          priority={true} // Ensure the hero image loads quickly
        />
      </div>
    </div>
  );
}

export default Hero;
