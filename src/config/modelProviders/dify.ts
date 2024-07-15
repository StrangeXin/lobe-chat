import { ModelProviderCard } from '@/types/llm';

// ref https://docs.perplexity.ai/docs/model-cards
const Dify: ModelProviderCard = {
  chatModels: [
    {
      description: 'Dify Chat',
      difyAgentApiKey: 'app-1RikCM2idGIj0mPd4OIReyPS',
      displayName: 'Dify Chat',
      enabled: true,
      id: 'dify-chat',
      tokens: 32_768,
    },
    {
      description: '全球行业新闻检索助手',
      difyAgentApiKey: 'app-pm7YHRtQINEuWxnS2qsdCuZ4',
      displayName: 'dify-01',
      enabled: true,
      id: 'dify-01',
      tokens: 32_768,
    },
    {
      description: '合同物流项目招标文档解析',
      difyAgentApiKey: 'app-WFzjrZdAacHPUAGnOVcPSnG0',
      displayName: 'dify-02',
      enabled: true,
      id: 'dify-02',
      tokens: 32_768,
    },
    {
      description: '城配运力成本测算',
      difyAgentApiKey: 'app-QeJnem9HDPZSQr88sMGYRdDs',
      displayName: 'dify-03',
      enabled: true,
      id: 'dify-03',
      tokens: 32_768,
    },
    {
      description: '物流新闻商业解读',
      difyAgentApiKey: 'app-d6h2JzeW2ROFDgypIBkwfmZt',
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
