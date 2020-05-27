import { startServer } from './backend-app';

////////////////////////////////////////////////////////////////////////////////
// Startup

startServer().catch(err => {
    console.error("Unable to start Back & Forth server.");
    console.error(err);
    process.exit(1);
});
