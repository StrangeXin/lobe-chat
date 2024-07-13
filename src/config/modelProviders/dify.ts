import { ModelProviderCard } from '@/types/llm';

// ref https://docs.perplexity.ai/docs/model-cards
const Dify: ModelProviderCard = {
  chatModels: [
    {
      description: 'Dify Chat',
      difyAgentApiKey: 'app-NTILzt9p6vQA1Qt3hYlQSSrU',
      displayName: 'Dify Chat',
      enabled: true,
      id: 'dify-chat',
      tokens: 32_768,
    },
    {
      description: '小红书文案大师',
      difyAgentApiKey: 'app-Na3PuhMhT7VgoBKiOJ6GgSgP',
      displayName: 'dify-01',
      enabled: true,
      id: 'dify-01',
      tokens: 32_768,
    },
    {
      description: '法律专家',
      difyAgentApiKey: 'app-r80IXh89xUJV6LRR3o5wRiNY',
      displayName: 'dify-02',
      enabled: true,
      id: 'dify-02',
      tokens: 32_768,
    },
    {
      description: '旅行规划助手',
      difyAgentApiKey: 'app-FPppvK0lQ6pRYV4wj9h5NAmu',
      displayName: 'dify-03',
      enabled: true,
      id: 'dify-03',
      tokens: 32_768,
    },
    {
      description: '聊天助手工作流编排',
      difyAgentApiKey: 'app-Gpp2qSghApwB90jRomEMcMNL',
      displayName: 'dify-04',
      enabled: true,
      id: 'dify-04',
      tokens: 32_768,
    },
  ],
  checkModel: 'dify-chat',
  id: 'dify',
  name: 'Dify',
  proxyUrl: {
    placeholder: 'https://api.dify.ai/v1',
  },
};

export default Dify;
