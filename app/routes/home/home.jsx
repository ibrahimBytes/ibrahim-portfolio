import { useEffect, useRef, useState } from 'react';

// Assets
import smartCityLarge from '../../assets/smartcity-large.jpg';
import smartCityPlaceholder from '../../assets/smartcity-placeholder.jpg';
import smartCity from '../../assets/smartcity.jpg';
import cppEngineLarge from '../../assets/cpp-engine-large.jpg';
import cppEnginePlaceholder from '../../assets/cpp-engine-placeholder.jpg';
import cppEngine from '../../assets/cpp-engine.jpg';

// Components
import { Footer } from '../../components/footer';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';

// Styles
import styles from './home.module.css';

// Prefetch DRACO decoder
export const links = () => [
  { rel: 'prefetch', href: '/draco/draco_wasm_wrapper.js', as: 'script' },
  { rel: 'prefetch', href: '/draco/draco_decoder.wasm', as: 'fetch', type: 'application/wasm' },
];

export const Home = () => {
  const [visible, setVisible] = useState(() => new Set());
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false);

  const sectionRefs = useRef({});

  const registerSection = id => el => {
    if (el) sectionRefs.current[id] = el;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        setVisible(prev => {
          const next = new Set(prev);

          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;

            next.add(target.id);

            if (target.id === 'intro') {
              setHideScrollIndicator(true);
            }
          });

          return next;
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    Object.values(sectionRefs.current).forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={registerSection('intro')}
        scrollIndicatorHidden={hideScrollIndicator}
      />

      <ProjectSummary
        id="project-1"
        index={1}
        sectionRef={registerSection('project-1')}
        visible={visible.has('project-1')}
        title="Orbion — Smart City Platform"
        description="A modular smart city platform built to explore system architecture, scalability, and real-time event pipelines using a microservice-first approach."
        buttonText="View case"
        buttonLink="/projects/orbion"
        model={{
          type: 'laptop',
          alt: 'Orbion smart city platform interface',
          textures: [
            {
              srcSet: `${smartCity} 1280w, ${smartCityLarge} 2560w`,
              placeholder: smartCityPlaceholder,
            },
          ],
        }}
      />

      <ProjectSummary
        id="project-2"
        index={2}
        alternate
        sectionRef={registerSection('project-2')}
        visible={visible.has('project-2')}
        title="Real-Time System Monitor"
        description="A C++ system-level monitoring engine that streams CPU, RAM, and GPU metrics in near real time using native OS APIs and WebSockets."
        buttonText="View case"
        buttonLink="/projects/system-monitor"
        model={{
          type: 'phone',
          alt: 'System monitor mobile dashboard',
          textures: [
            {
              srcSet: `${cppEngine} 375w, ${cppEngineLarge} 750w`,
              placeholder: cppEnginePlaceholder,
            },
            {
              srcSet: `${cppEngineLarge} 375w, ${cppEngineLarge} 750w`,
              placeholder: cppEnginePlaceholder,
            },
          ],
        }}
      />
      <Profile
        id="details"
        sectionRef={registerSection('details')}
        visible={visible.has('details')}
      />

      <Footer />
    </div>
  );
};
