import { useEffect, useRef, useState } from 'react';

// Assets
import smartCityLarge from '../../assets/smartcity-large.jpg';
import smartCityPlaceholder from '../../assets/smartcity-placeholder.jpg';
import smartCity from '../../assets/smartcity.jpg';
import cppEngineLarge from '../../assets/cpp-engine-large.jpg';
import cppEnginePlaceholder from '../../assets/cpp-engine-placeholder.jpg';
import cppEngine from '../../assets/cpp-engine.jpg';

// Config & Utils
import config from '../../config.json';
import { baseMeta } from '../../utils/meta';

// Components
import { Footer } from '../../components/footer';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';

// Styles
import styles from './home.module.css';

// Prefetch DRACO decoder
export const links = () => [
  { rel: 'prefetch', href: '/draco/draco_wasm_wrapper.js', as: 'script', type: 'text/javascript', importance: 'low' },
  { rel: 'prefetch', href: '/draco/draco_decoder.wasm', as: 'fetch', type: 'application/wasm', importance: 'low' },
];

// Meta
export const meta = () =>
  baseMeta({
    title: 'Software Architect',
    description: `Portfolio of ${config.name} — designing interfaces like Steve Jobs, architecting systems like Linus Torvalds.`,
  });

// Home Page
export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, details];

    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          observer.unobserve(section);
          setVisibleSections(prev => (prev.includes(section) ? prev : [...prev, section]));
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    const indicatorObserver = new IntersectionObserver(([entry]) => {
      setScrollIndicatorHidden(!entry.isIntersecting);
    }, { rootMargin: '-100% 0px 0px 0px' });

    sections.forEach(section => sectionObserver.observe(section.current));
    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.home}>
      <Intro id="intro" sectionRef={intro} scrollIndicatorHidden={scrollIndicatorHidden} />

      <ProjectSummary
        id="project-1"
        index={1}
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        title="Orbion — Smart City OS"
        description="A unified smart city operating system integrating transport, weather, commerce, events, and geodata. Built with React, Go, PostgreSQL, and an event-driven architecture."
        buttonText="View case study"
        buttonLink="/projects/orbion"
        model={{
          type: 'laptop',
          alt: 'Orbion smart city platform interface',
          textures: [{ srcSet: `${smartCity} 1280w, ${smartCityLarge} 2560w`, placeholder: smartCityPlaceholder }],
        }}
      />

      <ProjectSummary
        id="project-2"
        index={2}
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        title="Real-Time System Monitor"
        description="A C++ hardware-level engine that streams CPU/RAM/GPU metrics to a mobile dashboard in milliseconds using WebSockets and native memory access."
        buttonText="View system monitor"
        buttonLink="/projects/system-monitor"
        model={{
          type: 'phone',
          alt: 'System Monitor Mobile Dashboard',
          textures: [{ srcSet: `${cppEngine} 375w, ${cppEngineLarge} 750w`, placeholder: cppEnginePlaceholder },
            { srcSet: `${cppEngineLarge} 375w, ${cppEngineLarge} 750w`, placeholder: cppEnginePlaceholder }
          ],
        }
      }
      />

      <Profile id="details" sectionRef={details} visible={visibleSections.includes(details.current)} />
      <Footer />
    </div>
  );
};
