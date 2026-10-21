import { readFileSync, existsSync } from 'node:fs';
for (const file of ['index.html','styles.css','script.js','vercel.json']) {
  if (!existsSync(file)) throw new Error(`Ficheiro em falta: ${file}`);
}
const html = readFileSync('index.html','utf8');
for (const anchor of ['inicio','evento','edicao','expositores','patrocinadores','conferencias','delegados','ingressos','negocios','contactos']) {
  if (!html.includes(`id="${anchor}"`)) throw new Error(`Secção em falta: ${anchor}`);
}
JSON.parse(readFileSync('vercel.json','utf8'));
console.log('Verificação concluída: ficheiros e secções essenciais presentes.');
