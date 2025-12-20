import { Image } from '~/components/image';
import { StoryContainer } from '../../../.storybook/story-container';

// Bundled asset (NOT public/)
import profileImage from '~/assets/profile.jpg';

export default {
  title: 'Image',
};

const baseImageArgs = {
  alt: 'Profile photo',
  src: profileImage,
  width: 400,
  height: 400,
};

const Template = args => (
  <StoryContainer>
    <div style={{ maxWidth: 400 }}>
      <Image {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {
  ...baseImageArgs,
};

export const Reveal = Template.bind({});
Reveal.args = {
  ...baseImageArgs,
  reveal: true,
};
