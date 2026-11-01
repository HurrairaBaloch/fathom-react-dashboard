# DESIGN.md — Fathom (React primary dashboard)

Product: **Fathom** — premium SaaS analytics console (demo)  
Audience: recruiters / eng managers evaluating UI craft  
Primary action: Explore metrics and records  
Entry: **opens directly** at `/` (no framework picker)

## Reference Brief

| Reference | Borrow | Do not copy |
|---|---|---|
| Unicos (user ref) | Mint active-nav pill, white sidebar, soft elevated white cards, rounded search, colorful KPI strip with sparklines, asymmetric main+list layout | Exact IA, crypto/ticket modules, purple KPI tiles as brand |
| Marketing analytics (user ref) | Greeting + date range, icon KPI tiles, large multi-series chart card, donut+legend, channel list, timeline row | Purple active nav as brand, identical widget grid |
| Taskly (user ref) | Soft depth, greeting + primary CTA, tinted icon metric cards, right-rail upcoming list | Neumorphism everywhere, purple brand, emoji greeting |
| Stripe / Mercury (principles) | Tabular nums, color = status, one north-star question per view | Layouts/assets |

Playbook note: references use purple — **brand stays mint/teal** (Harbor), not blue/purple.

## Palette (CSS vars)

| Token | Hex |
|---|---|
| base | `#EEF2F0` |
| surface | `#FFFFFF` |
| surface-2 | `#F7FAF8` |
| ink | `#15201C` |
| ink-muted | `#66736E` |
| line | `color-mix(ink 9%)` |
| brand | `#0F9F86` |
| brand-soft | `#D8F5EE` |
| accent | `#D4A017` |
| success | `#1F8A5B` |
| danger | `#C9443A` |
| warn | `#C9851A` |
| chart-2 | `#2F6B5A` |
| chart-3 | `#C4A35A` |
| chart-4 | `#D4675A` |

## Fonts

- UI: **Plus Jakarta Sans** (500/600/700)
- Numbers: **IBM Plex Mono** tabular

Type: 12 / 13 / 14 / 16 / 20 / 28 / 36  
Radius: 10 / 14 / 18  
Spacing: 4/8 steps  
Shadows: `0 1px 2px rgba(21,32,28,.04), 0 8px 24px rgba(21,32,28,.06)` (max 2 levels)

## Signature move

Mint pill sidebar active state + soft multi-tone KPI ribbon (brand / ink / accent / slate) with waveform sparklines.

## Motion budget

- CSS for hover/focus (150–220ms)
- Motion: route enter stagger once; panel open/close; chart draw-in once
- Ease: `cubic-bezier(0.16, 1, 0.3, 1)`
- Honour `prefers-reduced-motion`

## Layout

```
[ sidebar 248 ] [ header search | utils | profile ]
                [ greeting + CTA + range ]
                [ 4 KPI ribbon ]
                [ chart 1.6fr | donut+list 1fr ]
                [ table / feed ]
```

## Banned

Purple/blue brand, Inter-only, identical card grids, emoji icons, framework picker as home, dark charcoal leftover theme.
