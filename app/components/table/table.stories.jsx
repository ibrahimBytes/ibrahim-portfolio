import { Table, TableCell, TableRow } from '~/components/table';
import { StoryContainer } from '../../../.storybook/story-container';
import { TableBody, TableHead, TableHeadCell } from './table';

export default {
  title: 'Table',
};

export const IndianStatesTable = () => (
  <StoryContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>State/UT</TableHeadCell>
          <TableHeadCell>Capital</TableHeadCell>
          <TableHeadCell>Population (approx)</TableHeadCell>
          <TableHeadCell>Official Language</TableHeadCell>
          <TableHeadCell>Region</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Andhra Pradesh</TableCell>
          <TableCell>Amaravati</TableCell>
          <TableCell>54 million</TableCell>
          <TableCell>Telugu</TableCell>
          <TableCell>South</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Tamil Nadu</TableCell>
          <TableCell>Chennai</TableCell>
          <TableCell>84 million</TableCell>
          <TableCell>Tamil</TableCell>
          <TableCell>South</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Maharashtra</TableCell>
          <TableCell>Mumbai</TableCell>
          <TableCell>126 million</TableCell>
          <TableCell>Marathi</TableCell>
          <TableCell>West</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Delhi (UT)</TableCell>
          <TableCell>New Delhi</TableCell>
          <TableCell>32 million</TableCell>
          <TableCell>Hindi, English</TableCell>
          <TableCell>North</TableCell>
        </TableRow>
        
        <TableRow>
          <TableCell>Uttar Pradesh</TableCell>
          <TableCell>Lucknow</TableCell>
          <TableCell>240 million</TableCell>
          <TableCell>Hindi</TableCell>
          <TableCell>North</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>West Bengal</TableCell>
          <TableCell>Kolkata</TableCell>
          <TableCell>100 million</TableCell>
          <TableCell>Bengali</TableCell>
          <TableCell>East</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Karnataka</TableCell>
          <TableCell>Bengaluru</TableCell>
          <TableCell>68 million</TableCell>
          <TableCell>Kannada</TableCell>
          <TableCell>South</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Gujarat</TableCell>
          <TableCell>Gandhinagar</TableCell>
          <TableCell>70 million</TableCell>
          <TableCell>Gujarati</TableCell>
          <TableCell>West</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Rajasthan</TableCell>
          <TableCell>Jaipur</TableCell>
          <TableCell>81 million</TableCell>
          <TableCell>Hindi</TableCell>
          <TableCell>North</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </StoryContainer>
);