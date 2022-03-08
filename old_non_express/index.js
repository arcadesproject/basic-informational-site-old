//use http for setting up server
const http = require('http');
//use fs to read the filesystem
const fs = require('fs');
//just using env for port, no real need
require('dotenv').config();

const server = http.createServer((req, res) => {
  //set header since all will be text/html
  res.setHeader('Content-Type', 'text/html');
  //array of pages, would be easy to have a lot more
  const pages = ['/about', '/contact-me'];
  //get the url entered by user
  const requestURL = req.url;
  //set up path variable to then alter/read later
  let path;
  //if it matches a set url then simply set the path, matching file used
  if (pages.includes(requestURL)) {
    res.statusCode = 200;
    path = `.${requestURL}.html`;
    //otherwise for special index path or 404 for those that don't match anything
  } else {
    switch (requestURL) {
      case '/':
        res.statusCode = 200;
        path = `./index.html`;
        break;
      //a redirect example
      case '/about-me':
        res.statusCode = 301;
        res.setHeader('Location', 'about');
        res.end();
        break;
      default:
        path = `./404.html`;
        res.statusCode = 404;
        break;
    }
  }

  fs.readFile(path, (err, data) => {
    //no matches, return 404.html page, 404 error code
    if (err) console.log(err);
    return res.end(data);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server at localhost:${port}`);
});
