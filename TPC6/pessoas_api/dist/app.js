import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';
import mongoose from 'mongoose';
import { router } from './routers/index.js';
const mongo_url = "mongodb://127.0.0.1/pessoas_db";
mongoose.connect(mongo_url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB error connecting...'));
db.on('open', () => {
    console.log("Conexão ao MongoDB estabelecido com sucesso");
});
const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join('public')));
app.listen(7777, () => {
    console.log('Server listening on http://localhost:7777');
});
app.use('/', router);
app.use(function (_req, _res, next) {
    next(createError(404));
});
app.use((err, req, res, _next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.status(404).json({ erro: err, mensagem: "Pedido não suportado." });
});
