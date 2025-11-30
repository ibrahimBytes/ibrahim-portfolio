

import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}-monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="48"
      height="48"
      viewBox="0 0 64 64"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          {/* Your uploaded “I” shape */}
          <path
            d="M24 10 L40 10 L36 18 L36 46 L40 54 L24 54 L28 46 L28 18 Z"
          />
        </clipPath>
      </defs>

      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />

      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});

