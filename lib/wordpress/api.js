// grab the first 20 posts
export const ALL_PAGES = `query AllPages {
    pages(first: 10, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        id
        date
        title
        slug
        excerpt
      }
    }
}`;

// get all the slugs for static paths / static generation

// post by a slug display to user
