import jsonServer from 'json-server';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(import.meta.dirname, 'db.json'));
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
      res.locals.data = collection.filter((item) => item.tags && requiredTags.every((tag) => item.tags.includes(tag)));
    }
  }

  next();
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server v1 is running on port 3000');
});
