
import { useCallback } from 'react';

interface ExportOptions {
  format: 'pdf' | 'epub' | 'docx';
  title: string;
  author: string;
  content: string;
}

export const useBookExport = () => {
  const exportBook = useCallback(async ({ format, title, author, content }: ExportOptions) => {
    // Create a downloadable file based on format
    let blob: Blob;
    let filename: string;

    switch (format) {
      case 'pdf':
        // For a real implementation, you'd use jsPDF or similar
        const pdfContent = `
          <html dir="rtl">
            <head>
              <title>${title}</title>
              <style>
                body { font-family: 'Noto Sans Arabic', Arial, sans-serif; }
                .header { text-align: center; margin-bottom: 40px; }
                .content { line-height: 1.8; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>${title}</h1>
                <h3>بقلم: ${author}</h3>
              </div>
              <div class="content">
                ${content.replace(/\n/g, '<br>')}
              </div>
            </body>
          </html>
        `;
        blob = new Blob([pdfContent], { type: 'text/html' });
        filename = `${title}.html`;
        break;
        
      case 'epub':
        // EPUB is more complex, this is a simplified version
        const epubContent = `<?xml version="1.0" encoding="UTF-8"?>
          <html xmlns="http://www.w3.org/1999/xhtml" dir="rtl">
            <head><title>${title}</title></head>
            <body>
              <h1>${title}</h1>
              <h2>${author}</h2>
              <div>${content.replace(/\n/g, '<br>')}</div>
            </body>
          </html>`;
        blob = new Blob([epubContent], { type: 'application/epub+zip' });
        filename = `${title}.epub`;
        break;
        
      case 'docx':
        // For DOCX, you'd typically use docx library
        const docContent = `${title}\n\nبقلم: ${author}\n\n${content}`;
        blob = new Blob([docContent], { type: 'application/msword' });
        filename = `${title}.doc`;
        break;
        
      default:
        throw new Error('Unsupported format');
    }

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return { exportBook };
};
