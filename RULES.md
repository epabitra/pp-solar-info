# Engineering Rules

These rules apply to **every change** in this repository, by any developer or AI assistant. They describe how a senior engineer with 10+ years of experience works: anticipate failure, keep code clean and secure, and ship production-ready work.

- **MUST** and **MUST NOT** are mandatory. A change that breaks one is not mergeable.
- **SHOULD** means the default; deviating needs a stated reason in the PR.
- Where the existing code does not yet meet a rule, the gap is listed in [MEMORY.md](MEMORY.md) → "Known gaps". Fix gaps when you touch that code; never add new ones.

Related: [ARCHITECTURE.md](ARCHITECTURE.md), [DESIGN.md](DESIGN.md), [PRD_V1_Simple.md](PRD_V1_Simple.md).

---

## 1. Working standard

1. **Act as a senior developer.** Understand the requirement, the existing code and its side effects before changing anything. Prefer the simplest design that is correct, secure and maintainable.
2. **Deliver production-ready code only.** No placeholders, `TODO` stubs, commented-out code, debug prints or half-finished paths in a merged change.
3. **Anticipate every failure.** For each change, list what can go wrong (missing data, bad input, concurrency, network or storage failure, permission) and handle each case explicitly.
4. **Follow the existing patterns** in the module you touch (naming, layering, DTO style, error handling). Consistency beats personal preference.
5. **Keep changes focused.** One concern per change; do not reformat or refactor unrelated code in the same change.
6. **Verify before you claim it works.** Compile, type-check, run the smoke test and check the affected screens (see §9).
7. **Never invent business facts.** Prices, licences, addresses and legal promises come from the client or the PRD, never from guesses. Unknown values stay empty or configurable and are listed in MEMORY.md.

---

## 2. Backend structure (Java / Spring Boot)

### 2.1 Layering

1. **Controllers (resources) MUST only:** receive the request, validate it with `@Valid`, read the current user (`CurrentUser`, `PartnerContext`) and call **one** service method. They MUST NOT call repositories, contain business rules, build entities or catch exceptions to hide them.
2. **Services MUST hold the business logic.** Each service exposes intent-named methods (`placeOrder`, `confirmOrder`), owns the transaction (`@Transactional`, `readOnly = true` for reads) and returns DTOs, never entities.
3. **New modules SHOULD define a service interface plus an implementation** (`OrderService` + `OrderServiceImpl`). The implementation contains only the logic for that use case.
4. **Move reusable or bulky logic out of services** into focused helpers: `*Util` (pure functions), `*Mapper` (entity ↔ DTO), `*Validator` (business validation), or a dedicated component. Services orchestrate; helpers do the detail.
5. **Repositories MUST contain only data access.** Use Spring Data derived queries or JPQL with named parameters.
6. **One class per responsibility.** A class that needs a scroll bar to read is a candidate for splitting.

### 2.2 Imports and code style

1. **Import every class at the top of the file.** Inline fully-qualified names (`new java.util.LinkedHashMap<>()`) MUST NOT be used, except when two classes with the same simple name are needed in one file.
2. **No wildcard imports** in new code (`import java.util.*`).
3. **Constructor injection only.** No field `@Autowired`. Dependencies are `private final`.
4. **Names say what things are.** Classes are nouns, methods are verbs; no abbreviations except well-known ones (`id`, `dto`, `url`).
5. **Methods do one thing.** If a method needs a comment explaining each block, extract the blocks.
6. **Comments explain why, not what.** Public classes get a short Javadoc explaining their purpose and any non-obvious rule.

### 2.3 Optionals and nulls

1. **Never call `Optional.get()`** (or `isPresent()` followed by `get()`). Use:
   - `orElseThrow(() -> ApiException.notFound("Order"))` when the value is required,
   - `ifPresent(...)` / `ifPresentOrElse(...)` for side effects,
   - `map(...)`, `orElse(...)` or `orElse(null)` when absence is a valid state.
2. **Do not return `null` collections.** Return `List.of()`.
3. **Treat every request field as possibly null or blank.** Normalise with `Text.trimToNull` before saving.

### 2.4 Validation of incoming data

1. **Every create or update endpoint MUST take a DTO** (Java `record`), never an entity or a raw `Map`.
2. **Every DTO MUST declare its rules with Bean Validation** (`@NotBlank`, `@Size`, `@Pattern`, `@DecimalMin`, …), each with a human-readable `message`.
3. **Every controller parameter carrying a DTO MUST use `@Valid`.**
4. **Rules that need the database or several fields** (uniqueness, ownership, state transitions, cross-field checks) MUST be validated in the service or a dedicated `*Validator` before anything is saved, and reported with `ApiException.field(field, message)` or `ApiException.badRequest(message)`.
5. **Validate path and query parameters too.** Clamp paging (`PageResponse.safePage / safeSize`), whitelist sort keys, parse enums safely.
6. **Never trust values the server can compute.** Prices, totals, roles, partner type and ownership always come from the database, never from the request.

### 2.5 Errors and messages

1. **Report business errors only through `ApiException`.** Let `GlobalExceptionHandler` turn them into `{status, message, fieldErrors}`.
2. **Every message MUST tell the user what happened and what to do**, in plain language: "This order is already confirmed and can't be cancelled here. Contact the factory to cancel it." Never "Error 500", "Invalid input", a class name or a stack trace.
3. **Use the right status:** 400 bad input, 401 not logged in, 403 not allowed, 404 not found (also for objects the caller may not see), 409 conflict or concurrent edit, 500 only for unexpected failures.
4. **Never swallow exceptions.** Catch only what you can handle; log unexpected errors once, at the boundary, without sensitive data (§5.19).
5. **Field errors MUST use the DTO field name** so the frontend can show them under the right input.

### 2.6 Configuration and constants

1. **No hardcoded configurable values.** URLs, limits, timeouts, secrets, credentials, time zone, file size, page sizes and business tunables MUST live in `application.yml` under `app.*`, read through `AppProperties`, and be overridable by environment variables.
2. **Fixed domain values** (status names, audit action names, sort keys) MUST be enums or `static final` constants in one place per module (`Enums`, `*Constants`), never repeated string literals.
3. **Secrets MUST come only from the environment** (`.env`, secret manager). The defaults in `application.yml` are for local development only (§5.7, §5.18).
4. **Frontend constants** live in `src/lib/` (`siteLinks.ts`, `status.ts`, `schemas.ts`, `images.ts`). Visual values come only from design tokens.

### 2.7 Database

1. **Every new table MUST have the common columns:**

   | Column | Type | Purpose |
   |---|---|---|
   | `id` | `BIGSERIAL` PK | Internal key, used in joins only |
   | `uuid` | `UUID NOT NULL UNIQUE DEFAULT gen_random_uuid()` | Public identifier for APIs and URLs |
   | `created_by` | `BIGINT` → `users(id)` | Who created the row |
   | `created_date` | `TIMESTAMPTZ NOT NULL DEFAULT now()` | When it was created |
   | `modified_by` | `BIGINT` → `users(id)` | Who last changed it |
   | `modified_date` | `TIMESTAMPTZ NOT NULL DEFAULT now()` | When it last changed |
   | `active` | `BOOLEAN NOT NULL DEFAULT TRUE` | Soft delete / visibility |

   Entities MUST extend a shared `BaseEntity` (`@MappedSuperclass`) filled by JPA auditing (`@CreatedBy`, `@CreatedDate`, `@LastModifiedBy`, `@LastModifiedDate`, with an `AuditorAware` built on `CurrentUser`), never set by hand. Pure link and history tables (e.g. `order_items`, `*_history`) MAY omit `modified_*` and `active`, because they are append-only.
2. **Never physically delete business records** (orders, partners, products, categories, offers). Use `active`, status or `BLOCKED`.
3. **Schema changes only through new Flyway migrations** (`V{n}__description.sql`). Never edit a migration that has run anywhere. Hibernate runs with `ddl-auto: validate`.
4. **Add constraints in the database too:** `NOT NULL`, `CHECK`, `UNIQUE` and foreign keys back up the Java validation.
5. **Index what you filter or join on.** Avoid N+1 queries: use entity graphs or batch fetching; list endpoints return trimmed DTOs and are always paginated.
6. **Money is `NUMERIC(12,2)` / `BigDecimal`**, rounded `HALF_UP` to paise via `Money`. Never `double`.
7. **Use optimistic locking (`@Version`)** on rows that several admins can edit at once.

### 2.8 Endpoints

1. **Every new endpoint MUST be registered in `SecurityConfig`** with the narrowest role that needs it (`/api/public/**` for anonymous, `/api/partner/**` PARTNER, `/api/admin/**` admins, `/api/admin/system/**` SUPER_ADMIN). Never widen `permitAll`.
2. **URL access is not enough.** The service MUST also check ownership for any object a caller can name (§5.5).
3. **Follow the URL scheme:** `/api/{audience}/{resource}[/{id}[/{action}]]`, plural nouns, verbs only for state transitions (`/orders/{id}/confirm`).
4. **Every list endpoint is paginated** and returns `PageResponse`.
5. **Every state-changing action writes an audit record** in the same transaction.
6. **Document the endpoint** in ARCHITECTURE.md §3.2 and add a check to `scripts/api-smoke-test.mjs` when it carries a business rule.

---

## 3. Frontend (React / TypeScript)

1. **TypeScript strict; no `any`.** API shapes live in `lib/types.ts` and mirror the backend DTOs.
2. **All API calls go through `lib/api.ts` and a hook in `features/`.** Components never call `fetch` directly.
3. **Forms use React Hook Form + Zod** schemas from `lib/schemas.ts`, with the same rules and messages as the backend. Server `fieldErrors` are shown under the matching input.
4. **Every async screen has loading (skeleton), empty, error (with Retry) and success states** (DESIGN.md §9, §14).
5. **Formatting only through `lib/format.ts`; statuses only through `lib/status.ts`.**
6. **Styling only through design tokens and the shared components.** No raw hex colours, no ad-hoc `backdrop-blur`.
7. **Permissions in the UI are cosmetic.** Hide what the user cannot do, but rely on the backend to enforce it.
8. **Never put tokens, passwords or personal data in `localStorage`, `sessionStorage`, URLs or logs.** Only UI preferences (theme, sidebar) may be stored.
9. **Never render HTML from data** (`dangerouslySetInnerHTML`). If unavoidable, sanitise with a vetted library first.
10. **Pages are lazy-loaded; heavy libraries load only where used** (DESIGN.md §10).
11. **Accessibility is required:** labels, keyboard access, focus rings, `aria-*` on custom controls, colour never the only signal.
12. **Save source files as UTF-8 without BOM.** In Windows PowerShell 5.1 always read and write with an explicit UTF-8 encoding (`[IO.File]::ReadAllText(path, [Text.Encoding]::UTF8)`); `Get-Content` without `-Encoding` corrupts characters such as `·`, `₹` and `…`.

---

## 4. API contract

1. **Responses are DTOs shaped for their audience.** Admin, partner and public views of the same entity are different records; a partner response MUST NOT contain fields for another partner type or internal data.
2. **Errors always have the shape `{status, message, fieldErrors?}`.**
3. **Dates are ISO-8601 in UTC; amounts are numbers in rupees with 2 decimals.**
4. **Breaking changes need a new field or endpoint, never a silent change in meaning.**

---

## 5. Security rules

Every change MUST be reviewed against this list. The status column records where the current code stands (✅ in place, ⚠️ partly, ❌ missing). Gaps are tracked in MEMORY.md.

| # | Threat | Rule | Status |
|---|---|---|---|
| 1 | **SQL injection** | MUST use JPA/JPQL with bound parameters. Native SQL MAY only interpolate server-side constants (never request data); everything else is bound with `setParameter`. Sort fields are whitelisted. | ✅ |
| 2 | **Cross-site scripting (XSS)** | MUST rely on React escaping; MUST NOT use `dangerouslySetInnerHTML` with data. Uploads are images only (no SVG/HTML). Production MUST send a Content-Security-Policy header. | ⚠️ no CSP header yet |
| 3 | **CSRF** | APIs MUST stay stateless with Bearer tokens. The only cookie (refresh) MUST be `HttpOnly`, `Secure` in production, `SameSite=Strict`, `Path=/api/auth`. Never add cookie-based auth for other endpoints. | ✅ |
| 4 | **Insecure file uploads** | MUST whitelist type, cap size (5 MB), generate random file names, keep paths inside the storage root, and never execute or serve uploads as HTML. SHOULD verify the file's magic bytes, not just the declared content type, and re-encode images. | ⚠️ magic-byte check missing |
| 5 | **IDOR / broken object-level authorisation** | Every endpoint that takes an id MUST check the caller may access that object, returning **404** for objects that are not theirs. Public identifiers SHOULD be UUIDs (§2.7). | ✅ ownership checks; ⚠️ numeric ids in URLs |
| 6 | **Missing rate limiting** | Login, register, refresh and other abuse-prone endpoints MUST be rate-limited per IP and per account (e.g. Bucket4j or Nginx `limit_req`), with lockout or back-off after repeated failed logins. | ❌ |
| 7 | **Insecure JWT secrets** | The secret MUST be ≥ 32 random characters from the environment, and startup MUST fail in production if the development default is used. Access tokens stay short-lived (15 min). | ⚠️ length enforced; dev default not blocked in prod |
| 8 | **Exposed API secrets** | Secrets MUST never be committed, sent to the frontend or put in `VITE_*` variables. `.env` stays git-ignored; `.env.example` holds placeholders only. | ✅ |
| 9 | **Weak password hashing** | MUST use BCrypt (cost ≥ 10; SHOULD be 12) or Argon2. Minimum password length 8. Never store, log or email plain passwords. | ✅ BCrypt 10 |
| 10 | **Missing multi-factor authentication** | Admin accounts MUST support a second factor (TOTP or SMS/WhatsApp OTP) before go-live; partners SHOULD get OTP login on new devices. | ✅ platform admins and shop staff (authenticator; SMS once DLT is approved) |
| 11 | **Overly permissive CORS** | MUST list exact origins (`CORS_ALLOWED_ORIGINS`), never `*` with credentials; allowed headers and methods stay minimal. The dev proxy removes `Origin` because the browser is same-origin. | ✅ |
| 12 | **Auth tokens in local storage** | Access tokens MUST live in memory only; refresh tokens only in the httpOnly cookie. | ✅ |
| 13 | **Client-side-only permission checks** | Every permission MUST be enforced by `SecurityConfig` and in the service. UI checks are cosmetic. | ✅ |
| 14 | **Missing row-level security** | Every query for partner data MUST filter by the caller's partner id in the service. PostgreSQL row-level security SHOULD be added as defence in depth for multi-tenant growth. | ⚠️ application-level only |
| 15 | **Unverified webhook signatures** | Any future webhook (payment gateway, SMS provider) MUST verify the provider's HMAC signature and timestamp, reject replays, and be idempotent. | n/a (no webhooks yet) |
| 16 | **SSRF** | The backend MUST NOT fetch URLs supplied by users. If ever needed, use an allow-list of hosts, block private IP ranges and set timeouts. | ✅ |
| 17 | **Exposed source maps** | Production builds MUST NOT ship source maps (`build.sourcemap` stays off) and MUST NOT expose actuator endpoints other than `health`. | ✅ |
| 18 | **Default credentials** | Admin passwords MUST be set through the environment before first start, and startup MUST fail in production if the development defaults are used. `SEED_DEMO_DATA` MUST be `false` in production (the demo partners use a known password). | ⚠️ not blocked at startup |
| 19 | **Sensitive data in logs** | MUST NOT log passwords, tokens, OTPs, full request bodies or personal data (mobile, address). Audit details hold business facts only. Log ids, not values. | ✅ (keep it that way) |
| 20 | **Vulnerable dependencies** | Dependencies MUST be scanned on every build (`npm audit --omit=dev`, OWASP Dependency-Check or Dependabot) and patched promptly; versions are pinned through lock files and the Spring Boot BOM. | ❌ no automated scan |

Additional security rules:

21. **HTTPS everywhere in production** with HSTS; `COOKIE_SECURE=true`.
22. **Security headers** in Nginx: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and `frame-ancestors 'none'`.
23. **Least privilege:** the app's database user owns only its schema; containers run as non-root (already true for the backend image).
24. **Blocking takes effect immediately:** a blocked user's requests fail on the next call, and all refresh tokens are revoked.
25. **Every security-relevant action is audited:** login failures (rate-limit counter), password changes, type changes, blocks, admin password resets.

---

## 6. Performance

1. **Paginate on the server** (20–100 rows), never send whole tables.
2. **No N+1 queries:** check the SQL log when adding relations to a DTO.
3. **Cache static assets for a year** (hashed names) and HTML never.
4. **Images are WebP, sized for their slot,** with width and height set and lazy-loaded below the fold.
5. **Respect the bundle budgets** in DESIGN.md §10.

---

## 7. Git and reviews

1. **Branch from `main`; never commit directly to it.**
2. **Commit messages:** imperative subject ≤ 72 characters ("Add rate limiting to login"), body explaining why.
3. **One logical change per commit;** no generated files (`dist/`, `target/`, `uploads/`) or secrets.
4. **Every PR states:** what changed, why, how it was tested, and any rule from this file it touches.

---

## 8. Documentation

1. **Update ARCHITECTURE.md** when you add a module, table, endpoint or integration.
2. **Update MEMORY.md** when you make a decision, learn a gotcha, or find or close a known gap.
3. **Update DESIGN.md** (via review) for any new visual pattern.
4. **Keep README.md runnable:** a new developer must get the app running from it alone.

---

## 9. Definition of done

A change is done only when every applicable box is ticked:

- [ ] Follows the layering, import, Optional, validation, error-message and configuration rules (§2)
- [ ] New endpoint registered in `SecurityConfig` with the narrowest role, ownership checked in the service
- [ ] New tables have the common columns and a Flyway migration; nothing physically deleted
- [ ] Security table (§5) reviewed; no new ❌
- [ ] Frontend states (loading, empty, error, success) and accessibility covered
- [ ] `cd backend && mvn -q compile` passes
- [ ] `cd frontend && npm run build` passes (type check + build)
- [ ] `node scripts/api-smoke-test.mjs` passes against a running backend with demo data
- [ ] Affected screens checked in the browser at 375 px and 1280 px, light and dark
- [ ] ARCHITECTURE.md / MEMORY.md / README.md updated where relevant
