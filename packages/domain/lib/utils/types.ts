export type TargetValueMeta = any;

export type TargetPropertyMeta = {
  valueObject: {
    meta: TargetValueMeta
  }
};

export type TargetMetadata = {
  properties: {
    [property: string]: TargetPropertyMeta
  }
};
