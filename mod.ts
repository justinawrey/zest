import { renderToString } from "https://esm.sh/preact-render-to-string@5.2.4?target=deno";
import { setup, tw } from "https://esm.sh/twind@0.16.16";
import {
  getStyleTagProperties,
  virtualSheet,
} from "https://esm.sh/twind@0.16.16/sheets";
import { h, options, type VNode } from "preact";
export * from "https://deno.land/x/sift@0.6.0/mod.ts";

const sheet = virtualSheet();
let vHead: VNode | null = null;
let styleNode: VNode | null = null;

setup({
  sheet,
});

const oldHook = options.vnode;
options.vnode = (vnode) => {
  if (vnode.type === "head" && !styleNode) {
    vHead = vnode;
    styleNode = h("style", {
      id: "__zest_tw",
      dangerouslySetInnerHTML: { __html: "" },
    });
    // @ts-ignore - whatever bro
    const c = Array.isArray(vnode.props.children)
      ? vnode.props.children
      : [vnode.props.children];
    c.push(styleNode);
    vnode.props.children = c;
  }

  // @ts-ignore -- shut up
  const _class = vnode.props.class;
  if (_class) {
    tw`${_class}`;

    if (vHead) {
      // @ts-ignore -- shut up
      styleNode.props.dangerouslySetInnerHTML.__html +=
        getStyleTagProperties(sheet).textContent;
      sheet.reset();
    }
  }

  if (oldHook) {
    oldHook(vnode);
  }
};

export function ssr(vnode: VNode): Response {
  sheet.reset();

  const html = renderToString(vnode);

  if (!vHead) {
    throw new Error("No <head> found");
  }

  vHead = null;
  styleNode = null;

  return new Response(
    html,
    {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    },
  );
}
