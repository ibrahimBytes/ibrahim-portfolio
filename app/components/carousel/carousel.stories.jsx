// app/components/carousel/carousel.stories.jsx

import { Carousel } from '~/components/carousel';
import { StoryContainer } from '../../../.storybook/story-container';

// Bundled assets (app/assets)
import smartcity from '~/assets/smartcity.jpg';
import smartcityLarge from '~/assets/smartcity-large.jpg';
import smartcityPlaceholder from '~/assets/smartcity-placeholder.jpg';

import profile from '~/assets/profile.jpg';
import profileLarge from '~/assets/profile-large.jpg';
import profilePlaceholder from '~/assets/profile-placeholder.jpg';


export default {
  title: 'Carousel',
};

export const Images = () => (
  <StoryContainer>
    <Carousel
      style={{ maxWidth: 800, width: '100%' }}
      width={1920}
      height={1080}
      images={[
        {
          srcSet: `${smartcity} 960w, ${smartcityLarge} 1920w`,
          placeholder: smartcityPlaceholder,
          alt: 'Smart city visualization',
        },
        {
          srcSet: `${profile} 400w, ${profileLarge} 800w`,
          placeholder: profilePlaceholder,
          alt: 'Profile photo',        },
      ]}
    />
  </StoryContainer>
);
