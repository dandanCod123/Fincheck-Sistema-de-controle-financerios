import { sleep } from "../../utils/sleep";
import { httpClient } from "../HttpClient";

export interface SigninParms {
  email: string;
  password: string;
}

interface SigninRespose {
  accessToken: string;
}

export async function signin(parms: SigninParms) {
  await sleep(4000);
  const { data } = await httpClient.post<SigninRespose>("/auth/signin", parms);

  return data;
}

export const authService = {
  signin,
};
