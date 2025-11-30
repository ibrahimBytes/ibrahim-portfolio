import { memo, useEffect, useState } from 'react';
import { useReducedMotion, useSpring } from 'framer-motion';
import { generateFrame, CharType } from './decoder-utils';
import { delay } from '~/utils/delay';
import { classes } from '~/utils/style';
import { VisuallyHidden } from '~/components/visually-hidden';
import styles from './decoder-text.module.css';

export const DecoderText = memo(function DecoderText({
  text,
  start = true,
  delay: startDelay = 0,
  className,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const spring = useSpring(0, { stiffness: 8, damping: 5 });

  const content = text.split('');
  const [output, setOutput] = useState(
    content.map(() => ({ type: CharType.Glyph, value: '' }))
  );

  useEffect(() => {
    // If user prefers reduced motion → show final text immediately
    if (reduceMotion) {
      setOutput(content.map(value => ({ type: CharType.Value, value })));
      return;
    }

    let stop = false;

    // Kickoff animation
    (async () => {
      if (start) {
        await delay(startDelay);
        if (!stop) spring.set(content.length);
      }
    })();

    const unsubscribe = spring.on('change', val => {
      setOutput(prev => generateFrame(content, prev, val));
    });

    return () => {
      stop = true;
      unsubscribe?.();
    };
  }, [text, start, startDelay, reduceMotion, spring]);

  return (
    <span className={classes(styles.text, className)} {...rest}>
      <VisuallyHidden>{text}</VisuallyHidden>

      <span aria-hidden className={styles.content}>
        {output.map(({ type, value }, index) => (
          <span key={index} className={styles[type]}>
            {value}
          </span>
        ))}
      </span>
    </span>
  );
});
