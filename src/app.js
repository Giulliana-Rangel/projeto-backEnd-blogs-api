const express = require('express');
// const apiRoutes = require('./Routes');
const loginController = require('./controllers/login');
const userController = require('./controllers/user.controller');
const { validateDisplayName,
  validateEmail, validatePassword } = require('./Middlewares/userValidations'); 

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', loginController);
app.post('/user',
 validateDisplayName, validateEmail, validatePassword, userController.createNewUser);

// app.use('/login', apiRoutes);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
