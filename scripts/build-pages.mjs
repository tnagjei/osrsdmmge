import { promises as fs } from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';
import nunjucks from 'nunjucks';
import { layoutData } from '../src/components/layout-data.js';
import { renderLanguageAlert } from '../src/components/language-alert.js';

const repoRoot = path.resolve('.');
const pagesDir = path.join(repoRoot, 'src/pages');
const componentsDir = path.join(repoRoot, 'src/components');
const outputDir = path.join(repoRoot, 'src/generated');

async function cleanOutputDir() {
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });
}

function computeHeaderConfig(locale, isHome) {
  const localeConfig = layoutData.locales[locale];
  if (!localeConfig) {
    throw new Error(`Missing layout data for locale: ${locale}`);
  }
  const navKey = isHome ? 'home' : 'secondary';
  return {
    homeHref: `/${locale}/`,
    navItems: localeConfig.nav[navKey],
    cta: localeConfig.cta
  };
}

function computeFooterConfig(locale, isHome) {
  const localeConfig = layoutData.locales[locale];
  return isHome ? localeConfig.footer.home : localeConfig.footer.secondary;
}

function buildLanguageAlert(locale) {
  const localeConfig = layoutData.locales[locale];
  const labels = layoutData.languages.reduce((acc, language) => {
    acc[language.code] = language.label;
    return acc;
  }, {});
  const messages = { default: layoutData.locales.en.alertMessages.default };
  if (localeConfig.alertMessages?.default) {
    messages[locale] = localeConfig.alertMessages.default;
  }
  return renderLanguageAlert({
    localeLabels: labels,
    messages,
    defaultLocale: layoutData.defaultLocale,
    closeLabel: localeConfig.closeLabel
  });
}

function isHomeTemplate(relativePath) {
  const parts = relativePath.split(path.sep);
  return parts.length === 2 && parts[1] === 'index.njk';
}

async function buildPages() {
  await cleanOutputDir();
  const templates = await fg('**/*.njk', { cwd: pagesDir });

  const loader = new nunjucks.FileSystemLoader([pagesDir, componentsDir]);
  const env = new nunjucks.Environment(loader, { autoescape: false, throwOnUndefined: true });
  env.addGlobal('layout', layoutData);

  for (const templatePath of templates) {
    console.log('Processing template:', templatePath);
    const locale = templatePath.split('/')[0];
    console.log('Extracted locale:', locale);
    const isHome = isHomeTemplate(templatePath);
    const header = computeHeaderConfig(locale, isHome);
    const footer = computeFooterConfig(locale, isHome);
    const languageAlert = buildLanguageAlert(locale);
    const localeConfig = layoutData.locales[locale];
    const dir = localeConfig.dir === 'rtl' ? 'rtl' : null;

    const rendered = env.render(templatePath, {
      page: {
        locale,
        dir
      },
      header,
      footer,
      languageAlert
    });

    let output = rendered.replace(/<(meta|link|input|img)([^>]*)\s*\/>/gi, '<$1$2>');

    // Inject Yandex verification meta, Google AdSense script, and Microsoft Clarity script into <head>
    output = output.replace(
      '</head>',
      `
    <meta name="yandex-verification" content="caa5d945712c72de" />
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3083296102953963"
         crossorigin="anonymous"></script>
    <!-- Microsoft Clarity -->
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "ti4q1lpeb4");
    </script>
</head>`
    );

    output = output.split('\n').map(line => line.replace(/\s+$/, '')).join('\n');
    output = output.replace(/\n{3,}/g, '\n\n');

    const destination = path.join(outputDir, templatePath.replace(/\.njk$/, '.html'));
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, output);
  }

  const defaultLocale = layoutData.defaultLocale;
  const defaultHome = path.join(outputDir, defaultLocale, 'index.html');
  const rootIndex = path.join(outputDir, 'index.html');

  try {
    await fs.copyFile(defaultHome, rootIndex);
    console.log(`Copied ${defaultLocale}/index.html to root index.html for default locale landing.`);
  } catch (error) {
    console.warn(`Unable to copy default locale home to root: ${error.message}`);
  }
}

buildPages().catch(error => {
  console.error('Failed to build pages', error);
  process.exit(1);
});
