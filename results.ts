import cheerio from "https://esm.sh/cheerio@0.22.0";

type Result = {
  title: string;
  url: string;
  image: string;
};

function buildUrl(query: string) {
  const cleanQuery = query.trim();
  return `https://knowyourmeme.com/search?q=${encodeURIComponent(cleanQuery)}`;
}

function fetchHtml(url: string) {
  return fetch(url).then((response) => response.ok ? response.text() : null);
}

function extractResults(
  html: string,
): Result[] {
  const $ = cheerio.load(html);

  return $(".entry-grid-body td").filter((_: any, el: any) =>
    $(el).attr("class")?.includes("entry_")
  )
    .map((_: any, el: any) => {
      const children = $(el).children();
      const [a, h2] = [children.first(), children.last()];

      const title: string = h2.text().replace(/\n/g, "");
      const url = `https://knowyourmeme.com${a.attr("href")}`;
      const image = a.children().first().data("src");

      return { title, url, image };
    }).get();
}

export async function search(query: string) {
  const url = buildUrl(query);
  const html = await fetchHtml(url);
  if (!html) return [];

  return extractResults(html);
}
