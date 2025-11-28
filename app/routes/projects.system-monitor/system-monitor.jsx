// app/routes/projects.system-monitor/system-monitor.jsx

import React, { Fragment } from 'react';
import { Footer } from '~/components/footer';

import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
} from '~/layouts/project';

import { baseMeta } from '~/utils/meta';

import cppEngine from '~/assets/cpp-engine.jpg';
import cppEngineLarge from '~/assets/cpp-engine-large.jpg';
import cppEnginePlaceholder from '~/assets/cpp-engine-placeholder.jpg';

import styles from './system-monitor.module.css';

/* ---------------------------------------------
   META
---------------------------------------------- */

const title = 'Real-Time System Monitor — C++ (Concept)';
const description =
  'A planned native C++ telemetry engine designed to sample CPU, RAM, GPU, disk, temperature, and network metrics and stream them efficiently to mobile.';

const roles = [
  'Systems Design',
  'C++ Architecture',
  'Low-Level Performance',
  'Telemetry Framework Design',
];

export const meta = () => baseMeta({ title, description, prefix: 'Projects' });

/* ---------------------------------------------
   MAIN PAGE COMPONENT
---------------------------------------------- */

export const SystemMonitor = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.systemMonitor}>

        <ProjectBackground
          src={cppEngine}
          srcSet={`${cppEngine} 1280w, ${cppEngineLarge} 2560w`}
          width={1280}
          height={800}
          placeholder={cppEnginePlaceholder}
          opacity={0.85}
        />

        <ProjectHeader
          title={title}
          description={description}
          url="https://github.com/ibrahimBytes"
          roles={roles}
        />

        {/* ---------------------------------------------
           TIER 1 — WHY THIS PROJECT EXISTS
        ---------------------------------------------- */}
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectSectionHeading>The Problem</ProjectSectionHeading>
            <ProjectSectionText>
              Most system monitoring tools are built for desktops, heavy dashboards, or cloud servers. 
              Mobile devices never receive truly real-time hardware telemetry without massive overhead, battery drain, or high latency.
              There is no lightweight, native, low-level engine that streams compact hardware metrics efficiently to mobile.
            </ProjectSectionText>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectSectionHeading>Vision</ProjectSectionHeading>
            <ProjectSectionText>
              The idea is simple:
              <br /><br />
              <strong>A tiny, native C++ engine that samples hardware metrics with near-zero overhead and 
              streams them as binary frames to mobile in real time.</strong>
              <br /><br />
              This project is not about UI first — it’s about learning how to design a telemetry engine, 
              understand OS-level APIs, and reason about performance at the system boundary.
            </ProjectSectionText>
          </ProjectSectionContent>
        </ProjectSection>

        {/* ---------------------------------------------
           TIER 2 — EXPERIENCE + WHY THIS MAKES SENSE
        ---------------------------------------------- */}
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectSectionHeading>What This Project Represents</ProjectSectionHeading>
            <ProjectSectionText>
              This is not a shipped product — it is a systems engineering exploration.  
              The goal is to understand:
              <ul>
                <li>How to read CPU, RAM, GPU, and network counters natively.</li>
                <li>How to pack metrics into minimal binary formats.</li>
                <li>How to build a low-latency WebSocket relay for mobile.</li>
                <li>How to reason about performance, concurrency, and sampling intervals.</li>
              </ul>
              The learning outcome is more important than the final UI.
            </ProjectSectionText>
          </ProjectSectionContent>
        </ProjectSection>

        {/* ---------------------------------------------
           TIER 3 — ARCHITECTURE (CONCEPT-LEVEL)
        ---------------------------------------------- */}
        <ProjectSection>
          <ProjectSectionColumns centered>

            {/* LEFT COLUMN */}
            <div className={styles.leftColumn}>
              <ProjectSectionHeading>High-Level Architecture</ProjectSectionHeading>
              <ProjectSectionText>
                The engine is designed around a simple pipeline:
                <br /><br />
                <code>Sensors → Native Poller → Binary Encoder → Async Relay → Mobile Viewer</code>
                <br /><br />
                Even as a concept, the design focuses on:
                <ul>
                  <li><strong>Native performance:</strong> C++20, zero-copy patterns.</li>
                  <li><strong>Async sampling:</strong> epoll/libuv style loops.</li>
                  <li><strong>Binary streaming:</strong> compact frames instead of JSON.</li>
                  <li><strong>Cross-platform:</strong> Windows, Linux, macOS APIs.</li>
                </ul>
              </ProjectSectionText>

              <ProjectSectionHeading>Philosophy</ProjectSectionHeading>
              <ProjectSectionText>
                The project explores what it means to build software close to the hardware — where memory layout, 
                CPU cycles, and syscalls matter.  
                It’s a foundational step toward deeper systems-level engineering.
              </ProjectSectionText>
            </div>

            {/* RIGHT COLUMN (NO FAKE CODE) */}
            <div className={styles.rightColumn}>
              <ProjectSectionHeading>Planned Technical Approach</ProjectSectionHeading>
              <ProjectSectionText>
                Instead of embedding unfinished code, this section outlines what the engine will
                eventually include:
                <ul>
                  <li>Polling modules for CPU, RAM, GPU, Disk, Network</li>
                  <li>Binary protocol for minimal transport overhead</li>
                  <li>WebSocket transport for mobile sync</li>
                  <li>Configurable sampling rate (10ms–1s)</li>
                  <li>Thread-safe queues for metric dispatch</li>
                </ul>
                This keeps the project honest while still demonstrating clear architectural intent.
              </ProjectSectionText>
            </div>

          </ProjectSectionColumns>
        </ProjectSection>

        {/* ---------------------------------------------
           TIER 4 — ROADMAP
        ---------------------------------------------- */}
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectSectionHeading>Roadmap</ProjectSectionHeading>
            <ProjectSectionText>
              <strong>Phase 1 — Foundations</strong>
              <ul>
                <li>Research OS-specific APIs for hardware telemetry.</li>
                <li>Build polling prototype for CPU + RAM.</li>
                <li>Create initial binary frame format.</li>
              </ul>

              <strong>Phase 2 — Engine</strong>
              <ul>
                <li>Add GPU + Disk modules.</li>
                <li>Implement async event loop + buffering.</li>
                <li>Build WebSocket relay server.</li>
              </ul>

              <strong>Phase 3 — Viewer (Mobile)</strong>
              <ul>
                <li>Mobile dashboard in React Native.</li>
                <li>Visualization components (charts, gauges).</li>
              </ul>

              <strong>Long Term</strong>
              <ul>
                <li>Temperature sensors, fan speed, thermal envelopes.</li>
                <li>Sampling optimizations + native dispatch.</li>
                <li>Cross-platform packaging.</li>
              </ul>
            </ProjectSectionText>
          </ProjectSectionContent>
        </ProjectSection>

        {/* ---------------------------------------------
           CLOSING THOUGHT
        ---------------------------------------------- */}
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectSectionHeading>Closing Thought</ProjectSectionHeading>
            <ProjectSectionText>
              This project is not a polished app — it is a systems-architecture exercise.  
              A way to understand how native engines work, how data moves from hardware to user, 
              and how low-level engineering shapes real-time experiences.
            </ProjectSectionText>
          </ProjectSectionContent>
        </ProjectSection>

      </ProjectContainer>

      <Footer />
    </Fragment>
  );
};

export default SystemMonitor; 