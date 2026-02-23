// App.tsx
import { useState } from 'react'
import { Header } from "./components/Header/Header";
import ColorMenu from './components/ColorMenu/ColorMenu';
import { Route, Routes } from 'react-router-dom';

import { ContentHome } from "./components/Content/ContentHome";
import { ContentBlog } from "./components/Content/ContentBlog";
import { ContentRepos } from "./components/Content/ContentRepos";
import { ContentContact } from "./components/Content/ContentContact";

export default function App() {
  const [currentColor, setCurrentColor] = useState("#ab0445");

  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor);
    document.documentElement.style.setProperty("--secondary-color", newColor);
  }

  return (
    <>
      {/* Pasamos el color al Header */}
      <Header currentColor={currentColor} />
      
      {/* El menú que cambia el color de todos */}
      <ColorMenu currentColor={currentColor} onColorSelect={handleColorChange} />
      
      <Routes>
        <Route path="/" element={<ContentHome currentColor={currentColor} />} />
        <Route path="/blog" element={<ContentBlog currentColor={currentColor} />} />
        <Route path="/repos" element={<ContentRepos currentColor={currentColor} />} />
        <Route path="/contact" element={<ContentContact currentColor={currentColor} />} />
      </Routes>

      <footer style={{ textAlign: "center", padding: "20px" }}>
        <hr style={{ borderColor: currentColor }} />
        <a
          href="https://github.com/mr4h4"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          style={{ display: "inline-block" }}
        >
          <img
            src="./src/assets/github-logo.webp"
            alt="GitHub Logo"
            width="33"
            height="33"
            style={{
              transition: "transform 0.3s, filter 0.3s, drop-shadow 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.2)";
              e.currentTarget.style.filter = `drop-shadow(0 0 8px ${currentColor})`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.filter = "none";
            }}
          />
        </a>
      </footer>
    </>
  );
}