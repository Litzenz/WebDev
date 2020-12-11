const events = [
    {
        id: '16b020e1-1214-4977-a40b-3df1b7407149',
        start: "2020-03-06T09:00:00+13:00",
        end: "2020-03-06T16:00:00+13:00",
        name: "Lecture preparation",
        description: "Preparing for next week's lectures",
        modified: "2020-03-09T15:00:00+13:00"
    },
    {
        id: '0ea1142a-eab8-4a3c-b9bd-404722915a14',
        start: "2020-03-09T09:00:00+13:00",
        end: "2020-03-09T11:00:00+13:00",
        name: "SE750 / CS732 lecture",
        description: "Introducing Redux to the class",
        modified: "2020-03-09T15:00:00+13:00"
    },
    {
        id: '2172269c-2437-418a-85d5-82f8ebfa372e',
        start: "2020-03-09T11:00:00+13:00",
        end: "2020-03-09T13:00:00+13:00",
        name: "Lunch",
        description: "Relaxing after the lecture",
        modified: "2020-03-09T15:00:00+13:00"
    },
    {
        id: '862bb995-12a7-46fa-bf74-1b0c35a8c9aa',
        start: "2020-03-10T09:00:00+13:00",
        end: "2020-03-10T11:00:00+13:00",
        name: "SE750 / CS732 lecture",
        description: "APIs and Exercises",
        modified: "2020-03-09T15:00:00+13:00"
    }
];

export default router => {

    // Whenever we GET ./events, return the calendar events.
    router.get("/events", (req, res) => {

        res.json(events);
    });
}