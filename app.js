const express = require('express');
const app = express();
const port = 8080;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.status(200);
  res.render('index', {
    title: 'Basic Informational Site',
    message: 'Basic Informational Site!',
    about: 'About',
  });
});

app.get('/about', (req, res) => {
  res.status(200);
  res.render('about', { title: 'About Page', message: 'Simple about page' });
});

app.get('/contact-me', (req, res) => {
  res.status(200);
  res.render('contact-me', { title: 'Contact Page', message: 'Contact Me' });
});

app.get('*', (req, res) => {
  res.status(404);
  res.render('404', { title: '404 Page', message: 'Page Not Found' });
});

app.get('about-me', (req, res) => {
  res.status(301);
  res.render('about');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
