import { parseHTML } from "linkedom";

export function ssr(root: DocumentFragment) {
  const { document } = parseHTML(`<!doctype html>
<html lang="en">
  <head>
    <title>Hello SSR</title>
  </head>
  <body>
  </body>
</html>
`);
  document.body.append(root);
  return document.toString();
}
