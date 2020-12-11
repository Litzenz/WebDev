
export function getTodos() {
    return fetch("/api/todos").then(res => res.json());
}

export function addTodo(todo) {
    return fetch("/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    });
}