import sanitizeHtml from "sanitize-html";

const options: sanitizeHtml.IOptions = {
  allowedTags: ["p", "h1", "h2", "h3", "strong", "em", "a", "br", "span"],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    "*": ["style"],
  },
  allowedStyles: {
    "*": {
      "text-align": [/^(left|center|right|justify)$/],
      "font-size": [/^[\d.]+(rem|px|em)$/],
    },
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
  },
};

export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, options);
}
