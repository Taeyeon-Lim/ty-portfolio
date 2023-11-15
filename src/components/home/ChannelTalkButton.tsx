'use client';

import styles from '@app/Home.module.scss';
import ChannelTalkService from '@utils/channelTalkService';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import Image from 'next/image';
import Link from 'next/link';

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
        priority
        className={cx('channelTalk', 'shadow')}
      />
      <span>Talk</span>
    </Link>
  );
}

export default ChannelTalkButton;
