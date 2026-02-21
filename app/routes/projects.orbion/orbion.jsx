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

const title = 'Orbion — Smart City Platform (Exploratory)';
const description =
  'Orbion is an exploratory smart city platform examining unified UX, domain-driven thinking, and distributed software concepts.';

const roles = ['Concept Design', 'UX Exploration', 'System Thinking'];

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
      el.requestFullscreen().catch(() => {});
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
    <TierHeader heading="The problem">
      Everyday city interactions are fragmented across multiple applications —
      transport, events, alerts, payments, and civic services operate in isolation.
      This fragmentation increases cognitive load and reduces continuity
      in routine tasks.
    </TierHeader>

    <TierHeader heading="The idea">
      Orbion explores the concept of treating a city as a unified interface —
      a place where discovery, decision-making, and action can occur
      without repeated context switching.
      <br /><br />
      The project does not aim to replace existing platforms,
      but to examine how they might be experienced coherently.
    </TierHeader>

    <TierHeader heading="Why explore this">
      For citizens, unification may reduce friction and mental overhead.  
      For operators, it may improve coordination visibility.  
      For engineers, it presents a distributed systems problem expressed
      through interaction design.
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
      <TierHeader heading="Experience focus">
        The interface exploration emphasizes calm navigation,
        predictable hierarchy, and progressive disclosure
        to reduce decision effort in real-world scenarios.
      </TierHeader>

      <TierHeader heading="Dashboard concept">
        The dashboard acts as a conceptual city console —
        surfacing transit, alerts, events, and actions
        relative to user context such as location and time.
      </TierHeader>

      <TierHeader heading="Prototype scope">
        This interface is an interaction prototype intended to explore
        layout rhythm, component consistency, and information hierarchy.
        Production integration and data accuracy are intentionally out of scope.
      </TierHeader>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionHeading>UI prototype</ProjectSectionHeading>
          <ProjectSectionText>
            The preview demonstrates early structural patterns and interaction ideas.
            Visual refinement and live integrations are future exploration areas.
          </ProjectSectionText>

          <FullscreenButton onClick={toggle} />

          <div ref={previewRef} className={styles.previewWrapper}>
            <iframe
              src="/orbion-ui/index.html"
              title="Orbion UI Prototype"
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
   Tier 3 — Security & Trust
---------------------------------------------- */

const Tier3_Security = () => (
  <Fragment>
    <TierHeader heading="Security perspective">
      Security considerations are explored conceptually,
      focusing on trust boundaries, domain ownership,
      and failure isolation rather than implemented controls.
    </TierHeader>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Threat-aware thinking</ProjectSectionHeading>
        <ProjectSectionText>
          The conceptual model assumes partial failure and untrusted inputs by default:
          <ul>
            <li>Clients are treated as untrusted.</li>
            <li>Domains validate and own their data.</li>
            <li>Failures should degrade locally rather than cascade.</li>
          </ul>
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Potential controls</ProjectSectionHeading>
        <ProjectSectionText>
          Architectural exploration includes:
          <ul>
            <li>centralized identity with short-lived credentials</li>
            <li>domain-scoped authorization</li>
            <li>explicit API contracts and validation</li>
            <li>encrypted communication pathways</li>
            <li>gateway-level rate limiting</li>
          </ul>
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>
  </Fragment>
);

/* ---------------------------------------------
   Tier 4 — Architecture
---------------------------------------------- */

const Tier4_Architecture = () => (
  <Fragment>
    <TierHeader heading="Architecture perspective">
      Orbion frames a city as a distributed system composed of domain-aligned services
      communicating through explicit interfaces.
      This reflects architectural exploration rather than deployed infrastructure.
    </TierHeader>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Core themes</ProjectSectionHeading>
        <ProjectSectionText>
          <ul>
            <li>domain modularity across transport, events, identity, and payments</li>
            <li>graceful degradation instead of hard failure</li>
            <li>event-driven state propagation concepts</li>
            <li>observability as an architectural concern</li>
          </ul>
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Technology direction</ProjectSectionHeading>
        <ProjectSectionText>
          Technology choices represent exploratory direction:
          <ul>
            <li>React + TypeScript for interface prototyping</li>
            <li>Node.js APIs for integration experiments</li>
            <li>Go for potential high-concurrency domains</li>
            <li>Rust evaluation for critical components</li>
            <li>event streaming concepts (Kafka)</li>
            <li>relational, cache, and search storage layers</li>
          </ul>
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>
  </Fragment>
);

/* ---------------------------------------------
   Tier 5 — Reflection
---------------------------------------------- */

const Tier5_Reflection = () => (
  <Fragment>
    <TierHeader heading="Reflection">
      Orbion represents an exploration in aligning ambitious system thinking
      with a restrained user experience surface.
      The emphasis remains on clarity of ideas rather than feature breadth.
    </TierHeader>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Exploration roadmap</ProjectSectionHeading>
        <ProjectSectionText>
          <strong>Near term</strong>
          <ul>
            <li>interaction refinement and accessibility baseline</li>
            <li>layout consistency and semantic improvements</li>
          </ul>

          <strong>Mid term</strong>
          <ul>
            <li>limited dataset integration for concept validation</li>
            <li>clearer domain contracts</li>
          </ul>

          <strong>Long term</strong>
          <ul>
            <li>platformization exploration via APIs</li>
            <li>observability and operational thinking experiments</li>
          </ul>
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>

    <TierHeader heading="Closing thought">
      Orbion explores a single question:
      <em>What might city software feel like if designed as a coherent system?</em>
      <br />
      This project documents ongoing exploration around that question.
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
          url="https://github.com/ibrahimBytes/orbion-ui"
          roles={roles}
        />

        <Tier1_Why />
        <Tier2_Experience />
        <Tier3_Security />
        <Tier4_Architecture />
        <Tier5_Reflection />
      </ProjectContainer>

      <Footer />
    </Fragment>
  );
};

export default Orbion; 