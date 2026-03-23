import GithubStats from "../GitHubStats/GitHubStats.tsx";
import { Link } from "react-router-dom";
import "./Content.css";
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
    <div className="content-article">
      <p>
        Welcome to my technical ecosystem: 
      </p>
      <p>
        This constantly evolving space is not just a gallery, but a testament to my commitment to continuous stack improvement.
      </p>
    </div>
      <br></br>
      <div className="hero-cta">

      <div className="cta-item">
        <div className="cta-info">
        <p style={{color: currentColor, fontWeight: "bolder"}}>
          Check out my work or let's connect:
        </p>
          <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
            A transparent look at my stack evolution and professional standards.<br></br>
            Let’s collaborate on new technologies.
          </p>
        </div>
        <div className="cta-actions">
          <Link to="/repos" className="contact-button">PROJECTS</Link>
          <Link to="https://github.com/mr4h4?tab=repositories" target="_blank" className="contact-button">REPOSITORIES</Link>
          <Link to="/contact" className="contact-button">GET IN TOUCH</Link>
        </div>
      </div>
    </div>

     <hr style={{ borderColor: currentColor }}></hr>

      <h1>
        My GitHub Stats & Most Used Languages  
      </h1>
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