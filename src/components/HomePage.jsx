import React, { useRef, useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import InteractiveMap from './InteractiveMap';
import EducationalHub from './EducationalHub';
import VirtualTour from './VirtualTour';
import Gallery from './Gallery';
import Experiments from './Experiments';
import Dashboard from './Dashboard';
import NewsTips from './NewsTips';
import Footer from './Footer';

function HomePage() {
const heroRef = useRef();
const mapRef = useRef();
const hubRef = useRef();
const tourRef = useRef();
const galleryRef = useRef();
const expRef = useRef();
const dashRef = useRef();
const newsRef = useRef();
const contactRef = useRef();


const [activeSection, setActiveSection] = useState('home');


const scrollToRef = (refName, refObj) => {
setActiveSection(refName);
refObj.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};


return (
<div className="min-h-screen text-white bg-gradient-to-b from-[#0A0A1A] to-slate-900">
<Header scrollToRef={scrollToRef} refs={{ heroRef, mapRef, hubRef, tourRef, galleryRef, expRef, dashRef, newsRef, contactRef }} />
<Hero refProp={heroRef} scrollToRef={scrollToRef} refs={{ mapRef, tourRef }} />
<InteractiveMap refProp={mapRef} />
<EducationalHub refProp={hubRef} />
<VirtualTour refProp={tourRef} />
<Gallery refProp={galleryRef} />
<Experiments refProp={expRef} />

<NewsTips refProp={newsRef} />
<Footer />
</div>
);
}

export default HomePage;