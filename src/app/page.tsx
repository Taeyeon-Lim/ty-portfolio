import styles from './Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import Image from 'next/image';
import Link from 'next/link';

import ChannelTalkButton from '@app/_Home/ChannelTalkButton';

import { BASE64_PLACEHOLDER } from '@utils/env';

export default function Home() {
  return (
    <main className={cx('home')}>
      <h2 className={'hide-header'}>Introduction, 소개</h2>

      <p className={cx('updated-date')}>Last updated: 2023.11.15</p>

      <section className={cx('intro')}>
        <article>
          <figure>
            <Image
              width={125}
              height={125}
              src={'/profile.jpg'}
              alt={'profile-image'}
              placeholder={BASE64_PLACEHOLDER}
            />
          </figure>

          <h3>
            <p>임태연</p>
            <p>Taeyeon Lim</p>

            {/* <Link href={'/portfolio'}>{'▶ 포트폴리오 보기'}</Link> */}
          </h3>
        </article>

        <article>
          <h3 className='hide-header'>Contact, 연락</h3>

          <ul>
            <li>
              <ChannelTalkButton />
            </li>

            <li>
              <Link
                href={'mailto:wingofyeon@naver.com'}
                className={cx('email')}
              >
                <Image
                  width={40}
                  height={40}
                  src={'/home/email.png'}
                  alt={'email-logo'}
                  className={cx('shadow')}
                  placeholder={BASE64_PLACEHOLDER}
                />

                <span>e-mail</span>
              </Link>
            </li>

            <li>
              <Link href={'https://github.com/Taeyeon-Lim'} target='_blank'>
                <Image
                  width={40}
                  height={40}
                  src={'/home/github-mark-white.png'}
                  alt={'github-logo'}
                  className={cx('github', 'shadow')}
                  placeholder={BASE64_PLACEHOLDER}
                />

                <span>Github</span>
              </Link>
            </li>
          </ul>
        </article>

        <article>
          <h3 className='hide-header'>Skill Stack, 기술 스택</h3>

          <p className={cx('small-header', 'skill')}>Skills</p>

          <div className={cx('skills')}>
            <p>main</p>
            <ul>
              <li>Next.js,</li>
              <li>Typescript,</li>
              <li>React-Query,</li>
              <li>sass + Classnames</li>
            </ul>

            <p>sub</p>
            <ul>
              <li>React-Three-Fiber(three.js),</li>
              <li>Vercel(deploy),</li>
              <li>Figma(tool)</li>
            </ul>
          </div>
        </article>

        <article>
          <h3 className={cx('small-header')}>Introduction</h3>

          <p>안녕하세요?</p>

          <p>
            저는 누군가에게 도움되는 소프트웨어를 만드는 것이 더 멋진 세상을
            만든다고 믿는 웹 프론트 개발자입니다.
          </p>

          <p>합리적이고 좋은 의사결정에 기반한 개발을 선호합니다.</p>
        </article>
      </section>

      <h2 className={'hide-header'}>Career, 커리어</h2>

      <section className={cx('career')}>
        <article>
          <h3 className={cx('small-header')}>Career</h3>

          <ol>
            <li>
              <div className={cx('career-header')}>
                <h4>Wkey</h4>

                <span>2022.09.01 ~ 2023.09.30 (1년 1개월)</span>
              </div>

              <hr />

              <summary>인강헬퍼 - 학습 중개 및 운영 관리 지원 플랫폼</summary>

              <div className={cx('flex-wrap', 'position')}>
                <p>역할</p>

                <p>Front-End Devloper</p>
              </div>

              <div className={cx('flex-wrap', 'stacks')}>
                <p>사용된 기술 스택</p>

                <ul>
                  <li>Next.js,&nbsp;</li>
                  <li>Typescript,&nbsp;</li>
                  <li>React-Query,&nbsp;</li>
                  <li>react-hook-form,&nbsp;</li>
                  <li>mqtt-react-hooks,&nbsp;</li>
                  <li>sass,&nbsp;</li>
                  <li>classnames</li>
                </ul>
              </div>

              <div className={cx('flex-wrap', 'modules')}>
                <p>구현 기능 및 수행</p>

                <ul className={cx('list-up')}>
                  <li>
                    유저(학생, 헬퍼)와 어드민 웹 어플리케이션 설계 및 개발
                  </li>
                  <li>mqtt를 이용한 1:1 실시간 대화 UI/UX 구현 및 개발</li>
                  <li>
                    코드 스플리팅, 비동기 데이터 Suspense 등으로 초기 로딩 속도
                    개선
                  </li>
                  <li>
                    페이지 별 성격에 맞게 SSR, CSR, SSG, ISR 페이지 제작 및 캐시
                    설정
                  </li>
                  <li>포트원을 통한 결제 연동</li>
                  <li>유저 피드백을 통한 가입 전환율 개선</li>
                  <li>유저 타입별 랜딩 가이드 페이지 제작</li>
                  <li>재사용 가능한 컴포넌트 제작</li>
                  <li>
                    next/Image를 통한 이미지 사이즈(size)별 최적화 및 lazy 로딩
                  </li>
                  <li>
                    반자동 SEO 구현 및 Lihgthouse 성능, 접근성 등 최적화 (항목
                    최저 {'>'} 96)
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </article>
      </section>

      <section>
        <p
          style={{
            opacity: 0,
          }}
        >
          수상 내역
        </p>
      </section>
    </main>
  );
}
