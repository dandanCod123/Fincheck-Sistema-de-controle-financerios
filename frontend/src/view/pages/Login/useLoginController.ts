import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log("Chama a API com: ", data);
  });
  console.log(errors);

  return { handleSubmit, register, errors };
}
