import { ssr } from "./ssr.ts";

const Inner = <p class="inner">inner</p>;

const App = (props: any) => (
  <div {...props}>
    <p>
      <Inner inner="INNER!" />
    </p>
  </div>
);

const html = ssr(<App class="test" data-qa="qa" />);
console.log(html);
