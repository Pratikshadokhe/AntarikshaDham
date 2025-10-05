import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import bgImage from "../assets/Space-Home.png";
import SpaceVideo from "../assets/space.mp4";

export default function Hero({ refProp, scrollToRef, refs }) {
const { mapRef, tourRef } = refs;

const navigate = useNavigate();

const goToHabitatpage = () => {
    navigate("/HabitatPage");
};

useEffect(() => {
const handler = () => {
const scroll = window.scrollY;
if (refProp.current) {
refProp.current.style.backgroundPositionY = `${scroll * 0.2}px`;
}
};
window.addEventListener('scroll', handler);
return () => window.removeEventListener('scroll', handler);
}, [refProp]);

return (
<section ref={refProp} className="pt-24 pb-24 min-h-[40vh] flex items-center justify-center relative overflow-hidden mb-1 bg-gray-600"  style={{
    backgroundColor: 'black',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}>
<div className="absolute inset-0 bg-black opacity-50" />
<div className="relative z-10 max-w-6xl mx-auto p-8 text-center">
<h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Explore Life Beyond Earth — Learn, Experiment, and Experience Your Future Home in Space</h1>
<p className="mt-4 text-lg text-gray-300">Interactive learning, habitat design, simulations and real calculations</p>
<div className="mt-6 flex flex-wrap gap-3 justify-center">

<button onClick={() => scrollToRef('features', mapRef)} className="px-6 py-3 rounded bg-[#00FFD0] text-black font-semibold">Start Exploring</button>
<button onClick={goToHabitatpage} className="px-6 py-3 rounded bg-[#FFAA00] text-black font-semibold">Take a Virtual Tour</button>
</div>


<div className="mt-10 rounded bg-black bg-opacity-30">

<div id="threejs-placeholder" style={{ height: 450 }} className="flex items-center justify-center relative w-full h-100 rounded-2xl overflow-hidden shadow-lg">
<div className="text-center text-gray-300">

  <video
        src={SpaceVideo}
        autoPlay
        loop
        muted
        playsInline
        className="rounded-2xl shadow-lg w-full h-full object-cover"
      />

</div>
</div>


</div>
</div>
<div className="pointer-events-none absolute inset-0 mt-0" aria-hidden>
<div style={{ background: 'radial-gradient(circle at 20% 20%, rgba(0,255,208,0.05), transparent), radial-gradient(circle at 80% 80%, rgba(255,170,0,0.04), transparent)' }} className="w-full h-full" />
</div>
</section>
);
}