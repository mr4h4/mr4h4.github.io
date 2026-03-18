import "./GitHubStats.css";

interface GithubStatsProps {
  currentColor: string;
}

export default function GithubStats({ currentColor }: GithubStatsProps) {
  const cleanColor = currentColor.replace('#', '');
  return (
    <div id="stats-container">
      <img className="github-stats-wrapper"
        alt="GitHub Stats"
        src={`https://github-stats-alpha.vercel.app/api?username=mr4h4&cc=0d1117&tc=ffffff&ic=${cleanColor}&bc=0d1117&padding=10`}
      />
      <img
        alt="GitHub Language Use"
        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=mr4h4&layout=compact&bg_color=0d1117&title_color=ffffff&text_color=ffffff&border_color=0d1117&icon_color=${cleanColor}`}
      />
    </div>
  );
}