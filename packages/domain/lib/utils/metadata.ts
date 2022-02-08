export const DOMAIN_TARGET_METADATA = '__DOMAIN_TARGET_METADATA__';

export class Metadata {

  static addTargetMetadata(target, meta) {
    Reflect.defineMetadata(DOMAIN_TARGET_METADATA, meta, target);
  }

  static getTargetMetadata(target) {
    return Reflect.getMetadata(DOMAIN_TARGET_METADATA, target ) || {};
  }

  static getTargetPropType(target, propName) {
    return Reflect.getMetadata('design:type', target, propName);
  }

}
