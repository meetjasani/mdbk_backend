import express, { Application, Request, Response } from 'express'
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import path from 'path';
import config from './server/config/config'
import logger from './server/config/logger'
import { Sequelize } from 'sequelize'
import routes from './server/routes/v1'
import session from 'express-session';

const app: Application = express()
const port = config.port

// parse cookies
app.use(cookieParser());
app.use(session({
    secret: "F23e12WF",
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.resolve('./public')));

// set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());

// file upload
app.use(fileUpload({ createParentPath: true }));

// google authentication
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user: any, done: any) => done(null, user));
passport.deserializeUser((user: any, done: any) => done(null, user));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `Welcome to the MDBK API! \n Endpoints available at http://localhost:${port}/v1` })
})

// v1 api routes
app.use('/v1', routes);

try {
    app.listen(port, () => {
        const sequelize = new Sequelize(config.db.dbname, config.db.username, config.db.password, {
            host: config.db.host,
            dialect: config.db.dialect,
            port: config.db.port,
            logging: config.db.logging
        })

        sequelize
            .authenticate()
            .then(() => {
                logger.info(`Connected to ${config.db.dialect}`)
            })
            .catch((err: any) => {
                logger.info('Unable to connect to the database:', err)
            })
        logger.info(`Server running on http://localhost:${port}`)
    })
} catch (error) {
    logger.error(`Error occurred: ${error}`)
}
