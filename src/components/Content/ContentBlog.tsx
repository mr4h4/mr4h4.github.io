import "./ContentHome.css";
import "../../index.css";

export function ContentBlog({ currentColor }: { currentColor: string }) {
  // 2. Aquí declaramos el estado. Este es el "Single Source of Truth"
  return (
    <main className="content-home">
      <h1>Blog</h1>
      <p>My tech blog – coming soon updates.</p>
      <hr style={{ borderColor: currentColor }}></hr>
    </main>
  );
}