import { ArgumentMetadata, ParseUUIDPipe, PipeTransform } from '@nestjs/common';

export class OptionalParseUUIDPipe implements PipeTransform {
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
