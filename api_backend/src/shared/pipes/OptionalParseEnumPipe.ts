import { ArgumentMetadata, ParseEnumPipe, ParseUUIDPipe } from '@nestjs/common';

export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe {
  private readonly parseUUIDPipe = new ParseUUIDPipe();

  async transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): Promise<string | undefined> {
    if (typeof value === 'undefined') {
      return undefined;
    }

    return this.parseUUIDPipe.transform(value, metadata);
  }
}
