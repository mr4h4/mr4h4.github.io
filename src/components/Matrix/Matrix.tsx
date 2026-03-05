import { useEffect, useRef } from "react";
import "./Matrix.css";

interface MatrixProps {
  color: string; 
}

export function Matrix({ color }: MatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const colorRef = useRef(color); // ref para almacenar el color actual

  useEffect(() => {
    colorRef.current = color; // actualiza el ref cuando cambia el color
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const header = canvas.parentElement;
    if (!header) return;

    const fontSize = 14;
    const characters = [
  // La base: 0 y 1 abundantes
  "0", "1", "0", "1", "1", "0", "0", "1", "0", "1", "1", "0", "0", "1", "0", "1",
  "0", "1", "1", "0", "0", "1", "0", "1", "1", "0", "0", "1", "0", "1", "0", "1",

  // Caracteres japoneses “cool”
  "カ", "キ", "ケ", "コ", "サ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト",

  // Símbolos de error / hacker / glitch
  "Δ", "Ξ", "λ", "ψ", "∞", "≠", "≈", "≡", "∑",

  // Letras pseudo hacker (letras y números mezclados)
  "A", "B", "C", "D", "E", "F", "X", "Y", "Z", "G", "H", "I", "J", "K", "L", "M",

  // Extra: errores o glitches
  "error", "???", "!!!", "###", "@@", "&&", "%%", "$$", "!!", "??"
];

    let columns = 0;
    let drops: number[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = header.clientHeight;

      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * (canvas.height / fontSize))
      );
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      ctx.fillStyle = "rgba(13, 17, 23, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = colorRef.current; // usa siempre el color más reciente
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char =
          characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 50);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="matrix-canvas"/>;
}
