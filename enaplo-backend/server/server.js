import express from 'express';
const app = express();

app.get('/api', (req, res) => {
    res.send({
      message: 'I am a server route and can also be hot reloaded! 2'
    });
});

export default app;
