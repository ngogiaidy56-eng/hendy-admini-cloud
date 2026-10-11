import JSZip from 'jszip';

// =====================================================================
// BỘ MÁY SINH MÃ THÔNG MINH (Chạy trên Edge Cloudflare)
// =====================================================================
function generateSmartContent(fullPath, fileName) {
    const lowerName = fileName.toLowerCase();
    const parts = fullPath.split('/');
    const folderName = parts.length > 1 ? parts[parts.length - 2] : 'project';

    if (lowerName === 'package.json') {
        return JSON.stringify({
            name: folderName, version: "1.0.0", main: "index.js",
            scripts: { "start": "node index.js" }, dependencies: {}
        }, null, 2);
    }
    if (lowerName === 'dockerfile') {
        return `FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]`;
    }
    if (lowerName === 'docker-compose.yml') {
        return `version: '3.8'\nservices:\n  ${folderName}-app:\n    build: .\n    ports:\n      - "3000:3000"`;
    }
    if (lowerName.endsWith('.tsx') || lowerName.endsWith('.jsx')) {
        const compName = fileName.split('.')[0];
        const capitalized = compName.charAt(0).toUpperCase() + compName.slice(1);
        return `import React from 'react';\n\nexport default function ${capitalized}() {\n  return (\n    <div>\n      <h1>Component:${capitalized}</h1>\n    </div>\n  );\n}`;
    }
    if (['.js', '.ts', '.py', '.kt', '.go', '.java'].some(ext => lowerName.endsWith(ext))) {
        const commentSyntax = lowerName.endsWith('.py') ? '#' : '//';
        return `${commentSyntax} ==========================================\n${commentSyntax} File: ${fileName}\n${commentSyntax} Tự động sinh bởi Hendy Cloudflare Edge\n${commentSyntax} ==========================================\n\n`;
    }
    return ``; 
}
// =====================================================================

// Hàm xử lý POST Request trong Cloudflare Pages
export async function onRequestPost(context) {
    try {
        const { request } = context;
        const { diagram } = await request.json();

        const zip = new JSZip();
        const lines = diagram.split('\n');
        let pathStack = [{ depth: -1, path: '' }]; 

        lines.forEach(line => {
            if (!line.trim()) return;
            const prefixMatch = line.match(/^[\s│├└─]*/);
            const depth = Math.floor((prefixMatch ? prefixMatch[0].length : 0) / 4); 
            const rawName = line.replace(/^[\s│├└─]*/, '').trim();
            if (!rawName) return;

            while (pathStack.length > 0 && pathStack[pathStack.length - 1].depth >= depth) {
                pathStack.pop();
            }

            const parentPath = pathStack[pathStack.length - 1].path;
            const name = rawName.split(' #')[0].trim(); 

            // Phân biệt Thư mục và File
            if (name.endsWith('/') || (!name.includes('.') && !name.includes('#'))) {
                let cleanName = name.replace(/\/$/, '');
                let dirPath = parentPath ? `${parentPath}/${cleanName}` : cleanName;
                
                zip.folder(dirPath); // Tạo Folder trong ZIP
                pathStack.push({ depth, path: dirPath });
            } else {
                let filePath = parentPath ? `${parentPath}/${name}` : name;
                
                // Viết code tự động
                const autoCode = generateSmartContent(filePath, name);
                zip.file(filePath, autoCode); // Đưa file vào ZIP
            }
        });

        // Đóng gói thành nhị phân (Uint8Array tương thích tốt nhất với Cloudflare Workers)
        const zipContent = await zip.generateAsync({ type: "uint8array" });

        // Trả về file ZIP cho người dùng tải xuống
        return new Response(zipContent, {
            headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": "attachment; filename=\"Hendy-Architecture.zip\"",
                "Access-Control-Allow-Origin": "*"
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
