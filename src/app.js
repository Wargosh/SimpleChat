import express from 'express';
import path from 'path';

const app = express();

// Seccion de configuración
app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')))

export default app;
