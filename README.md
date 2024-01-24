# Cloudflare Worker: Reverse proxy

The included `worker.js` is a script that can be deployed as a Cloudflare Worker to act as a reverse proxy that takes a sub-directory on an existing website hosted by Cloudflare, and shows a site on a sub domain.

Here's an example:

Visitors hit: `https://yoursite.com/blog` - and the Cloudflare Worker fetches the content of: `https://blog.yoursite.com/blog`

Why? SEO.