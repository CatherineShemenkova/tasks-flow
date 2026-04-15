const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'GET' && req.query.tags_include) {
    const { tags_include } = req.query;
    const requiredTags = tags_include.split(',');

    const resource = req.path.split('/')[1];

    const db = router.db.getState();
    const collection = db[resource];

    if (collection) {
      const filtered = collection.filter((item) => item.tags && requiredTags.every((tag) => item.tags.includes(tag)));
      return res.json(filtered);
    }
  }

  next();
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server v1 is running on port 3000');
});
