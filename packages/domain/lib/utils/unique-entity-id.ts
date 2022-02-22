import { readFileSync } from 'fs';
import ObjectID from 'bson-objectid';
import { v4 } from 'uuid';
import { KERTHIN_CONFIG_FILE } from '../constants';

export const createUniqueID = (): ObjectID | string  => {
  const raw = readFileSync(KERTHIN_CONFIG_FILE, 'utf-8');
  const config =  JSON.parse(raw);
  const isMongoDB = config.dbDriver === 'mongodb';

  return isMongoDB ? ObjectID() : v4();
};
