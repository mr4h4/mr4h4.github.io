import "./GitHubStats.css";

interface GithubStatsProps {
  currentColor: string;
}

const badges = [
  {
    alt: 'CSS3',
    class: 'badge',
    src: 'https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white',
  },
  {
    alt: 'HTML5',
    class: 'badge',
    src: 'https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white',
  },
  {
    alt: 'Java',
    class: 'badge',
    src: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white',
  },
  {
    alt: 'JavaScript',
    class: 'badge',
    src: 'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E',
  },
  {
    alt: 'TypeScript',
    class: 'badge',
    src: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white',
  },
  {
    alt: 'XML', 
    class: 'badge',
    src: 'https://img.shields.io/badge/xml-%23000000.svg?style=for-the-badge&logo=xml&logoColor=white',
  },
  {
    alt: 'PHP',
    class: 'badge',
    src: 'https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white',
  },
  {
    alt: 'Python',
    class: 'badge',
    src: 'https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54',
  },
  {
    alt: 'Bash',
    class: 'badge',
    src: 'https://img.shields.io/badge/bash_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white',
  },
  {
    alt: 'NodeJS',
    class: 'badge',
    src: 'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white',
  },
  {
    alt: 'React',
    class: 'badge',
    src: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB',
  },
  {
    alt: 'Vite',
    class: 'badge',
    src: 'https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white',
  },
  {
    alt: 'Electron',
    class: 'badge',
    src: 'https://img.shields.io/badge/electron-%23000000.svg?style=for-the-badge&logo=electron&logoColor=white',
  },  
  {
    alt: 'Git',
    class: 'badge',
    src: 'https://img.shields.io/badge/git-%23F05032.svg?style=for-the-badge&logo=git&logoColor=white',
  },
  {
    alt: 'mySQL',
    class: 'badge',
    src: 'https://img.shields.io/badge/MySQL-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white',
  }
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

