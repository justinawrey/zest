import { serve, ssr } from "../mod.ts";

const Test = (
  <html>
    <head>
      <title>Test</title>
    </head>
    <body>
      <div class="bg-red-100">
        <h1 class="text-red-300">
          red
        </h1>
        <h2 class="text-red-900">
          more red
        </h2>
      </div>
      <p>more!</p>
    </body>
  </html>
);

serve({
  "/": () => ssr(Test),
});
