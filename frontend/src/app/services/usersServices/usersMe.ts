import type { User } from "../../../entities/user";
import { httpClient } from "../HttpClient";

type MeResponse = User;

// interface MeResponse {
//   name: string;
//   email: string;
// }

export async function UsersMe() {
  const { data } = await httpClient.get<MeResponse>("/users/me");

  return data;
}
