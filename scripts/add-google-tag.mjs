import fs from 'fs/promises';
import path from 'path';

const googleTag = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SN7RB53V27"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SN7RB53V27');
</script>`;

async function addGoogleTagToFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    // 检查是否已存在 gtag
    if (content.includes('gtag(')) {
      console.log(`Google tag already exists in ${filePath}`);
      return;
    }
    
    // 找到 <head> 后第一个 \n 的位置，并在那里插入
    const headMatch = content.match(/<head>\s*\n?/);
    if (!headMatch) {
      console.log(`No <head> found in ${filePath}`);
      return;
    }
    
    const insertIndex = headMatch.index + headMatch[0].length;
    const newContent = content.slice(0, insertIndex) + '\n    ' + googleTag.replace(/\n/g, '\n    ') + '\n  ' + content.slice(insertIndex);
    
    await fs.writeFile(filePath, newContent);
    console.log(`Added Google tag to ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function processAllNjkFiles() {
  const pagesDir = path.join('src', 'pages');
  const files = await fs.readdir(pagesDir, { withFileTypes: true });
  
  for (const dir of files) {
    if (dir.isDirectory()) {
      const localeDir = path.join(pagesDir, dir.name);
      const localeFiles = await fs.readdir(localeDir, { withFileTypes: true });
      
      for (const pageDir of localeFiles) {
        if (pageDir.isDirectory()) {
          const pageDirPath = path.join(localeDir, pageDir.name);
          const pageFiles = await fs.readdir(pageDirPath);
          
          for (const file of pageFiles) {
            if (file.endsWith('.njk')) {
              const fullPath = path.join(pageDirPath, file);
              await addGoogleTagToFile(fullPath);
            }
          }
        } else if (pageDir.name.endsWith('.njk')) {
          // 处理直接在 locale 下的 .njk，如 index.njk
          const fullPath = path.join(localeDir, pageDir.name);
          await addGoogleTagToFile(fullPath);
        }
      }
    }
  }
  
  console.log('Google tag addition completed.');
}

processAllNjkFiles();