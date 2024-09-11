const express = require('express')
const morgan = require('morgan');
const logger = require('./middlewares/logger'); // Import the Winston logger
const app = express()
app.use(express.json());
const { sequelize } = require('./models'); // Import the Sequelize instance
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const protectedRoutes = require('./routes/protectedRoutes'); // Import protected routes

app.use(morgan('combined', {
  stream: {
    write: message => logger.info(message.trim()) // Redirect Morgan logs to Winston
  }
}));
// Public routes (authentication-related)
app.use('/api/auth', authRoutes);

// Protected routes (requires authentication)
app.use('/api/protected', protectedRoutes);


const server_credentials = {
    IP:'localhost',   
    port:3000
}
app.get('/test',(req,res)=>{
    res.status(500).send({status:200 , message :'Welcome to client Stackholder application'})
})

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(server_credentials.port,(req,res)=>{
    console.log(`Stackholder application is running on Env ${server_credentials.IP} port ${server_credentials.port}`)
})