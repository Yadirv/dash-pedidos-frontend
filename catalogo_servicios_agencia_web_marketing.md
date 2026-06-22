# Catálogo de Servicios — Agencia Web & Marketing Dirigido

> **Versión:** 1.0  
> **Contexto origen:** Pilar Agencia Web y Marketing Dirigido — Sesión 26 marzo 2026  
> **Formato:** Markdown LLM-readable · GitHub-Flavored Markdown (GFM)  
> **Propósito:** Documento de referencia para cotización, calificación de clientes y prompts de agentes IA

---

## Metadatos del Catálogo

```yaml
catalogo_version: "1.0"
agencia: "Agencia Web & Marketing Dirigido"
fecha_definicion: "2026-03-26"
pilares:
  - "Diseño y Construcción Web"
  - "Inteligencia de Negocio y ADN de Marca"
  - "Presencia y Automatización RRSS"
  - "Marketing Zonificado"
audiencia_objetivo:
  - "Negocios con solo RRSS (sin web propia)"
  - "Negocios con web desactualizada o sin SEO"
  - "Negocios con presencia en RRSS pero sin estrategia de contenido"
  - "Negocios que quieren activar ventas locales con bajo presupuesto publicitario"
stack_tecnologico:
  inteligencia: "Google Pro (Gemini API)"
  diseno: "Figma"
  construccion_estatica: "Pinegrow + VS Code"
  construccion_dinamica: "Next.js / Astro + Vercel / Netlify"
  automatizacion_rrss: "Meta Business Suite + Make / Zapier"
  publicidad: "Meta Ads Manager + Google Ads Local"
```

---

## SERVICIO 1 — Inteligencia de Negocio y ADN de Marca

### Descripción

Proceso de investigación basada en datos antes de diseñar cualquier activo visual o digital. No se diseña "lo que se ve bonito" — se diseña "lo que el mercado está pidiendo". Utiliza Google Pro (Gemini con acceso web en tiempo real) y análisis de reseñas negativas de la competencia para identificar huecos de posicionamiento reales.

### Sub-servicios

| ID | Sub-servicio | Descripción | Entregable |
|----|-------------|-------------|------------|
| S1-A | Minería de Oportunidades | Análisis de reseñas 1–2 estrellas de competidores en Google, Facebook y marketplaces. Identifica los 3 patrones de queja principales. | Reporte de Hueco de Mercado (PDF/MD) |
| S1-B | Brand Persona | Construcción del perfil de marca basado en el hueco detectado: tono de voz, valores, atributos visuales, posicionamiento diferenciador. | Manifiesto de Posicionamiento (MD) |
| S1-C | Análisis Competitivo Web | Auditoría de los 5 competidores locales: presencia web, velocidad, SEO on-page, redes activas, ausencias digitales. | Tabla comparativa + score digital |
| S1-D | UI/UX Script IA | Generación de wireframes conceptuales, paletas de color y tipografías mediante prompts a agentes IA (Google Pro + Figma plugins). | UI Kit inicial (Figma frame) |

### Stack utilizado

- **Google Pro (Gemini):** búsqueda web de competidores, análisis de reseñas, generación de Brand Persona
- **Scripts IA:** agentes de análisis de texto sobre reseñas exportadas
- **Figma:** exploración de estilos y componentes base

### Señal de calificación del cliente

> Cliente ideal: tiene producto o servicio definido pero no sabe cómo posicionarse frente a la competencia, o siente que "todos hacen lo mismo".

---

## SERVICIO 2 — Landing Page Estática

### Descripción

Diseño y construcción de páginas de aterrizaje de alta conversión para campañas específicas, lanzamientos o portafolios. Enfoque en velocidad de carga, claridad de propuesta de valor y CTA medible. Sin backend — ideal para validar una oferta antes de invertir en infraestructura compleja.

### Sub-servicios

| ID | Sub-servicio | Descripción | Entregable |
|----|-------------|-------------|------------|
| S2-A | Diseño UI (Figma) | Diseño de 1 página en Figma con UI Kit basado en ADN de Marca. Incluye versión desktop y mobile. | Archivo Figma compartido |
| S2-B | Construcción (Pinegrow) | Exportación de diseño Figma a HTML/CSS semántico en Pinegrow. Animaciones CSS, formulario de contacto, Google Analytics 4 integrado. | Repositorio Git + preview URL |
| S2-C | Deployment Netlify | Publicación en Netlify con dominio personalizado, HTTPS automático y formularios nativos Netlify Forms (sin backend). | URL productiva + panel Netlify |
| S2-D | SEO On-Page | Meta tags, Open Graph, schema markup básico (LocalBusiness), velocidad optimizada (Lighthouse ≥ 90). | Reporte Lighthouse |

### Stack utilizado

- **Figma:** diseño de alta fidelidad desktop + mobile
- **Pinegrow + VS Code:** construcción HTML/CSS/JS
- **Netlify:** deployment, formularios, dominio
- **Google Analytics 4:** tracking de conversiones

### Señal de calificación del cliente

> Cliente ideal: necesita presencia digital inmediata, tiene presupuesto limitado, y quiere una página orientada a una acción específica (llamar, escribir por WhatsApp, visitar tienda).

---

## SERVICIO 3 — Sitio Web con Backend y APIs

### Descripción

Construcción de sitios web con lógica dinámica: e-commerce, catálogos con filtros, dashboards de datos, formularios con integración CRM, o cualquier funcionalidad que requiera procesamiento del lado del servidor. Deployment en Vercel con soporte serverless functions.

### Sub-servicios

| ID | Sub-servicio | Descripción | Entregable |
|----|-------------|-------------|------------|
| S3-A | Diseño UI (Figma) | UI Kit completo con sistema de componentes reutilizables: navbar, cards, formularios, footer, estados de carga y error. | Figma con Auto Layout + Variables |
| S3-B | Construcción Next.js / Astro | Desarrollo de frontend con Next.js (SSR/SSG) o Astro según complejidad. Componentes React o HTML puro. | Repositorio Git privado |
| S3-C | Integración APIs | Conexión con APIs externas: WhatsApp Business API, Google Maps, pasarelas de pago (Wompi/PayU para Colombia), Mailchimp, Notion como CMS. | Documentación de endpoints |
| S3-D | Deployment Vercel | CI/CD automático desde Git. Preview por rama. Variables de entorno seguras. Dominio personalizado con SSL. | URL productiva + panel Vercel |
| S3-E | E-commerce básico | Catálogo de productos con carrito, integración pasarela de pago colombiana y panel de pedidos simplificado. | Tienda funcional en producción |

### Stack utilizado

- **Figma:** sistema de diseño completo
- **Next.js / Astro + VS Code:** frontend con lógica dinámica
- **Vercel:** deployment serverless + preview environments
- **APIs externas:** WhatsApp Business, Wompi/PayU, Google Maps, Mailchimp

### Señal de calificación del cliente

> Cliente ideal: tiene volumen de productos o servicios que requieren filtrado, o necesita automatizar cotizaciones/pedidos, o su landing page ya convierte y quiere escalar.

---

## SERVICIO 4 — Administración de Redes Sociales

### Descripción

Gestión integral de cuentas de Facebook e Instagram orientada a resultados: no solo publicar contenido, sino construir una audiencia local activa, mantener consistencia de marca y activar conversaciones que conviertan en ventas. Incluye automatización de publicaciones y respuestas frecuentes.

### Sub-servicios

| ID | Sub-servicio | Descripción | Entregable |
|----|-------------|-------------|------------|
| S4-A | Calendario de Contenido | Planificación mensual de publicaciones: 12–16 posts/mes (feed + stories). Formatos: imagen, carrusel, reel corto (15–30s). | Calendario en Notion/Google Sheets |
| S4-B | Diseño de Piezas | Creación de artes en Canva Pro o Figma basadas en UI Kit de marca. Incluye plantillas reutilizables entregadas al cliente. | Pack de plantillas + artes del mes |
| S4-C | Programación Automática | Publicación automatizada vía Meta Business Suite + Make/Zapier. Respuestas automáticas a comentarios frecuentes (horarios, precios, ubicación). | Flujos de automatización activos |
| S4-D | Reporte Mensual | Métricas clave: alcance, interacciones, seguidores nuevos, clics al enlace, mensajes recibidos. Recomendaciones de ajuste. | Informe PDF/MD mensual |

### Stack utilizado

- **Meta Business Suite:** programación nativa Facebook + Instagram
- **Make (ex-Integromat) / Zapier:** automatizaciones entre plataformas
- **Canva Pro / Figma:** producción de piezas visuales
- **Google Sheets / Notion:** calendario y trazabilidad

### Señal de calificación del cliente

> Cliente ideal: tiene RRSS activas pero publica sin frecuencia ni estrategia, o no tiene tiempo para gestionar comentarios y mensajes, o quiere que su perfil refleje profesionalismo acorde a su local físico.

---

## SERVICIO 5 — Marketing Zonificado

### Descripción

Campañas publicitarias de precisión geográfica en Meta Ads (Facebook/Instagram) y Google Ads Local. La inversión se concentra en un radio de 3–5 km alrededor del negocio, dirigida exclusivamente a la audiencia que puede comprar: segmentación por zona, intereses pet-related, comportamientos de compra y lookalike de clientes actuales. Objetivo: máximo impacto con mínima inversión.

### Sub-servicios

| ID | Sub-servicio | Descripción | Entregable |
|----|-------------|-------------|------------|
| S5-A | Setup de Campaña Meta Ads | Configuración de Pixel Meta, públicos personalizados por radio geográfico, estructuración de campaña (tráfico / conversión / mensajes). | Campaña activa + Pixel instalado |
| S5-B | Setup Google Ads Local | Campaña Performance Max local o Search local. Ficha Google Business Profile optimizada (fotos, horarios, servicios, reseñas). | Campaña activa + GBP auditada |
| S5-C | Creación de Piezas para Ads | Diseño de 3–5 creatividades por campaña (imagen estática + variante video corto 15s). Copywriting orientado a CTA local: "Visítanos en [barrio]", "Llámanos hoy". | Pack de creatividades + copy |
| S5-D | Gestión y Optimización | Seguimiento semanal: A/B test de creatividades, ajuste de audiencias, control de CPM/CPC/CPA. Informe quincenal de resultados. | Reportes quincenales + ajustes |
| S5-E | Retargeting Local | Campaña de remarketing para personas que visitaron el sitio web o interactuaron con el perfil de RRSS en los últimos 30 días. | Flujo de retargeting activo |

### Stack utilizado

- **Meta Ads Manager:** campañas Facebook + Instagram
- **Google Ads:** Performance Max Local + Search
- **Google Business Profile:** SEO local y reseñas
- **Meta Pixel + Google Tag Manager:** tracking de conversiones

### Señal de calificación del cliente

> Cliente ideal: tiene local físico o radio de entrega definido, quiere clientes nuevos esta semana (no en 6 meses), y tiene presupuesto mínimo de COP $300.000–$500.000/mes en pauta.

---

## Tabla Resumen de Servicios

| # | Servicio | Stack Principal | Entregable Clave | Perfil Cliente |
|---|----------|----------------|-----------------|----------------|
| S1 | Inteligencia de Negocio / ADN de Marca | Google Pro, Figma | Manifiesto de Posicionamiento | Sin diferenciación clara |
| S2 | Landing Page Estática | Figma, Pinegrow, Netlify | URL productiva + SEO básico | Necesita presencia rápida |
| S3 | Sitio Web con Backend | Figma, Next.js, Vercel, APIs | Web dinámica en producción | Requiere lógica o e-commerce |
| S4 | Administración RRSS | Meta Business Suite, Make | Calendario + automatizaciones | Sin tiempo o estrategia en RRSS |
| S5 | Marketing Zonificado | Meta Ads, Google Ads Local | Campañas activas geolocalizadas | Quiere clientes locales nuevos |

---

## Paquetes Combinados Recomendados

### Paquete Arranque (`starter`)
> Para negocios que solo tienen RRSS y quieren dar el primer salto digital.

```
S1-A Minería de Oportunidades
+ S1-B Brand Persona
+ S2-A Diseño UI Figma
+ S2-B Construcción Landing Page
+ S2-C Deployment Netlify
+ S4-A Calendario Contenido (1 mes)
+ S4-B Diseño de Piezas (1 mes)
```

---

### Paquete Presencia Digital Completa (`full-presence`)
> Para negocios que quieren web + RRSS activas + publicidad local funcionando juntos.

```
S1 completo (A, B, C, D)
+ S3 completo (A, B, C, D)
+ S4 completo (A, B, C, D)
+ S5 (A, B, C) — Setup inicial de campañas
```

---

### Paquete Solo Marketing (`ads-only`)
> Para negocios que ya tienen web pero no están apareciendo frente a sus clientes locales.

```
S5-A Setup Meta Ads
+ S5-B Setup Google Ads Local
+ S5-C Creatividades para Ads
+ S5-D Gestión mensual
```

---

## Flujo de Calificación de Clientes

Este flujo permite a un agente IA (o ejecutivo comercial) clasificar automáticamente qué servicio(s) proponer a cada cliente prospecto.

```
INPUT: datos del cliente (website_url, instagram, facebook, descripcion, rating, reviews_count)

1. ¿Tiene web propia? (website_url NO apunta a Instagram/Facebook)
   → NO  → proponer S2 o S3 + S1
   → SÍ  → evaluar si está actualizada (data_completeness_score ≥ 0.5)
              → score BAJO → proponer S3 (rediseño) + S1
              → score ALTO → proponer solo S4 y/o S5

2. ¿Tiene RRSS activas? (instagram o facebook presente en contacto)
   → SÍ, sin estrategia visible → proponer S4
   → NO                         → incluir S4 en propuesta base

3. ¿Tiene reseñas positivas (rating ≥ 4.0) y volumen (reviews ≥ 10)?
   → SÍ → cliente con tracción real → priorizar S5 (amplificar lo que ya funciona)
   → NO → iniciar con S1 + S4 para construir confianza antes de pautar

4. ¿Está en zona de alta densidad pet (Sabaneta, Itagüí, La Estrella, Caldas)?
   → SÍ → incluir S5 con radio de 3–5 km como complemento obligatorio
```

---

## Glosario para Agentes IA

| Término | Definición operativa |
|---------|---------------------|
| `ADN de Marca` | Conjunto de atributos diferenciadores derivados de análisis de datos de mercado: tono, valores, estética visual, propuesta de valor única |
| `Landing Page Estática` | Página HTML/CSS sin base de datos ni servidor — solo archivos servidos desde CDN (Netlify/Vercel) |
| `Deployment` | Proceso de publicar el código en producción con URL pública, HTTPS y dominio personalizado |
| `Marketing Zonificado` | Publicidad digital segmentada por radio geográfico (3–5 km), dirigida a audiencias locales específicas |
| `Pixel Meta` | Fragmento de código JavaScript que rastrea acciones de usuarios en el sitio web para optimizar campañas de Facebook/Instagram |
| `Performance Max Local` | Tipo de campaña de Google Ads que distribuye automáticamente el presupuesto entre Search, Display, Maps y YouTube para objetivos locales |
| `Lookalike` | Audiencia nueva en Meta Ads generada a partir del perfil estadístico de clientes existentes |
| `Make / Zapier` | Plataformas de automatización sin código que conectan aplicaciones (ej: cuando hay comentario nuevo → enviar notificación WhatsApp) |
| `data_completeness_score` | Campo del pipeline de extracción Firecrawl que indica qué tan completa es la información pública de un negocio (0.0 – 1.0) |
| `UI Kit` | Sistema de componentes visuales reutilizables en Figma: colores, tipografías, botones, cards, formularios |
| `SSR / SSG` | Server-Side Rendering / Static Site Generation — estrategias de Next.js para rendimiento y SEO |

---

*Documento generado con base en el Pilar Agencia Web & Marketing Dirigido definido el 26 de marzo 2026.*  
*Stack validado contra negocios pet del Sur del Valle de Aburrá (Itagüí, Sabaneta, La Estrella, Caldas).*
