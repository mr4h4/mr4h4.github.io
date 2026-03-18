import "./ContentHome.css";
import "../../index.css";

export function ContentContact({ currentColor }: { currentColor: string }) {
  // 2. Aquí declaramos el estado. Este es el "Single Source of Truth"
  return (
    <main className="content-home">
        <h1>Contact Me</h1>
        <p>
            If you'd like to get in touch, feel free to reach out through any of the following channels:
        </p>
        <ul className="contact-list">
            <li>
                <span style={{ color: currentColor }}><h2>Email</h2></span>
                <a href="mailto:adrianheredev@gmail.com">
                adrianheredev@gmail.com
                </a>
            </li>
            <li>
                <span style={{ color: currentColor }}><h2>LinkedIn</h2></span>
                <a 
                href="https://www.linkedin.com/in/adri%C3%A1n-heredero-antonio-660a93328/"
                target="_blank"
                rel="noopener noreferrer"
                >
                Adrián Heredero Antonio
                </a>
            </li>
            <li>
                <span style={{ color: currentColor }}><h2>GitHub</h2></span>
                <a 
                href="https://github.com/mr4h4"
                target="_blank"
                rel="noopener noreferrer"
                >
                github.com/mr4h4
                </a>
            </li>
        </ul>

    </main>
  );
}