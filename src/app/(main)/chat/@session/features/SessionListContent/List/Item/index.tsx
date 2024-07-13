import { memo, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { useChatStore } from '@/store/chat';
import { chatSelectors } from '@/store/chat/selectors';
import { useSessionStore } from '@/store/session';
import { sessionHelpers } from '@/store/session/helpers';
import { sessionMetaSelectors, sessionSelectors } from '@/store/session/selectors';

import ListItem from '../../ListItem';
import CreateGroupModal from '../../Modals/CreateGroupModal';

interface SessionItemProps {
  id: string;
}

const SessionItem = memo<SessionItemProps>(({ id }) => {
  const [open] = useState(false);
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);

  const [active] = useSessionStore((s) => [s.activeId === id]);
  const [loading] = useChatStore((s) => [chatSelectors.isAIGenerating(s) && id === s.activeId]);

  const [pin, title, description, avatar, avatarBackground] = useSessionStore((s) => {
    const session = sessionSelectors.getSessionById(id)(s);
    const meta = session.meta;

    return [
      sessionHelpers.getSessionPinned(session),
      sessionMetaSelectors.getTitle(meta),
      sessionMetaSelectors.getDescription(meta),
      sessionMetaSelectors.getAvatar(meta),
      meta.backgroundColor,
      session?.updatedAt,
      session.model,
      session?.group,
    ];
  });

  return (
    <>
      <ListItem
        // actions={actions}
        actions={''}
        active={active}
        // addon={addon}
        avatar={avatar}
        avatarBackground={avatarBackground}
        // date={updateAt?.valueOf()}
        description={description}
        loading={loading}
        pin={pin}
        showAction={open}
        title={title}
      />
      <CreateGroupModal
        id={id}
        onCancel={() => setCreateGroupModalOpen(false)}
        open={createGroupModalOpen}
      />
    </>
  );
}, shallow);

export default SessionItem;
