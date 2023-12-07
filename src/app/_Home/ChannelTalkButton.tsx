'use client';

import styles from '@App/Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import Image from 'next/image';
import Link from 'next/link';

import ChannelTalkService from '@Utils/channelTalkService';

import { BASE64_PLACEHOLDER } from '@Utils/env';

function ChannelTalkButton() {
  const openChannelTalk = () => {
    const channelTalk = new ChannelTalkService();

    channelTalk.openChat();
  };

  return (
    <Link href={'/'} onClick={openChannelTalk}>
      <Image
        width={60}
        height={60}
        src={'/home/channelTalk.jpg'}
        alt='channelTalk-logo'
        className={cx('channelTalk', 'shadow')}
        placeholder={BASE64_PLACEHOLDER}
      />
      <span>Talk</span>
    </Link>
  );
}

export default ChannelTalkButton;
