import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Spinner } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <NextLink href="/create-post">Create Post</NextLink>
      <br />
      <div>
        {!data ? (
          <Spinner color="red.500" />
        ) : (
          // <div>loading...</div>
          data.posts.map((p) => (
            <div key={p.id} id={String(p.id)}>
              {p.title}
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
