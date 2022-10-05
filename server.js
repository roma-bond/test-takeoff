const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = 'sdflwiejf@#$@$#%';
const expiresIn = '1h';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

server.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  if (isAuthenticated(email, password)) {
    const status = 401;
    const message = 'Email and password already exist';
    res.status(status).json({ status, message });
    return;
  }

  const access_token = createToken({ email, password });
  const newUser = {
    id: Math.random(),
    email,
    password,
    contacts: [],
    token: access_token,
  };
  userdb.users.push(newUser);

  res.status(200).json({ access_token, id: newUser.id });
});

server.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!isAuthenticated({ email, password })) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }

  const user = userdb.users.find((user) => user.email === email);
  const userId = user.id;

  const access_token = createToken({ email, password });
  user.token = access_token;
  res.status(200).json({ access_token, id: userId });
});

server.get('/api/users/:id/contacts', (req, res) => {
  const userId = Number(req.params.id);
  const user = userdb.users.find((user) => user.id === userId);

  res.status(200).json({ contacts: user.contacts });
});

server.post('/api/users/:id/contacts', (req, res) => {
  const { contact } = req.body;
  const userId = Number(req.params.id);
  const user = userdb.users.find((user) => user.id === userId);
  user.contacts.push(contact);
  res.status(200).json({ contact });
});

server.delete('/api/users/:id/contacts/contactId', (req, res) => {
  const userId = Number(req.params.id);
  const contactId = Number(req.params.contactId);

  const user = userdb.users.find((user) => user.id === userId);
  const deleteIndex = user.contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (deleteIndex >= 0) {
    user.contacts.splice(deleteIndex, 1);
  }
  res.status(200);
});

server.listen(5000, () => {
  console.log('Running fake api json server');
});
