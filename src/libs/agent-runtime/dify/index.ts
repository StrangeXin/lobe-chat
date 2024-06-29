import { LobeRuntimeAI } from '../BaseAI';
import { AgentRuntimeErrorType } from '../error';
import {
  ChatCompetitionOptions,
  ChatCompletionErrorPayload,
  ChatStreamPayload,
  ModelProvider,
} from '../types';
import { StreamEventData } from '../types/dify';
import { AgentRuntimeError } from '../utils/createError';
import { StreamingResponse } from '../utils/response';
import { DifyStream } from '../utils/streams';

const DEFAULT_BASE_URL = 'https://api.dify.ai/v1';

export function parseDifyResponse(chunk: string): StreamEventData {
  // 有可能一次返回多条
  // data: {"event": "message", "conversation_id": "47daa8d8-02a9-4e64-8272-97b76907af56", "message_id": "92538c31-ecec-4c3e-b3ea-1f104ea84df7", "created_at": 1718075777, "task_id": "59d216a9-5622-4f10-858f-89fb2d834787", "id": "92538c31-ecec-4c3e-b3ea-1f104ea84df7", "answer": "\u4f60\u597d"}

  // data: {"event": "message", "conversation_id": "47daa8d8-02a9-4e64-8272-97b76907af56", "message_id": "92538c31-ecec-4c3e-b3ea-1f104ea84df7", "created_at": 1718075777, "task_id": "59d216a9-5622-4f10-858f-89fb2d834787", "id": "92538c31-ecec-4c3e-b3ea-1f104ea84df7", "answer": "\uff01"}

  // event: ping

  // console.log('parseDifyResponse', chunk);
  if (chunk.startsWith('event:')) {
    return { event: 'ping' };
  }

  // 特殊处理字符串超长断开
  if (!chunk.startsWith('data:')) {
    return { event: 'ping' };
  }

  // 特殊处理工作流
  if (
    chunk.startsWith('data: {"event": "node_started"') ||
    chunk.startsWith('data: {"event": "node_finished"') ||
    chunk.startsWith('data: {"event": "workflow_started"') ||
    chunk.startsWith('data: {"event": "workflow_finished"')
  ) {
    return { event: 'ping' };
  }

  let lines = chunk.split('\n');
  let answerAll = '';
  let lastLineObj;
  for (let i = 0; i < lines.length - 1; i++) {
    let line = lines[i].trim();
    if (!line.startsWith('data:')) continue;

    line = line.slice(5).trim();
    if (line.startsWith('{')) {
      let chunkObj = JSON.parse(line);

      answerAll += chunkObj.answer;

      lastLineObj = chunkObj;
    } else {
      continue;
    }
  }
  lastLineObj.answer = answerAll;

  return lastLineObj;
}

export class LobeDifyAI implements LobeRuntimeAI {
  apiKey: string;
  baseURL?: string;

  constructor({ apiKey, baseURL = DEFAULT_BASE_URL }: { apiKey?: string; baseURL?: string }) {
    if (!apiKey) throw AgentRuntimeError.createError(AgentRuntimeErrorType.InvalidProviderAPIKey);

    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  async chat(payload: ChatStreamPayload, options?: ChatCompetitionOptions): Promise<Response> {
    // console.log('payload', payload, options, this.apiKey);

    try {
      const response = await fetch(`${this.baseURL}/chat-messages`, {
        body: JSON.stringify(this.buildCompletionsParams(payload, options)),
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      // console.log('response', response, payload, options, this.apiKey, this.baseURL)
      if (!response.body || !response.ok) {
        throw AgentRuntimeError.chat({
          error: {
            status: response.status,
            statusText: response.statusText,
          },
          errorType: AgentRuntimeErrorType.ProviderBizError,
          provider: ModelProvider.Dify,
        });
      }

      const [prod] = response.body.tee();
      return StreamingResponse(DifyStream(prod, options?.callback), { headers: options?.headers });
    } catch (error) {
      console.log('error', error);
      const err = error as Error | ChatCompletionErrorPayload;
      if ('provider' in err) {
        throw error;
      }
      const errorResult = {
        cause: err.cause,
        message: err.message,
        name: err.name,
        stack: err.stack,
      };
      throw AgentRuntimeError.chat({
        error: errorResult,
        errorType: AgentRuntimeErrorType.ProviderBizError,
        provider: ModelProvider.Dify,
      });
    }
  }

  private buildCompletionsParams(payload: ChatStreamPayload, options?: ChatCompetitionOptions) {
    const { messages, ...params } = payload;

    let conversation_id = '';
    const mobj = messages.findLast((m) => m.role === 'assistant' && m.conversation_id);
    if (mobj) {
      conversation_id = mobj.conversation_id || '';
      // console.log('conversation_id', conversation_id)
    }

    return {
      ...params,
      conversation_id: conversation_id, // 根据会话id切换
      inputs: {},
      query: messages.at(-1)?.content,
      response_mode: 'streaming',
      user: options?.user ? `lbc-user-${options?.user}` : 'lbc-user',
    };
  }
}

export default LobeDifyAI;
