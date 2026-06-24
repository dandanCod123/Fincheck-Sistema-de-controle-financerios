import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  NotEquals,
  validate,
  validateSync,
} from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtScret!: string;
}

export const env: Env = plainToInstance(Env, {
  jwtScret: process.env.JWT_SECRET,
});

const erros = validateSync(env);

if (erros.length > 0) {
  throw new Error(JSON.stringify(erros, null, 2));
}
