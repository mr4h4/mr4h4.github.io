import GithubStats from "../GitHubStats/GitHubStats.tsx";
import { Link } from "react-router-dom";
import "./ContentHome.css";
import "../../index.css";

const badges = [
  // Lenguajes de programación
  {
    alt: 'TypeScript',
    class: 'badge',
    src: 'https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white',
  },

  // Frameworks / Librerías
  {
    alt: 'React',
    class: 'badge',
    src: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB',
  },
  {
    alt: 'React Router',
    class: 'badge',
    src: 'https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white',
  },

  // Herramientas y habilitadores
  {
    alt: 'Node.js',
    class: 'badge',
    src: 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white',
  },
  {
    alt: 'Vercel',
    class: 'badge',
    src: 'https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white',
  },
];

export function ContentHome({ currentColor }: { currentColor: string }) {
  return (
    <main className="content-home">

<h1>Welcome to my portfolio</h1>

<p>
  I introduce you to my technical ecosystem. This space serves as a central repository for my personal projects.
</p>

<p>
  My journey began with a deep dive into <strong>Microcomputer Systems & Networks (SMR)</strong>. This foundational phase allowed me to master the core pillars of computing: from advanced hardware architecture and operating system <br></br>
  management to the deployment of critical network services and server administration. Understanding how the machine and the network breathe from the inside out has been vital to my technical growth.
</p>

<p>
  This site is a constantly evolving environment documenting my project lifecycles and technological stack progression. Currently, I am expanding my expertise by pursuing <strong>Web Application Development (DAW)</strong>. <br></br>
  This phase of my journey is focused on mastering the full-stack lifecycle: from architecting dynamic <strong>front-end interfaces</strong> and building robust <strong>back-end logic</strong> to the seamless integration of <strong>relational and non-relational databases</strong>. <br></br>
  In this environment, I analyze critical deployments, code optimization, and the resolution of complex software challenges. My goal is to transform theoretical patterns into functional, high-performance applications that meet modern industry standards.
</p>

<p>
  Feel free to explore my featured projects and technical evolution. I am always open to discussing new technologies, modern development patterns, and potential collaborations in the ever-changing digital landscape.
</p>
      <br></br>
      <h2 className="subtitle" style={{ color: currentColor}}>Check out my work or let's connect:</h2>
      <Link to="/repos" className="contact-button">PROJECTS</Link>
      <Link to="https://github.com/mr4h4?tab=repositories" target="blank" className="contact-button">REPOSITORIES</Link>
      <Link to="/contact" className="contact-button">GET IN TOUCH</Link>
     <hr style={{ borderColor: currentColor }}></hr>

      <h2 className="subtitle" style={{ color: currentColor}}>
        My GitHub Stats & Most Used Languages  
      </h2>
      <p>Visualizing my digital footprint through repositories and commits.</p>
      <div>
        {GithubStats({ currentColor })}
      </div>

     <hr style={{ borderColor: currentColor }}></hr>
      <h2 className="subtitle" style={{ color: currentColor}}>
        Built with:
      </h2>
      <small>Technologies and tools used to create this portfolio</small>
      <br></br>
      {badges.map((badge) => (
        <img key={badge.alt} {...badge} />
      ))} 
    </main>
  );
}