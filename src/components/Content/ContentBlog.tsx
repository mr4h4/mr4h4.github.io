import "./Content.css";
import "../../index.css";
import TodayAPI from "../TodayAPI/TodayAPI";

export function ContentBlog({ currentColor }: { currentColor: string }) {
  return (
    <main className="content-home">
      <h1>Blog Section</h1>
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
      <div className="blog-article content-article">
        <h1>My Path</h1>
        <small>Last Update: 2026-03-18</small>
        <br></br>
        <small>2023-2025</small>
        <p>
          My journey began with a deep dive into <strong>Microcomputer Systems & Networks (SMR)</strong>. This foundational phase allowed me to master the core pillars of computing: from advanced hardware architecture and operating system <br></br>
          management to the deployment of critical network services and server administration. Understanding how the machine and the network breathe from the inside out has been vital to my technical growth.
        </p>
        <br></br>
        <small>2025-present</small>
        <p>
          Currently, I am expanding my expertise by pursuing <strong>Web Application Development (DAW)</strong>. <br></br>
          This phase of my journey is focused on mastering the full-stack lifecycle: from architecting dynamic <strong>front-end interfaces</strong> and building robust <strong>back-end logic</strong> to the seamless integration of <strong>relational and non-relational databases</strong>. <br></br>
          In this environment, I analyze critical deployments, code optimization, and the resolution of complex software challenges. My goal is to transform theoretical patterns into functional, high-performance applications that meet modern industry standards.
        </p>
      </div>
      
    </main>
  );
}