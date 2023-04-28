import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import express, { Response } from 'express';
import { ViteDevServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p: string) => path.resolve(__dirname, p);

  let vite: ViteDevServer | null = null;

  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: 'info',
      server: {
        middlewareMode: true,
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      })
    );
  }

  app.use('*', async (req, res) => {
    const url = '0' in req.params ? (req.params['0'] as string) : '/';

    let template: string, render: (url: string, template: string, res: Response) => void;

    if (!isProd && vite) {
      template = fs.readFileSync(resolve('index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);

      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).serverSideRenderer;
    } else {
      template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
      const prodServer = './dist/server/entry-server.js';
      render = (await import(prodServer)).serverSideRenderer;
    }

    await render(url, template, res);
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log('Server: http://localhost:3000');
  })
);
