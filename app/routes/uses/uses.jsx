import usesBackgroundPlaceholder from '~/assets/uses-background-placeholder.jpg';
import usesBackground from '~/assets/uses-background.mp4';
import { Footer } from '~/components/footer';
import { Link } from '~/components/link';
import { List, ListItem } from '~/components/list';
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '~/components/table';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import styles from './uses.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Uses – Ibrahim Shaik',
    description: 'A list of the hardware, software, and tools I use daily for coding, system design, and learning.',
  });
};

export const Uses = () => {
  return (
    <>
      <ProjectContainer className={styles.uses}>
        <ProjectBackground
          src={usesBackground}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
        />
        <ProjectHeader
          title="Uses"
          description="A personal list of the hardware, software, tools, and tech stack I use daily to build, learn, and grow as a developer and aspiring software architect."
        />

        {/* === DEVELOPMENT SECTION === */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    I primarily code using <Link href="https://code.visualstudio.com/">Visual Studio Code</Link> with the
                    <strong> Tokyo Night</strong> theme and <strong>Fira Code</strong> font (ligatures enabled).
                  </ListItem>
                  <ListItem>
                    My favorite languages right now are <strong>C++</strong>, <strong>JavaScript (ES6+)</strong>, and
                    <strong> TypeScript</strong>. I also experiment with <Link href="https://swift.org/">Swift</Link> and
                    <Link href="https://www.python.org/"> Python</Link> occasionally.
                  </ListItem>
                  <ListItem>
                    For front-end development I use <Link href="https://react.dev/">React.js</Link> with
                    <Link href="https://tailwindcss.com/"> Tailwind CSS</Link>. I love the clean structure and fast workflow.
                  </ListItem>
                  <ListItem>
                    On the backend I work with <Link href="https://nodejs.org/">Node.js</Link>, 
                    <Link href="https://expressjs.com/"> Express</Link>, and databases like
                    <Link href="https://www.mongodb.com/"> MongoDB</Link> and 
                    <Link href="https://www.mysql.com/"> MySQL</Link>.
                  </ListItem>
                  <ListItem>
                    For animations and physics-based motion, I use <Link href="https://www.framer.com/motion/">Framer Motion</Link> and
                    <Link href="https://threejs.org/"> Three.js</Link> for GPU-based 3D rendering.
                  </ListItem>
                  <ListItem>
                    I use <Link href="https://git-scm.com/">Git</Link> and <Link href="https://github.com/">GitHub</Link> for version control.
                    My GitHub handle is <Link href="https://github.com/ibrahimBytes">@ibrahimBytes</Link>.
                  </ListItem>
                  <ListItem>
                    For containerization, I use <Link href="https://www.docker.com/">Docker</Link>, and I’m learning 
                    <Link href="https://kubernetes.io/"> Kubernetes</Link> for orchestration.
                  </ListItem>
                  <ListItem>
                    I deploy personal projects using <Link href="https://vercel.com/">Vercel</Link>, 
                    <Link href="https://render.com/"> Render</Link>, or <Link href="https://aws.amazon.com/s3/">AWS S3</Link>.
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        {/* === DESIGN SECTION === */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Design</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    I design using <Link href="https://www.figma.com/">Figma</Link> — clean, collaborative, and fast. I also occasionally
                    prototype animations using <Link href="https://www.adobe.com/products/aftereffects.html">After Effects</Link>.
                  </ListItem>
                  <ListItem>
                    For 3D mockups and graphics, I explore <Link href="https://www.blender.org/">Blender</Link>. 
                    It’s open-source and deeply customizable.
                  </ListItem>
                  <ListItem>
                    My design philosophy: <em>"Minimal, functional, and purpose-driven — just like code should be."</em>
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        {/* === SYSTEM SECTION === */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="m">
              <ProjectSectionHeading>System</ProjectSectionHeading>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHeadCell>Laptop</TableHeadCell>
                    <TableCell>Acer Nitro 5 (Intel i5, RTX GPU)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Operating System</TableHeadCell>
                    <TableCell>Pop!_OS (Linux) — performance-tuned and minimal</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Editor</TableHeadCell>
                    <TableCell>VS Code with Vim keybindings</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Browser</TableHeadCell>
                    <TableCell>Firefox Developer Edition</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Terminal</TableHeadCell>
                    <TableCell>Zsh with Starship prompt</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Monitor</TableHeadCell>
                    <TableCell>External 24″ Full HD 144Hz display</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Keyboard</TableHeadCell>
                    <TableCell>RGB Backlit Mechanical Keyboard (Acer Nitro built-in)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Mouse</TableHeadCell>
                    <TableCell>Logitech G102</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Headphones</TableHeadCell>
                    <TableCell>boAt Rockerz 550</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Other Tools</TableHeadCell>
                    <TableCell>OBS Studio, Postman, Docker Desktop, GitHub CLI</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>

      <Footer />
    </>
  );
}; 