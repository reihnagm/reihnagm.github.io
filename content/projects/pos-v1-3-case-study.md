# POS Platform v1.3 — End-to-End Case Study

## Overview
I built and shipped a full POS platform across 4 sprints, from baseline CRUD to production-ready operational workflows.

## What I delivered
- **Sprint 1:** Outlet-scoped pricing/tax engine, promo/voucher quote flow, pricing snapshot
- **Sprint 2:** Inventory valuation ledger (moving average), COGS from ledger, valuation reports
- **Sprint 3:** Purchasing advance (partial receive), AP basic (supplier invoice + aging), guard-based state machine
- **Sprint 4:** Thermal receipt production (58/80mm), print profile per outlet, reprint governance, barcode cashier flow

## Key capabilities
- DB-driven RBAC matrix
- Sales lifecycle: quote, hold, checkout, void, refund, recreate-from-expired
- Inventory: adjust, transfer, opname with approval and detail trace
- Purchasing/AP: PO receive lifecycle + AP aging visibility
- Responsive UI (mobile + desktop)
- Smoke test flow + hardening docs/checklists

## Architecture highlights
- Backend: Go + Gin + GORM + MySQL
- Frontend: Next.js 16 + Redux Toolkit + Tailwind
- Media: local storage (`/uploads`) for product images and avatars
- Audit-centric operations for sensitive actions

## Production positioning
Production-ready for **small-to-medium scale operations**, with documented hardening track for enterprise-level observability and DR maturity.

## Release references
- Backend final: `v1.3.0-be-sprint4-final`
- Frontend final: `v1.3.0-fe-sprint4-final`

## What I learned
- Iterative sprint delivery works best when paired with strict state guards and audit-first design.
- Operational UX (scanner flow, thermal print, responsive controls) is as critical as feature completeness.
- Reliability hardening should be treated as a first-class phase, not an afterthought.
