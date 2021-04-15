import Fetcher from "../lib/Fetcher";
import { ALL_PAGES } from "../lib/wordpress/api";
import Link from "next/link";

// done at build time
/* export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "recipe",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
}; */

// fetch a single item based on page we are one and inject
// as prop
export const getStaticProps = async () => {
  const res = await Fetcher(ALL_PAGES);
  const allPages = res.data.pages.nodes;

  return {
    props: { allPages },
    revalidate: 1,
  };

  // const { items } = await client.getEntries({
  //   content_type: "recipe",
  //   "fields.slug": params.slug,
  // });

  // if (!items.length) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  // return {
  //   props: { recipe: items[0] },
  //   revalidate: 1,
  // };
};

const Blog = ({ allPages }) => {
  const createMarkup = (data) => {
    return {
      __html: data,
    };
  };

  return (
    <div className="container">
      <main className="main">
        <div className="grid">
          {allPages.map((page) => {
            return (
              <div className="card" key={page.slug}>
                <h3>{page.title}</h3>
                return{" "}
                <div dangerouslySetInnerHTML={createMarkup(page.excerpt)} />
                <p>{page.date}</p>
                <Link href={`/post/${page.slug}`}>
                  <a>Read more</a>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Blog;
