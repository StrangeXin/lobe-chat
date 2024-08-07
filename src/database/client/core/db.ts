/* eslint-disable unicorn/numeric-separators-style */
import Dexie, { Transaction } from 'dexie';

import { MigrationLLMSettings } from '@/migrations/FromV3ToV4';
import { MigrationAgentChatConfig } from '@/migrations/FromV5ToV6';
import { MigrationKeyValueSettings } from '@/migrations/FromV6ToV7';
import { uuid } from '@/utils/uuid';

import { DB_File } from '../schemas/files';
import { DB_Message } from '../schemas/message';
import { DB_Plugin } from '../schemas/plugin';
import { DB_Session } from '../schemas/session';
import { DB_SessionGroup } from '../schemas/sessionGroup';
import { DB_Topic } from '../schemas/topic';
import { DB_User } from '../schemas/user';
import { migrateSettingsToUser } from './migrations/migrateSettingsToUser';
import {
  dbSchemaV1,
  dbSchemaV2,
  dbSchemaV3,
  dbSchemaV4,
  dbSchemaV5,
  dbSchemaV6,
  dbSchemaV7,
  dbSchemaV9,
} from './schemas';
import { DBModel, LOBE_CHAT_LOCAL_DB_NAME } from './types/db';

export interface LobeDBSchemaMap {
  files: DB_File;
  messages: DB_Message;
  plugins: DB_Plugin;
  sessionGroups: DB_SessionGroup;
  sessions: DB_Session;
  topics: DB_Topic;
  users: DB_User;
}

// Define a local DB
export class BrowserDB extends Dexie {
  public files: BrowserDBTable<'files'>;
  public sessions: BrowserDBTable<'sessions'>;
  public messages: BrowserDBTable<'messages'>;
  public topics: BrowserDBTable<'topics'>;
  public plugins: BrowserDBTable<'plugins'>;
  public sessionGroups: BrowserDBTable<'sessionGroups'>;
  public users: BrowserDBTable<'users'>;

  constructor() {
    super(LOBE_CHAT_LOCAL_DB_NAME);
    this.version(1).stores(dbSchemaV1);
    this.version(2).stores(dbSchemaV2);
    this.version(3).stores(dbSchemaV3);
    this.version(4)
      .stores(dbSchemaV4)
      .upgrade((trans) => this.upgradeToV4(trans));

    this.version(5)
      .stores(dbSchemaV5)
      .upgrade((trans) => this.upgradeToV5(trans));

    this.version(6)
      .stores(dbSchemaV6)
      .upgrade((trans) => this.upgradeToV6(trans));

    this.version(7)
      .stores(dbSchemaV7)
      .upgrade((trans) => this.upgradeToV7(trans));

    this.version(8)
      .stores(dbSchemaV7)
      .upgrade((trans) => this.upgradeToV8(trans));

    this.version(9)
      .stores(dbSchemaV9)
      .upgrade((trans) => this.upgradeToV9(trans));

    this.version(10)
      .stores(dbSchemaV9)
      .upgrade((trans) => this.upgradeToV10(trans));

    this.version(11)
      .stores(dbSchemaV9)
      .upgrade((trans) => this.upgradeToV11(trans));

    this.files = this.table('files');
    this.sessions = this.table('sessions');
    this.messages = this.table('messages');
    this.topics = this.table('topics');
    this.plugins = this.table('plugins');
    this.sessionGroups = this.table('sessionGroups');
    this.users = this.table('users');

    // Insert sessions on initialization
    this.sessions.bulkPut([
      {
        config: {
          chatConfig: {
            autoCreateTopicThreshold: 2,
            displayMode: 'chat',
            enableAutoCreateTopic: true,
            historyCount: 0,
          },
          model: 'dify-01',
          params: {
            frequency_penalty: 0,
            presence_penalty: 0,
            temperature: 0.6,
            top_p: 1,
          },
          plugins: [],
          provider: 'dify',
          systemRole: '',
          tts: {
            showAllLocaleVoice: false,
            sttLocale: 'auto',
            ttsService: 'openai',
            voice: {
              openai: 'alloy',
            },
          },
        },
        createdAt: 1719974455088,
        group: 'default',
        id: 'cf765342-f376-4410-82a2-716365eb6f0e',
        meta: {
          avatar: '🌍',
          backgroundColor: 'rgba(0,0,0,0)',
          description: '专为您提供任何领域全球新闻检索，通过我你可以查到行业任何新闻',
          title: '全球行业新闻检索助手',
        },
        pinned: 0,
        type: 'agent',
        updatedAt: 1719974455088,
      },
      {
        config: {
          chatConfig: {
            autoCreateTopicThreshold: 2,
            displayMode: 'chat',
            enableAutoCreateTopic: true,
            historyCount: 0,
          },
          model: 'dify-02',
          params: {
            frequency_penalty: 0,
            presence_penalty: 0,
            temperature: 0.6,
            top_p: 1,
          },
          plugins: [],
          provider: 'dify',
          systemRole: '',
          tts: {
            showAllLocaleVoice: false,
            sttLocale: 'auto',
            ttsService: 'openai',
            voice: {
              openai: 'alloy',
            },
          },
        },
        createdAt: 1719974455087,
        group: 'default',
        id: '790ec44d-502f-4486-95d0-19e7f4cab714',
        meta: {
          avatar: '📖',
          backgroundColor: 'rgba(0,0,0,0)',
          description: '专为您解读物流客户招标文档的关键信息，提供投标文档的撰写协助',
          title: '合同物流项目招标文档解析',
        },
        pinned: 0,
        type: 'agent',
        updatedAt: 1719974455087,
      },
      {
        config: {
          chatConfig: {
            autoCreateTopicThreshold: 2,
            displayMode: 'chat',
            enableAutoCreateTopic: true,
            historyCount: 0,
          },
          model: 'dify-03',
          params: {
            frequency_penalty: 0,
            presence_penalty: 0,
            temperature: 0.6,
            top_p: 1,
          },
          plugins: [],
          provider: 'dify',
          systemRole: '',
          tts: {
            showAllLocaleVoice: false,
            sttLocale: 'auto',
            ttsService: 'openai',
            voice: {
              openai: 'alloy',
            },
          },
        },
        createdAt: 1719974455086,
        group: 'default',
        id: 'e5514671-09c6-4cb2-93c0-1fd060a323a9',
        meta: {
          avatar: '🚚',
          backgroundColor: 'rgba(0,0,0,0)',
          description:
            '能够帮你提供城市点到点的金杯、面包车等四种车型的运输成本，帮你找到更佳运输方式',
          title: '城配运力成本测算',
        },
        pinned: 0,
        type: 'agent',
        updatedAt: 1719974455086,
      },
      {
        config: {
          chatConfig: {
            autoCreateTopicThreshold: 2,
            displayMode: 'chat',
            enableAutoCreateTopic: true,
            historyCount: 0,
          },
          model: 'dify-04',
          params: {
            frequency_penalty: 0,
            presence_penalty: 0,
            temperature: 0.6,
            top_p: 1,
          },
          plugins: [],
          provider: 'dify',
          systemRole: '',
          tts: {
            showAllLocaleVoice: false,
            sttLocale: 'auto',
            ttsService: 'openai',
            voice: {
              openai: 'alloy',
            },
          },
        },
        createdAt: 1719974455085,
        group: 'default',
        id: '43977853-36bb-4176-a707-8c4541abc763',
        meta: {
          avatar: '📝',
          backgroundColor: 'rgba(0,0,0,0)',
          description: '能够快速归纳总结所提供网页的概要信息，并且提炼和解读商业价值',
          title: '物流新闻商业解读',
        },
        pinned: 0,
        type: 'agent',
        updatedAt: 1719974455085,
      },
      {
        config: {
          chatConfig: {
            autoCreateTopicThreshold: 2,
            displayMode: 'chat',
            enableAutoCreateTopic: true,
            historyCount: 0,
          },
          model: 'dify-05',
          params: {
            frequency_penalty: 0,
            presence_penalty: 0,
            temperature: 0.6,
            top_p: 1,
          },
          plugins: [],
          provider: 'dify',
          systemRole: '',
          tts: {
            showAllLocaleVoice: false,
            sttLocale: 'auto',
            ttsService: 'openai',
            voice: {
              openai: 'alloy',
            },
          },
        },
        createdAt: 1719974455084,
        group: 'default',
        id: '43977853-36bb-4176-a707-8c4541abc764',
        meta: {
          avatar: '📄',
          backgroundColor: 'rgba(0,0,0,0)',
          description:
            '能够帮助你深度研究目标企业客户的组织架构、业务模式、商业模型和财务状况等相关信息，帮助您更深度的了解您的客户！',
          title: '目标客户研究报告',
        },
        pinned: 0,
        type: 'agent',
        updatedAt: 1719974455084,
      },
    ]);
  }

  /**
   * 2024.01.22
   *
   * DB V3 to V4
   * from `group = pinned` to `pinned:true`
   */
  upgradeToV4 = async (trans: Transaction) => {
    const sessions = trans.table('sessions');
    await sessions.toCollection().modify((session) => {
      // translate boolean to number
      session.pinned = session.group === 'pinned' ? 1 : 0;
      session.group = 'default';
    });
  };

  /**
   * 2024.01.29
   * settings from localStorage to indexedDB
   */
  upgradeToV5 = async (trans: Transaction) => {
    const users = trans.table('users');

    // if no user, create one
    if ((await users.count()) === 0) {
      const data = localStorage.getItem('LOBE_SETTINGS');

      if (data) {
        let json;

        try {
          json = JSON.parse(data);
        } catch {
          /* empty */
        }

        if (!json?.state?.settings) return;

        const settings = json.state.settings;

        const user = migrateSettingsToUser(settings);
        await users.add(user);
      }
    }
  };

  /**
   * 2024.02.27
   * add uuid to user
   */
  upgradeToV6 = async (trans: Transaction) => {
    const users = trans.table('users');

    await users.toCollection().modify((user: DB_User) => {
      if (!user.uuid) user.uuid = uuid();
    });
  };

  /**
   * 2024.03.14
   * add `id` in plugins
   */
  upgradeToV7 = async (trans: Transaction) => {
    const plugins = trans.table('plugins');

    await plugins.toCollection().modify((plugin: DB_Plugin) => {
      plugin.id = plugin.identifier;
    });
  };

  upgradeToV8 = async (trans: Transaction) => {
    const users = trans.table('users');
    await users.toCollection().modify((user: DB_User) => {
      if (user.settings) {
        user.settings = MigrationLLMSettings.migrateSettings(user.settings as any);
      }
    });
  };

  /**
   * 2024.05.11
   *
   * message role=function to role=tool
   */
  upgradeToV9 = async (trans: Transaction) => {
    const messages = trans.table('messages');
    await messages.toCollection().modify(async (message: DBModel<DB_Message>) => {
      if ((message.role as string) === 'function') {
        const origin = Object.assign({}, message);

        const toolCallId = `tool_call_${message.id}`;
        const assistantMessageId = `tool_calls_${message.id}`;

        message.role = 'tool';
        message.tool_call_id = toolCallId;
        message.parentId = assistantMessageId;

        await messages.add({
          ...origin,
          content: '',
          createdAt: message.createdAt - 10,
          error: undefined,
          id: assistantMessageId,
          role: 'assistant',
          tools: [{ ...message.plugin!, id: toolCallId }],
          updatedAt: message.updatedAt - 10,
        } as DBModel<DB_Message>);
      }
    });
  };

  /**
   * 2024.05.25
   * migrate some agent config to chatConfig
   */
  upgradeToV10 = async (trans: Transaction) => {
    const sessions = trans.table('sessions');
    await sessions.toCollection().modify(async (session: DBModel<DB_Session>) => {
      if (session.config)
        session.config = MigrationAgentChatConfig.migrateChatConfig(session.config as any);
    });
  };

  /**
   * 2024.05.27
   * migrate apiKey in languageModel to keyVaults
   */
  upgradeToV11 = async (trans: Transaction) => {
    const users = trans.table('users');

    await users.toCollection().modify((user: DB_User) => {
      if (user.settings) {
        user.settings = MigrationKeyValueSettings.migrateSettings(user.settings as any);
      }
    });
  };
}

export const browserDB = new BrowserDB();

// ================================================ //
// ================================================ //
// ================================================ //
// ================================================ //
// ================================================ //

// types helper
export type BrowserDBSchema = {
  [t in keyof LobeDBSchemaMap]: {
    model: LobeDBSchemaMap[t];
    table: Dexie.Table<DBModel<LobeDBSchemaMap[t]>, string>;
  };
};
type BrowserDBTable<T extends keyof LobeDBSchemaMap> = BrowserDBSchema[T]['table'];
