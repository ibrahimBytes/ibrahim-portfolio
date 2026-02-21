// ============================================================================
//  Profile Component — Single File Version
//  Architected for maintainability even within one file
// ============================================================================

import { Fragment, useState, useEffect } from "react";
import { Section } from "~/components/section";
import { Transition } from "~/components/transition";
import { Divider } from "~/components/divider";
import { Image } from "~/components/image";
import { Button } from "~/components/button";
import { Heading } from "~/components/heading";
import { Text } from "~/components/text";
import { Link } from "~/components/link";
import { DecoderText } from "~/components/decoder-text";
import { media } from "~/utils/style";

import profileImgLarge from "~/assets/profile-large.jpg";
import profileImgPlaceholder from "~/assets/profile-placeholder.jpg";
import profileImg from "~/assets/profile.jpg";
import katakana from "./katakana.svg";
import styles from "./profile.module.css";

// ============================================================================
//  Config (instead of hardcoding inside JSX — big-tech pattern)
// ============================================================================

const PROFILE_CONFIG = {
  name: "Ibrahim Shaik",
  titles: [
    "Systems-Oriented Engineer",
    "Backend & Low-Level Learner",
    "Distributed Systems Explorer"
  ],
  bio: [
    `I build backend applications while actively exploring system internals — including C++ behavior, operating systems, memory, and networking.`,
    `My focus is developing a strong engineering foundation through hands-on projects, experiments, and incremental system building.`,
    `I’m working toward designing reliable large-scale systems and understanding the layers beneath modern software platforms.`,
  ],
  links: {
    github: "https://github.com/ibrahimBytes",
    email: "mailto:s.ibrahim.devx@gmail.com",
  },
};


// ============================================================================
//  Hook — Visibility Transition
// ============================================================================

const useVisibleTransition = (active, delay = 0) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  return visible;
};

// ============================================================================
//  Subcomponent — Profile Text
// ============================================================================

const ProfileText = ({ visible, titleId, config }) => {
  const { name, titles, bio, links } = config;

  return (
    <Fragment>
      <Heading
        level={3}
        id={titleId}
        className={styles.title}
        data-visible={visible}
      >
        <DecoderText text={`Hi, I’m ${name}`} start={visible} delay={300} />
      </Heading>

      <Text className={styles.description} as="p" data-visible={visible}>
        I’m a <strong>{titles[0]}</strong> focused on <strong>{titles[1]}</strong> and <strong>{titles[2]}</strong>.
      </Text>

      {bio.map((line, i) => (
        <Text key={i} className={styles.description} as="p" data-visible={visible}>
          {line}
        </Text>
      ))}

      <Text className={styles.description} as="p" data-visible={visible}>
        Explore my work on <Link href={links.github}>GitHub</Link> or contact me at{" "}
        <Link href={links.email}>{links.email.replace("mailto:", "")}</Link>.
      </Text>
    </Fragment>
  );
};

// ============================================================================
//  Main Component — Profile
// ============================================================================

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const active = visible || focused;
  const titleId = `${id}-title`;

  // smoother staged visibility
  const transitionVisible = useVisibleTransition(active, 80);

  return (
    <Section
      id={id}
      tabIndex={-1}
      ref={sectionRef}
      className={styles.profile}
      aria-labelledby={titleId}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <Transition in={active} timeout={0}>
        {({ visible: localVisible, nodeRef }) => (
          <div ref={nodeRef} className={styles.content}>
            {/* ============================================================================
                LEFT COLUMN
            ============================================================================ */}
            <div className={styles.column}>
              <ProfileText
                visible={localVisible}
                titleId={titleId}
                config={PROFILE_CONFIG}
              />

              <Button
                secondary
                icon="send"
                href="/contact"
                className={styles.button}
                data-visible={localVisible}
              >
                Send me a message
              </Button>
            </div>

            {/* ============================================================================
                RIGHT COLUMN
            ============================================================================ */}
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!localVisible}
                  collapseDelay={800}
                />
                <div className={styles.tagText} data-visible={localVisible}>
                  About me
                </div>
              </div>

              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  width={960}
                  height={1280}
                  placeholder={profileImgPlaceholder}
                  srcSet={`${profileImg} 480w, ${profileImgLarge} 960w`}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt={`${PROFILE_CONFIG.name} — portrait`}
                />

                <svg
                  className={styles.svg}
                  viewBox="0 0 136 766"
                  data-visible={localVisible}
                >
                  <use href={`${katakana}#katakana-profile`} />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};

// ============================================================================
//  END — All code in one file, still architected properly
// ============================================================================

// ============================================================================
//  Comparison Snippets from Recently Edited Files
// ============================================================================

// These snippets show how the Profile component fits into the larger app structure.

// ----------------------------------------------------------------------------
//  Snippet from app/routes/home/home.jsx
// ----------------------------------------------------------------------------
