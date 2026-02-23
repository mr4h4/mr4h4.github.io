import { useState, useEffect } from "react";
import "./ColorMenu.css";

interface ColorMenuProps {
  currentColor: string;
  onColorSelect: (color: string) => void;
}

export default function ColorMenu({ currentColor, onColorSelect }: ColorMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [color, setColor] = useState<string>(currentColor); // estado interno
  const colors = ["#ab0445", "#18c175", "#2350d7", "#a325f6"];

  // Al montar el componente, cargamos color desde localStorage
  useEffect(() => {
    const savedColor = localStorage.getItem("selectedColor");
    if (savedColor) {
      setColor(savedColor);
      onColorSelect(savedColor); // también informamos al padre
    }
  }, []);

  const changeColor = (newColor: string) => {
    setColor(newColor);
    onColorSelect(newColor);                  // enviamos al padre
    localStorage.setItem("selectedColor", newColor); // guardamos
    setMenuOpen(false);
  };

  return (
    <div className="hamburger-menu">
      <button
        className="color-button"
        style={{ backgroundColor: color }}
        onClick={() => setMenuOpen(!menuOpen)}
      />
      <div className={`menu-items ${menuOpen ? "show" : ""}`}>
        {colors.map((c) => (
          <button
            key={c}
            className="color-button"
            style={{ backgroundColor: c }}
            onClick={() => changeColor(c)}
          />
        ))}
      </div>
    </div>
  );
}
