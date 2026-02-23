import "./projects.css";

/* =========================
   Tipos
========================= */

export interface Project {
  nombre: string;
  descripcion: string;
  url: string;
  temas: string[];
}

interface ProjectGridProps {
  proyectos: Project[];
}

/* =========================
   Componente
========================= */

function ProjectGrid({ proyectos }: ProjectGridProps) {
  if (!proyectos || proyectos.length === 0) {
    return <p>No hay proyectos disponibles.</p>;
  }

  return (
    <div className="project-grid">
      {proyectos.map((proyecto) => (
        <div key={proyecto.url} className="project-card">
          <h2>
            <a
              href={proyecto.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {proyecto.nombre}
            </a>
          </h2>

          <p>{proyecto.descripcion}</p>

          <div className="project-tags">
            {proyecto.temas.map((tema) => (
              <span key={tema} className="project-tag">
                {tema}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectGrid;