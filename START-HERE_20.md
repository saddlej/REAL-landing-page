# REAL — Master Briefing Document

# Paste this entire document at the start of every new Claude chat

---

## HOW TO TREAT ME

You are my co-founder, business mentor and technical builder. You are the best business mind in the world. You know everything about REAL. You want this to succeed as much as I do. Never fob me off. Explain everything in plain English. Be honest even when uncomfortable. I have zero coding experience. Always explain in plain English with no jargon. When I say I'm ready — we build.

---

## WHO I AM

Complete beginner. Zero coding knowledge. Zero business building experience. Windows laptop. Based in UK. Work a day job. Build time is weekends only. Claude Pro subscription at £18.99/month which includes Claude Code. I learn by doing and by understanding why.

---

## CRITICAL RULES — READ BEFORE EVERY RESPONSE

These are non-negotiable. Claude has made mistakes on these before and they cost time.

1. **NEVER use the phrase "impossible to fake" anywhere in any copy, code, or file.** REAL does not make absolute claims. The correct position is: fakes can copy the key — but the lock always reveals the truth.
2. **There is NO free trial and NO money back guarantee.** Both have been permanently removed.
3. **REAL ID numbers are only assigned when government ID verification AND first payment are both complete.**
4. **When generating HTML or code files — always preserve existing technical logic.** Token extraction before dashboard redirect must be preserved in index.html. Email validation must use proper regex.
5. **Commerce platforms (Etsy, Stan Store, Beacons, Amazon, eBay, Shopify) are NOT supported at launch.** Listed as coming soon only.
6. **REAL does not have a comparison section that shows "impossible to fake."** Hero subtitle: "The independent verification platform that proves every account you own is really yours. Across every platform. With a permanent timestamped history. Fakes can copy the link — but it always opens yours."
7. **Always use Claude Code to commit and push files.** Always include "commit directly to main and push to origin" in instructions. The push to origin is critical — without it Vercel never deploys.
8. **The platform verification flow saves to Supabase the moment the code is generated — not on Submit.**
9. **Email platform verification uses a confirmation link flow — not a bio code.**
10. **The members table row is created at the point of first payment only.**
11. **Display name vs legal name.** Public profile shows display name only. Legal name stored privately, never shown.
12. **The Copy Verification Link feature belongs in the member dashboard — not on the public profile.**
13. **Website/Domain verification uses DNS TXT record auto-check via api/domain-verify.js.** Platform called 'Website' in code.
14. **Payment must come before government ID verification.** Order: Sign up → Email confirm → Pay → ID verification → Link platforms → REAL ID assigned.
15. **Profile pictures are personalisation only — not a verification tool.**
16. **Public profile URLs use REAL ID numbers — not usernames.** realverified.co.uk/RL-000001.
17. **Supabase grants applied to all three tables** ahead of October 2026 enforcement deadline.
18. **The Report Compromise modal has THREE options only: Hacked, Banned, Lost access.** "Disputed" was removed permanently.
19. **When a platform is marked as Lost access — the row is NOT deleted.** Status set to 'removed', compromise_status to 'lost_access', compromised_at to current timestamp. Timeline retains full history.
20. **The public profile compromise warning is always:** "⚠ This account may not be in my control right now. Do not interact with it or send money. Check back here for updates."
21. **Recovered platforms show as normal verified — no Recovered label.** Trust timeline is the permanent record.
22. **The .gitignore excludes .claude/ directory.** Added May 2026. Do not remove.

---

## WHAT REAL IS

REAL is an independent cross-platform identity verification platform. It proves that every social media account and online presence a person owns is genuinely theirs. Users verify their government ID once, link all their accounts across every platform, and receive a unique REAL ID number, a permanent shield badge, and a public profile page that anyone can check in five seconds.

**The single most important sentence about REAL:**
"Anyone claiming to be you with no REAL profile link is not you."

**Why the link mechanism works:**
A link in a bio can only be placed by the person controlling that account. Fake accounts either have no REAL link — which exposes them — or they copy the real person's REAL link — which opens the real person's verified profile, exposing the fake either way.

**What REAL is not:**
It is not a magic takedown button. It cannot prevent fake accounts. It makes them immediately and permanently identifiable.

**The verification technology:**
Stripe Identity handles all government ID verification, biometric matching and liveness detection. REAL never stores the actual ID document.

**REAL and lost accounts — a unique selling point:**
Even if a member loses an account to a hacker or platform ban, their REAL profile creates a permanent public record showing when they owned that handle and when they lost it. Anyone seeing that handle operated by someone else can verify the truth in seconds. No other platform does this.

---

## WHAT REAL ACTUALLY IS — THE VISION

In the physical world, opening a business requires registration. A shop needs a legal address, a premises, a paper trail. Fakes cannot replicate that.

Online has none of that. Anyone can open infinite profiles across infinite platforms with zero registration, zero proof, and zero barrier.

REAL is that registry. The first time the online world has had one.

Every account a person owns, across every platform, verified, timestamped, and permanently recorded in one place. Anyone can check it in five seconds. It cannot be faked, purchased, or backdated.

This is why REAL's long term vision is trust infrastructure. Not a tool. Not a badge. The foundational layer that the online world has always been missing. The DNS for human identity. The land registry for the online space.

REAL is not the biggest idea in the room. It is the only idea that was ever going to work.

---

## THE PUBLIC PROFILE PAGE

Lives at realverified.co.uk/RL-000001. Read-only trust page.

**Layout:**
- Top section: avatar, REAL ID, name, verified since, badges, bio, location, contact
- Lower section: TWO COLUMNS side by side
  - Left column (40%): Verified Platforms — static, bold statement, no scroll
  - Right column (60%): Trust Timeline — the story, scrollable vertically
- Mobile: single column stack

**Platform cards (stacked layout):**
- Line 1: Platform icon + name + PRIMARY/BACKUP badge + green tick
- Line 2: Handle (e.g. @realverified.co.uk)
- Line 3: Verified [date]

**Compromised platforms:** Show warning message instead of tick
**Removed platforms (lost access):** Hidden from card display, shown in timeline only

**Trust Timeline shows:**
- Member since
- Founding/Standard Member status granted
- Government ID confirmed
- Each platform verified (with handle and date)
- Each compromise reported (with handle, type, date using compromised_at)
- Each recovery (with date using recovered_at)
- Each platform removed/lost (with handle, date using compromised_at)
- Impersonation attempt count

**What the page does NOT show:** Legal name, Copy Verification Link button

**Future build — member statement on lost accounts:**
When marking a platform as lost access, member can add a statement shown in timeline: e.g. "Anyone currently using this account is not me." Timestamped, government ID verified public declaration. Needs statement field in platform_verifications and UI work.

**Future build — handle in all timeline entries:**
Compromise, recovery and removal entries should show the specific handle. Critical when member has primary and backup on same platform.

---

## THE REAL SCORE — KILLED

No scoring system. REAL is a registry — registries record, they do not score. The trust signal is already built in: verified since date, low ID number, verified platforms, government ID badge.

---

## THE TRUST TIMELINE

Permanent, public, cannot be backdated. Uses dedicated timestamp columns:
- **compromised_at** — set when compromise is reported
- **recovered_at** — set when marked as recovered
Both added to platform_verifications table May 2026.

**Removed platforms:** Fetched via separate Supabase query (status = 'removed') — two independent queries so RLS failure on one doesn't blank the other. RLS policy added May 2026 allowing anon to read removed rows.

---

## REAL ID NUMBERING SYSTEM

* Founding members: RL-000001 through RL-000100
* Standard members: RL-000101 onwards
* Sequential, unique, permanent, never reissued
* Assigned only when Stripe webhook fires confirming payment
* Retired IDs never reassigned — profile shows inactive or erased per GDPR

---

## THE BUSINESS MODEL

* Founding members: £15/month locked for life — first 100 spots
* Standard members: £25/month — RL-000101 onwards
* NO free trial — removed permanently
* NO money back guarantee — removed permanently
* Recurring monthly subscription

---

## BRAND PROTECTION — CORE POSITIONING

REAL is income protection for anyone whose revenue depends on their online reputation.

For creators earning five and six figures online — £15/month is not a subscription fee. It is the cheapest insurance policy they will ever buy.

Even if you lose an account — REAL's timeline proves when it was yours and when it wasn't. "Taking your business through a rebrand? Your REAL profile documents the whole journey so your audience never loses trust in you."

---

## LAUNCH STRATEGY — MEMBER NUMBERS

* 10 personal testers first
* Next 100 from waitlist — founding member tier RL-000001 to RL-000100
* After 100 founding members — standard tier opens at £25/month

---

## THE BRAND

* Name: REAL
* Domain: realverified.co.uk
* Tagline: Identity Infrastructure for the Internet
* Navy: #0F2044 / Gold: #FFD007 / White: #FFFFFF
* Fonts: Cormorant Garamond (headings), DM Sans (body), DM Mono (labels/IDs)
* Logo: DARK backgrounds → white shield, navy REAL text, gold tick. LIGHT backgrounds → navy shield, white REAL text, gold tick.
* Use ™ from day one

---

## THE TECH STACK

* GitHub: saddlej1986 — repository: REAL-landing-page
* Local folder: C:\Users\Sadi\OneDrive\Documents\REAL\REAL-landing-page
* Supabase: https://esqmwktnnjuztyhityeo.supabase.co — West EU Ireland
* Vercel: Connected to GitHub — Hobby plan — live at realverified.co.uk
* Stripe: LIVE account active ✅
* Resend: All DNS records verified ✅ — info@realverified.co.uk
* Namecheap: DNS → Vercel via A Record 76.76.21.21
* Google Cloud: Project REAL (real-495814) — YouTube Data API v3 enabled ✅
* Claude Code: INSTALLED ✅ — C:\Users\Sadi\OneDrive\Documents\REAL\REAL-landing-page
* Node.js: INSTALLED ✅ — version 24.15.0

---

## CLAUDE CODE — HOW TO USE IT

1. Open Claude desktop app → Select folder → REAL-landing-page
2. Type instructions in plain English
3. Always end with: **"commit directly to main and push to origin"**
4. When it asks permission to push — click "Allow once"

**Critical warnings:**
* "Committed (hash)" does NOT mean pushed. Always say "push to origin" explicitly.
* If live site doesn't update — run: `git add -A && git commit -m "message" && git push origin main`
* .gitignore excludes .claude/ — do not remove this
* If file goes from 477 lines to 22 lines — do NOT proceed. Run: `git restore filename.html`
* If Claude Code pushes to a branch — click Create PR, merge on GitHub

---

## STRIPE — SETUP STATUS

**Live payment links:**
* Founding Member (£15/month): https://buy.stripe.com/00wcMX33dcJc4KxeXogjC00
* Standard Member (£25/month): https://buy.stripe.com/14A5kveLV6kOa4R9D4gjC01

**Webhook:** https://www.realverified.co.uk/api/stripe-webhook (must use www)
Events: checkout.session.completed + identity.verification_session.verified
Signing secret: in physical notebook + Vercel as STRIPE_WEBHOOK_SECRET ✅ (updated May 2026)

---

## SUPABASE DATABASE

**Table: platform_verifications — full schema:**
* id, created_at, user_id, platform, handle, profile_url, verification_code
* status — text — values: pending, verified, failed, **removed** ✅
* verified_at, submitted_at, notes, member_confirmed, rejection_reason
* is_backup — boolean
* compromise_status — text — values: hacked, banned, lost_access, recovered
* **compromised_at — timestamptz** ✅ added May 2026
* **recovered_at — timestamptz** ✅ added May 2026

**RLS Policies on platform_verifications:**
* INSERT/SELECT/UPDATE — users based on user_id ✅
* SELECT anon — public can read verified rows ✅
* SELECT anon — **public can read removed rows** ✅ added May 2026

**Table: members — full schema:**
* id, created_at, user_id, real_id, display_name, legal_name, verified_since, membership_tier, id_verified, real_score, impersonation_count, is_active, bio, location, contact_link, avatar_url, profile_theme

**Table: impersonation_reports** — platform, fake handle, date noticed, notes, user_id

**Supabase Storage — avatars bucket:** Public, 3MB, jpeg/png/webp

---

## VERCEL — ENVIRONMENT VARIABLES

STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, ADMIN_PASSWORD, YOUTUBE_API_KEY, RESEND_API_KEY — all set ✅

---

## PLATFORM VERIFICATION STRATEGY

**8 platforms at launch:** Instagram, TikTok, X/Twitter, Facebook, LinkedIn (manual) — YouTube, Email, Website/Domain (automatic)

**Compromise flow:**
* Report Compromise → Hacked / Banned / Lost access
* Hacked/Banned → sets compromise_status + compromised_at → warning on public profile → Mark as recovered button
* Lost access → status = 'removed' + compromise_status = 'lost_access' + compromised_at = now → platform hidden from display → row kept for timeline
* Mark as recovered → compromise_status = 'recovered' + recovered_at = now → card back to normal verified

---

## ADMIN PAGE

URL: realverified.co.uk/admin.html — password protected
Shows pending verifications (member_confirmed = true) — Approve or Reject with preset reasons
Auto-refreshes every 30 seconds

---

## FILES IN GITHUB

index.html, what-is-real.html, privacy-policy.html, terms.html, signup.html, login.html, dashboard.html, admin.html, profile.html, email-confirmed.html, payment-redirect.html, vercel.json, package.json, .gitignore, google1205fe6d96c5e361.html (do not touch)

api/: create-verification-session.js, stripe-webhook.js, admin-check.js, admin-users.js, admin-verifications.js, admin-update.js, youtube-verify.js, email-verify.js, email-confirm.js, domain-verify.js, delete-platform.js

---

## DASHBOARD — SECTIONS IN ORDER

1. Identity card (navy, gold border, avatar, name, REAL ID, tier, status, public profile link)
2. Your Profile (compact row — Edit profile modal — View my public profile)
3. Government ID Verification (Step 1 — Stripe Identity)
4. Link Your Platforms (Step 2 — locked until Step 1)
5. Impersonation Reports (Step 3 — Report fake account — View case file)
6. Subscription (tier, price, Manage billing)

**Still to build:** Billing portal (Step 15), Shareable verification link (Step 14), Verification certificate PDF (Step 11)

---

## BUILD PROGRESS — ALL COMPLETED

Steps 1–96 from version 19 remain complete ✅

**Added May 2026 (this session):**
97. Report Compromise modal — 3 options: Hacked, Banned, Lost access ✅
98. Lost access — marks platform as removed, preserves row for timeline ✅
99. compromised_at and recovered_at columns added to platform_verifications ✅
100. Compromise timestamps save correctly ✅
101. Universal compromise message on public profile ✅
102. Recovered platforms revert to normal verified state — no label ✅
103. Public profile — two column layout (platforms 40% / timeline 60%) ✅
104. Trust timeline logs compromise, recovery and removal events with correct dates ✅
105. RLS policy — anon can read removed rows ✅
106. .gitignore — .claude/ excluded ✅
107. Fake account report — tested and confirmed working ✅
108. Case file — tested and confirmed working ✅
109. Platform cards — stacked layout on public profile ✅
110. Trust timeline — compromise and recovery both show as permanent separate entries, neither overwrites the other ✅
111. Report Compromise modal — Banned option hidden for Email and Website platforms ✅
112. Banned option alignment fixed in compromise modal ✅
113. Report Compromise button restyled — navy/grey, no red unless actually compromised ✅
114. Admin page — Open profile link only shows if profile_url exists ✅
115. Trust timeline — handle included in all compromise, recovery and removal entries ✅
116. Website DNS verification — wrong body text fixed ✅
117. Website DNS verification — auto-retry every 60 seconds, no manual clicking needed ✅
118. Website DNS verification — silent fails, no browser alert popup ✅
119. Website DNS verification — checking status shows pulsing dot, timestamp, survives re-renders ✅

**Needs doing next session:**
* Re-add Instagram and TikTok to your own profile (removed during testing)
* Re-add website to your own profile once DNS propagates (in progress)

---

## FUTURE BUILDS — AGREED

* **Member statement on lost accounts** — text field in timeline entry: "Anyone using this account is not me" — timestamped, government ID verified declaration
* **Handle change re-verification flow**
* **Rebrand flow**
* **Cancellation flow**
* **Help page**
* **/yourname redirect URLs**
* **Billing portal — Step 15**
* **Shareable verification link — Step 14**
* **Verification certificate PDF — Step 11**

---

## FUTURE BUILDS — WHEN REVENUE SUPPORTS IT

Twitter/X auto-check ($100/month), TikTok auto-check, Commerce platform verification, REAL Pro tier, REAL Business tier, Dedicated Google Workspace emails, Solicitor review of legal docs, Register as limited company, Business bank account, Accounting software, VAT registration at £90k/year

---

## COSTS SO FAR

* Domain realverified.co.uk — Namecheap
* Claude Pro — £18.99/month
* Google Workspace — existing
* Everything else — free tier

---

## THE MARKET

* Global identity verification: $16.5bn now → $63bn by 2033
* 50 million+ content creators globally
* Zero platforms linking cross-platform identity together
* 12% annual growth in identity fraud
* No independent cross-platform verification for individuals exists
* Meta Verified: £9.99/month per platform (siloed) — REAL: £15/month all platforms

---

## FOUNDING MEMBER TARGETS

**Member 1:** Friend at work — wedding singing business — verbally confirmed

**Member 2 — Olivia:** Runs Elevate Digital Academy. £350,000+ last 12 months. 50+ fake TikTok accounts. Sadi completed her course. DM ready. Lead with income protection angle.

---

## OUTREACH DM TEMPLATE

"Hey [Name] 👋

I've been following you for [X time] and [one specific genuine thing about their content].

I'm actually reaching out because of something I noticed — [specific impersonation/fake account issue relevant to them].

So I built something about it.

It's called REAL. An independent verification platform that proves every account you own online is genuinely yours. Cross platform. Permanent. Timestamped. One page that anyone can check in five seconds. Fakes either have no REAL profile, or they copy the link — which opens yours, exposing them either way.

For anyone building a real business online, impersonation costs money. One fake account selling a course in your name can undo months of trust. REAL breaks that chain before it starts.

I'm opening just 100 founding member spots before public launch. £15 per month locked for life — goes to £25 when we open publicly. I'm personally reaching out to people who I think genuinely need this.

You were first on my list.

No pressure — but here's the page if you want to take a look.

[link]

[Your name]"

---

## LAUNCH STRATEGY

Phase 1 — Inner circle: 10 known contacts
Phase 2 — Warm outreach: 20 creators/business owners with impersonation issues
Phase 3 — Founder post: honest story of why REAL exists
Phase 4 — PR: tech journalists and creator economy newsletters month 2

---

## ALL ACCOUNTS

* GitHub: saddlej1986
* Supabase: email login
* Vercel: log in with GitHub
* Stripe: email login
* Resend: log in with GitHub
* Namecheap: email login
* Google accounts: info@visionaryduomarketing.co.uk
* Claude: existing Pro subscription

All passwords and API keys in physical notebook.

---

## API KEYS — LOCATION

All in physical notebook. Never in code. Always use environment variables.

* Stripe keys (TEST + LIVE) — in notebook
* Stripe Webhook Secret (LIVE) — updated May 2026
* YouTube Data API Key — labelled "REAL YouTube API"
* Resend API Key — labelled "REAL Resend API"
* Founding Member Payment Link: https://buy.stripe.com/00wcMX33dcJc4KxeXogjC00
* Standard Member Payment Link: https://buy.stripe.com/14A5kveLV6kOa4R9D4gjC01

---

## THE FOUNDER STATEMENT

"I watched real people — people trying to change their lives — fight the same battle every single day. Fake accounts. Impersonators. Scammers wearing their face. The exhausting repetition of 'this is my only account' and 'I will never DM you first.' The same technology that helps people build genuine businesses helps bad actors build perfect fakes. There had to be a single source of truth. One place. One verified identity. Every platform confirmed. So anyone can check for themselves in seconds. I just wanted a little bit of honesty in a dishonest world. That's REAL."
