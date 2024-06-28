import { memo, useState } from 'react';

import { useSessionStore } from '@/store/session';
import { useUserStore } from '@/store/user';
import { authSelectors } from '@/store/user/selectors';

import Inbox from './Inbox';
import ConfigGroupModal from './Modals/ConfigGroupModal';
import RenameGroupModal from './Modals/RenameGroupModal';

const DefaultMode = memo(() => {
  // const { t } = useTranslation('chat');

  const [activeGroupId /*, setActiveGroupId */] = useState<string>();
  const [renameGroupModalOpen, setRenameGroupModalOpen] = useState(false);
  const [configGroupModalOpen, setConfigGroupModalOpen] = useState(false);

  const isLogin = useUserStore(authSelectors.isLogin);
  const [useFetchSessions] = useSessionStore((s) => [s.useFetchSessions]);
  useFetchSessions(isLogin);

  // const defaultSessions = useSessionStore(sessionSelectors.defaultSessions, isEqual);
  // const customSessionGroups = useSessionStore(sessionSelectors.customSessionGroups, isEqual);
  // const pinnedSessions = useSessionStore(sessionSelectors.pinnedSessions, isEqual);

  // const [sessionGroupKeys, updateSystemStatus] = useGlobalStore((s) => [
  //   systemStatusSelectors.sessionGroupKeys(s),
  //   s.updateSystemStatus,
  // ]);

  // const items = useMemo(
  //   () =>
  //     [
  //       pinnedSessions &&
  //         pinnedSessions.length > 0 && {
  //           children: <SessionList dataSource={pinnedSessions} />,
  //           extra: <Actions isPinned openConfigModal={() => setConfigGroupModalOpen(true)} />,
  //           key: SessionDefaultGroup.Pinned,
  //           label: t('pin'),
  //         },
  //       ...(customSessionGroups || []).map(({ id, name, children }) => ({
  //         children: <SessionList dataSource={children} groupId={id} />,
  //         extra: (
  //           <Actions
  //             id={id}
  //             isCustomGroup
  //             onOpenChange={(isOpen) => {
  //               if (isOpen) setActiveGroupId(id);
  //             }}
  //             openConfigModal={() => setConfigGroupModalOpen(true)}
  //             openRenameModal={() => setRenameGroupModalOpen(true)}
  //           />
  //         ),
  //         key: id,
  //         label: name,
  //       })),
  //       {
  //         children: <SessionList dataSource={defaultSessions || []} />,
  //         extra: <Actions openConfigModal={() => setConfigGroupModalOpen(true)} />,
  //         key: SessionDefaultGroup.Default,
  //         label: t('defaultList'),
  //       },
  //     ].filter(Boolean) as CollapseProps['items'],
  //   [customSessionGroups, pinnedSessions, defaultSessions],
  // );

  return (
    <>
      <Inbox />
      {/* <CollapseGroup
        activeKey={sessionGroupKeys}
        items={items}
        onChange={(keys) => {
          const expandSessionGroupKeys = typeof keys === 'string' ? [keys] : keys;

          updateSystemStatus({ expandSessionGroupKeys });
        }}
      /> */}
      {activeGroupId && (
        <RenameGroupModal
          id={activeGroupId}
          onCancel={() => setRenameGroupModalOpen(false)}
          open={renameGroupModalOpen}
        />
      )}
      <ConfigGroupModal
        onCancel={() => setConfigGroupModalOpen(false)}
        open={configGroupModalOpen}
      />
    </>
  );
});

DefaultMode.displayName = 'SessionDefaultMode';

export default DefaultMode;
