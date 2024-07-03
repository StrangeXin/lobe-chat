import { ActionIconGroup } from '@lobehub/ui';
import { memo } from 'react';

import { useChatListActionsBar } from '../hooks/useChatListActionsBar';
import { RenderAction } from '../types';
import { ErrorActionsBar } from './Error';

export const AssistantActionsBar: RenderAction = memo(({ id, onActionClick, error }) => {
  const { copy } = useChatListActionsBar();

  if (id === 'default') return;

  if (error) return <ErrorActionsBar onActionClick={onActionClick} />;

  return (
    <ActionIconGroup
      // dropdownMenu={[
      //   edit,
      //   copy,
      //   divider,
      //   tts,
      //   translate,
      //   divider,
      //   regenerate,
      //   delAndRegenerate,
      //   del,
      // ]}
      // items={[hasTools ? delAndRegenerate : edit, copy]}
      dropdownMenu={[]}
      items={[copy]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
});
