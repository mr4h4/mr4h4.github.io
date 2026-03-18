import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { Matrix } from "../Matrix/Matrix.tsx";
import Avatar from '/assets/avatar.png';
import AvatarTongue from '/assets/avatarTongue.png';
import './Header.css';
import IDEAS from "./ideas.json";

export const Header = ({ currentColor }: { currentColor: string }) => {
  // --- ESTADOS ---
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(Avatar);
  const [randomIdea, setRandomIdea] = useState("");

  // --- LÓGICA DE INTERACCIÓN (AVATAR) ---
  const handleClick = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSrc(AvatarTongue);

    setTimeout(() => {
      setCurrentSrc(Avatar);
      setIsAnimating(false);
    }, 1000);
  }, [isAnimating]);

  // --- LÓGICA DE LA MÁQUINA DE ESCRIBIR ---
  useEffect(() => {
    let isMounted = true; // Para evitar fugas de memoria si el componente se desmonta

    const printIdea = async () => {
      const idea = IDEAS[Math.floor(Math.random() * IDEAS.length)];
      
      // Escribir
      for (let i = 0; i <= idea.length; i++) {
        if (!isMounted) return;
        setRandomIdea(idea.slice(0, i));
        await new Promise(r => setTimeout(r, 60));
      }

      // Espera antes de borrar
      await new Promise(r => setTimeout(r, 1500));

      // Borrar
      for (let i = idea.length; i >= 0; i--) {
        if (!isMounted) return;
        setRandomIdea(idea.slice(0, i));
        await new Promise(r => setTimeout(r, 30));
      }

      // Reiniciar ciclo si sigue montado
      if (isMounted) printIdea();
    };

    printIdea();

    return () => { isMounted = false; }; // Limpieza
  }, []); // Solo se ejecuta al montar

  // --- RENDERIZADO ---
  return (
    <header className="header">
      {/* El fondo Matrix reacciona al estado currentColor */}
      <Matrix color={currentColor} />

      <div className="header__content">
        <img 
          src={currentSrc} 
          className={`avatar ${isAnimating ? "flip" : ""}`} 
          alt="mr4h4 Avatar" 
          onMouseEnter={handleClick}
        />

        {/* Pasamos el estado y su función de actualización al menú */}
        <h1>Adrián</h1>
        <h3>(mr4h4)</h3>
        
        {/* Mostramos la idea animada */}
        <p className='randomIdea'>
          · {randomIdea} ·
        </p>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/repos">Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
};