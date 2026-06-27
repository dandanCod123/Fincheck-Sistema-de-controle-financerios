import { sleep } from "../../utils/sleep";
import { httpClient } from "../HttpClient";

export interface SignupParms {
  name: string;
  email: string;
  password: string;
}

interface SignupRespose {
  acessToken: string;
}

export async function signup(parms: SignupParms) {
  await sleep();
  const { data } = await httpClient.post<SignupRespose>("/auth/signup", parms);

  return data;
}

export const authService = {
  signup,
};
