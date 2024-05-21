'use client';

import { useEffect } from 'react';
import ChannelTalkService from '@Utils/channelTalkService';

function ChannelTalkBoot({ pluginKey }: { pluginKey?: string }) {
  useEffect(() => {
    if (!pluginKey) return;

    const channelTalk = new ChannelTalkService();

    channelTalk.boot({ pluginKey }, (error: any) => {
      if (error) {
        console.error('ChannelTalk boot error!');
      }
    });

    return () => channelTalk.shutdown();
  }, [pluginKey]);

  return <></>;
}

export default ChannelTalkBoot;
