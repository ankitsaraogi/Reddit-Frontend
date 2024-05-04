import { Exchange, fetchExchange, mapExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import Router from "next/router";

export const createUrqlClient = (ssrExchange: Exchange) => ({
  url: "http://localhost:4000/graphql",
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          login: (_result, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, _args, cache, _info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    // errorExchange,
    mapExchange({
      onError(error, _operation) {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login"); // when u want to redirect
        }
      },
    }),
    ssrExchange,
    fetchExchange,
    // errorExchange({
    //   onError(error) {
    //     console.log("Err from Err Exchange: ", error);
    //   },
    // }),
  ],
  fetchOptions: {
    credentials: "include" as const,
    headers: {
      "x-forwarded-proto": "https", // needed for getting cookies from server
    },
  },
});
