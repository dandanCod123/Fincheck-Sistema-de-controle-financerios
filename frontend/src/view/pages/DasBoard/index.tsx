import { useAuth } from "../../../app/hooks/useAuth";
import { Button } from "../../components/Button";

export function Dasboard() {
  const { signout } = useAuth();
  return (
    <div>
      <h1>DashBoard Page</h1>

      <Button onClick={signout}>Sair</Button>
    </div>
  );
}
