import express from 'express';
import addTodoRoutes from './todos';
import addEventRoutes from './events';

const router = express.Router();

addTodoRoutes(router);
addEventRoutes(router);

router.get('/', (req, res) => {
    res.json({ isAlive: true });
})

export default router;