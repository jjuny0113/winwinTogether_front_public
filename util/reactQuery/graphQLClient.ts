import { GraphQLClient } from "graphql-request";
import { useCookies } from "react-cookie";

export const dev = "http://localhost:8080";
export const prod = "https://api.winwin-together.com";
export const getGraphQLClient = new GraphQLClient(`${process.env.NODE_ENV === "development" ? dev : prod}/graphql`, {
  credentials: "include",
});
