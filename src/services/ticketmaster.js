const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

// Get list of events (Events page)
export async function getEvents() {
  try {
    if (!API_KEY) {
      console.error("Missing VITE_TICKETMASTER_API_KEY. Check .env and restart Vite.");
      return [];
    }

    const url = `/api/ticketmaster/discovery/v2/events.json?apikey=${API_KEY}&size=20&city=New%20York`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`Ticketmaster request failed: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return data?._embedded?.events ?? [];
  } catch (err) {
    console.error("Ticketmaster fetch crashed:", err);
    return [];
  }
}

// Get a single event by id (Event detail page)
export async function getEventById(id) {
  try {
    if (!API_KEY) {
      console.error("Missing VITE_TICKETMASTER_API_KEY. Check .env and restart Vite.");
      return null;
    }

    const url = `/api/ticketmaster/discovery/v2/events/${id}.json?apikey=${API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`Ticketmaster event request failed: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data ?? null;
  } catch (err) {
    console.error("Ticketmaster getEventById crashed:", err);
    return null;
  }
}