// This will house My back-end implementation in NodeJS-Express-Postgres
import express from 'express';
import morgan from 'morgan';
import { StatusCodes } from 'http-status-codes';
import 'dotenv/config';
import helmet from "helmet";
import cors from 'cors';

const App = express();