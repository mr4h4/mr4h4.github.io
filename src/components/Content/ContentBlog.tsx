import "./ContentHome.css";
import "../../index.css";

export function ContentBlog({ currentColor }: { currentColor: string }) {
  // 2. Aquí declaramos el estado. Este es el "Single Source of Truth"
  return (
    <main className="content-home">
      <h1>Blog</h1>
      <p>Welcome to my blog! Here I share my thoughts, projects, and updates about my journey as a developer.</p>
      <hr style={{ borderColor: currentColor }}></hr>
      <p>– coming soon updates.</p>
    </main>
  );
}