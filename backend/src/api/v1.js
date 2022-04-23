import canvas from '../routes/canvas.js'

const apiRouter = (app) => {
    app.use('/api/v1/canvas', canvas);
};

export default apiRouter;