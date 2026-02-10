export function renderLanguageAlert(config) {
  const localeLabels = JSON.stringify(config.localeLabels);
  const messages = JSON.stringify(config.messages);
  const defaultLocale = JSON.stringify(config.defaultLocale);
  const hiddenClass =
    config.containerClass ||
    "hidden border border-border/40 bg-surface/90 px-4 py-3 text-sm text-fog/80 shadow-subtle backdrop-blur md:px-8";
  const closeClass = config.closeButtonClass || "ml-4 font-semibold text-accent";
  return `
<div id="language-alert" class="${hiddenClass}">
  <span id="language-alert-message"></span>
  <button id="language-alert-close" type="button" class="${closeClass}">${config.closeLabel}</button>
</div>
<script>
  (function() {
    const localeLabels = ${localeLabels};
    const messages = ${messages};
    const defaultLocale = ${defaultLocale};
    const alertBar = document.getElementById('language-alert');
    const alertMessage = document.getElementById('language-alert-message');
    const alertClose = document.getElementById('language-alert-close');
    if (!alertBar || !alertMessage || !alertClose) {
      return;
    }

    const browserLang = (navigator.language || defaultLocale).slice(0, 2);
    const pageLocale = document.documentElement.dataset.locale || defaultLocale;
    const targetLocale = Object.prototype.hasOwnProperty.call(localeLabels, browserLang) ? browserLang : defaultLocale;
    if (targetLocale === pageLocale) {
      return;
    }
    const segments = window.location.pathname.split('/').filter(Boolean);
    const validLocales = Object.keys(localeLabels);
    const firstSegment = segments[0];
    const isFirstSegmentLocale = validLocales.includes(firstSegment);
    
    // If the first segment is a locale, remove it to get the pure path
    const suffixSegments = isFirstSegmentLocale ? segments.slice(1) : segments;
    const suffix = suffixSegments.length ? '/' + suffixSegments.join('/') + '/' : '/';
    
    // Build target href
    let targetHref;
    if (targetLocale === defaultLocale) {
      targetHref = suffix;
    } else {
      targetHref = '/' + targetLocale + suffix;
    }

    // [Patch] Prevent 404s for new blog posts that only exist in English
    // If we are on a blog post (not the index) and targeting a non-default locale,
    // we should check if it's one of the new English-only posts.
    // For simplicity, since we know all current blog posts are EN-only, 
    // we suppress the alert if the path is a blog post and target is not EN.
    const isBlogPost = suffix.startsWith('/blog/') && suffix !== '/blog/' && suffix !== '/blog/index.html';
    if (isBlogPost && targetLocale !== defaultLocale) {
       return;
    }

    const localeLabel = localeLabels[targetLocale];
    const messageTemplate = messages[pageLocale] || messages.default;

    alertMessage.innerHTML = messageTemplate
      .replace('{{targetLocaleLabel}}', localeLabel)
      .replace('{{targetHref}}', targetHref);
    alertBar.classList.remove('hidden');
    alertClose.addEventListener('click', () => alertBar.classList.add('hidden'));
  })();
</script>`;
}
