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
    const browserLang = (navigator.language || defaultLocale).slice(0, 2);
    const pageLocale = document.documentElement.dataset.locale || defaultLocale;
    const targetLocale = Object.prototype.hasOwnProperty.call(localeLabels, browserLang) ? browserLang : defaultLocale;
    if (targetLocale === pageLocale) {
      return;
    }
    const segments = window.location.pathname.split('/').filter(Boolean);
    const suffixSegments = segments.slice(1);
    const suffix = suffixSegments.length ? '/' + suffixSegments.join('/') + '/' : '/';
    const targetHref = '/' + targetLocale + suffix;
    const messageTemplate = messages[pageLocale] || messages.default || '';
    const localeLabel = localeLabels[targetLocale] || localeLabels[defaultLocale] || targetLocale;
    if (!messageTemplate) {
      return;
    }
    const alertBar = document.getElementById('language-alert');
    const alertMessage = document.getElementById('language-alert-message');
    const alertClose = document.getElementById('language-alert-close');
    if (!alertBar || !alertMessage || !alertClose) {
      return;
    }
    alertMessage.innerHTML = messageTemplate
      .replace('{{targetLocaleLabel}}', localeLabel)
      .replace('{{targetHref}}', targetHref);
    alertBar.classList.remove('hidden');
    alertClose.addEventListener('click', () => alertBar.classList.add('hidden'));
  })();
</script>`;
}
