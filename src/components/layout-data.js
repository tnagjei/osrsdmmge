export const layoutData = {
  defaultLocale: "en",
  languages: [
    { code: "en", label: "English", href: "/en/", isDefault: true },
    { code: "fi", label: "Suomi", href: "/fi/" },
    { code: "sv", label: "Svenska", href: "/sv/" },
    { code: "no", label: "Norsk", href: "/no/" }
  ],
  locales: {
    en: {
      dir: "ltr",
      closeLabel: "Close",
      cta: {
        telegram: { href: "https://t.me/tangjei", label: "Telegram" },
        discord: { href: "https://discord.com", label: "Join Discord" }
      },
      nav: {
        home: [
          { label: "Swap Rates", href: "#swap-rates" },
          { label: "Profit Board", href: "#profit-board" },
          { label: "FAQ", href: "#faq" },
          { label: "Help", href: "/en/help/" }
        ],
        secondary: [
          { label: "Home", href: "/en/" },
          { label: "Help", href: "/en/help/" },
          { label: "About", href: "/en/about/" },
          { label: "Privacy", href: "/en/privacy/" },
          { label: "Terms", href: "/en/terms/" }
        ]
      },
      footer: {
        home: {
          brand: {
            title: "OSRS DMM Tracker",
            lines: [
              { shade: "70", content: "© 2026 osrsdmmge. Real-time OSRS DMM GE gold prices and profit tracking." },
              { shade: "60", content: "Contact: <a href=\"mailto:tangjei414@gmail.com\" class=\"text-accent\" title=\"Email Us\">tangjei414@gmail.com</a>" },
              { shade: "60", content: "Telegram: <a href=\"https://t.me/tangjei\" class=\"text-accent\" title=\"Contact on Telegram\">@tangjei</a>" }
            ]
          },
          columns: [
            {
              title: "Explore",
              links: [
                { label: "Swap Rates", href: "#swap-rates" },
                { label: "Profit Board", href: "#profit-board" },
                { label: "Blog", href: "/en/blog/" }
              ]
            },
            {
              title: "Support",
              links: [
                { label: "Help Center", href: "/en/help/" },
                { label: "Privacy Policy", href: "/en/privacy/" },
                { label: "User Agreement", href: "/en/terms/" }
              ]
            },
            {
              title: "Languages",
              links: [
                { label: "English", href: "/en/" },
                { label: "Suomi", href: "/fi/" },
                { label: "Svenska", href: "/sv/" },
                { label: "Norsk", href: "/no/" }
              ]
            }
          ],
          bottomNote: "Track OSRS DMM GE gold prices in real-time with osrsdmmge."
        },
        secondary: {
          brand: {
            title: "OSRS DMM Tracker",
            lines: [
              { shade: "70", content: "© 2025 tangjei414. Real-time Deadman Mode gold prices and profit tracking." },
              { shade: "60", content: "Contact: <a href=\"mailto:tangjei414@gmail.com\" class=\"text-accent\">tangjei414@gmail.com</a>" },
              { shade: "60", content: "Telegram: <a href=\"https://t.me/tangjei\" class=\"text-accent\">@tangjei</a>" }
            ]
          },
          navigation: {
            title: "Navigation",
            links: [
              { label: "Home", href: "/en/" },
              { label: "Help", href: "/en/help/" },
              { label: "About", href: "/en/about/" }
            ]
          },
          legal: {
            title: "Legal",
            links: [
              { label: "Privacy", href: "/en/privacy/" },
              { label: "Terms", href: "/en/terms/" }
            ]
          },
          languages: {
            title: "Languages",
            items: [
              { label: "English", href: "/en/" },
              { label: "Suomi", href: "/fi/" },
              { label: "Svenska", href: "/sv/" },
              { label: "Norsk", href: "/no/" }
            ]
          },
          bottomNote: "Track OSRS Deadman Mode gold prices in real-time."
        }
      },
      alertMessages: {
        default: "We detected {{targetLocaleLabel}}. Switch to <a class=\"text-accent underline\" href=\"{{targetHref}}\">the {{targetLocaleLabel}} site</a>?"
      }
    },
    fi: {
      dir: "ltr",
      closeLabel: "Sulje",
      cta: {
        telegram: { href: "https://t.me/tangjei", label: "Telegram" },
        discord: { href: "https://discord.com", label: "Liity Discordiin" }
      },
      nav: {
        home: [
          { label: "Vaihtokurssit", href: "#swap-rates" },
          { label: "Voittolista", href: "#profit-board" },
          { label: "UKK", href: "#faq" },
          { label: "Ohje", href: "/fi/help/" }
        ],
        secondary: [
          { label: "Etusivu", href: "/fi/" },
          { label: "Ohje", href: "/fi/help/" },
          { label: "Tietoa meistä", href: "/fi/about/" },
          { label: "Tietosuoja", href: "/fi/privacy/" },
          { label: "Käyttöehdot", href: "/fi/terms/" }
        ]
      },
      footer: {
        home: {
          brand: {
            title: "OSRS DMM Tracker",
            lines: [
              { shade: "70", content: "© 2025 tangjei414. Reaaliaikainen Deadman Mode kultahintojen seuranta." },
              { shade: "60", content: "Yhteystiedot: <a href=\"mailto:tangjei414@gmail.com\" class=\"text-accent\">tangjei414@gmail.com</a>" },
              { shade: "60", content: "Telegram: <a href=\"https://t.me/tangjei\" class=\"text-accent\">@tangjei</a>" }
            ]
          },
          columns: [
            {
              title: "Tutustu",
              links: [
                { label: "Vaihtokurssit", href: "#swap-rates" },
                { label: "Voittolista", href: "#profit-board" },
                { label: "Blogi", href: "/fi/blog/" }
              ]
            },
            {
              title: "Tuki",
              links: [
                { label: "Ohjekeskus", href: "/fi/help/" },
                { label: "Tietosuoja", href: "/fi/privacy/" },
                { label: "Käyttöehdot", href: "/fi/terms/" }
              ]
            },
            {
              title: "Kielet",
              links: [
                { label: "English", href: "/en/" },
                { label: "Suomi", href: "/fi/" },
                { label: "Svenska", href: "/sv/" },
                { label: "Norsk", href: "/no/" }
              ]
            }
          ],
          bottomNote: "Seuraa OSRS Deadman Mode kultahintoja reaaliajassa."
        },
        secondary: {
          brand: {
            title: "OSRS DMM Tracker",
            lines: [
              { shade: "70", content: "© 2025 tangjei414. Reaaliaikainen Deadman Mode kultahintojen seuranta." },
              { shade: "60", content: "Yhteystiedot: <a href=\"mailto:tangjei414@gmail.com\" class=\"text-accent\">tangjei414@gmail.com</a>" },
              { shade: "60", content: "Telegram: <a href=\"https://t.me/tangjei\" class=\"text-accent\">@tangjei</a>" }
            ]
          },
          navigation: {
            title: "Navigointi",
            links: [
              { label: "Etusivu", href: "/fi/" },
              { label: "Ohje", href: "/fi/help/" },
              { label: "Tietoa meistä", href: "/fi/about/" }
            ]
          },
          legal: {
            title: "Lakiasiat",
            links: [
              { label: "Tietosuoja", href: "/fi/privacy/" },
              { label: "Käyttöehdot", href: "/fi/terms/" }
            ]
          },
          languages: {
            title: "Kielet",
            items: [
              { label: "English", href: "/en/" },
              { label: "Suomi", href: "/fi/" },
              { label: "Svenska", href: "/sv/" },
              { label: "Norsk", href: "/no/" }
            ]
          },
          bottomNote: "Seuraa OSRS Deadman Mode kultahintoja reaaliajassa."
        }
      },
      alertMessages: {
        default: "Havaitsimme {{targetLocaleLabel}}. Vaihda <a class=\"text-accent underline\" href=\"{{targetHref}}\">{{targetLocaleLabel}} sivustolle</a>?"
      }
    },
    sv: {
      dir: "ltr",
      closeLabel: "Stäng",
      cta: {
        telegram: { href: "https://t.me/tangjei", label: "Telegram" },
        discord: { href: "https://discord.com", label: "Gå med i Discord" }
      },
      nav: {
        home: [
          { label: "Växelkurser", href: "#swap-rates" },
          { label: "Vinstlista", href: "#profit-board" },
          { label: "FAQ", href: "#faq" },
          { label: "Hjälp", href: "/sv/help/" }
        ],
        secondary: [
          { label: "Hem", href: "/sv/" },
          { label: "Hjälp", href: "/sv/help/" },
          { label: "Om oss", href: "/sv/about/" },
          { label: "Integritet", href: "/sv/privacy/" },
          { label: "Villkor", href: "/sv/terms/" }
        ]
      },
      footer: {
        home: {
          brand: {
            title: "OSRS DMM Tracker",
            lines: [
              { shade: "70", content: "© 2025 tangjei414. Realtids Deadman Mode guldpriser och vinstspårning." },
              { shade: "60", content: "Kontakt: <a href=\"mailto:tangjei414@gmail.com\" class=\"text-accent\">tangjei414@gmail.com</a>" },
              { shade: "60", content: "Telegram: <a href=\"https://t.me/tangjei\" class=\"text-accent\">@tangjei</a>" }
            ]
          },
          columns: [
            {
              title: "Utforska",
              links: [
                { label: "Växelkurser", href: "#swap-rates" },
                { label: "Vinstlista", href: "#profit-board" },
                { label: "Blogg", href: "/sv/blog/" }
              ]
            },
            {
              title: "Support",
              links: [
                { label: "Hjälpcenter", href: "/sv/help/" },
                { label: "Integritetspolicy", href: "/sv/privacy/" },
                { label: "Användarvillkor", href: "/sv/terms/" }
              ]
            },
            {
              title: "Språk",
              links: [
                { label: "English", href: "/en/" },
                { label: "Suomi", href: "/fi/" },
                { label: "Svenska", href: "/sv/" },
                { label: "Norsk", href: "/no/" }
              ]
            }
          ],
          bottomNote: "Spåra OSRS Deadman Mode guldpriser i realtid."
        },
        secondary: {
          brand: {
            title: "OSRS DMM Tracker",
            lines: [
              { shade: "70", content: "© 2025 tangjei414. Realtids Deadman Mode guldpriser och vinstspårning." },
              { shade: "60", content: "Kontakt: <a href=\"mailto:tangjei414@gmail.com\" class=\"text-accent\">tangjei414@gmail.com</a>" },
              { shade: "60", content: "Telegram: <a href=\"https://t.me/tangjei\" class=\"text-accent\">@tangjei</a>" }
            ]
          },
          navigation: {
            title: "Navigation",
            links: [
              { label: "Hem", href: "/sv/" },
              { label: "Hjälp", href: "/sv/help/" },
              { label: "Om oss", href: "/sv/about/" }
            ]
          },
          legal: {
            title: "Juridiskt",
            links: [
              { label: "Integritet", href: "/sv/privacy/" },
              { label: "Villkor", href: "/sv/terms/" }
            ]
          },
          languages: {
            title: "Språk",
            items: [
              { label: "English", href: "/en/" },
              { label: "Suomi", href: "/fi/" },
              { label: "Svenska", href: "/sv/" },
              { label: "Norsk", href: "/no/" }
            ]
          },
          bottomNote: "Spåra OSRS Deadman Mode guldpriser i realtid."
        }
      },
      alertMessages: {
        default: "Vi upptäckte {{targetLocaleLabel}}. Byt till <a class=\"text-accent underline\" href=\"{{targetHref}}\">{{targetLocaleLabel}} webbplatsen</a>?"
      }
    },
    no: {
      dir: "ltr",
      closeLabel: "Lukk",
      cta: {
        telegram: { href: "https://t.me/tangjei", label: "Telegram" },
        discord: { href: "https://discord.com", label: "Bli med i Discord" }
      },
      nav: {
        home: [
          { label: "Vekslingskurser", href: "#swap-rates" },
          { label: "Profittliste", href: "#profit-board" },
          { label: "FAQ", href: "#faq" },
          { label: "Hjelp", href: "/no/help/" }
        ],
        secondary: [
          { label: "Hjem", href: "/no/" },
          { label: "Hjelp", href: "/no/help/" },
          { label: "Om oss", href: "/no/about/" },
          { label: "Personvern", href: "/no/privacy/" },
          { label: "Vilkår", href: "/no/terms/" }
        ]
      },
      footer: {
        home: {
          brand: {
            title: "OSRS DMM Tracker",
            lines: [
              { shade: "70", content: "© 2025 tangjei414. Sanntids Deadman Mode gullpriser og profittsporing." },
              { shade: "60", content: "Kontakt: <a href=\"mailto:tangjei414@gmail.com\" class=\"text-accent\">tangjei414@gmail.com</a>" },
              { shade: "60", content: "Telegram: <a href=\"https://t.me/tangjei\" class=\"text-accent\">@tangjei</a>" }
            ]
          },
          columns: [
            {
              title: "Utforsk",
              links: [
                { label: "Vekslingskurser", href: "#swap-rates" },
                { label: "Profittliste", href: "#profit-board" },
                { label: "Blogg", href: "/no/blog/" }
              ]
            },
            {
              title: "Støtte",
              links: [
                { label: "Hjelpsenter", href: "/no/help/" },
                { label: "Personvernregler", href: "/no/privacy/" },
                { label: "Brukervilkår", href: "/no/terms/" }
              ]
            },
            {
              title: "Språk",
              links: [
                { label: "English", href: "/en/" },
                { label: "Suomi", href: "/fi/" },
                { label: "Svenska", href: "/sv/" },
                { label: "Norsk", href: "/no/" }
              ]
            }
          ],
          bottomNote: "Spor OSRS Deadman Mode gullpriser i sanntid."
        },
        secondary: {
          brand: {
            title: "OSRS DMM Tracker",
            lines: [
              { shade: "70", content: "© 2025 tangjei414. Sanntids Deadman Mode gullpriser og profittsporing." },
              { shade: "60", content: "Kontakt: <a href=\"mailto:tangjei414@gmail.com\" class=\"text-accent\">tangjei414@gmail.com</a>" },
              { shade: "60", content: "Telegram: <a href=\"https://t.me/tangjei\" class=\"text-accent\">@tangjei</a>" }
            ]
          },
          navigation: {
            title: "Navigasjon",
            links: [
              { label: "Hjem", href: "/no/" },
              { label: "Hjelp", href: "/no/help/" },
              { label: "Om oss", href: "/no/about/" }
            ]
          },
          legal: {
            title: "Juridisk",
            links: [
              { label: "Personvern", href: "/no/privacy/" },
              { label: "Vilkår", href: "/no/terms/" }
            ]
          },
          languages: {
            title: "Språk",
            items: [
              { label: "English", href: "/en/" },
              { label: "Suomi", href: "/fi/" },
              { label: "Svenska", href: "/sv/" },
              { label: "Norsk", href: "/no/" }
            ]
          },
          bottomNote: "Spor OSRS Deadman Mode gullpriser i sanntid."
        }
      },
      alertMessages: {
        default: "Vi oppdaget {{targetLocaleLabel}}. Bytt til <a class=\"text-accent underline\" href=\"{{targetHref}}\">{{targetLocaleLabel}} nettstedet</a>?"
      }
    }
  }
};
