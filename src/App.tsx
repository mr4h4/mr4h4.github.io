import { useState } from 'react'
import { Header } from "./components/Header/Header";
import ColorMenu from './components/ColorMenu/ColorMenu';
import { Route, Routes } from 'react-router-dom';

import { ContentHome } from "./components/Content/ContentHome";
import { ContentBlog } from "./components/Content/ContentBlog";
import { ContentRepos } from "./components/Content/ContentRepos";
import { ContentContact } from "./components/Content/ContentContact";
import { Footer } from './components/Footer/Footer';

export default function App() {
  const [currentColor, setCurrentColor] = useState("#ab0445");

  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor);
    document.documentElement.style.setProperty("--secondary-color", newColor);
  }

  return (
    <>
    <div className="app-container">
      <Header currentColor={currentColor} />
      
      <ColorMenu currentColor={currentColor} onColorSelect={handleColorChange} />
      
      {/* Las rutas se mantienen igual, HashRouter se encarga del resto */}
      <Routes>
        <Route path="/" element={<ContentHome currentColor={currentColor} />} />
        <Route path="/blog" element={<ContentBlog currentColor={currentColor} />} />
        <Route path="/repos" element={<ContentRepos currentColor={currentColor} />} />
        <Route path="/contact" element={<ContentContact currentColor={currentColor} />} />
        {/* Opcional: Redirigir cualquier ruta desconocida al home */}
        <Route path="*" element={<ContentHome currentColor={currentColor} />} />
      </Routes>

      <Footer currentColor={currentColor} />
    </div>
    </>
  );
}