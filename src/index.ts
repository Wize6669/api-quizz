import { app } from './app';
import { config } from './config';

const PORT = config.get('PORT');

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
