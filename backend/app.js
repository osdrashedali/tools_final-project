import exprees from 'express';
import morgan from 'morgan';
// import authrouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

const app = exprees();

app.use(cookieParser());
app.use(exprees.json());
app.use(morgan('dev'));

// app.use('/api/v1/auth', authrouter);

export default app;
