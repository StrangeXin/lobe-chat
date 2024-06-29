import { BaseDataModel } from '@/types/meta';

export interface ChatTopic extends Omit<BaseDataModel, 'meta'> {
  conversation_id?: string;
  favorite?: boolean;
  sessionId?: string;
  title: string;
}

export type ChatTopicMap = Record<string, ChatTopic>;
