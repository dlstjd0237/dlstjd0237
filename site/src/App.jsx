import {useEffect, useState} from 'react';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Badge} from '@astryxdesign/core/Badge';
import {Blockquote} from '@astryxdesign/core/Blockquote';
import {Button} from '@astryxdesign/core/Button';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Divider} from '@astryxdesign/core/Divider';
import {Grid} from '@astryxdesign/core/Grid';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {Tab, TabList} from '@astryxdesign/core/TabList';
import {Text} from '@astryxdesign/core/Text';
import {Token} from '@astryxdesign/core/Token';
import {VStack} from '@astryxdesign/core/VStack';

const GH = 'https://github.com/dlstjd0237';

const NAV = [
  ['about', '소개'],
  ['focus', '관심 분야'],
  ['awards', '수상'],
  ['projects', '프로젝트'],
  ['activity', '활동'],
];

const STACK = [
  ['언어', ['C#', 'C++', 'Python']],
  ['엔진 · 프레임워크', ['Unity', 'Unreal Engine', 'DirectX 12', 'PyQt5']],
  ['도구', ['Visual Studio', 'Rider', 'Git', 'Windows']],
];

const FOCUS = [
  ['게임 클라이언트 구조', 'Unity C# / C++ 엔진 위에서 FSM·UI·코어 모듈을 재사용 가능한 형태로 정리하기'],
  ['리팩토링 & 최적화', '“돌아가는 코드”를 읽히는 코드로. 성능과 가독성 사이 기준 세우기'],
  ['게임 QA 자동화', '이미지/UI 기반 자동화, 실디바이스 원격 제어, 디바이스 팜 구성'],
  ['툴 프로그래밍', '에디터 확장, 이펙트·UI 편집기, 반복 작업을 없애는 사내 툴'],
  ['데스크톱 유틸', 'PyQt 기반 개인용 대시보드 / 유틸리티 만들기'],
  ['PS & 학습', '백준·코드트리로 알고리즘 감 유지, DX12·네트워크 코드 공부'],
];

const AWARDS = [
  ['ChillGuardian', '최우수상 · 1위', '제29회 앱잼', '2025 제29회 앱잼에서 최우수상(1등)을 수상한 작품입니다.'],
  ['2024_28-AppJam', '최우수상', '제28회 앱잼', '제28회 AppJam 최우수상 수상작의 스크립트 모음입니다.'],
];

const CATS = [
  ['all', '전체'],
  ['engine', '엔진 · 게임 코드'],
  ['tool', '도구 · 자동화'],
  ['project', '수상작 · 프로젝트'],
  ['algo', '알고리즘'],
];

const LANG = {'C#': '#178600', 'C++': '#f34b7d', Python: '#3572A5'};

const REPOS = [
  ['Unity_Core_Module', 'engine', '모든 Unity 프로젝트의 토대가 되는 코어 모듈 모음', 'C#'],
  ['BIS_FSM', 'engine', '실제 프로젝트에서 쓰고 있는 FSM 구조', 'C#'],
  ['BIS_UI', 'engine', '실제 프로젝트에서 쓰고 있는 UI 구조', 'C#'],
  ['R1', 'engine', '언리얼 엔진 프로젝트', 'C++'],
  ['DX12_Lesson', 'engine', 'DirectX 12 학습 기록', 'C++'],
  ['NetCode', 'engine', '게임 네트워크 코드 실습', 'C#'],
  ['ai-tell-check', 'tool', '게임 아트의 "AI 티"를 자산마다 판정하는 에이전트 스킬', 'Python'],
  ['Oxford_dict_lookup', 'tool', '단어 선택 + 단축키로 바로 뜨는 윈도우 사전 앱', 'Python'],
  ['Useful_And_Prompt_Tools', 'tool', '있으면 편한 스크립트 모음', 'C#'],
  ['Airtest', 'tool', '게임/앱 UI 자동화 프레임워크 (fork)', null],
  ['ChillGuardian', 'project', '제29회 앱잼 최우수상(1위) 수상작', 'C#', true],
  ['2024_28-AppJam', 'project', '제28회 앱잼 최우수상 수상작', 'C#', true],
  ['2025_UnitedGameJam', 'project', '스마일게이트 스토브인디 연합 게임개발 캠프', 'C#'],
  ['GraduationWork_Script', 'project', '졸업 작품 스크립트', 'C#'],
  ['Baekjoon', 'algo', '백준 풀이 자동 푸시', 'C++'],
  ['codetree-TILs', 'algo', '코드트리 TIL', null],
];

const STREAK = 'https://streak-stats.demolab.com?user=dlstjd0237&locale=ko&hide_border=true';
const STREAK_LIGHT = `${STREAK}&background=FDFBE4&ring=225BFF&fire=225BFF&currStreakLabel=225BFF&currStreakNum=1D1C11&sideNums=1D1C11&sideLabels=1D1C11&dates=6B6650&stroke=E5E3D4`;
const STREAK_DARK = `${STREAK}&background=261A13&ring=FDEE8C&fire=FDEE8C&currStreakLabel=FDEE8C&currStreakNum=F3F2E2&sideNums=F3F2E2&sideLabels=F3F2E2&dates=CFCAB0&stroke=5A4636`;

function SectionTitle({title, en, children}) {
  return (
    <VStack gap={1}>
      <HStack gap={2} vAlign="end" wrap="wrap">
        <Heading level={2}>{title}</Heading>
        <Text type="supporting" className="sign">{en}</Text>
      </HStack>
      {children && <Text type="supporting">{children}</Text>}
    </VStack>
  );
}

function useLiveRepos() {
  const [live, setLive] = useState(null);
  useEffect(() => {
    fetch('https://api.github.com/users/dlstjd0237/repos?per_page=100')
      .then(r => (r.ok ? r.json() : []))
      .then(data => data.length && setLive(Object.fromEntries(data.map(r => [r.name, r]))))
      .catch(() => {});
  }, []);
  return live;
}

export default function App() {
  const [cat, setCat] = useState('all');
  const live = useLiveRepos();
  useEffect(() => {
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, []);
  const repoCount = live ? Object.keys(live).length : 41;
  const shown = REPOS.filter(r => cat === 'all' || r[1] === cat);
  const count = c => (c === 'all' ? REPOS.length : REPOS.filter(r => r[1] === c).length);

  return (
    <>
      <header className="topbar" id="top">
        <HStack className="page" paddingBlock={2} gap={3} vAlign="center" hAlign="between">
          <Text weight="semibold" className="mono">dlstjd0237</Text>
          <HStack as="nav" className="nav" gap={0.5}>
            {NAV.map(([id, label]) => (
              <Button key={id} label={label} variant="ghost" size="sm" href={`#${id}`} />
            ))}
          </HStack>
        </HStack>
      </header>

      <VStack as="main" className="page" gap={10} paddingBlock={8}>
        <HStack as="section" gap={6} vAlign="center" wrap="wrap">
          <Avatar src="https://avatars.githubusercontent.com/u/123615243?v=4" name="백인성" size={144} tooltip={false} />
          <VStack gap={3} maxWidth={720}>
            <Heading level={1} className="hero-name">Inseong Baek</Heading>
            <HStack gap={1} wrap="wrap">
              <Badge variant="blue" label="Game Programmer" />
              <Badge variant="yellow" label="앱잼 최우수상 2회" />
            </HStack>
            <Text as="p" size="lg">
              게임 회사에서 게임과 게임 만드는 도구를 함께 만듭니다. 게임 클라이언트 코드부터 QA 자동화, 사내 툴,
              개인 데스크톱 유틸까지. “만들면 편해지는 것”이면 언어 안 가리고 만드는 편입니다.
            </Text>
            <HStack gap={2} wrap="wrap">
              <Button label="GitHub 프로필" variant="primary" href={GH} target="_blank" rel="noopener noreferrer" />
              <Button label="프로젝트 보기" href="#projects" />
            </HStack>
          </VStack>
        </HStack>

        <Divider />

        <VStack as="section" id="about" gap={5}>
          <SectionTitle title="소개" en="About" />
          <Grid columns={{minWidth: 300, repeat: 'fit'}} gap={8}>
            <MetadataList>
              <MetadataListItem label="이름">백인성 · Inseong Baek</MetadataListItem>
              <MetadataListItem label="직무">Game Programmer</MetadataListItem>
              <MetadataListItem label="소속">NPIXEL</MetadataListItem>
              <MetadataListItem label="지역">Anyang, KR</MetadataListItem>
              <MetadataListItem label="강점">반복 작업을 도구로 바꾸기</MetadataListItem>
              <MetadataListItem label="공개 레포">
                <Text hasTabularNumbers>{repoCount}</Text>
              </MetadataListItem>
            </MetadataList>
            <VStack gap={5}>
              <Blockquote>“만들면 편해지는 것”이면 언어 안 가리고 만듭니다.</Blockquote>
              <Text as="p">
                게임 클라이언트 구조를 재사용 가능한 형태로 정리하고, 돌아가는 코드를 읽히는 코드로 바꾸는 일을
                좋아합니다. 게임 QA 자동화와 사내 툴, 개인 데스크톱 유틸까지 손이 가는 곳이면 직접 만듭니다.
              </Text>
              {STACK.map(([group, items]) => (
                <VStack key={group} gap={1.5}>
                  <Text type="label">{group}</Text>
                  <HStack gap={1} wrap="wrap">
                    {items.map(i => <Token key={i} label={i} />)}
                  </HStack>
                </VStack>
              ))}
            </VStack>
          </Grid>
        </VStack>

        <VStack as="section" id="focus" gap={5}>
          <SectionTitle title="관심 분야" en="Focus">요즘 시간을 쓰고 있는 일들입니다.</SectionTitle>
          <Grid columns={{minWidth: 280}} gap={6}>
            {FOCUS.map(([title, desc], i) => (
              <VStack key={title} gap={1}>
                <Text type="supporting" className="mono">{String(i + 1).padStart(2, '0')}</Text>
                <Heading level={3}>{title}</Heading>
                <Text type="supporting" as="p">{desc}</Text>
              </VStack>
            ))}
          </Grid>
        </VStack>

        <VStack as="section" id="awards" gap={5}>
          <SectionTitle title="수상" en="Awards" />
          <Grid columns={{minWidth: 300, repeat: 'fit'}} gap={4}>
            {AWARDS.map(([repo, award, event, desc]) => (
              <ClickableCard key={repo} label={`${repo} 레포 보기`} href={`${GH}/${repo}`} target="_blank" padding={6}>
                <VStack gap={2}>
                  <HStack gap={2} vAlign="center" wrap="wrap">
                    <Badge variant="yellow" label={award} />
                    <Text type="supporting">{event}</Text>
                  </HStack>
                  <Heading level={3}>{repo}</Heading>
                  <Text as="p">{desc}</Text>
                  <Text color="accent" weight="medium">레포 보기 ↗</Text>
                </VStack>
              </ClickableCard>
            ))}
          </Grid>
        </VStack>

        <VStack as="section" id="projects" gap={5}>
          <SectionTitle title="프로젝트" en="Projects">
            지금까지 만든 레포를 종류별로 정리했습니다. 항목을 누르면 GitHub로 이동합니다.
          </SectionTitle>
          <TabList value={cat} onChange={setCat} hasDivider>
            {CATS.map(([value, label]) => (
              <Tab key={value} value={value} label={label} endContent={<Badge variant="neutral" label={count(value)} />} />
            ))}
          </TabList>
          <Grid columns={{minWidth: 240}} gap={3}>
            {shown.map(([name, , desc, lang, award]) => (
              <ClickableCard key={name} label={name} href={`${GH}/${name}`} target="_blank" padding={4}>
                <VStack gap={2} height="100%">
                  <HStack gap={1.5} vAlign="center" wrap="wrap">
                    <Text weight="semibold" maxLines={1}>{name}</Text>
                    {award && <Badge variant="yellow" label="수상" />}
                  </HStack>
                  <Text type="supporting" as="p">{desc}</Text>
                  <HStack gap={2} hAlign="between" vAlign="center">
                    <Text type="supporting" size="sm">
                      {lang && <span className="lang-dot" style={{background: LANG[lang]}} />}
                      {lang ?? ' '}
                    </Text>
                    <Text type="supporting" size="sm" hasTabularNumbers>
                      {live?.[name]?.pushed_at?.slice(0, 10).replaceAll('-', '.') ?? ''}
                    </Text>
                  </HStack>
                </VStack>
              </ClickableCard>
            ))}
          </Grid>
        </VStack>

        <VStack as="section" id="activity" gap={5}>
          <SectionTitle title="활동" en="Activity">
            GitHub 활동과 solved.ac 기록입니다. 외부 서비스에서 실시간으로 불러옵니다.
          </SectionTitle>
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet={STREAK_DARK} />
            <img className="stat-img" src={STREAK_LIGHT} alt="GitHub 연속 기여" loading="lazy" />
          </picture>
          <a className="chart-panel" href={GH} target="_blank" rel="noopener noreferrer">
            <img className="stat-img" src="https://ghchart.rshah.org/225BFF/dlstjd0237" alt="GitHub 기여 그래프" loading="lazy" />
          </a>
          <a href="https://solved.ac/profile/dlstjd0237" target="_blank" rel="noopener noreferrer">
            <img className="stat-img" src="https://mazassumnida.wtf/api/v2/generate_badge?boj=dlstjd0237" alt="solved.ac 티어" loading="lazy" />
          </a>
        </VStack>

        <Divider />

        <VStack as="footer" gap={4} hAlign="center">
          <Text type="supporting" justify="center" as="p">
            코드와 프로젝트는 GitHub에 공개되어 있습니다. 알고리즘 기록은 solved.ac에서 볼 수 있습니다.
          </Text>
          <HStack gap={2} wrap="wrap" hAlign="center">
            <Button label="GitHub 프로필" variant="primary" href={GH} target="_blank" rel="noopener noreferrer" />
            <Button label="solved.ac" href="https://solved.ac/profile/dlstjd0237" target="_blank" rel="noopener noreferrer" />
          </HStack>
          <HStack gap={3} vAlign="center">
            <Text type="supporting" size="sm">© {new Date().getFullYear()} Inseong Baek</Text>
            <Button label="맨 위로 ↑" variant="ghost" size="sm" href="#top" />
          </HStack>
        </VStack>
      </VStack>
    </>
  );
}
