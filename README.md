# LUANDA EXPO CAR 2027 — Website institucional

Website responsivo HTML/CSS/JavaScript, preparado para alojamento na **Vercel** através do GitHub.

**Evento:** 23–27 de Junho de 2027, Luanda, Angola.  
**Tema:** ACELERAR O DESENVOLVIMENTO, CONECTAR ÁFRICA.  
**Organização:** WE ACTIVATE BRANDS.

## Conteúdo implementado
- Homepage institucional, edição 2027 e indicadores históricos com aviso de validação.
- Expositores, patrocinadores e formulário de contacto.
- Conferências, fóruns e pré-registo demonstrativo de delegados nacionais/internacionais.
- Categorias de ingressos com filtros (sem compra activa).
- LEC Deal Room, Market Access Angola, Business Network e media.
- Layout responsivo e navegação mobile.

## Executar localmente
Abra `index.html` num navegador ou execute:

```bash
python3 -m http.server 8000
```

Depois visite `http://localhost:8000`.

## Publicar na Vercel sem terminal
1. Crie um repositório GitHub chamado `luanda-expo-car-2027`.
2. Faça upload **do conteúdo desta pasta** para a raiz do repositório (não apenas do ZIP).
3. Em https://vercel.com/new, ligue a sua conta GitHub e importe o repositório.
4. Em **Framework Preset**, escolha **Other**.
5. Em **Root Directory**, mantenha `./`.
6. Em **Build Command**, escolha `Override` e deixe em branco, se a interface propuser `npm run build` por causa do `package.json`. Em alternativa, o comando `npm run build` é apenas uma verificação e não gera uma pasta `dist`.
7. Deixe **Output Directory** em branco (raiz do projecto) para o site estático.
8. Clique em **Deploy** e teste o URL `*.vercel.app`.

Se o repositório não aparecer: https://github.com/settings/installations → Vercel → Configure → Repository access.

## Estado de produção / limitações
**Protótipo navegável, não plataforma operacional.** Os formulários são demonstrativos e não enviam, guardam ou processam dados. A bilhética não aceita pagamentos. Não existem contas autenticadas, QR codes reais, CRM, dashboard administrativo, reuniões B2B activas ou CMS. A versão inicial está em português; a internacionalização EN ainda não está implementada.

Antes de lançar publicamente: validar métricas históricas, programa, fotografias oficiais, localização exacta, textos legais e política de privacidade; integrar backend seguro, base de dados e fornecedor de pagamentos aprovado; testar segurança e acessibilidade.

## Estrutura
```
index.html       Página principal
styles.css       Estilos
script.js        Interacções do protótipo
vercel.json      Configuração Vercel e cabeçalhos de segurança
package.json     Scripts opcionais
scripts/verify.mjs Verificação de integridade
robots.txt       Regras para motores de busca
```
