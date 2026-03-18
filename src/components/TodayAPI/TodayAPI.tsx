import { useHoliday } from "../../hooks/useHoliday";

interface HolidayCardProps {
  currentColor: string;
}
export default function HolidayCard({ currentColor }: HolidayCardProps) {

  const holiday = useHoliday();
  // Captura la fecha del sistema (Server/Runtime)
  const now = new Date();
  const today = now.toLocaleDateString("sv-SE"); // Formato YYYY-MM-DD

    if (!holiday) {
    return (
        <article className="holiday-card">
        <small>{today}</small>
        <h2 style={{ color: currentColor, textShadow: 'none', filter: 'none'}}>Nothing special today...</h2>
        <p>No recognized historical events today. It’s your chance to make history.</p>
        </article>
    );
    }

  return (
    <div className="holiday-card">
      <small>{holiday.date}</small>
      <h2 style={{ color: currentColor, textShadow: 'none', filter: 'none'}}>{holiday.title}</h2>
      <p>{holiday.description}</p>
    </div>
  );

}