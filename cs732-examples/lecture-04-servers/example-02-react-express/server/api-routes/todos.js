const todos = [
    {
        id: '49ed48ae-4b64-41d9-bb93-c391c2e9fab8',
        text: "Do stuff",
        completed: false,
        modified: "2020-03-09T15:00:00+13:00"
    },
    {
        id: '024d305a-813a-4807-af7b-cad12288f7bd',
        text: "Do things",
        completed: true,
        modified: "2020-03-09T15:00:00+13:00"
    },
    {
        id: '0a2b8bae-479f-42a7-a700-f51f5e48bdd2',
        text: "Do more stuff",
        completed: false,
        modified: "2020-03-09T15:00:00+13:00"
    },
    {
        id: '5dc89462-941c-4ba6-b5b4-759d5669cbc3',
        text: "Do more things",
        completed: false,
        modified: "2020-03-09T15:00:00+13:00"
    },
    {
        id: 'd896033c-b646-4547-afb4-974d9a41d3cb',
        text: "Procrastinate",
        completed: true,
        modified: "2020-03-09T15:00:00+13:00"
    }
];

export default router => {

    // Whenever we GET ./todos, return the todos.
    router.get("/todos", (req, res) => {

        res.json(todos);
    });

    router.post("/todos", (req, res) => {

        console.log(req.body);

        const { id, text, completed, modified } = req.body;
        const todo = { id, text, completed, modified };
        todos.push(todo);

        // TODO: Probably should do a proper REST response here (SE325 people)...
        res.status(200).end();

    });
}