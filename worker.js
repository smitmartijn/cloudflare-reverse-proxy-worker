export default {
  async fetch(request) {
    const OLD_URL = "https://blog.yoursite.com/blog"
    const NEW_URL = "https://yoursite.com/blog"

    class AttributeRewriter {
      constructor(attributeName) {
        this.attributeName = attributeName;
      }
      element(element) {
        const attribute = element.getAttribute(this.attributeName);
        if (attribute) {
          element.setAttribute(
            this.attributeName,
            attribute.replace(OLD_URL, NEW_URL)
          );
        }
      }
    }

    const rewriter = new HTMLRewriter()
      .on("a", new AttributeRewriter("href"))
      .on("img", new AttributeRewriter("src"))
      .on("link", new AttributeRewriter("href"))
      .on("meta", new AttributeRewriter("content"))

    let url = '';
    if (request !== undefined) {
      url = request.url.split("/blog")[1];
    }

    const res = await fetch(OLD_URL + url);
    const contentType = res.headers.get("Content-Type");

    if (contentType.startsWith("text/html")) {
      return rewriter.transform(res);
    } else {
      return res;
    }
  },
};