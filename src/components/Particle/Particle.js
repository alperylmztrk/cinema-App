
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.



const ParticlesComponent = (props) => {

    const [init, setInit] = useState(false);
    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };


    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "#acbbc2",
                },
            },
            fpsLimit: 120,

            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#f00",
                    animation: {
                        enable: true,
                        speed: 20,
                        sync: true
                    }
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 1
                },
                size: {
                    value: 6,
                    random: {
                        enable: true,
                        minimumValue: 3
                    },
                    animation: {
                        enable: true,
                        speed: 5,
                        minimumValue: 3,
                        sync: false
                    }
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    warp: true
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    resize: true
                }
            },

            detectRetina: true,
        }),
        [],
    );


    return <Particles id={props.id} init={particlesLoaded} options={options} />;
};

export default ParticlesComponent;