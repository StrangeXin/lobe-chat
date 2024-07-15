import {
  AnthropicProviderCard,
  BedrockProviderCard,
  DeepSeekProviderCard,
  DifyProviderCard,
  GoogleProviderCard,
  GroqProviderCard,
  MinimaxProviderCard,
  MistralProviderCard,
  MoonshotProviderCard,
  OllamaProviderCard,
  OpenAIProviderCard,
  OpenRouterProviderCard,
  PerplexityProviderCard,
  QwenProviderCard,
  StepfunProviderCard,
  TogetherAIProviderCard,
  ZeroOneProviderCard,
  ZhiPuProviderCard,
  filterEnabledModels,
} from '@/config/modelProviders';
import { ModelProvider } from '@/libs/agent-runtime';
import { UserModelProviderConfig } from '@/types/user/settings';

export const DEFAULT_LLM_CONFIG: UserModelProviderConfig = {
  anthropic: {
    enabled: false,
    enabledModels: filterEnabledModels(AnthropicProviderCard),
  },
  azure: {
    enabled: false,
  },
  bedrock: {
    enabled: false,
    enabledModels: filterEnabledModels(BedrockProviderCard),
  },
  deepseek: {
    enabled: false,
    enabledModels: filterEnabledModels(DeepSeekProviderCard),
  },
  dify: {
    customModelCards: [
      { difyAgentApiKey: 'app-1RikCM2idGIj0mPd4OIReyPS', id: 'dify-chat' },
      { difyAgentApiKey: 'app-pm7YHRtQINEuWxnS2qsdCuZ4', id: 'dify-01' },
      { difyAgentApiKey: 'app-WFzjrZdAacHPUAGnOVcPSnG0', id: 'dify-02' },
      { difyAgentApiKey: 'app-QeJnem9HDPZSQr88sMGYRdDs', id: 'dify-03' },
      { difyAgentApiKey: 'app-d6h2JzeW2ROFDgypIBkwfmZt', id: 'dify-04' },
    ],
    enabled: true,
    enabledModels: filterEnabledModels(DifyProviderCard),
  },
  google: {
    enabled: false,
    enabledModels: filterEnabledModels(GoogleProviderCard),
  },
  groq: {
    enabled: false,
    enabledModels: filterEnabledModels(GroqProviderCard),
  },
  minimax: {
    enabled: false,
    enabledModels: filterEnabledModels(MinimaxProviderCard),
  },
  mistral: {
    enabled: false,
    enabledModels: filterEnabledModels(MistralProviderCard),
  },
  moonshot: {
    enabled: false,
    enabledModels: filterEnabledModels(MoonshotProviderCard),
  },
  ollama: {
    enabled: true,
    enabledModels: filterEnabledModels(OllamaProviderCard),
    fetchOnClient: true,
  },
  openai: {
    enabled: true,
    enabledModels: filterEnabledModels(OpenAIProviderCard),
  },
  openrouter: {
    enabled: false,
    enabledModels: filterEnabledModels(OpenRouterProviderCard),
  },
  perplexity: {
    enabled: false,
    enabledModels: filterEnabledModels(PerplexityProviderCard),
  },
  qwen: {
    enabled: false,
    enabledModels: filterEnabledModels(QwenProviderCard),
  },
  stepfun: {
    enabled: false,
    enabledModels: filterEnabledModels(StepfunProviderCard),
  },
  togetherai: {
    enabled: false,
    enabledModels: filterEnabledModels(TogetherAIProviderCard),
  },
  zeroone: {
    enabled: false,
    enabledModels: filterEnabledModels(ZeroOneProviderCard),
  },
  zhipu: {
    enabled: false,
    enabledModels: filterEnabledModels(ZhiPuProviderCard),
  },
};

export const DEFAULT_MODEL = 'gpt-3.5-turbo';

export const DEFAULT_PROVIDER = ModelProvider.OpenAI;

// export const DEFAULT_MODEL = 'dify-chat';

// export const DEFAULT_PROVIDER = ModelProvider.Dify;
