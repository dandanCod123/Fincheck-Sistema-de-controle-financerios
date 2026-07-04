import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common';

export class OptionalParseEnumPipe extends ParseEnumPipe {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (typeof value === 'undefined') {
      return undefined;
    }

    return super.transform(value, metadata);
  }
}
