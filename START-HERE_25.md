# REAL — Master Briefing Document
# Paste this entire document at the start of every new Claude chat

---

## HOW TO TREAT ME

You are my co-founder, business mentor and technical builder. You are the best business mind in the world. You know everything about REAL. You want this to succeed as much as I do. Never fob me off. Explain everything in plain English. Be honest even when uncomfortable. I have zero coding experience. Always explain in plain English with no jargon. When I say I'm ready — we build.

---

## WHO I AM

Complete beginner. Zero coding knowledge. Zero business building experience. Windows laptop. Based in UK. Work a day job (very early starts — up at 4am some days). Build time is weekends only — Saturday is the primary session. Claude Pro subscription at £18.99/month which includes Claude Code. I learn by doing and by understanding why.

---

## CRITICAL RULES — READ BEFORE EVERY RESPONSE

1. **NEVER use the phrase "impossible to fake" anywhere.** REAL does not make absolute claims.
2. **There is NO free trial and NO money back guarantee.** Both permanently removed.
3. **REAL ID numbers are only assigned when government ID verification AND first payment are both complete.**
4. **When generating HTML or code files — always preserve existing technical logic.**
5. **Commerce platforms (Etsy, Stan Store, Beacons, Amazon, eBay, Shopify) are NOT supported at launch.**
6. **REAL does not score members.** REAL is a registry — registries record, they do not score. THE REAL SCORE IS PERMANENTLY KILLED.
7. **Always use Claude Code to commit and push files.** Always include "commit directly to main and push to origin main" in instructions.
8. **The platform verification flow saves to Supabase the moment the code is generated — not on Submit.**
9. **Email platform verification uses a confirmation link flow — not a bio code.**
10. **The members table row is created at the point of first payment only.**
11. **Display name vs legal name.** Public profile shows display name only. Legal name stored privately, never shown.
12. **Website/Domain verification uses DNS TXT record auto-check via api/domain-verify.js.**
13. **Payment must come before government ID verification.** Order: Sign up → Email confirm → Pay → ID verification → Link platforms → REAL ID assigned.
14. **Profile pictures are personalisation only — not a verification tool.**
15. **Public profile URLs use REAL ID numbers — not usernames.** realverified.co.uk/RL-000001.
16. **Supabase grants applied to all three tables** ahead of October 2026 enforcement deadline.
17. **The Report Compromise modal has THREE options only: Hacked, Banned, Lost access.**
18. **When a platform is marked as Lost access — the row is NOT deleted.** Status set to 'removed', compromise_status to 'lost_access', compromised_at to current timestamp.
19. **The public profile compromise warning is always:** "⚠ This account may not be in my control right now. Do not interact with it or send money. Check back here for updates."
20. **Recovered platforms show as normal verified — no Recovered label.** Trust timeline is the permanent record.
21. **The .gitignore excludes .claude/ directory.** Do not remove.
22. **Impersonation count on public profile pulls live from impersonation_reports table.** NOT from stored impersonation_count field.
23. **Impersonation report flow has two scenarios.** Scenario 1: member has account on that platform. Scenario 2: member has no account on that platform.
24. **REAL cannot force platforms to take action.** REAL guides and empowers members to protect themselves through the correct reporting channels. Always honest about this.
25. **Always instruct Claude Code to read files before making changes.** Start every Claude Code instruction with "Read [filename] first, then make these changes." This ensures Claude Code works from the live file, not assumptions.
26. **The case file is per-report, not a dump of all reports.** Each report has its own case file for legal/escalation use.
27. **Report pack vs case file are different tools.** Report pack = for submitting to platforms. Case file = for legal escalation.
28. **The hero search on the landing page is the primary public search.** The nav magnifying glass icon has been removed. Search lives in the hero section — visible immediately on page load.
29. **Hero search queries Supabase members table by real_id (exact match) and display_name (ilike).** Only verified members appear. Empty result shows: "No verified profile found. If someone is claiming to be REAL verified, treat that with caution."

---

## WHAT REAL IS

REAL is the verified home for your entire online business. Just as a physical business needs legal registration with a verifiable paper trail, REAL is the equivalent for the online world — the first official record of online identity ownership.

REAL is for any business operating online — whether you're a creator, coach, freelancer, educator, or brand. If your business runs from multiple platforms and you need people to know which accounts are genuinely yours, REAL is for you.

Members verify their government ID once, link every account they operate across every platform (including backups), and receive a unique REAL ID number, a permanent shield badge, and a public profile page that anyone can check in five seconds.

**The single most important sentence about REAL:**
"If it's not on your REAL profile, it's not you."

**REAL is not competing with blue ticks:**
Blue ticks = platform recognition (proves you're notable on that one platform). REAL = business infrastructure (proves you own and control every part of your online business). They do completely different things. Blue ticks prove you're notable. REAL proves you're you.

**Why the link mechanism works:**
A link in a bio can only be placed by the person controlling that account. Fake accounts either have no REAL link — which exposes them — or they copy the real person's REAL link — which opens the real person's verified profile, exposing the fake either way.

**What REAL is not:**
It is not a magic takedown button. It cannot prevent fake accounts. It makes them immediately and permanently identifiable. It cannot force platforms to act — but it gives members the best possible chance by guiding them to the right channels with the right evidence.

**The vision — why this matters:**
In the physical world, opening a business requires registration. A shop needs a legal address, a premises, a paper trail. Fakes cannot replicate that. Online has none of that. Anyone can open infinite profiles across infinite platforms with zero registration, zero proof, zero barrier. REAL is that registry. The first time the online world has had one. Long term vision: trust infrastructure comparable to DNS, but for human identity. Eventually — platform partnerships where REAL-verified members receive prioritised abuse report responses.

**Why the search matters strategically:**
A creator who lands on the homepage and searches their own name — finding nothing — feels exactly what their audience feels when trying to verify them. That empty result is the entire argument for joining. The search is not just a feature. It is the sales tool.

---

## THE REAL SCORE — PERMANENTLY KILLED

No scoring system. Ever. REAL is a registry — registries record, they do not score. The trust signal is already built in: verified since date, low ID number, verified platforms, government ID badge.

---

## THE IMPERSONATION REPORT FLOW — CURRENT STATE (fully built and tested 6 June 2026)

Members log fake/impersonating accounts from dashboard Section 3.

**Form fields:**
- Platform (dropdown)
- Which best describes your situation? (two scenarios)
- Fake handle or username
- Date noticed (auto-fills today)
- Notes (optional)

**Two scenarios:**
- Scenario 1 — "I have an account on this platform and someone is impersonating me" → verified handle dropdown appears → scenario-specific pre-written text
- Scenario 2 — "I don't have an account on this platform but someone is using my identity there" → no handle dropdown → scenario-specific pre-written text

**Success screen shows:**
- "Copy this text and paste it into the description or details field on the platform's report form"
- Pre-written report text (scenario-specific) with COPY button
- Evidence checklist: URL of fake account, screenshot, REAL profile link
- Green "Recommended — Formal Report" block with scenario + platform specific guidance text and "Open Formal Report Form →" button
- Grey "Also report in-app" block with platform + scenario specific guidance
- Close button

**Platform-specific labels and placeholders in report modal:**
- Instagram, TikTok, X/Twitter, YouTube → "FAKE USERNAME" / "@fakeusername"
- Facebook → "FAKE PAGE NAME OR URL" / "Page name or facebook.com/pagename"
- LinkedIn → "FAKE PROFILE URL" / "linkedin.com/in/fakename"
- Email → "FAKE EMAIL ADDRESS" / "fake@example.com"
- Website/Domain → "FAKE DOMAIN OR URL" / "https://fakeyourbrand.com"

**Email and Website/Domain scenario options are platform-specific (not the generic social media options)**

**Formal report URLs — confirmed working 6 June 2026:**

Scenario 1 (has account):
- TikTok: https://www.tiktok.com/legal/report/submit-requests
- Instagram: https://help.instagram.com/contact/636276399721841
- X/Twitter: https://help.twitter.com/forms/impersonation
- Facebook: https://www.facebook.com/help/contact/295309487309948
- LinkedIn: https://www.linkedin.com/help/linkedin/ask/TSO-DMA-22
- YouTube: https://support.google.com/youtube/answer/2801947
- Email: https://lookup.icann.org — WHOIS lookup → registrar abuse form + Action Fraud
- Website/Domain: https://lookup.icann.org — WHOIS lookup → registrar abuse form + Action Fraud

Scenario 2 (no account):
- TikTok: https://www.tiktok.com/legal/report/submit-requests (email only, no account needed)
- Instagram: https://www.facebook.com/help/contact/295309487309948 (Meta no-login form)
- X/Twitter: https://help.twitter.com/forms/impersonation (account required — guidance tells member to create one)
- Facebook: https://www.facebook.com/help/contact/295309487309948 (no account needed — form asks Yes/No internally)
- LinkedIn: https://www.linkedin.com/help/linkedin/solve (account required — guidance tells member to create one)
- YouTube: https://support.google.com/youtube/answer/2801947 (Google account required — guidance tells member to create one)
- Email: https://lookup.icann.org (same as Scenario 1)
- Website/Domain: https://lookup.icann.org (same as Scenario 1)

**Dashboard — Impersonation Reports section:**
- Shows 3 most recent reports only
- Each card has: platform, fake handle (red), noticed date, "Get report pack →" button, "Generate case file →" button
- "View all X reports →" link opens the All Reports modal
- All Reports modal: full scrollable list, compact cards, both buttons on every report
- "View case file →" button removed from section header — replaced by per-report case file generation

**Report pack:** Pre-written text + platform link for submitting to the platform. Accessible forever from any report.

**Case file:** Formal per-report document for legal escalation. Opens in new browser tab. Contains:
- Member section: display name, REAL ID, member since, government ID status
- Platform section: verified handle + verified date for affected platform
- Incident section: platform, fake handle, situation, date noticed, date logged
- Registry statement with link to public profile
- Print/Save PDF button
- Situation shows as "—" for reports logged before 6 June 2026 (before situation column was added)

---

## KNOWN MOBILE BUGS — QUEUED FOR NEXT SESSION

1. **Hero search input background** — renders white instead of frosted/transparent on mobile. Browser CSS override — requires `!important` declarations in the stylesheet on `#heroSearchInput`.
2. **Report pack modal opens behind "All Reports" modal on mobile** — works correctly on desktop. On mobile only, clicking "Get report pack →" from inside the All Reports modal opens the report pack behind it. Needs z-index fix or close-then-open logic.
3. **Case file renders at desktop width on mobile** — squashes into the left corner of the screen instead of filling the mobile viewport. Needs mobile-responsive CSS.

---

## SUPABASE TABLES

**members**
user_id, real_id, display_name, legal_name, email, bio, location, contact_email, avatar_url, id_verified, founding_member, created_at, profile_url, impersonation_count (legacy — not used for display)

**platform_verifications**
id, user_id, platform, handle, status, is_primary, verification_code, verified_at, compromised_at, recovered_at, compromise_status, compromise_notes, created_at

**impersonation_reports**
id, user_id, platform, fake_handle, verified_handle, date_noticed, notes, created_at, situation ✅ (column added 6 June 2026)

**Waitlist**
id, created_at, name, email, handle, platform_request

RLS policies: Members can insert own reports, Members can view own reports, Anon can read impersonation count

---

## FULL BUILD LOG

1. Project scaffolded ✅
2. Supabase connected ✅
3. Stripe connected ✅
4. Sign up flow ✅
5. Email confirmation flow ✅
6. Payment flow ✅
7. Stripe webhook ✅
8. Government ID verification (Stripe Identity) ✅
9. REAL ID assigned on webhook ✅
10. Member dashboard — basic shell ✅
11. Platform verification — Instagram ✅
12. Platform verification — TikTok ✅
13. Platform verification — X/Twitter ✅
14. Platform verification — Facebook ✅
15. Platform verification — LinkedIn ✅
16. Platform verification — YouTube (API auto-check) ✅
17. Platform verification — Website/Domain (DNS TXT auto-check) ✅
18. Platform verification — Email (confirmation link) ✅
19. Public profile page ✅
20. REAL ID in public URL ✅
21. Shield badge ✅
22. Founding member badge ✅
23. Government ID confirmed badge ✅
24. Bio, location, contact on profile ✅
25. Avatar upload ✅
26. Primary/Backup platform badges ✅
27. Platform card stacked layout ✅
28. Verification code display and copy ✅
29. Manual check flow (bio code platforms) ✅
30. Auto-check flow (YouTube, Website, Email) ✅
31. Verified at timestamp on cards ✅
32. Admin page ✅
33. Admin — view all members ✅
34. Admin — manually verify platforms ✅
35. Admin — open profile link ✅
36. Report Compromise modal ✅
37. Report Compromise — Hacked option ✅
38. Report Compromise — Banned option ✅
39. Report Compromise — Lost access option ✅
40. Report Compromise — Banned hidden for Email and Website ✅
41. Report Compromise — Disputed option removed permanently ✅
42. Compromise warning on public profile ✅
43. Compromise warning copy locked ✅
44. Recovery flow ✅
45. Recovered platforms — show as normal verified ✅
46. Trust timeline on public profile ✅
47. Trust timeline — Member since ✅
48. Trust timeline — Founding Member status granted ✅
49. Trust timeline — Government ID confirmed ✅
50. Trust timeline — Platform verified entries ✅
51. Trust timeline — Compromise reported entries ✅
52. Trust timeline — Recovery entries ✅
53. Trust timeline — Lost access entries ✅
54. Trust timeline — compromised_at column ✅
55. Trust timeline — recovered_at column ✅
56. Removed platforms — hidden from cards, shown in timeline only ✅
57. Removed platforms — separate Supabase query ✅
58. RLS policy — anon can read removed rows ✅
59. Two column layout — platforms 40% / timeline 60% ✅
60. Mobile — single column stack ✅
61. Impersonation report modal ✅
62. Impersonation report — platform dropdown ✅
63. Impersonation report — verified handle dropdown (filters by selected platform) ✅
64. Impersonation report — fake handle field ✅
65. Impersonation report — date noticed (auto-fills today) ✅
66. Impersonation report — notes field with evidence guidance ✅
67. Impersonation report — screenshot tip ✅
68. Impersonation report — overlay click does NOT save, only Submit saves ✅
69. Impersonation report — success screen ✅
70. Impersonation report — pre-written report text on success screen ✅
71. Impersonation report — COPY button on success screen ✅
72. Impersonation report — evidence checklist on success screen ✅
73. Impersonation report — platform report button on success screen ✅
74. Impersonation report — "Get report pack →" on each report card ✅
75. Impersonation report — two scenario selector ✅
76. Impersonation report — Scenario 1 text (has account) ✅
77. Impersonation report — Scenario 2 text (no account on platform) ✅
78. Impersonation report — Scenario 2 hides verified handle dropdown ✅
79. Impersonation count — live from impersonation_reports table (not stored field) ✅
80. Impersonation count — anon SELECT RLS policy added to Supabase ✅
81. Platform report URLs — all six confirmed working 31 May 2026 ✅
82. TikTok report URL — tiktok.com/legal/report/submit-requests ✅
83. Instagram report URL — direct impersonation form ✅
84. X/Twitter report URL — direct impersonation form ✅
85. Facebook report URL — direct impersonation report page ✅
86. LinkedIn report URL — a1338436 ✅
87. .gitignore — .claude/ excluded ✅
88. DNS verification — Google DNS-over-HTTPS ✅
89. DNS verification — auto-retry every 60 seconds ✅
90. DNS verification — silent fails, no browser alert popup ✅
91. DNS verification — pulsing dot checking status ✅
92. DNS verification — @ symbol stripped from domain before lookup ✅
93. DNS verification — debug logs removed ✅
94. DNS verification — modal auto-closes after failed check ✅
95. Dashboard footer — "Need help? Contact us →" mailto link ✅
96. Automatic platform cards — "Having trouble? Contact us →" mailto link ✅
97. Login page ✅
98. Signup page ✅
99. Email confirmed page ✅
100. Privacy policy page ✅
101. Terms page ✅
102. Index/landing page ✅
103. Vercel deployment ✅
104. Custom domain — realverified.co.uk ✅
105. Google Search Console verified ✅
106. Trust Score row — removed from index.html comparison table ✅
107. Trust Score — leftover code confirmed already clean in profile.html ✅
108. Modal scroll lock — body.modal-open CSS, all 6 modals covered ✅
109. Impersonation success screen — upgraded to two-route layout ✅
110. Impersonation success screen — green Recommended Formal Report block ✅
111. Impersonation success screen — grey Also report in-app block ✅
112. Impersonation success screen — evidence checklist updated ✅
113. Impersonation success screen — "Copy this text and paste into description field" instruction ✅
114. Scenario-aware formal report URLs — all 12 platform/scenario combinations ✅
115. Scenario-aware guidance text — all 12 combinations with honest account requirements ✅
116. YouTube-specific guidance — policy page, instructs to click report the channel ✅
117. LinkedIn Scenario 2 — honest warning that account creation required ✅
118. X/Twitter Scenario 1 — correct form path guidance ✅
119. X/Twitter Scenario 2 — account required, create free account then report ✅
120. Facebook — confirmed same URL works for both scenarios ✅
121. TikTok — confirmed email only, no account needed for formal form ✅
122. Platform-specific in-app guidance — four buckets correctly handled ✅
123. All six platforms both scenarios — fully tested and confirmed 6 June 2026 ✅
124. Situation column added to impersonation_reports table in Supabase ✅
125. dashboard.html — situation saved on report submission ✅
126. openReportPack — reads situation from stored report, uses correct scenario key ✅
127. Waitlist confirmation email — api/waitlist.js created via Resend ✅
128. Waitlist email — white shield PNG (shield-email-white.png) in navy header ✅
129. Waitlist email — duplicate prevention (checks email before inserting) ✅
130. Waitlist email — no duplicate row, no duplicate email sent ✅
131. shield-email.png — proper branded PNG generated and committed ✅
132. shield-email-white.png — white version generated and committed ✅
133. shield-email.svg — old SVG deleted from repo ✅
134. index.html — waitlist form now POSTs to /api/waitlist instead of Supabase directly ✅
135. Dashboard — impersonation reports limited to 3 most recent ✅
136. Dashboard — "View all X reports →" link opens All Reports modal ✅
137. All Reports modal — full scrollable list of every report ✅
138. All Reports modal — compact cards (platform + handle + dates on two lines) ✅
139. All Reports modal — "Get report pack →" on every report ✅
140. All Reports modal — "Generate case file →" on every report ✅
141. Dashboard report cards — both buttons added ("Get report pack →" and "Generate case file →") ✅
142. "View case file →" button removed from section header ✅
143. generateCaseFile function — opens branded print-ready document in new tab ✅
144. Case file — member section (name, REAL ID, member since, gov ID status) ✅
145. Case file — platform section (verified handle + verified date) ✅
146. Case file — incident section (platform, fake handle, situation, dates) ✅
147. Case file — registry statement with public profile link ✅
148. Case file — Print/Save PDF button ✅
149. Case file — hardcoded "London, UK" removed from footer ✅
150. All modal headers — sticky (stays fixed while content scrolls beneath) ✅
151. All Reports modal — padding and scroll structure fixed ✅
152. Landing page — section label updated to "YOUR ENTIRE ONLINE BUSINESS. VERIFIED." ✅
153. Landing page — heading updated to "One verified home for everything your business runs from." ✅
154. Landing page — subheading rewritten around cross-platform proof ✅
155. Landing page — Step 04 copy updated to honest guided reporting language ✅
156. Landing page — stats bar: £0 replaced with "8+ Platforms verified under one profile" ✅
157. Landing page — stats bar layout fixed (gap reduced, all 4 in one row) ✅
158. Landing page — comparison table scrollable on mobile with fade gradient ✅
159. Landing page — nav buttons premium rounded styling on mobile ✅
160. Landing page — desktop section spacing reduced from 100px to 72px ✅
161. Landing page — impersonation case file row updated to honest description ✅
162. What is REAL page — "Who It's For" broadened to all online businesses ✅
163. What is REAL page — "Honesty" section updated to honest claim ✅
164. What is REAL page — FAQ storefront link argument sharpened ✅
165. Dashboard — border-radius added to all buttons (premium styling) ✅
166. Signup and login — border-radius added to all buttons and inputs ✅
167. Report modal — platform-specific labels and placeholders for all 8 platforms ✅
168. Report modal — Email scenario options rewritten with correct language ✅
169. Report modal — Website/Domain scenario options rewritten with correct language ✅
170. Report modal — Email formal report route: ICANN WHOIS + Action Fraud ✅
171. Report modal — Website/Domain formal report route: ICANN WHOIS + Action Fraud ✅
172. Report modal — Website/Domain pre-written report text fixed for both scenarios ✅
173. Report modal — empty space at top of modal removed ✅
174. Landing page — nav magnifying glass search removed ✅
175. Landing page — hero search bar built (visible in hero, above CTA buttons) ✅
176. Landing page — hero search queries Supabase by real_id and display_name ✅
177. Landing page — hero search shows result card with name, REAL ID, verified since date ✅
178. Landing page — hero search result links to public profile ✅
179. Landing page — hero search empty result shows "No verified profile found" warning message ✅
180. Landing page — hero subtext shortened to single line ✅
181. Landing page — hero shield margin reduced for tighter layout ✅

**Current step: 181**

---

## NEXT SESSION — START HERE

**Fix first (mobile bugs):**
1. Hero search input background — white on mobile, needs frosted/transparent via `#heroSearchInput { background: transparent !important; }` in stylesheet
2. Report pack opening behind All Reports modal on mobile — z-index or close-then-open logic
3. Case file not scaling to mobile width — needs responsive CSS

**Then build:**
4. Member welcome email — sent after government ID verification confirmed. "Your REAL ID is live. Here's your profile." Priority 1 carry-forward.
5. Verification certificate PDF (original Step 9)
6. Billing portal (original Step 13)
7. Email sequences (original Step 15)
8. FAQ / Help page (original Steps 17 & 18)
9. Final polish & launch (original Step 19)

**Deferred:**
- Clean slate member journey — delete test data, sign up fresh as real paying member, earn RL-000001 properly. Do NOT do until all remaining builds complete.

---

## 19-STEP ORIGINAL BUILD PLAN — STATUS

| Step | Description | Status |
|---|---|---|
| 1 | Database & Auth | ✅ Complete |
| 2 | Legal pages | ✅ Complete |
| 3 | Stripe billing | ✅ Complete |
| 4 | Stripe Identity | ✅ Complete |
| 5 | Platform verification | ✅ Complete |
| 6 | Public REAL profile | ✅ Complete |
| 7 | Trust timeline | ✅ Complete |
| 8 | Shield badge | ✅ Complete |
| 9 | Verification certificate PDF | ⏳ Pending |
| 10 | Search feature | ✅ Complete (hero search built 7 June 2026) |
| 11 | Impersonation reporting | ✅ Complete |
| 12 | Member dashboard | ✅ Complete |
| 13 | Billing portal | ⏳ Pending |
| 14 | Onboarding / welcome email | ⏳ Pending |
| 15 | Email sequences | ⏳ Pending |
| 16 | Crisis flows (compromise/hack) | ✅ Complete |
| 17 | About / Help page | ⏳ Pending |
| 18 | FAQ / Help | ⏳ Pending |
| 19 | Final polish & launch | ⏳ Pending |

---

## FUTURE BUILDS — AGREED

- Member welcome email (post ID verification confirmed) — Priority 1
- Impersonation report status updates (Reported / Resolved / Escalated) — pending
- 7-day escalation prompt if report stays unresolved — pending
- Scheduled alert email to admin when automatic verification pending over 2 hours
- Member statement on lost accounts — timestamped public declaration ("Anyone using this account is not me")
- Handle change re-verification flow
- Rebrand flow
- Cancellation flow
- Help page
- /yourname redirect URLs
- Billing portal
- Shareable verification link
- Verification certificate PDF
- Trademark registration — unlocks @realverified handle claim on Instagram and TikTok (currently taken by inactive accounts)
- Platform partnerships — REAL-verified members get prioritised abuse report responses (longer term)
- DM outreach assistant (personalised, built in Claude)
- Content writing assistant in Sadi's voice
- Landing page chat widget

---

## FUTURE BUILDS — WHEN REVENUE SUPPORTS IT

Twitter/X auto-check ($100/month), TikTok auto-check, Commerce platform verification, REAL Pro tier, REAL Business tier, Dedicated Google Workspace emails, Solicitor review of legal docs, Register as limited company, Business bank account, Accounting software, VAT registration at £90k/year

---

## OUTREACH PIPELINE

**Olivia (elevatewitholivia)** — Runs Elevate Digital Academy. 50+ fake TikTok accounts. Completed her course on launch day. Has seen the REAL link. Replied warmly to Instagram DM. Do not chase — ball is in her court. Let her come to the product.

**Blair Richards** — TikTok creator who publicly discusses impersonation. Genuine comments first, then DM.

**Jamie Sea** — Trust-focused course creator. Same approach.

**Natalie Ellis, Bossbabe** — Founder story resonates personally with Sadi. Same approach.

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

## PRICING

- Founding Member: £15/month — locked for life — first 100 only
- Standard Member: £25/month
- No free tier. No trial. No refunds policy.

---

## PLATFORM VERIFICATION METHODS

| Platform | Method | Auto or Manual |
|---|---|---|
| Instagram | Bio code | Manual check |
| TikTok | Bio code | Manual check |
| X/Twitter | Bio code | Manual check |
| Facebook | Bio code | Manual check |
| LinkedIn | Bio code | Manual check |
| YouTube | API check | Automatic |
| Website/Domain | DNS TXT record | Automatic |
| Email | Confirmation link | Automatic |

---

## REAL ID NUMBERING SYSTEM

- Founding members: RL-000001 through RL-000100
- Standard members: RL-000101 onwards
- Sequential, unique, permanent, never reissued
- Assigned only when Stripe webhook fires confirming payment
- Retired IDs never reassigned

---

## THE MARKET

- Global identity verification: $16.5bn now → $63bn by 2033
- 50 million+ content creators globally
- Zero platforms linking cross-platform identity together
- 12% annual growth in identity fraud
- No independent cross-platform verification for individuals exists
- Meta Verified: £9.99/month per platform (siloed) — REAL: £15/month all platforms

---

## ALL ACCOUNTS

- GitHub: saddlej1986
- Supabase project ID: esqmwktnnjuztyhityeo
- Vercel: log in with GitHub
- Stripe: email login
- Resend: info@realverified.co.uk (domain verified)
- Namecheap: email login
- Google accounts: info@visionaryduomarketing.co.uk
- Claude: existing Pro subscription

All passwords and API keys in physical notebook.

---

## API KEYS — LOCATION

All in physical notebook. Never in code. Always use environment variables.

- Stripe keys (TEST + LIVE) — in notebook
- Stripe Webhook Secret (LIVE) — updated May 2026
- YouTube Data API Key — labelled "REAL YouTube API"
- Resend API Key — labelled "REAL Resend API"
- Founding Member Payment Link: https://buy.stripe.com/00wcMX33dcJc4KxeXogjC00
- Standard Member Payment Link: https://buy.stripe.com/14A5kveLV6kOa4R9D4gjC01

---

## COSTS SO FAR

- Domain realverified.co.uk — Namecheap
- Claude Pro — £18.99/month
- Google Workspace — existing
- Everything else — free tier

---

## LAUNCH STRATEGY

Phase 1 — Inner circle: 10 known contacts
Phase 2 — Warm outreach: 20 creators/business owners with impersonation issues
Phase 3 — Founder post: honest story of why REAL exists
Phase 4 — PR: tech journalists and creator economy newsletters month 2

---

## THE FOUNDER STATEMENT

"I watched real people — people trying to change their lives — fight the same battle every single day. Fake accounts. Impersonators. Scammers wearing their face. The exhausting repetition of 'this is my only account' and 'I will never DM you first.' The same technology that helps people build genuine businesses helps bad actors build perfect fakes. There had to be a single source of truth. One place. One verified identity. Every platform confirmed. So anyone can check for themselves in seconds. I just wanted a little bit of honesty in a dishonest world. That's REAL."
