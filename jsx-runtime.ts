import { d } from "./document.ts";
import { isIntrinsicElement } from "./dom.ts";

// @ts-ignore -- shut up
function createVNode(vnode, props): DocumentFragment {
  const fragment = d.createDocumentFragment();

  // Then its a function component
  if (typeof vnode === "function") {
    return vnode(props);
  }

  // Then its a document fragment
  if (typeof vnode === "object") {
    return vnode;
  }

  // Then its an intrinsic html element
  if (isIntrinsicElement(vnode)) {
    const el = d.createElement(vnode);
    fragment.append(el);

    // spread in html attributes
    const { children, ...attrs } = props;
    for (const attr in attrs) {
      el.setAttribute(attr, attrs[attr]);
    }

    // handle children
    if (children) {
      const childrenArray = Array.isArray(children) ? children : [children];

      for (const child of childrenArray) {
        // its a text node
        if (typeof child === "string") {
          el.append(d.createTextNode(child));
        } else {
          // its another document fragment
          el.append(child);
        }
      }
    }

    return fragment;
  }

  throw new Error(`invalid html element found in jsx: "${vnode}"`);
}

export { createVNode as jsx, createVNode as jsxs };
