import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '由 TryHackMyOffsecBox 团队倾力维护',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        TryHackMyOffsecBox 是一支来自中国大陆的团队，致力于各大公开靶场的挑战解决笔记，希望能够通过这个 writeup 项目，实现人人友好的靶机训练体验，同时欢迎各位研究人员通过 Github 与我们建立联系，我们期待您提出的建议与问题
      </>
    ),
  },
  {
    title: '专注于问题本身',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        专注于靶机的攻打流程，提供关键步骤的指令与输出信息，帮助您走过靶机训练过程中的每一个关键点
      </>
    ),
  },
  {
    title: '由 Docusaurus 与 Github Page 提供支持',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        得益于 Docusaurus 框架的高度灵活性，强大的性能，并借助 Github 的 Page 页面托管服务与自动化构建流，实现网站访问的流畅性与人人共享的原则
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
