export type Status = 'App Out' | 'Declined' | 'Hold';

export interface Entry {
  id: string;
  maskedId: string;
  status: Status;
  reason?: string;
  timestamp: number;
}
