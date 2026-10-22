export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const PagesPartsFragmentDoc = gql`
    fragment PagesParts on Pages {
  __typename
  title
  seoDesc
  heroImage
  body
}
    `;
export const ProductsPartsFragmentDoc = gql`
    fragment ProductsParts on Products {
  __typename
  name
  price
  coverImage
  description
}
    `;
export const BlogsPartsFragmentDoc = gql`
    fragment BlogsParts on Blogs {
  __typename
  title
  seoDesc
  date
  coverImage
  body
}
    `;
export const GlobalsPartsFragmentDoc = gql`
    fragment GlobalsParts on Globals {
  __typename
  siteName
  contactEmail
}
    `;
export const PagesDocument = gql`
    query pages($relativePath: String!) {
  pages(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PagesParts
  }
}
    ${PagesPartsFragmentDoc}`;
export const PagesConnectionDocument = gql`
    query pagesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PagesFilter) {
  pagesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PagesParts
      }
    }
  }
}
    ${PagesPartsFragmentDoc}`;
export const ProductsDocument = gql`
    query products($relativePath: String!) {
  products(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProductsParts
  }
}
    ${ProductsPartsFragmentDoc}`;
export const ProductsConnectionDocument = gql`
    query productsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProductsFilter) {
  productsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProductsParts
      }
    }
  }
}
    ${ProductsPartsFragmentDoc}`;
export const BlogsDocument = gql`
    query blogs($relativePath: String!) {
  blogs(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BlogsParts
  }
}
    ${BlogsPartsFragmentDoc}`;
export const BlogsConnectionDocument = gql`
    query blogsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BlogsFilter) {
  blogsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BlogsParts
      }
    }
  }
}
    ${BlogsPartsFragmentDoc}`;
export const GlobalsDocument = gql`
    query globals($relativePath: String!) {
  globals(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GlobalsParts
  }
}
    ${GlobalsPartsFragmentDoc}`;
export const GlobalsConnectionDocument = gql`
    query globalsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GlobalsFilter) {
  globalsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GlobalsParts
      }
    }
  }
}
    ${GlobalsPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    pages(variables, options) {
      return requester(PagesDocument, variables, options);
    },
    pagesConnection(variables, options) {
      return requester(PagesConnectionDocument, variables, options);
    },
    products(variables, options) {
      return requester(ProductsDocument, variables, options);
    },
    productsConnection(variables, options) {
      return requester(ProductsConnectionDocument, variables, options);
    },
    blogs(variables, options) {
      return requester(BlogsDocument, variables, options);
    },
    blogsConnection(variables, options) {
      return requester(BlogsConnectionDocument, variables, options);
    },
    globals(variables, options) {
      return requester(GlobalsDocument, variables, options);
    },
    globalsConnection(variables, options) {
      return requester(GlobalsConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
