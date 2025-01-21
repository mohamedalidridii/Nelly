import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const Loader: React.FC = () => {
    useEffect(() => {
        const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.5,
            defaults: { duration: 1, ease: "power3.inOut" }
        });
        gsap.set("#b", { y: 20, opacity: 0 });
        gsap.set("#o", { y: 20, opacity: 0 });
        gsap.set("#l", { y: 20, opacity: 0 });
        gsap.set("#d", { y: 20, opacity: 0 });
        gsap.set("#i", { y: 20, opacity: 0 });
        gsap.set("#n", { y: 20, opacity: 0 });
        gsap.set("#g", { y: 20, opacity: 0 });
        tl.to("#b", { y: 15, opacity: 1, duration: 0.4 }, "b");
        tl.to("#o", { y: 15, opacity: 1, duration: 0.4 }, "o");
        tl.to("#l", { y: 15, opacity: 1, duration: 0.4 }, "l");
        tl.to("#d", { y: 15, opacity: 1, duration: 0.4 }, "d");
        tl.to("#i", { y: 15, opacity: 1, duration: 0.4 }, "i");
        tl.to("#n", { y: 15, opacity: 1, duration: 0.4 }, "n");
        tl.to("#g", { y: 15, opacity: 1, duration: 0.4 }, "g");
        tl.to(".loader span", { opacity: 1, duration: 4 }, "wait");
        tl.to(".loader span", { opacity: 0, duration: 4 }, "last");
    }, []);

    return (
        <div className="loader fixed top-0 left-0 flex items-center justify-center w-screen h-screen text-teal-800 z-50">
            <span className="hidden">Loading</span>
            <span id="b" className="uppercase font-normal tracking-widest">L</span>
            <span id="o" className="uppercase font-normal tracking-widest">o</span>
            <span id="l" className="uppercase font-normal tracking-widest">a</span>
            <span id="d" className="uppercase font-normal tracking-widest">d</span>
            <span id="i" className="uppercase font-normal tracking-widest">i</span>
            <span id="n" className="uppercase font-normal tracking-widest">n</span>
            <span id="g" className="uppercase font-normal tracking-widest">g</span>
        </div>
    );
};

export default Loader;