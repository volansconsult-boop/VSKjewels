const airportJeweler = {
  name: "Airport Jeweler",
  street: "105 W Williamsburg Rd",
  city: "Sandston, VA 23150",
  email: "Seedlife2002@yahoo.com",
  phone: "(804) 909-2683",
  telephone: "+18049092683",
};

const contactReplacements = [
  ["<li>580 Fifth Avenue, Suite 1221</li>", `<li>${airportJeweler.name}</li><li>${airportJeweler.street}</li>`],
  ["580 Fifth Avenue, Suite 1221<br />", `${airportJeweler.name}<br />${airportJeweler.street}<br />`],
  ["New York, NY 10036", airportJeweler.city],
  ["Vskjewels@gmail.com", airportJeweler.email],
  ["+16467734637", airportJeweler.telephone],
  ["(646) 773-4637", airportJeweler.phone],
  ["SOVRA JEWELS · NEW YORK", "SOVRA JEWELS · SANDSTON, VIRGINIA"],
  ["our Fifth Avenue team", "our Airport Jeweler team"],
  ["our New York team", "our Airport Jeweler team"],
  ["Visit us on Fifth Avenue", "Visit Airport Jeweler in Sandston"],
  ["Sovra is a Fifth Avenue jeweler", "Airport Jeweler in Sandston, Virginia, is a jeweler"],
  ["we&rsquo;re based on Fifth Avenue in New York", "you can reach us at Airport Jeweler in Sandston, Virginia"],
];

export default {
  async fetch(request, env) {
    const { hostname } = new URL(request.url);
    if (hostname !== "luxesovra.com") return env.ASSETS.fetch(request);

    // Revalidate the generated HTML separately from the shared source asset.
    const assetRequest = new Request(request);
    assetRequest.headers.delete("If-None-Match");
    assetRequest.headers.delete("If-Modified-Since");
    const response = await env.ASSETS.fetch(assetRequest);
    if (!response.headers.get("Content-Type")?.startsWith("text/html")) return response;

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-store");
    for (const name of ["Content-Length", "Content-Encoding", "ETag", "Last-Modified"]) {
      headers.delete(name);
    }
    const original = request.method === "HEAD" ? null : await response.text();
    const html = original === null ? null : contactReplacements.reduce(
      (page, [from, to]) => page.replaceAll(from, to),
      original,
    );
    return new Response(html, { status: response.status, headers });
  },
};
