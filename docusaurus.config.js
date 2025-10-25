// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import ('@docusaurus/types').Config} */
const config = {
    title: 'Target Machines WriteUp',
    tagline: ' 分享出来不是拿来给你抄的，而是碰壁的时候给你提供思路的，给老子记住了 ',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://tryhackmyoffsecbox.github.io/',
    // Set the /<baseUrl>/pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/Target-Machines-WriteUp',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'TryHackMyOffsecBox 🇨🇳 && WhySoSerious', // Usually your GitHub org/user name.
    projectName: 'Target Machines WriteUp', // Usually your repo name.

    onBrokenLinks: 'throw',


    // Even if you don't use internationalization, you can use this field to set
    //useful metadata like html lang. For example, if your site is Chinese, you
    //may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    markdown: { hooks: { onBrokenMarkdownLinks: 'warn' } },

    presets: [
        [
            'classic',
            /** @type {import ('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/',
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp/edit/main/',
                    postsPerPage: 'ALL',
                    blogSidebarCount: 'ALL',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],

    themeConfig:
        /** @type {import ('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            sidebar: {
                autoCollapseCategories: true,
            },
            navbar: {
                title: 'Target Machines WriteUp',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'HackTheBox_Sidebar',
                        position: 'left',
                        label: 'HackTheBox',
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'Yunjing_Sidebar',
                        position: 'left',
                        label: ' 春秋云境 ',
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'HackMyVM_Sidebar',
                        position: 'left',
                        label: 'HackMyVM',
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'Xuanji_Sidebar',
                        position: 'left',
                        label: ' 玄机 ',
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'Independent_Environment_Sidebar',
                        position: 'left',
                        label: ' 其他靶场 ',
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'ToolsGuide_Sidebar',
                        position: 'left',
                        label: 'Tools Guide',
                    },
                    { to: '/blog', label: 'Blog', position: 'right' },
                    {
                        href: 'https://github.com/TryHackMyOffsecBox/Target-Machines-WriteUp',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                copyright: `Copyright © ${new Date().getFullYear()} TryHackMyOffsecBox 🇨🇳 Built with Docusaurus.`,
            },
            prism: {
                additionalLanguages: ['powershell', 'php', 'ini', 'json', 'java', 'csharp', 'bash'],
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
            docs: {
                sidebar: {
                    autoCollapseCategories: true,
                },
            },
        }),
    themes: [
        [
            "@easyops-cn/docusaurus-search-local",
            ({
                hashed: true,
                language: ["en", "zh"],
                highlightSearchTermsOnTargetPage: true,
                explicitSearchResultPath: true,
            })
        ]
    ],
    plugins: [
        [
            "@gracefullight/docusaurus-plugin-cloudflare-analytics",
            { token: "419208379f5c472a9afad0d3dc0396f9" },
        ],
    ],
};

export default config;
