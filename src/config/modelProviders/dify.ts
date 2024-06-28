import { ModelProviderCard } from '@/types/llm';

// ref https://docs.perplexity.ai/docs/model-cards
const Dify: ModelProviderCard = {
  chatModels: [
    {
      description: 'Dify Chat',
      difyAgentApiKey: 'app-Gpp2qSghApwB90jRomEMcMNL',
      displayName: 'Dify Chat',
      enabled: true,
      id: 'dify-chat',
      tokens: 32_768,
    },
    {
      description: 'test',
      difyAgentApiKey: 'app-QbylE3DuZgs7sAg8k7VYrFXs',
      displayName: 'test',
      enabled: true,
      id: 'test',
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
