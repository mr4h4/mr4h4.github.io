import GithubStats from "../GitHubStats/GitHubStats.tsx";
import "./ContentHome.css";
import "../../index.css";

export function ContentHome({ currentColor }: { currentColor: string }) {
  // 2. Aquí declaramos el estado. Este es el "Single Source of Truth"
  return (
    <main className="content-home">
      {/* 3. Insertamos el Menú aquí y le pasamos el control del estado */}

      <h1>Welcome to My Portfolio</h1>

      <p>
        This is the home section where you can find an overview of my work and
        projects.
      </p>
      <p>
        This site is a constantly evolving space where I share my projects and
        learning journey. Here, I talk about my work, progress, and experiments.
        The goal is to document my growth and continue improving my skills in
        software development, cybersecurity, and related fields.
      </p>

      <br />

      {/* Usamos currentColor directamente en el estilo inline también */}
      <h2 style={{ color: currentColor, width: "100%", textAlign: "center" }}>
        My GitHub Stats & Stack Profile
      </h2>
      <div>
        {GithubStats({ currentColor })}
      </div>
    </main>
  );
}