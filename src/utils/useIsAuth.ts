import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";
import { useEffect } from "react";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!fetching && !data?.me) {
      router.push(`/login?next=${router.pathname}`);
    }
  }, [data, fetching, router]);
};
