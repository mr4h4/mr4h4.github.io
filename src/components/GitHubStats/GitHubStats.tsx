import "./GitHubStats.css";

interface GithubStatsProps {
  currentColor: string;
}

const badges = [
  // --- FRONTEND ---
  {
    alt: 'HTML5',
    class: 'badge',
    src: 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',
  },
  {
    alt: 'CSS3',
    class: 'badge',
    src: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white',
  },
  {
    alt: 'JavaScript',
    class: 'badge',
    src: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
  },
  {
    alt: 'TypeScript',
    class: 'badge',
    src: 'https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white',
  },
  {
    alt: 'React',
    class: 'badge',
    src: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB',
  },
  {
    alt: 'Vite',
    class: 'badge',
    src: 'https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white',
  },

  // --- BACKEND & LENGUAJES ---
  {
    alt: 'Java',
    class: 'badge',
    src: 'https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white',
  },
  {
    alt: 'PHP',
    class: 'badge',
    src: 'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white',
  },
  {
    alt: 'Python',
    class: 'badge',
    src: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=FFD43B',
  },
  {
    alt: 'NodeJS',
    class: 'badge',
    src: 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white',
  },

  // --- DATOS & SISTEMAS ---
  {
    alt: 'SQL',
    class: 'badge',
    src: 'https://img.shields.io/badge/SQL-005963?style=for-the-badge&logo=databricks&logoColor=white',
  },
  {
    alt: 'XML',
    class: 'badge',
    src: 'https://img.shields.io/badge/XML-555555?style=for-the-badge&logo=codeforces&logoColor=white',
  },
  {
    alt: 'Bash',
    class: 'badge',
    src: 'https://img.shields.io/badge/Bash-121011?style=for-the-badge&logo=gnu-bash&logoColor=white',
  },

  // --- TOOLS & DESKTOP ---
  {
    alt: 'Electron',
    class: 'badge',
    src: 'https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white',
  },
  {
    alt: 'Git',
    class: 'badge',
    src: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white',
  },
];

export default function GithubStats({ currentColor }: GithubStatsProps) {
  const cleanColor = currentColor.replace('#', '');

  return (
    <div id="stats-container">
      <img
        alt="GitHub Stats"
        src={`https://github-stats-alpha.vercel.app/api?username=mr4h4&cc=0d1117&tc=ffffff&ic=${cleanColor}&bc=0d1117`} />
    
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2px',
          overflow: 'hidden', 
        }}
      >

        {badges.map((badge) => (
          <img key={badge.alt} {...badge} />
        ))}
      </div>
    </div>
  );
}

