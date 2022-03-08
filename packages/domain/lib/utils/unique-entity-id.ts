import { readFileSync } from 'fs';
import { ObjectId } from 'mongodb';
import { v4 } from 'uuid';
import { KERTHIN_CONFIG_FILE } from '../constants';

export const createUniqueID = (): ObjectId | string  => {
  const raw = readFileSync(KERTHIN_CONFIG_FILE, 'utf-8');
  const config =  JSON.parse(raw);
  const isMongoDB = config.dbDriver === 'mongodb';

  return isMongoDB ? new ObjectId() : v4();
};
