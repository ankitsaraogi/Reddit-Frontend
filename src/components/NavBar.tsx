import { Box, Button, Flex, Link, Spinner } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;
  if (fetching) {
    body = <Spinner color="red.500" />;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          Login
          {/* <Link mr={2}>Login</Link> */}
          {/* <span style={{ marginRight: 4 }}>Login</span> */}
        </NextLink>
        <NextLink href="/register">
          {/* <Link>Register</Link> */}
          register
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{(data.me as any).username}</Box>
        <Button
          onClick={() => {
            logout({});
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex position="sticky" top={0} zIndex={1} bg="tan">
      <Box ml="auto" pt={4}>
        <div>{body}</div>
      </Box>
    </Flex>
  );
};
