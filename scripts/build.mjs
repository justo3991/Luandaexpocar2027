import {readFileSync,writeFileSync,mkdirSync,copyFileSync,rmSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {join} from 'node:path';
const dataSrc=readFileSync('site-data.js','utf8');
const coreSrc=readFileSync('site-core.js','utf8');
const dataContext={window:{}};
runInNewContext(dataSrc,dataContext,{timeout:3000});
const pages=Object.keys(dataContext.window.LEC_DATA);
if(pages.length!==25)throw new Error('Expected 25 pages, found '+pages.length);
rmSync('dist',{recursive:true,force:true});
mkdirSync('dist',{recursive:true});
for(const file of ['site.css','lec-home.css','site-data.js','site-core.js'])copyFileSync(file,join('dist',file));
function render(slug,lang){
 const body={dataset:{page:slug},innerHTML:''};
 const noop=()=>{};
 const fake={addEventListener:noop,setAttribute:noop,querySelector(){return fake},querySelectorAll(){return []},classList:{add:noop,remove:noop,toggle(){return false},contains(){return false}}};
 const document={body,documentElement:{lang:'pt'},title:'',querySelector(){return fake},querySelectorAll(){return []},getElementById(){return fake},addEventListener:noop};
 const context={window:{LEC_DATA:dataContext.window.LEC_DATA},document,location:{pathname:'/'+slug+'.html',search:lang==='en'?'?lang=en':''},URLSearchParams,FormData:class{},matchMedia(){return {matches:false}},console};
 runInNewContext(coreSrc,context,{timeout:4000});
 if(!body.innerHTML.includes('<main')||!body.innerHTML.includes('<footer'))throw new Error('Incomplete page: '+slug);
 const entry=dataContext.window.LEC_DATA[slug];
 const desc=(entry.intro?.[lang==='en'?1:0]||'Luanda Expo Car 2027').replaceAll('"','&quot;');
 const title=document.title.replaceAll('<','&lt;');
 const canonical='https://luandaexpocar2027.vercel.app/'+(slug==='index'?'':slug);
 const langHref=slug+'.html?lang=en';
 return '<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#69227e"><meta name="description" content="'+desc+'"><title>'+title+'</title><link rel="canonical" href="'+canonical+'"><link rel="alternate" hreflang="pt" href="'+canonical+'"><link rel="alternate" hreflang="en" href="https://luandaexpocar2027.vercel.app/'+langHref+'"><link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/lec-home.css"><script defer src="/site-data.js"></script><script defer src="/site-core.js"></script></head><body data-page="'+slug+'">'+body.innerHTML+'</body></html>';
}
for(const slug of pages){
 const html=render(slug,'pt');
 writeFileSync(join('dist',slug+'.html'),html);
 if(slug==='index')writeFileSync(join('dist','index.html'),html);
}
const base='https://luandaexpocar2027.vercel.app';
writeFileSync(join('dist','robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+base+'/sitemap.xml\n');
writeFileSync(join('dist','sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(x=>'<url><loc>'+base+(x==='index'?'/':'/'+x)+'</loc></url>').join('')+'</urlset>');
console.log('Build complete:',pages.length,'HTML pages, bilingual client views, sitemap, responsive design assets.');
