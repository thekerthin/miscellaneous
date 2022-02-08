export type Scalar = boolean
  | number
  | string
  | bigint
  | symbol
  | Date
  | RegExp
  | Buffer
  | { toHexString(): string };

export const PrimaryKeyType = Symbol('PrimaryKeyType');

type ReadonlyPrimary<T> = T extends any[] ? Readonly<T> : T;
export type Primary<T> = T extends { [PrimaryKeyType]: infer PK }
  ? ReadonlyPrimary<PK> : T extends { _id: infer PK }
  ? ReadonlyPrimary<PK> | string : T extends { uuid: infer PK }
  ? ReadonlyPrimary<PK> : T extends { id: infer PK }
  ? ReadonlyPrimary<PK> : never;

export type OperatorMap<TEntity> = {
  $and?: Query<TEntity>[];
  $or?: Query<TEntity>[];
  $eq?: ExpandScalar<TEntity>;
  $ne?: ExpandScalar<TEntity>;
  $in?: ExpandScalar<TEntity>[];
  $nin?: ExpandScalar<TEntity>[];
  $not?: Query<TEntity>;
  $gt?: ExpandScalar<TEntity>;
  $gte?: ExpandScalar<TEntity>;
  $lt?: ExpandScalar<TEntity>;
  $lte?: ExpandScalar<TEntity>;
  $like?: string;
  $re?: string;
  $ilike?: string;
  $overlap?: string[];
  $contains?: string[];
  $contained?: string[];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Query<T> = T extends object
  ? T extends Scalar
    ? never
    : FilterQuery<T>
  : FilterValue<T>;

// eslint-disable-next-line @typescript-eslint/ban-types
type ExpandObject<TEntity> = TEntity extends object
  ? TEntity extends Scalar
    ? never
    : { [K in keyof TEntity]?: Query<TEntity[K]> | FilterValue<TEntity[K]> | null }
  : never;

export type ExpandScalar<T> = null | (T extends string
  ? string | RegExp
  : T extends Date
    ? Date | string
    : T);

export type ObjectQuery<T> = ExpandObject<T> & OperatorMap<T>;

export type FilterValue2<T> = T | ExpandScalar<T> | Primary<T>;

export type FilterValue<T> = OperatorMap<FilterValue2<T>>
  | FilterValue2<T>
  | FilterValue2<T>[]
  | null;

export type FilterQuery<TEntity> = ObjectQuery<TEntity>
  | NonNullable<ExpandScalar<Primary<TEntity>>>
  | TEntity
  | FilterQuery<TEntity>[];

export enum QueryOrder {
  ASC = 'ASC',
  ASC_NULLS_LAST = 'ASC NULLS LAST',
  ASC_NULLS_FIRST = 'ASC NULLS FIRST',
  DESC = 'DESC',
  DESC_NULLS_LAST = 'DESC NULLS LAST',
  DESC_NULLS_FIRST = 'DESC NULLS FIRST',
  asc = 'asc',
  asc_nulls_last = 'asc nulls last',
  asc_nulls_first = 'asc nulls first',
  desc = 'desc',
  desc_nulls_last = 'desc nulls last',
  desc_nulls_first = 'desc nulls first',
}

export enum QueryOrderNumeric {
  ASC = 1,
  DESC = -1,
}

export type QueryOrderKeysFlat = QueryOrder | QueryOrderNumeric | keyof typeof QueryOrder;

export type QueryOrderKeys<T> = QueryOrderKeysFlat | QueryOrderMap<T>;

export type QueryOrderMap<T> = {
  [K in keyof T]?: QueryOrderKeys<T[K]>;
};

export type FindOptions<TEntity> = {
  limit?: number;
  offset?: number;
  orderBy?: QueryOrderMap<TEntity> | QueryOrderMap<TEntity>[];
  groupBy?: string | string[];
}

export type FindOneOptions<TEntity> = Omit<FindOptions<TEntity>, 'limit' | 'offset'>

export type CountOptions<TEntity> = Omit<FindOptions<TEntity>, 'limit' | 'offset'>

export type RepoDBConfig = {
  url?: string,
  client?: string,
  host?: string,
  port?: number,
  user?: string,
  password?: string,
  database?: string
}
