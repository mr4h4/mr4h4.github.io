import React from 'react';

interface FooterProps {
  currentColor: string;
}

export const Footer: React.FC<FooterProps> = ({ currentColor }) => {
  return (
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
          src="./assets/github-logo.webp"
          alt="GitHub Logo"
          width="33"
          height="33"
          style={{
            transition: "transform 0.3s, filter 0.3s, drop-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.2)";
            e.currentTarget.style.filter = `drop-shadow(0 0 8px ${currentColor})`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.filter = "none";
          }}
        />
      </a>
    </footer>
  );
};