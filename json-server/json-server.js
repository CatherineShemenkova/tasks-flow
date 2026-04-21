import jsonServer from 'json-server';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(import.meta.dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// json-server does not support filtering by array intersection, so i had to hack it with this middleware
server.use((req, res, next) => {
  const query = { ...req.query };
  // if we need to filter by array intersection, hide pagination params from json-server to get full response,
  // filter it, and paginate ourselves
  if (query.tags_include) {
    delete req.query._limit;
    delete req.query._page;
  }
  const originalJsonp = res.jsonp.bind(res);
  res.jsonp = function (body) {
    if (req.method === 'GET' && query.tags_include) {
      const requiredTags = query.tags_include.split(',');
      const filteredData = body.filter(
        (task) => !!task.tags?.length && requiredTags.every((tag) => task.tags.includes(tag))
      );
      const page = (query._page ?? 1) - 1;
      const limit = query._limit ?? 100;
      const pagedData = filteredData.slice(page * limit, (page + 1) * limit);
      res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count, Link');
      res.setHeader('X-Total-Count', filteredData.length);
      return originalJsonp(pagedData);
    }

    return originalJsonp(body);
  };
  next();
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server v1 is running on port 3000');
});
