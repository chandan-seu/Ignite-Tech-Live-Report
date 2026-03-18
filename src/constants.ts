import { Entry } from './types';

export const INITIAL_ENTRIES: Entry[] = [
  { id: '1', maskedId: '98***12', status: 'App Out', timestamp: Date.now() },
  { id: '2', maskedId: '45***89', status: 'Declined', reason: 'Incomplete documentation', timestamp: Date.now() - 10000 },
  { id: '3', maskedId: '22***44', status: 'Hold', timestamp: Date.now() - 20000 },
  { id: '4', maskedId: '77***33', status: 'App Out', timestamp: Date.now() - 30000 },
  { id: '5', maskedId: '11***66', status: 'Declined', reason: 'Credit score below threshold', timestamp: Date.now() - 40000 },
  { id: '6', maskedId: '88***55', status: 'Hold', timestamp: Date.now() - 50000 },
  { id: '7', maskedId: '33***77', status: 'App Out', timestamp: Date.now() - 60000 },
  { id: '8', maskedId: '66***22', status: 'App Out', timestamp: Date.now() - 70000 },
];

export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'admin234$';
