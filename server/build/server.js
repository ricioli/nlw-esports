import express from 'express';
const app = express();
app.get('/ads', (request, response) => {
    response.json({ teste: 1 });
});
app.listen(3333);
