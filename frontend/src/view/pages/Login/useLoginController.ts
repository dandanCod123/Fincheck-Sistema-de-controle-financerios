import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "../../../app/services/authService";
import type { SigninParms } from "../../../app/services/authService/signin";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  email: z.string().nonempty("Email é obrigatorio").email(),
  password: z.string().nonempty("Senha é obrigatoria").min(8),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["signin"], // ✅ corrigido (era "signup")
    mutationFn: async (data: SigninParms) => {
      return authService.signin(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      if (!accessToken) {
        throw new Error("Token não recebido do servidor");
      }

      signin(accessToken);
      toast.success("Login feito com sucesso!");
    } catch {
      toast.error("Ocorreu um erro ao fazer login!");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
