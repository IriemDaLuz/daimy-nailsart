# Daimy Nail's Art — Web Oficial

Web profesional para **Daimy Nail's Art**, salón de uñas ubicado en Calle Triana 99, Arrecife, Lanzarote.

## Stack

- HTML5 semántico
- CSS3 con variables custom (sin frameworks)
- JavaScript vanilla
- GSAP 3 + ScrollTrigger

## Estructura

```
daimy-nailsart/
├── index.html      # Página principal
├── styles.css      # Estilos con sistema de variables y responsive
├── script.js       # Lógica, animaciones GSAP y filtros de galería
└── img/            # Imágenes (añadir antes de producción)
```

## Secciones

| Sección | Descripción |
|---|---|
| Hero | Frase principal, orbs animados, 3 CTAs |
| Trust bar | 4 puntos de confianza del salón |
| Servicios | 8 cards (manicura, semi, acrigel, nail art…) |
| Galería | Grid filtrable por categoría |
| Sobre mí | Texto de marca + imagen |
| Reseñas | 3 testimonios de clientas |
| FAQ | 6 preguntas frecuentes con `<details>` |
| Reservas | WhatsApp, teléfono, Instagram, horario y mapa |

## Personalización antes de producción

- [ ] Reemplazar `+34XXXXXXXXX` con el número real de WhatsApp/teléfono
- [ ] Añadir fotos reales en `/img/` (ver alt texts en el HTML para saber qué imagen va en cada slot)
- [ ] Actualizar el embed de Google Maps con coordenadas exactas
- [ ] Revisar y ajustar horarios en la sección Reservas
- [ ] Añadir dominio real en canonical, OG URL y Schema.org

## SEO local

Optimizado para:
`uñas Arrecife` · `manicura Arrecife` · `salón de uñas Arrecife` · `uñas Lanzarote` · `nail art Arrecife` · `uñas acrigel Lanzarote` · `semipermanente Arrecife`

Incluye Schema.org `BeautySalon` con dirección, horarios y redes sociales.

## Responsive

Probado en 320px, 480px, 768px, 1024px y 1440px+. Sin overflow horizontal. Menú móvil funcional con accesibilidad ARIA.

## Animaciones

GSAP Motion Level 2 (Premium Editorial). Usa `matchMedia` para reducir movimiento en móvil y respeta `prefers-reduced-motion`.

---

Cliente: Daimy Nail's Art · Instagram: [@daimynailsart](https://www.instagram.com/daimynailsart/)
