# dompub

Obras em domínio público selecionadas. Textos em português, editados e revisados para uma melhor experiência de leitura.

## Instalação

Site estático com [Astro](https://astro.build).

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev     # localhost:4321
npm run build   # gera dist/
npm run preview # testa build localmente
```

## Estrutura de conteúdo

**Autores:** `src/data/authors/{slug}.md`
```markdown
---
name: MachadoDeAssis
---
```

**Obras:** `src/data/works/{authorSlug}/{work}.md`
```markdown
---
title: O espelho
---
```

Slugs diferenciam maiúsculas. Nomes de autores podem ter acentos; slugs não.

Se a obra for um poema, adicionar `type: verse`:

```markdown
---
title: Transforma-se o amador na coisa amada
type: verse
---
```

## GitHub Pages

Push para `main` → GitHub Actions faz build automático

Configuração em `astro.config.mjs`.

## Licença

MIT. Ver [LICENSE](LICENSE).
