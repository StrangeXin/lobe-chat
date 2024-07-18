import { ModelProvider } from '@/libs/agent-runtime';
import { SystemAgentItem, UserSystemAgentConfig } from '@/types/user/settings';

// import { DEFAULT_MODEL, DEFAULT_PROVIDER } from './llm';

export const DEFAULT_SYSTEM_AGENT_ITEM: SystemAgentItem = {
  model: 'dify-topic',
  provider: ModelProvider.Dify,
};

export const DEFAULT_SYSTEM_AGENT_CONFIG: UserSystemAgentConfig = {
  agentMeta: DEFAULT_SYSTEM_AGENT_ITEM,
  topic: DEFAULT_SYSTEM_AGENT_ITEM,
  translation: DEFAULT_SYSTEM_AGENT_ITEM,
};
