import { FieldPacket } from 'mysql2';
import { WarriorData } from './warrior-data';

export type WarriorRecordsFromDb = [WarriorData[], FieldPacket[]];
