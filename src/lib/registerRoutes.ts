import { join as joinPath, parse as parsePath } from 'path';

import type { Express } from 'express';
import readDirRecursive from 'fs-readdir-recursive';

export default async function registerRoutes(app: Express): Promise<void> {
  const routeDirectoryPath = joinPath(__dirname, '../route');
  const dir = readDirRecursive(routeDirectoryPath);

  for (const modulePath of dir) {
    const { ext } = parsePath(modulePath);
    console.log({ ext });

    if (ext !== '.js') continue;
    console.log([`${routeDirectoryPath}${modulePath}`, modulePath]);
    const {
      default: { method, handler },
    } = await import(`${routeDirectoryPath}/${modulePath}`);

    if (method != 'get' && method != 'post') {
      throw new Error('unknown method ' + method);
    }

    const routePath = `/${modulePath
      .replace('index.js', '')
      .replace('.js', '')}`;

    console.log(routePath);

    app[method as 'get' | 'post'](routePath, handler);
  }
}
