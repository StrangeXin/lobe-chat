import { getPreferredRegion } from '@/app/api/config';
import { createErrorResponse } from '@/app/api/errorResponse';
import DifyProviderCard from '@/config/modelProviders/dify';
import { AgentRuntime, ChatCompletionErrorPayload } from '@/libs/agent-runtime';
import { ChatErrorType } from '@/types/fetch';
import { ChatStreamPayload } from '@/types/openai/chat';
import { getTracePayload } from '@/utils/trace';

import { checkAuth } from '../../middleware/auth';
import { createTraceOptions, initAgentRuntimeWithUserPayload } from '../agentRuntime';

export const runtime = 'edge';

export const preferredRegion = getPreferredRegion();

export const POST = checkAuth(async (req: Request, { params, jwtPayload, createRuntime }) => {
  const { provider } = params;

  try {
    // ============  1. init chat model   ============ //
    let agentRuntime: AgentRuntime;
    if (createRuntime) {
      agentRuntime = createRuntime(jwtPayload);
    } else {
      agentRuntime = await initAgentRuntimeWithUserPayload(provider, jwtPayload);
    }

    // ============  2. create chat completion   ============ //

    const data = (await req.json()) as ChatStreamPayload;

    const tracePayload = getTracePayload(req);

    let traceOptions = {};
    // If user enable trace
    if (tracePayload?.enabled) {
      traceOptions = createTraceOptions(data, {
        provider,
        trace: tracePayload,
      });
    }

    if (provider === 'dify') {
      const chatModels = DifyProviderCard.chatModels;
      const modelObj = chatModels.find((item) => item.id === data.model);
      agentRuntime = await initAgentRuntimeWithUserPayload(provider, {
        ...jwtPayload,
        apiKey: modelObj?.difyAgentApiKey,
      });
    }

    return await agentRuntime.chat(data, {
      user: jwtPayload.userId,
      ...traceOptions,
      sessionId: tracePayload?.sessionId,
      topicId: tracePayload?.topicId,
    });
  } catch (e) {
    const {
      errorType = ChatErrorType.InternalServerError,
      error: errorContent,
      ...res
    } = e as ChatCompletionErrorPayload;

    const error = errorContent || e;
    // track the error at server side
    console.error(`Route: [${provider}] ${errorType}:`, error);

    return createErrorResponse(errorType, { error, ...res, provider });
  }
});
