// app/routes/projects.orbion/orbion.jsx

import React, { Fragment, useRef } from 'react';
import { Footer } from '~/components/footer';

import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
} from '~/layouts/project';

import { baseMeta } from '~/utils/meta';

import smartCity from '~/assets/smartcity.jpg';
import smartCityLarge from '~/assets/smartcity-large.jpg';
import smartCityPlaceholder from '~/assets/smartcity-placeholder.jpg';

import styles from './orbion.module.css';

/* ---------------------------------------------
   Page Meta
---------------------------------------------- */

const title = 'Orbion — Unified Smart City OS (WIP)';
const description =
  'Orbion unifies travel, transport, utilities, weather, events, and essential city services into a single seamless platform.';

const roles = ['Product Thinking', 'System Design', 'End-to-End UX'];

export const meta = () => baseMeta({ title, description, prefix: 'Projects' });

/* ---------------------------------------------
   Fullscreen Hook
---------------------------------------------- */

const useFullscreen = () => {
  const ref = useRef(null);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  return { ref, toggle };
};

/* ---------------------------------------------
   Presentational Components
---------------------------------------------- */

const TierHeader = ({ heading, children }) => (
  <ProjectSection>
    <ProjectSectionContent>
      <ProjectSectionHeading>{heading}</ProjectSectionHeading>
      <ProjectSectionText>{children}</ProjectSectionText>
    </ProjectSectionContent>
  </ProjectSection>
);

const FullscreenButton = ({ onClick }) => (
  <button className={styles.fullscreenBtn} onClick={onClick}>
    ⤢ Fullscreen
  </button>
);

/* ---------------------------------------------
   Tier 1 — WHY
---------------------------------------------- */

const Tier1_Why = () => (
  <Fragment>
    <TierHeader heading="The Problem">
      Cities run on fragmented digital ecosystems — separate apps for tickets, transit, events, weather, maps, and civic services.
      This fragmentation increases cognitive load, breaks continuity, and slows down everyday tasks.
    </TierHeader>

    <TierHeader heading="Vision">
      Orbion imagines the city as a single predictable environment: one place to discover, decide, and act.
      The mission is simple — <strong>reduce friction and unify the essential layers of city life</strong>.
    </TierHeader>

    <TierHeader heading="Why it matters">
      A unified system makes cities feel more humane.  
      For governments and businesses, it enables precision, visibility, and operational clarity.  
      For citizens, it removes complexity and creates a smoother daily experience.
    </TierHeader>
  </Fragment>
);

/* ---------------------------------------------
   Tier 2 — EXPERIENCE
---------------------------------------------- */

const Tier2_Experience = () => {
  const { ref: previewRef, toggle } = useFullscreen();

  return (
    <Fragment>
      <TierHeader heading="The Experience">
        Orbion is deliberately calm and predictable.  
        It uses modern UX principles — hierarchy, minimal choices, and progressive disclosure — to lower cognitive effort.
      </TierHeader>

      <TierHeader heading="A unified dashboard">
        The home screen works as a city console: live traffic, transit, events, quick actions, alerts, and contextual information.
        The interface adapts to location and time so that the most relevant actions appear first.
      </TierHeader>

      <TierHeader heading="How it feels">
        Orbion behaves like a refined operating system: consistent components, subtle motion, and clear affordances.
        It borrows lessons from Notion, Stripe, Apple, and Google Maps — clarity first, aesthetics second.
      </TierHeader>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionHeading>Preview</ProjectSectionHeading>
          <ProjectSectionText>
            This is an early interaction prototype showing the foundational layout rhythm,
            spatial rules, and interaction patterns.  
            It is a living artifact — evolving through research, testing, and real usage data.
          </ProjectSectionText>

          {/* Fullscreen Button */}
          <FullscreenButton onClick={toggle} />

          {/* UI Preview Frame */}
          <div ref={previewRef} className={styles.previewWrapper}>
            <iframe
              src="/orbion-ui/index.html"
              title="Orbion UI Preview"
              className={styles.previewFrame}
              sandbox="allow-scripts allow-same-origin allow-pointer-lock"
            />
          </div>
        </ProjectSectionContent>
      </ProjectSection>
    </Fragment>
  );
};

/* ---------------------------------------------
   Tier 3 — ARCHITECTURE
---------------------------------------------- */

const Tier3_Architecture = () => (
  <Fragment>
    <TierHeader heading="Architecture (high level)">
      Orbion views a city as a distributed system — composed of domain services communicating through events and APIs.
      Each domain evolves independently while preserving a unified user experience.
    </TierHeader>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Core principles</ProjectSectionHeading>
        <ProjectSectionText>
          <ul>
            <li><strong>Modularity:</strong> transport, events, payments, identity — each is a separate bounded context.</li>
            <li><strong>Resilience:</strong> failures are isolated through graceful degradation.</li>
            <li><strong>Real-time first:</strong> event streams power live UI and analytics.</li>
            <li><strong>Operational clarity:</strong> observability and strict interface contracts drive maintainability.</li>
          </ul>
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Polyglot rationale</ProjectSectionHeading>
        <ProjectSectionText>
          Orbion uses polyglot architecture intentionally:
          <ul>
            <li><strong>API gateway:</strong> Node.js + TypeScript — speed + ecosystem.</li>
            <li><strong>High-concurrency domains:</strong> Go — predictable performance.</li>
            <li><strong>Data/ML flows:</strong> Python — experimentation velocity.</li>
            <li><strong>Critical systems:</strong> Rust — correctness and reliability.</li>
            <li><strong>Messaging:</strong> Kafka — low-latency event streams.</li>
            <li><strong>Storage:</strong> PostgreSQL + Redis + Elastic — transactional + caching + search.</li>
          </ul>
          Each domain uses the right tool for its operational profile.
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Technical overview</ProjectSectionHeading>
        <ProjectSectionText>
          <strong>Frontend:</strong> React + TypeScript (component-driven).  
          <strong>Backend:</strong> Polyglot microservices (Go / Node / Python / Rust).  
          <strong>Messaging:</strong> Kafka for real-time sync.  
          <strong>Storage:</strong> PostgreSQL, Redis, Elastic search layer.  
          <strong>Observability:</strong> metrics, logs, distributed tracing.
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>

    <TierHeader heading="Scalability thinking">
      Start small, extract patterns, and isolate high-load domains like transit and notifications.
    </TierHeader>

    <TierHeader heading="Trade-offs & decisions">
      Polyglot complexity increases operational overhead but enables performance,
      reliability, and long-term maintainability — essential for a city-scale system.
    </TierHeader>
  </Fragment>
);

/* ---------------------------------------------
   Tier 4 — Reflection & Roadmap
---------------------------------------------- */

const Tier4_Reflection = () => (
  <Fragment>
    <TierHeader heading="Reflection">
      Orbion is an exercise in disciplined ambition — keeping the system composable while keeping
      the UX calm. Complexity belongs in the platform, not the interface.
    </TierHeader>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>What’s next</ProjectSectionHeading>
        <ProjectSectionText>
          <strong>0–6 months</strong>
          <ul>
            <li>Refine design system + accessibility baseline.</li>
            <li>Integrate live city data (transit + weather).</li>
            <li>Mobile-first commuter flows.</li>
          </ul>

          <strong>6–24 months</strong>
          <ul>
            <li>Marketplace + partner integrations.</li>
            <li>SLA-backed observability + distributed tracing.</li>
            <li>Municipality pilot for operations dashboards.</li>
          </ul>

          <strong>24+ months</strong>
          <ul>
            <li>Platformization — SDKs, partner APIs, modular extensions.</li>
            <li>Monetization — enterprise SaaS, marketplace fees, premium features, data/insight licensing.</li>
          </ul>
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>

    <TierHeader heading="Closing thought">
      Orbion asks a simple question:
      <em>“What if a city behaved like a unified operating system?”</em>
      This project is my ongoing attempt to answer it — through clarity, design, engineering, and slow iteration.
    </TierHeader>
  </Fragment>
);

/* ---------------------------------------------
   Main Component
---------------------------------------------- */

export const Orbion = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.orbion}>
        <ProjectBackground
          src={smartCity}
          srcSet={`${smartCity} 1280w, ${smartCityLarge} 2560w`}
          width={1280}
          height={800}
          placeholder={smartCityPlaceholder}
          opacity={0.85}
        />

        <ProjectHeader
          title={title}
          description={description}
          url="https://github.com/ibrahimBytes"
          roles={roles}
        />

        <Tier1_Why />
        <Tier2_Experience />
        <Tier3_Architecture />
        <Tier4_Reflection />
      </ProjectContainer>

      <Footer />
    </Fragment>
  );
};

export default Orbion;
