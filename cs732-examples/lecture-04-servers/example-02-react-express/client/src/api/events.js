
export function getEvents() {
    return fetch("/api/events").then(res => res.json());
}