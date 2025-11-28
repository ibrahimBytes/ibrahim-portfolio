import { Link } from '~/components/link';
import { StoryContainer } from '../../../.storybook/story-container';

export default {
  title: 'Link',
};

export const Default = () => (
  <StoryContainer style={{ fontSize: 18 }}>
    <Link href="https://github.com/ibrahimBytes/Portfolio">Primary link</Link>
    <Link secondary href="https://github.com/ibrahimBytes/Portfolio">
      Secondary link
    </Link>
  </StoryContainer>
);
