import "./ContentHome.css";
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
      <h1>My Repositories</h1>

      <p>
        A showcase of my best GitHub projects with links and key details.
      </p>

      <hr style={{ borderColor: currentColor }} />

      <ProjectGrid proyectos={proyectos} />
    </main>
  );
}