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
  'Orbion is an exploratory smart city platform focused on UX architecture, system design, and scalable software thinking.';

const roles = ['Product Thinking', 'System Design', 'UX Architecture'];

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
   Tier 1 — WHY (Vision, not promises)
---------------------------------------------- */

const Tier1_Why = () => (
  <Fragment>
    <TierHeader heading="The problem">
      Modern cities expose users to fragmented digital systems —
      separate apps for transport, events, weather, payments, and civic services.
      This fragmentation increases cognitive load and breaks continuity
      in everyday tasks.
    </TierHeader>

    <TierHeader heading="The idea">
      Orbion explores the idea of treating a city as a single, predictable interface —
      a place to discover information, make decisions, and take action
      without constantly switching contexts.
      <br /><br />
      The goal is not to replace existing systems,
      but to rethink how they are experienced together.
    </TierHeader>

    <TierHeader heading="Why this matters">
      For citizens, unification reduces friction and mental overhead.  
      For operators and governments, it improves visibility and coordination.  
      For engineers, it presents a distributed systems problem
      expressed through user experience.
    </TierHeader>
  </Fragment>
);

/* ---------------------------------------------
   Tier 2 — EXPERIENCE (Prototype, not product)
---------------------------------------------- */

const Tier2_Experience = () => {
  const { ref: previewRef, toggle } = useFullscreen();

  return (
    <Fragment>
      <TierHeader heading="Experience focus">
        The experience is intentionally calm and predictable.
        Clear hierarchy, limited choices, and progressive disclosure
        are used to reduce cognitive effort in real-world conditions.
      </TierHeader>

      <TierHeader heading="Unified dashboard concept">
        The dashboard acts as a conceptual city console —
        surfacing relevant transit, alerts, events, and actions
        based on context such as location and time.
      </TierHeader>

      <TierHeader heading="Prototype intent">
        This interface is not a finished product.
        It is an interaction prototype designed to explore
        layout rhythm, component consistency, and information hierarchy.
      </TierHeader>

      <ProjectSection>
        <ProjectSectionContent>
          <ProjectSectionHeading>UI prototype</ProjectSectionHeading>
          <ProjectSectionText>
            The preview below demonstrates early interaction patterns
            and structural decisions.
            Visual polish and live production data
            are intentionally out of scope at this stage.
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
    <TierHeader heading="Security considerations">
      Security in Orbion is approached as a design concern,
      not a bolt-on feature.
      The focus at this stage is on defining trust boundaries,
      minimizing blast radius, and enforcing clear responsibility
      between domains.
    </TierHeader>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Threat-aware design</ProjectSectionHeading>
        <ProjectSectionText>
          The system assumes partial failure and untrusted inputs by default.
          Core assumptions include:
          <ul>
            <li>Clients are never trusted.</li>
            <li>Each domain validates and owns its data.</li>
            <li>Failures are isolated to prevent cascading impact.</li>
          </ul>
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Planned security controls</ProjectSectionHeading>
        <ProjectSectionText>
          While not fully implemented, the architecture accounts for:
          <ul>
            <li><strong>Authentication:</strong> centralized identity with short-lived tokens.</li>
            <li><strong>Authorization:</strong> role- and scope-based access per domain.</li>
            <li><strong>API boundaries:</strong> strict contracts and input validation.</li>
            <li><strong>Data protection:</strong> encryption in transit and at rest.</li>
            <li><strong>Rate limiting:</strong> abuse prevention at gateway level.</li>
          </ul>
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>

    <TierHeader heading="Security trade-offs">
      Strong isolation and validation increase operational complexity,
      but they significantly reduce systemic risk —
      a necessary trade-off for city-scale software.
    </TierHeader>
  </Fragment>
);


/* ---------------------------------------------
   Tier 4 — ARCHITECTURE (Explicitly conceptual)
---------------------------------------------- */

const Tier4_Architecture = () => (
  <Fragment>
    <TierHeader heading="Architecture perspective">
      Orbion approaches a city as a distributed system composed of
      independent domains communicating through well-defined interfaces.
      This section reflects architectural thinking,
      not a production deployment.
    </TierHeader>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Core principles</ProjectSectionHeading>
        <ProjectSectionText>
          <ul>
            <li><strong>Modularity:</strong> transport, events, payments, and identity as separate domains.</li>
            <li><strong>Resilience:</strong> graceful degradation over hard failure.</li>
            <li><strong>Event-driven thinking:</strong> state changes over polling.</li>
            <li><strong>Operational clarity:</strong> observability as a first-class concern.</li>
          </ul>
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Technology direction (exploratory)</ProjectSectionHeading>
        <ProjectSectionText>
          The following choices reflect architectural intent
          rather than fully implemented services:
          <ul>
            <li><strong>Frontend:</strong> React + TypeScript.</li>
            <li><strong>APIs:</strong> Node.js + TypeScript.</li>
            <li><strong>High-concurrency domains:</strong> Go (planned).</li>
            <li><strong>Critical components:</strong> Rust (evaluated, not implemented).</li>
            <li><strong>Messaging:</strong> Kafka (conceptual).</li>
            <li><strong>Storage:</strong> PostgreSQL, Redis, search layer.</li>
          </ul>
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>

    <TierHeader heading="Scalability thinking">
      The system is designed to start small,
      identify high-load domains,
      and isolate them incrementally
      rather than scaling prematurely.
    </TierHeader>

    <TierHeader heading="Trade-offs">
      A polyglot approach increases operational complexity,
      but enables clearer domain boundaries
      and workload-specific optimization at larger scales.
    </TierHeader>
  </Fragment>
);

/* ---------------------------------------------
   Tier 5 — Reflection & Roadmap
---------------------------------------------- */

const Tier5_Reflection = () => (
  <Fragment>
    <TierHeader heading="Reflection">
      Orbion is an exercise in disciplined ambition —
      keeping architectural complexity away from the user interface.
      The project prioritizes clarity of thought
      over feature completeness.
    </TierHeader>

    <ProjectSection>
      <ProjectSectionContent>
        <ProjectSectionHeading>Exploration roadmap</ProjectSectionHeading>
        <ProjectSectionText>
          <strong>Near term</strong>
          <ul>
            <li>Refine interaction patterns and accessibility baseline.</li>
            <li>Improve layout consistency and component semantics.</li>
          </ul>

          <strong>Mid term</strong>
          <ul>
            <li>Integrate limited real-world datasets for validation.</li>
            <li>Define stable domain boundaries and contracts.</li>
          </ul>

          <strong>Long term</strong>
          <ul>
            <li>Explore platformization through APIs and extensions.</li>
            <li>Evaluate operational dashboards and observability concepts.</li>
          </ul>
        </ProjectSectionText>
      </ProjectSectionContent>
    </ProjectSection>

    <TierHeader heading="Closing thought">
      Orbion explores a simple question:
      <em>“What would city software look like if it were designed as a coherent system?”</em>
      <br />
      This project documents how I think about that question —
      through design, architecture, and incremental exploration.
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
        <Tier3_Security />
        <Tier4_Architecture />
        <Tier5_Reflection />

      </ProjectContainer>

      <Footer />
    </Fragment>
  );
};

export default Orbion; 