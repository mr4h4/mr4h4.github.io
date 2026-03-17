import { useEffect, useState } from "react";

interface Holiday {
  date: string;
  title: string;
  description: string;
}

//const API_URL = import.meta.env.VITE_API_URL;
const API_PROXY = "/api/holiday";

export function useHoliday() {
  const [holiday, setHoliday] = useState<Holiday | null>(null);

  useEffect(() => {
    async function loadHoliday() {
      try {
        const res = await fetch(API_PROXY);
        if (!res.ok) {
          console.error("Holiday not found", res.status);
          setHoliday(null);
          return;
        }

        const apiData: Holiday = await res.json();
        setHoliday(apiData);

      } catch (err) {
        console.error("Error fetching holiday", err);
        setHoliday(null);
      }
    }

    loadHoliday();
  }, []);

  return holiday;
}