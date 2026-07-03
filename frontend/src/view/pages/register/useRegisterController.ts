import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import type { SignupParms } from "../../../app/services/authService/signup";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().nonempty("Email é obrigatorio").email(),
  password: z.string().nonempty("Senha é obrigatoria").min(8),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupParms) => {
      return authService.signup(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data); // ✅ dois "c"

      if (!accessToken) {
        throw new Error("Token não recebido do servidor");
      }

      signin(accessToken); // ✅ token correto
      toast.success("Conta Criada com sucesso!");
    } catch {
      toast.error("Ocorreu um erro ao criar sua conta!");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
