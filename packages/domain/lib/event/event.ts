export abstract class Event {
  abstract context: string;
  abstract action: string;
  abstract createdAt?: Date;

  constructor(
    readonly data: any,
    readonly cid?: string
  ) { }
}
