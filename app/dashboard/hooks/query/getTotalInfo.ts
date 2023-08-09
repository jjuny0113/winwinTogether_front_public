import { getGraphQLClient } from "@/util/reactQuery/graphQLClient";
import { gql } from "graphql-request";

export const getTotalInfo = async () => {
  const query = gql`
    query {
      total {
        status
        result {
          tags {
            name
            count
          }
          recentPosts {
            isExist
            date
          }

          marketInfo {
            profile_img
            market_name
            sector
            introduce
          }
          marketItemsCount {
            count
          }
        }
      }
    }
  `;

  const result: SuccessResponse | failResponse = await getGraphQLClient.request(
    query
  );
  if (result.total.status === "error") {
    throw new Error(result.total.message);
  }
  return result.total.result;
};

// youtubeInfo {
//   link
//   title
//   description
//   channelTitle
//   channelId
//   thumnail {
//     height
//     url
//     width
//   }
// }
interface SuccessResponse {
  total: {
    status: "ok";
    result: {
      tags: {
        name: string;
        count: number;
      }[];
      recentPosts: {
        isExist: boolean;
        date: number;
      }[];

      marketInfo: {
        profile_img: string;
        market_name: string;
        sector: string;
        introduce: string;
      };
      marketItemsCount: {
        count: number;
      };
    };
  };
}

interface failResponse {
  total: {
    status: "error";
    message: string;
  };
}
