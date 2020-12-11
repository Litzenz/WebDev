import express from 'express';
import configureMyApi from './my-api';

const router = express.Router();
configureMyApi(router);

export default router;