// export function DotBackgroundDemo() {
//   return (
//     <div className="h-[50rem] w-full dark:bg-white bg-black  dark:bg-dot-black/[0.2] bg-dot-white/[0.2] relative flex items-center justify-center">
//       {/* Radial gradient for the container to give a faded look */}
//       <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-white bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
//       <h1 className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
//         Backgrounds
//       </h1>
//     </div>
//   );
// }

export function DotBackgroundDemo() {
  return (
    <div className="h-[50rem] w-full bg-black dark:bg-black dark:bg-dot-white/[0.2] bg-dot-white/[0.2] relative flex items-center justify-center">
      {/* Radial gradient overlay */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>

      <div className="relative z-20 text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-white to-neutral-300 bg-clip-text text-transparent">
            Strategic Innovation Partners
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
            Transforming enterprises through digital excellence and future-ready
            solutions
          </p>
        </div>

        <button className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white transition-all duration-300 rounded-xl bg-[#2251ff] hover:bg-[#1a45e0] hover:shadow-2xl hover:shadow-[#2251ff]/30">
          <span className="relative text-lg">Start Here</span>
          <span className="absolute right-0 -mr-4 h-8 w-8 rounded-full bg-white/20 group-hover:scale-150 group-hover:opacity-0 transition-all duration-500"></span>
        </button>

        <p className="text-sm text-neutral-500 font-medium mt-4 opacity-80">
          Trusted by Fortune 500 companies worldwide
        </p>
      </div>
    </div>
  );
}
