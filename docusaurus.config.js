// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Target Machines WriteUp',
    tagline: '分享出来不是拿来给你抄的，而是碰壁的时候给你提供思路的，nmmd',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://tryhackmyoffsecbox.github.io/',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/Target-Machines-WriteUp',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'WSS-Studio', // Usually your GitHub org/user name.
    projectName: 'tryhackne-cn', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/CTF-Archives/Tryhackme-CN/edit/main/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/CTF-Archives/Tryhackme-CN/edit/main/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: 'Tryhackme CN Mirror',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'Hackthebox_Sidebar',
                        position: 'left',
                        label: 'Hackthebox',
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'Yunjing_Sidebar',
                        position: 'left',
                        label: '春秋云境',
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'HackMyVM_Sidebar',
                        position: 'left',
                        label: 'HackMyVM',
                    },
                ],
            },
            footer: {
                style: 'dark',
                copyright: `Copyright © ${new Date().getFullYear()} Tryhackme CN Mirror Built with Docusaurus.`,
            },
            prism: {
                additionalLanguages: ['powershell', 'php', 'ini', 'json'],
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
            docs: {
                sidebar: {
                    autoCollapseCategories: true,
                },
            },
        }),
};

export default config;
