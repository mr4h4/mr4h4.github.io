import "./ContentHome.css";
import "../../index.css";
import "./ContentHome.css";
import TodayAPI from "../TodayAPI/TodayAPI";

export function ContentBlog({ currentColor }: { currentColor: string }) {
  return (
    <main className="content-home">
      <h1>Blog</h1>
      <p>Welcome to my blog! Here I share my thoughts, new projects, and updates about my journey as a developer.</p>
      <hr style={{ borderColor: currentColor }}></hr>
      <div className="today-div">
        <h2  className="subtitle" style={{color: currentColor}}>
          today.api  
        </h2>
        <small>AI-curated daily milestones</small>
        <TodayAPI currentColor={currentColor} />  
      </div>
      <hr style={{ borderColor: currentColor }}></hr>
      <p>– coming soon updates.</p>
    </main>
  );
}