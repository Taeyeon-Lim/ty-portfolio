'use client';

import { useEffect } from 'react';
import ChannelTalkService from '@Utils/channelTalkService';
import { CHANNER_SECRET_KEY, CHNNERTALK_PLUGIN_KEY } from '@Utils/env';

function ChannelTalkBoot() {
  useEffect(() => {
    if (!CHANNER_SECRET_KEY || !CHNNERTALK_PLUGIN_KEY) return;
    const channelTalk = new ChannelTalkService();

    channelTalk.boot(
      {
        pluginKey: CHNNERTALK_PLUGIN_KEY,
      },
      (error: any, user: any) => {
        if (process.env.NODE_ENV === 'development') {
          if (error) {
            console.log('ChannelTalk boot error!');
          }
        }
      }
    );

    return () => {
      channelTalk.shutdown();
    };
  }, []);

  return <></>;
}

export default ChannelTalkBoot;
