import { createGetRoute } from '../lib/createPostRoute';

export default createGetRoute(({ response }) => {
  response.end('index');
});
