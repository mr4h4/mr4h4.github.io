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
        <p>Nothing special today...</p>
        </article>
    );
    }

  return (
    <div className="holiday-card">
      <small>{holiday.date}</small>
      <h2 style={{ color: currentColor }}>{holiday.title}</h2>
      <p>{holiday.description}</p>
    </div>
  );

}