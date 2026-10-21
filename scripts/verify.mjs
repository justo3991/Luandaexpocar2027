import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const root='dist';
const expected=['index','evento','expositores','parceiros','programa','visitar','contactos','noticias','historia','bilhetes','horarios','chegar','alojamento','vistos','directorio','stands','amplifica','documentos','servicos','deal-room','market-access','delegacoes','imprensa','galeria'];
const required=['site.css','site-data.js','site-core.js','sitemap.xml','robots.txt'];
const failures=[];
for(const file of required)if(!existsSync(join(root,file)))failures.push('Ficheiro em falta: '+file);
for(const slug of expected){
  const path=join(root,slug+'.html');
  if(!existsSync(path)){failures.push('Página em falta: '+slug);continue}
  const html=readFileSync(path,'utf8');
  for(const token of ['<main','<footer','id="primary-nav"','id="main"','/site.css','/site-core.js','/site-data.js']){
    if(!html.includes(token))failures.push(slug+': elemento obrigatório em falta: '+token)
  }
  if(!html.includes('data-page="'+slug+'"'))failures.push(slug+': identificador de página incorrecto');
  const links=[...html.matchAll(/href="([^"]+\.html(?:\?[^"]*)?)"/g)];
  for(const [,url] of links){
    if(/^(https?:)?\/\//i.test(url))continue;
    const dest=url.split('?')[0].replace(/^\//,'');
    if(!existsSync(join(root,dest)))failures.push(slug+': ligação sem destino '+dest);
  }
}
const htmlFiles=readdirSync(root).filter(f=>f.endsWith('.html'));
if(htmlFiles.length!==expected.length)failures.push('Esperadas 24 páginas, encontradas '+htmlFiles.length);
if(failures.length){console.error(failures.join('\n'));process.exitCode=1}
else console.log('Validado: 24 páginas HTML, estrutura essencial, recursos e ligações internas.');
