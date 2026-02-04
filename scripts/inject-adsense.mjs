import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, '../src/pages');

const ADSENSE_SCRIPT = `    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3083296102953963"
         crossorigin="anonymous"></script>`;

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.njk')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Check if AdSense is already there
            if (content.includes('ca-pub-3083296102953963')) {
                console.log(`Skipping ${fullPath} (already has AdSense)`);
                continue;
            }

            // Find Clarity script closing tag and insert after it
            // We search for the specific Clarity ID to be safe
            if (content.includes('vc09e4q8go')) {
                const clarityEndTag = '})(window, document, "clarity", "script", "vc09e4q8go");\n    </script>';
                if (content.includes(clarityEndTag)) {
                    const replacement = `${clarityEndTag}\n${ADSENSE_SCRIPT}`;
                    content = content.replace(clarityEndTag, replacement);
                    fs.writeFileSync(fullPath, content);
                    console.log(`Updated ${fullPath}`);
                } else {
                    // Fallback to simpler replacement if spacing is different
                    const simplerEnd = 'vc09e4q8go");\n    </script>';
                    if (content.includes(simplerEnd)) {
                        const replacement = `${simplerEnd}\n${ADSENSE_SCRIPT}`;
                        content = content.replace(simplerEnd, replacement);
                        fs.writeFileSync(fullPath, content);
                        console.log(`Updated ${fullPath} (simpler match)`);
                    } else {
                        console.error(`Could not find insertion point in ${fullPath}`);
                    }
                }
            } else {
                console.warn(`No Clarity script found in ${fullPath}, searching for </head>`);
                if (content.includes('</head>')) {
                    content = content.replace('</head>', `${ADSENSE_SCRIPT}\n  </head>`);
                    fs.writeFileSync(fullPath, content);
                    console.log(`Updated ${fullPath} (before </head>)`);
                }
            }
        }
    }
}

processDirectory(PAGES_DIR);
console.log('Done!');
