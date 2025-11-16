# Source Comment Reference

This document preserves the descriptive comments that were removed from the source code. Each entry keeps the original wording and notes where it appeared so future contributors can recover the original intent if needed.

## src/components/Header.tsx
- "Margem para o conteúdo da próxima sessão" — explained the scroll threshold buffer applied when detecting header state changes.

## src/contexts/AppContext.tsx
- "Traduções" — labelled the large translations object.
- "Carregar tema do localStorage ou usar preferência do sistema" — described how the initial theme is selected.
- "Carregar idioma do localStorage ou detectar idioma do navegador" — described how the initial language is selected.
- "Detecta idioma do navegador" — highlighted the browser language detection branch.
- "padrão" (inline after `setLanguage('pt')`) — noted Portuguese as the default fallback locale.
- "Aplicar tema ao documento" — described adding the theme class to the `<html>` element.
- "Also apply to body for extra compatibility" — noted that theme classes are mirrored on `<body>`.
- "Prevent hydration mismatch by showing loading state until mounted" — explained why the provider exposes default values before hydration completes.

## src/components/Hero.tsx
- "Encontra a próxima seção após o Hero" — described the smooth-scroll target logic.
- "Botão para avançar para a próxima seção" — labelled the scroll-down control rendered at the bottom of the hero.

## src/components/BlogPosts.tsx
- "Imagens fixas do Unsplash para garantir funcionamento" — indicated that demo posts rely on static placeholder imagery.

## src/app/blog/[slug]/page.tsx
- "...existing code..." — placeholder comment left from earlier iterations.
- "Breadcrumbs" — labelled the breadcrumb navigation block.

## src/lib/github.ts
- "First, fetch user's pinned repositories using the GraphQL API" — described the GitHub GraphQL query purpose.
- "Transform the data to match our interface" — noted the shape conversion applied to the API response.

## src/contexts/ThemeContext.tsx
- "Check if there's a saved theme in localStorage" — described the persisted theme lookup.
- "Check system preference" — described the OS-level color scheme fallback.
- "Apply theme to document" — highlighted adding/removing the dark class on `<html>`.
- "Save theme to localStorage" — noted persisting the active theme choice.

## src/app/admin/page.tsx
- "Exemplo: só permite acesso se usuário for do grupo 1 (admin)" — explained the hard-coded admin access example.
- "Permissões podem ser consultadas via getUserPermissions(session.user.id)" — referenced where to fetch permissions.
- "Dashboard de exemplo - gráficos" — marked the illustrative chart widgets below the hero area.

## src/app/api/admin/permissions/route.ts
- "Helper function to parse query parameters" — described the query parsing utility.
- "Verifica se já existe uma permissão com esse nome" — noted the uniqueness safeguard during creation.
- "Verifica se já existe outra permissão com esse nome" — noted the uniqueness safeguard during updates.
- "Remove a permissão e suas associações" — indicated the cleanup performed during deletion.

## src/app/admin/content/page.tsx
- "CRUD State & Logic" — labelled the block handling CRUD state management for admin content.

## src/app/api/auth/forgot/route.ts
- "Aqui você pode enviar o token por email ao usuário" — reminder to plug in email delivery for reset tokens.

## src/components/Experience.tsx
- "Atualiza visibilidade das setas ao scrollar" — described the helper that toggles horizontal navigation controls.

## src/app/api/admin/groups/route.ts
- "Helper function to parse query parameters" — described the query parsing utility used by the groups endpoint.
- "Verifica se já existe um grupo com esse nome" — noted the uniqueness safeguard during creation.
- "Verifica se já existe outro grupo com esse nome" — noted the uniqueness safeguard during updates.
- "Atualiza o grupo" — marked the section that persists group updates and relations.
- "Remove todas as associações primeiro" — highlighted the cleanup performed before deleting a group.

## src/components/ThemeToggle.tsx
- "Sun Icon" — labelled the SVG for the light mode icon.
- "Moon Icon" — labelled the SVG for the dark mode icon.

## src/components/Footer.tsx
- "Contact Info Section" — annotated the contact information column.
- "Social Links Section" — annotated the social links column.
- "Bottom Section" — annotated the lower copyright area.

## src/app/page.tsx
- "Últimas postagens do blog" — noted the recent blog posts section rendered on the homepage.

## src/components/DarkModeTest.tsx
- "Estado atual" — labelled the debug block displaying current theme/runtime classes.
- "Teste simples" — labelled the color toggle example driven by Tailwind classes.
- "Teste com estilo condicional" — labelled the color toggle example driven by inline styles.

## src/components/PernambucoMap.tsx
- "Estado de Pernambuco (forma simplificada)" — annotated the simplified SVG outline.
- "Estado de Pernambuco detalhado (SVG real, simplificado)" — annotated the more detailed SVG path overlay.
- "Cidades" — annotated the circle markers for each city.
- "Labels" — annotated the text labels associated with each city.

## src/app/globals.css
- "Modern Typography Scale" — labelled the heading typography baseline.
- "Body Text" — labelled the base typography rules for paragraphs and lists.
- "Large Text" — labelled the helper class for larger body copy.
- "Small Text" — labelled the helper class for smaller body copy.
- "Code and Monospace" — labelled the monospace typography rules.
- "Logo Font" — labelled the brand typography helper.
- "Heading Font Classes" — labelled the utility classes that force the heading family.
- "Weight Utilities" — labelled the utility helpers for font weights.
- "Letter Spacing" — labelled the tracking utilities.
- "Custom Text Sizes" — labelled the bespoke display text utilities.
- "Disable native tooltips for custom tooltip elements" — described why the tooltip override exists.
- "Scroll suave" — labelled the smooth scrolling behaviour on `<html>`.
- "Remover scroll horizontal global" — noted the overflow-x suppression on root elements.
- "Estilizar scrollbar vertical" — labelled the custom scrollbar styling block.
- "Scroll horizontal customizado para Experience" — labelled the scrollbar styling specific to the horizontal experience carousel.
- "Dark mode scrollbar" — labelled the dark theme variants for scrollbar styling.
- "Scrollbar horizontal para timeline" — labelled the alternative hidden-scrollbar setup for the timeline.
- `"Firefox"` (inline at `scrollbar-width: none`) — noted the Firefox-specific scrollbar override.
- `"Internet Explorer 10+"` (inline at `-ms-overflow-style: none`) — noted the IE-specific scrollbar override.
- `"WebKit"` (inline at `display: none`) — noted the WebKit-specific scrollbar override.
- "Melhor cursor para drag" — labelled the cursor tweaks for draggable containers.
- "Smooth scroll para toda a aplicação" — labelled the global smooth scrolling utility.
- "Prevenir seleção de texto durante drag" — labelled the utility class that disables text selection.
- "Hover effects melhorados" — labelled the enhanced hover transition rules.
- "Timeline dot animation" — labelled the animation applied to timeline dots.
- "Fullscreen Menu Item Hover Effect" — labelled the hover underline animation for the fullscreen menu.
