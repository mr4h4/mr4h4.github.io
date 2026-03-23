import "./Content.css";
import "../../index.css";

import ProjectGrid, { type Project } from "../ProjectGrid/ProjectGrid";
import proyectosJson from "../ProjectGrid/proyectos.json";

interface ContentReposProps {
  currentColor: string;
}

export function ContentRepos({ currentColor }: ContentReposProps) {
  
  // Tipamos correctamente el JSON
  const proyectos: Project[] = proyectosJson as Project[];

  return (
    <main className="content-home">
      <h1>My Projects</h1>

      <p>
        A selection of projects I’ve built, with links, key details, and live demos for some of them.
      </p>

      <hr style={{ borderColor: currentColor }} />

      <ProjectGrid proyectos={proyectos} />
    </main>
  );
}