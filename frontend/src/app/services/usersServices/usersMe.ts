import { httpClient } from "../HttpClient";

interface MeResponse {
  name: string;
  email: string;
}

export async function UsersMe() {
  const { data } = await httpClient.get<MeResponse>("/users/me");
  return data;
}
