# REAL — Master Briefing Document
# Paste this entire document at the start of every new Claude chat
# Version 30 — Updated 20 June 2026 (evening session)

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
11. **Display name vs legal name.** Public profile shows display name only. Legal name stored privately, never shown publicly.
12. **Website/Domain verification uses DNS TXT record auto-check via api/domain-verify.js.**
13. **Payment must come before government ID verification.** Order: Sign up → Email confirm → Pay → ID verification → Link platforms → REAL ID assigned.
14. **Profile pictures are personalisation only — not a verification tool.**
15. **Public profile URLs use REAL ID numbers — not usernames.** realverified.co.uk/RL-000001. Confirmed via vercel.json rewrite rule: `/RL-:id` → `/profile.html`. Any link generated elsewhere on the site MUST follow this exact format with no extra path segments (e.g. never `/profile/RL-000001`).
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
26. **The case file is now called "Evidence Report" everywhere members see it.** The function in code is still called generateCaseFile — do not rename code identifiers.
27. **Evidence reports are logged in the case_files table in Supabase.** First generation logs the record. Subsequent generations reproduce the same document without creating a new row. The case reference is REAL-[first 8 chars of report ID, uppercase].
28. **The hero search on the landing page is the primary public search.** The nav magnifying glass icon has been removed. Search lives in the hero section — visible immediately on page load.
29. **Hero search queries Supabase members table by real_id (exact match) and display_name (ilike).** Only verified members appear. Empty result shows: "No verified profile found. If someone is claiming to be REAL verified, treat that with caution."
30. **Evidence reports are generated on the fly — not stored.** Members can always regenerate the same document from the same report — the reference number is always consistent. The case_files table logs when it was first officially issued.
31. **REAL does not prevent fakes — it makes them immediately identifiable.** This is the honest positioning and must be reflected in all copy across all pages.
32. **REAL never implies that linking more platforms makes someone more trustworthy or "stronger."** One verified platform carries exactly the same weight as ten. This applies to all copy, including emails — platform count must never function as an informal score. Caught as a near-miss in the member welcome email draft, 20 June 2026.
33. **No copy should claim a "race" for founding numbers or low REAL IDs is already happening unless real payment access is actually live to the public.** Waitlist signup order is NOT the same as founding member order — founding numbers are only assigned by payment order, once REAL actually opens. Discovered and fixed across the landing page 20 June 2026.

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

**Sadi's "three shops" framing — strong, reusable language (added 20 June 2026):**
"A business online might be three different shops — Facebook, TikTok, Instagram — doing the same thing, with nothing linking them together." A physical business is registered and visible — people can see it and visit it. An online business can be spread across multiple platforms with nothing proving they're all the same operation. This is a sharper, more vivid way of stating REAL's core thesis than anything currently on the page. Already worked into the new mechanism section (see below) — worth reusing on the what-is-real page, in outreach messages, and in future content.

**Current hero headline (landing page):**
"Fake accounts copy your name. They can't copy your REAL ID."

**Current hero subline:**
"One link. One ID. One verified record that travels with you across every platform you're on — controlled by you, readable by anyone."

---

## MARKETING & COPY PRINCIPLES — LEARNED 20 JUNE 2026

These principles came directly from this session's landing page and copy work and should guide all future copy decisions:

**Sadi's authentic voice for persuasive copy:** Direct, "I give a shit" energy. Confident, not needy. States facts plainly rather than asking for approval or validation. Avoid anything that sounds "beggy" — e.g. phrases like "that's worth something," "if that's you, don't overthink it" were rejected as too needy. Sadi prefers copy that sounds like a person who has already made their mind up, not someone hoping for a reaction.

**On the founding member discount specifically:** It is not positioned as "better" — founding and standard members get the exact same product, same verification, same REAL ID quality. The £15 vs £25 difference is framed as a genuine thank-you for early belief, not a tiered product. This must stay consistent in all future copy — never imply standard members get less. (Sadi decided 20 June 2026 that this does NOT need its own explainer section on the page — if it's not bugging him, it doesn't need defending. No gap-filler copy was built for this.)

**On urgency/scarcity copy:** Must be real, never manufactured. The 100 founding spots are a genuine, considered limit (what one founder can properly stand behind), not an artificial scarcity trick. Copy can state this honestly without apologising for it.

**On urgency that hasn't started yet (new principle, 20 June 2026):** If there's no single, real "opening" event live yet — i.e. the public can't actually pay, only join a waitlist — don't write copy implying a race for low numbers is already underway. This was found and fixed across the landing page: a "first come, first served" framing was misleading while no payment mechanism was actually live to the public. The honest urgency lever pre-launch is exclusivity of notification (e.g. "the only guaranteed way to know"), never an invented countdown.

**"Guaranteed" outlasts "exclusive" (new principle, 20 June 2026):** Claiming something is the "only" way to know or access something is risky if future marketing plans (e.g. the planned high-CPM YouTube channel) could make that false later. Framing as "the only guaranteed way" instead of "the only way" stays true regardless of what other channels get added down the line. Caught when Sadi flagged that the planned YouTube channel would also tell people REAL had opened, breaking a claim that the waitlist was the "only" way to find out.

**Abstract claims need a named, concrete anchor (new principle, 20 June 2026):** "Every other form of verification belongs to someone else" meant nothing concrete to a reader until it was rewritten to name the actual thing — "a blue tick belongs to the platform that gave it to you." General rule: never reference a category of thing in copy without naming a real, recognisable example of it.

**Fact-check marketing claims before they ship, even obvious-seeming ones (new principle, 20 June 2026):** The claim that platforms can revoke verification badges at will was verified via Instagram's own Help Center, TikTok's stated policy, and Meta Verified's Terms of Service before being used in the mechanism section — confirmed true and defensible, not assumed. Real-world example on file if ever useful: X (formerly Twitter) mass-removed legacy blue checkmarks from long-standing verified accounts in 2023 when it changed to a paid verification model.

**Two consecutive sections in identical typography read as repetitive even with different content (new principle, 20 June 2026):** The new mechanism section was originally built in the same italic serif as the founder quote sitting directly above it and felt "too samey" on review. Changed to upright (non-italic) serif of the same font family — same brand language, but visually distinct, signalling "this is a different kind of statement" (a fact REAL is stating, not a personal reflection from Sadi).

**On the "mechanism" section (Hormozi framework):** Should build belief, not explain process — that's a different job from the "How REAL works" steps. Comparison point used: Instagram and TikTok never explained their algorithms or mechanics before people used them — they sold the outcome, not the explanation. Some trust-building is still appropriate for REAL given it involves government ID, but should be short and confident, not a tutorial. ✅ Built and live 20 June 2026 — see build log.

**On testimonials/social proof:** REAL has none yet — zero paying members confirmed beyond Sadi himself. Never invent or imply fake testimonials, this breaches REAL's core honesty principle. Wait for genuine founding members before adding any social proof section, and credit real names when used.

**On checking the live site:** Claude's web_fetch tool has repeatedly returned stale/cached versions of realverified.co.uk throughout building sessions, even minutes after a confirmed live deployment. The site is also not yet appearing in web search results (too new, not indexed/no backlinks yet — expected at this stage, not a problem to fix). Screenshots from Sadi remain the only reliable way for Claude to verify live changes. Do not rely on web_fetch for this site until it's been confirmed working again.

**On Vercel deployment getting stuck:** A deployment once sat "Building" for 43+ minutes with no progress. Fix that worked: cancel the stuck deployment, then force a genuine new commit (a real content change, not a no-op) to trigger a fresh deployment. A redeploy of an old commit will NOT pick up new changes — must be a fresh commit from current code.

**On Claude Code's diff counter:** A single-character fix once showed a diff stat of "+41,228 −1,580" in the Claude Code interface. This was a running total for the whole conversation thread/branch, not the size of the actual change made. If a diff number looks alarmingly large for a small instruction, check the described change itself and test the live site rather than panicking at the number — but always verify live functionality before trusting it, never just assume.

---

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
- Each card has: platform, fake handle (red), noticed date, "Get report pack →" button, "Generate evidence report →" button
- If evidence report already logged for that report: button replaced with "✓ Evidence report logged — view →" green text (clicking view regenerates the document)
- "View all X reports →" link opens the All Reports modal
- All Reports modal: full scrollable list, compact cards, both buttons on every report, same logged state indicator
- Bottom of section shows: "X evidence reports officially logged by REAL. View logged evidence reports →" link opening a modal listing all logged references with dates

**Report pack:** Pre-written text + platform link for submitting to the platform. Accessible forever from any report.

**Evidence Report (formerly Case File):** Formal per-report document for legal escalation. Opens in new browser tab via blob URL. Contains:
- Member section: display name, legal name (full_name if stored, otherwise "Verified against government-issued ID — held securely by REAL"), REAL ID, member since, government ID status
- Case reference: REAL-[first 8 chars of report ID, uppercase]
- Green confirmation banner: "✓ This evidence report has been officially logged by REAL — Reference REAL-XXXXXXXX"
- Platform section: verified handle + verified date for affected platform
- Incident section: platform, fake handle, situation, date noticed, date logged, evidence reference line
- Registry statement with public profile link
- Action Requested section
- Print/Save PDF button
- Situation shows as "—" for reports logged before 6 June 2026 (before situation column was added)
- Members can regenerate the same document at any time — same reference number always produced for same report

---

## SUPABASE TABLES

**members**
user_id, real_id, display_name, full_name (legal name — stored privately, never shown publicly), email, bio, location, contact_email, avatar_url, id_verified, founding_member, created_at, profile_url, impersonation_count (legacy — not used for display)

**platform_verifications**
id, user_id, platform, handle, status, is_primary, verification_code, verified_at, compromised_at, recovered_at, compromise_status, compromise_notes, created_at

**impersonation_reports**
id, user_id, platform, fake_handle, verified_handle, date_noticed, notes, created_at, situation ✅ (column added 6 June 2026)

**case_files** ✅ (table created 14 June 2026)
id, member_id, report_id, case_reference, generated_at
RLS: authenticated INSERT (with check true), authenticated SELECT (using true)
Data API: enabled (all 5 tables exposed)

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
109. Email scenario — confirmation link flow (not bio code) ✅
110. Email scenario — Step B sends email directly, skips Step C ✅
111. Email modal — bio code box hidden for email platform ✅
112. YouTube scenario — Scenario 2 honest warning that account creation required ✅
113. LinkedIn Scenario 2 — honest warning that account creation required ✅
114. X/Twitter Scenario 1 — correct form path guidance ✅
115. X/Twitter Scenario 2 — account required, create free account then report ✅
116. Facebook — confirmed same URL works for both scenarios ✅
117. TikTok — confirmed email only, no account needed for formal form ✅
118. Platform-specific in-app guidance — four buckets correctly handled ✅
119. All six platforms both scenarios — fully tested and confirmed 6 June 2026 ✅
120. Situation column added to impersonation_reports table in Supabase ✅
121. dashboard.html — situation saved on report submission ✅
122. openReportPack — reads situation from stored report, uses correct scenario key ✅
123. Waitlist confirmation email — api/waitlist.js created via Resend ✅
124. Waitlist email — white shield PNG (shield-email-white.png) in navy header ✅
125. Waitlist email — duplicate prevention (checks email before inserting) ✅
126. Waitlist email — no duplicate row, no duplicate email sent ✅
127. shield-email.png — proper branded PNG generated and committed ✅
128. shield-email-white.png — white version generated and committed ✅
129. shield-email.svg — old SVG deleted from repo ✅
130. index.html — waitlist form now POSTs to /api/waitlist instead of Supabase directly ✅
131. Dashboard — impersonation reports limited to 3 most recent ✅
132. Dashboard — "View all X reports →" link opens All Reports modal ✅
133. All Reports modal — full scrollable list of every report ✅
134. All Reports modal — compact cards (platform + handle + dates on two lines) ✅
135. All Reports modal — "Get report pack →" on every report ✅
136. All Reports modal — "Generate evidence report →" on every report ✅
137. Dashboard report cards — both buttons added ✅
138. generateCaseFile renamed visibly to "Generate evidence report →" everywhere members see ✅
139. Evidence report document titled "Identity Evidence Report" ✅
140. Evidence report — member section (name, REAL ID, member since, gov ID status) ✅
141. Evidence report — platform section (verified handle + verified date) ✅
142. Evidence report — incident section (platform, fake handle, situation, dates) ✅
143. Evidence report — registry statement with public profile link ✅
144. Evidence report — Print/Save PDF button ✅
145. Evidence report — hardcoded "London, UK" removed from footer ✅
146. All modal headers — sticky (stays fixed while content scrolls beneath) ✅
147. All Reports modal — padding and scroll structure fixed ✅
148. Landing page — section label updated to "YOUR ENTIRE ONLINE BUSINESS. VERIFIED." ✅
149. Landing page — heading updated to "One verified home for everything your business runs from." ✅
150. Landing page — subheading rewritten around cross-platform proof ✅
151. Landing page — Step 04 copy updated to honest guided reporting language ✅
152. Landing page — stats bar: £0 replaced with "8+ Platforms verified under one profile" ✅
153. Landing page — stats bar layout fixed (gap reduced, all 4 in one row) ✅
154. Landing page — comparison table scrollable on mobile with fade gradient ✅
155. Landing page — nav buttons premium rounded styling on mobile ✅
156. Landing page — desktop section spacing reduced from 100px to 72px ✅
157. Landing page — impersonation case file row updated to honest description ✅
158. What is REAL page — "Who It's For" broadened to all online businesses ✅
159. What is REAL page — "Honesty" section updated to honest claim ✅
160. What is REAL page — FAQ storefront link argument sharpened ✅
161. Dashboard — border-radius added to all buttons (premium styling) ✅
162. Signup and login — border-radius added to all buttons and inputs ✅
163. Report modal — platform-specific labels and placeholders for all 8 platforms ✅
164. Report modal — Email scenario options rewritten with correct language ✅
165. Report modal — Website/Domain scenario options rewritten with correct language ✅
166. Report modal — Email formal report route: ICANN WHOIS + Action Fraud ✅
167. Report modal — Website/Domain formal report route: ICANN WHOIS + Action Fraud ✅
168. Report modal — Website/Domain pre-written report text fixed for both scenarios ✅
169. Report modal — empty space at top of modal removed ✅
170. Landing page — nav magnifying glass search removed ✅
171. Landing page — hero search bar built (visible in hero, above CTA buttons) ✅
172. Landing page — hero search queries Supabase by real_id and display_name ✅
173. Landing page — hero search shows result card with name, REAL ID, verified since date ✅
174. Landing page — hero search result links to public profile ✅
175. Landing page — hero search empty result shows "No verified profile found" warning message ✅
176. Landing page — hero subtext shortened to single line ✅
177. Landing page — hero shield margin reduced for tighter layout ✅
178. Hero search input — transparent on mobile via !important CSS ✅
179. Hero search bar — unified pill shape (input and button as one seamless unit) ✅
180. Join the founding waitlist button — rounded pill styling ✅
181. Dashboard — back button on mobile no longer navigates to login page ✅
182. All Reports modal — back button from report pack returns to All Reports, not dashboard ✅
183. Case file — renders full width on mobile via blob URL approach ✅
184. Login page — show/hide password toggle added ✅
185. members table — full_name column confirmed exists in Supabase ✅
186. Stripe webhook — saves verified full_name to members table on gov ID confirmation ✅
187. Dashboard — full_name now fetched alongside other member data ✅
188. Evidence report — case reference number added (REAL-[first 8 chars of report ID, uppercase]) ✅
189. Evidence report — legal name field added ✅
190. Evidence report — evidence reference line added to incident section ✅
191. Evidence report — Action Requested section added after Registry Statement ✅
192. Landing page — hero headline updated to "Fake accounts copy your name. They can't copy your REAL ID." ✅
193. Landing page — hero subline updated to "One link. One ID. One verified record..." ✅
194. Landing page — problem section copy sharpened with honest positioning line ✅
195. What is REAL page — "Impossible to replicate" removed ✅
196. What is REAL page — "A fake account cannot replicate this step" removed ✅
197. Dashboard — "Case file" renamed to "Evidence report" everywhere members see ✅
198. case_files table created in Supabase with RLS policies ✅
199. Evidence report — logs to case_files table on first generation only ✅
200. Evidence report — duplicate protection (same report never logs twice) ✅
201. Evidence report — green confirmation banner with reference number ✅
202. Dashboard — "X evidence reports officially logged by REAL" count below reports section ✅
203. Dashboard — "View logged evidence reports →" opens modal listing all logged references ✅
204. Dashboard — "✓ Evidence report logged — view →" replaces button on logged reports ✅
205. Dashboard — logged state indicator consistent in both main cards and All Reports modal ✅
206. Dashboard — #memberName initialised empty (no flash of old name on login) ✅
207. Dashboard — main content starts at opacity:0 and fades in once renderPlatforms() runs — eliminates flash of default/placeholder state on load ✅
208. Dashboard — #statusMeta initialised empty — "Complete the steps below to activate your REAL ID" no longer flashes as default text ✅
209. vercel.json — Cache-Control: no-store header added for all .html files ✅
210. Dashboard — onpageshow reload added to body to handle browser back/forward cache ✅
211. All Reports modal — bottom padding increased to 40px — last report card no longer cut off on mobile ✅
212. Landing page — problem section body paragraph rewritten: "A fake account. Your face. Their scam. Your reputation destroyed. And nothing on the internet to prove it wasn't you. Until now." ✅
213. Landing page — Problem card 1 (Impersonation at scale) rewritten: "It takes five minutes and a screenshot of your profile. Thousands of followers. Your face. Your bio. Indistinguishable from the real you." ✅
214. Landing page — Problem card 2 (Blue ticks aren't enough) rewritten: "Platform property. One platform only. Some can be bought. All of them can be taken away." ✅
215. Landing page — Problem card 3 (No cross-platform proof) rewritten: "Nowhere on the internet to point and say — every account here is mine, verified, timestamped, impossible to fake. Until now." ✅
216. Landing page — Founder statement repositioned from page bottom to immediately after the three problem cards, before "How REAL works." New section labelled "WHY I BUILT THIS." Attribution changed from "— REAL Founder" to "— Sadi, Founder of REAL." Duplicate removed from bottom of page. ✅
217. Landing page — spacing fixed above "WHY I BUILT THIS" section (was 144px gap, reduced to 72px to match standard section spacing) ✅
218. Landing page — spacing fixed between "How REAL works" and "What REAL verifies" (was near-zero gap, increased to standard 144px combined section spacing) ✅
219. Landing page — new scarcity line added directly above "Founding Members — 100 spots only" section: "Every day you wait, someone else takes a lower number. RL-000001 is gone the moment someone else claims it." ✅ (superseded — see 225)
220. Landing page — anchor scroll bug fixed. Added scroll-margin-top: 80px to #how, #founding, #waitlist sections so anchor links clear the fixed nav bar properly. Increased founding-section padding-bottom and waitlist-section padding-top from 72px to 96px each (combined gap now 192px) so "Secure my founding spot" button produces genuine, visible scroll movement to the waitlist form. ✅
221. Landing page — founding perk "Your number" description corrected from "assigned in the order you join" to "assigned in the order you complete payment" for clarity ✅
222. Landing page — founding section CTA button changed from "Secure my founding spot" to "Join the founding waitlist" — old wording implied an action was being completed when it was only a scroll to the waitlist form ✅
223. Landing page — waitlist intro paragraph rewritten for honesty. Was: "Join the waitlist and be first in line for a founding member spot... First come, first served." Now: "Join the waitlist and you'll be the first to know the moment REAL opens. Founding spots go to the first 100 people to complete payment — not the order you join this list. £15/month, locked for life." ✅
224. Landing page — waitlist success message updated to flag spam/junk folder: "We'll be in touch when REAL is ready. Watch this space — and check your spam or junk folder for our confirmation email, just in case." ✅
225. Landing page — scarcity line above Founding Members section rewritten twice for honesty (see superseded step 219). Final live version: "REAL isn't open yet — and this list is the only guaranteed way to know when it is." ✅
226. BUG FIX — hero search result link was generating "/profile/RL-000001" (404, wrong format) instead of the correct "/RL-000001" per the vercel.json rewrite rule. Fixed by removing "profile/" from the template literal building the href. Confirmed live and working. ✅
227. Landing page — new "mechanism" section built and added between the "WHY I BUILT THIS" founder statement and "How REAL works." Final copy: "A blue tick belongs to the platform that gave it to you, not you. Instagram, TikTok, whoever — they can take it away the moment it suits them. REAL belongs to you. Independent. Permanent. Yours." Claim fact-checked against Instagram, TikTok, and Meta Verified's own stated policies before shipping. ✅
228. Landing page — mechanism section font changed from italic to upright serif (same font family) to visually distinguish it from the founder quote section directly above it, which had felt "too samey" in italic. ✅

**Current step: 228**

---

## NEXT SESSION — START HERE

**Priority 1 — Member welcome email (do not defer again — confirmed this session it genuinely isn't built yet):**

Confirmed 20 June 2026: the ONLY email currently live and working is the waitlist confirmation email (api/waitlist.js via Resend). The member welcome email — the one that fires the moment someone's REAL ID actually goes live — has never been built. This is the "moonshot" email: the moment someone crosses from unprotected to protected. It should feel like a ceremony, not a transaction.

**Trigger point:** must fire when the REAL ID is actually assigned — i.e. after government ID verification completes (which happens after payment, per the standard flow). NOT at payment alone. The exact file/webhook responsible for REAL ID assignment was not confirmed this session (the relevant `/api` files aren't visible in this project's file snapshot) — first job next session is to have Claude Code locate the correct webhook handler before building the email send into it.

**Approved subject line:**
"Your REAL ID — RL-{number} — is live."

**Approved body copy (ready to build):**

Hi {first name},

It's official. You're verified.

Your REAL ID number is **RL-{number}** — permanent, yours, never reassigned. From this moment, you have one verified record that travels with you across every platform you operate.

Your public profile is live now:
realverified.co.uk/RL-{number}

This is the moment fake accounts stop being able to touch you. Every platform you link from here on becomes part of one verified, timestamped record — proof anyone can check in five seconds.

Next step: head to your dashboard and link the platforms you operate from. One verified platform or ten — they're all backed by the same permanent REAL ID.

[Go to my dashboard]

Welcome to REAL.

— Sadi, Founder of REAL

**Design:** match the waitlist email exactly — same navy header, same white shield (shield-email-white.png), same premium feel, so it reads as part of the same family.

**Important:** this email must NEVER imply that linking more platforms makes someone more verified or more trustworthy (see Critical Rule 32). The "one or ten, same REAL ID" line above is deliberate and must not be softened back toward "the more you link, the stronger" framing.

**Priority 2 — Landing page: Hormozi framework pass is DONE.**

Completed 20 June 2026:
- Mechanism section — built and live (see build log #227, #228)
- Founding discount explainer — deliberately not built, Sadi decided it wasn't needed
- Social proof — correctly still deferred until real founding members exist

Nothing currently outstanding on the landing page unless a new gap is spotted.

**Priority 3 — Remaining builds in order:**
- Verification certificate PDF (original Step 9)
- Billing portal (original Step 13)
- Email sequences (original Step 15)
- FAQ / Help page (original Steps 17 & 18)
- Final polish & launch (original Step 19)

**Deferred:**
- Clean slate member journey — delete test data, sign up fresh as real paying member, earn RL-000001 properly. Do NOT do until all remaining builds complete.
- **Hormozi-style launch sequence (mapped 20 June 2026, deliberately parked):** Sadi wants this saved for when REAL is closer to finished and there's less core build to concentrate on — that's when YouTube, Instagram, and TikTok content gets incorporated properly. Four-phase framework agreed:
  1. **Content + warm outreach (already underway):** the high-CPM YouTube channel and faceless IG/TikTok ad-style posts build trust and an audience before any selling happens — proving expertise on impersonation/identity/online safety first.
  2. **The value stack:** clearly name what founding members actually get, no fluff — REAL ID under 100, £15 locked for life, verified history starting day one that can never be backdated by later joiners, direct founder access while the company is still small.
  3. **The real opening:** the one true, one-time event when REAL switches from waitlist to "first 100 people who pay." This is the only genuinely scarce, non-manufactured urgency moment in the whole sequence.
  4. **Post-100, standard members:** £25/month ongoing, no more urgency needed — the founding scarcity already did its job.

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
| 10 | Search feature | ✅ Complete (hero search built 7 June 2026, link bug fixed 20 June 2026) |
| 11 | Impersonation reporting | ✅ Complete |
| 12 | Member dashboard | ✅ Complete |
| 13 | Billing portal | ⏳ Pending |
| 14 | Onboarding / welcome email | ⏳ Pending — confirmed NOT built, Priority 1 next session |
| 15 | Email sequences | ⏳ Pending |
| 16 | Crisis flows (compromise/hack) | ✅ Complete |
| 17 | About / Help page | ⏳ Pending |
| 18 | FAQ / Help | ⏳ Pending |
| 19 | Final polish & launch | ⏳ Pending |

---

## FUTURE BUILDS — AGREED

- Member welcome email (post ID verification confirmed) — Priority 1 next session, draft copy approved, see above
- Impersonation report status updates (Reported / Resolved / Escalated) — pending
- 7-day escalation prompt if report stays unresolved — pending
- Scheduled alert email to admin when automatic verification pending over 2 hours
- Member statement on lost accounts — timestamped public declaration ("Anyone using this account is not me")
- Handle change re-verification flow
- Rebrand flow
- Cancellation flow
- Help page / explanation of what each dashboard section does
- /yourname redirect URLs
- Billing portal
- Shareable verification link
- Verification certificate PDF
- Trademark registration — unlocks @realverified handle claim on Instagram and TikTok (currently taken by inactive accounts)
- Platform partnerships — REAL-verified members get prioritised abuse report responses (longer term)
- Hormozi-style launch sequence — full four-phase framework logged 20 June 2026 (see "Deferred" above). Pick up once core build is closer to finished.

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
- Resend: info@realverified.co.uk (domain verified) — confirmed live and correctly sending the waitlist confirmation email as of 20 June 2026. Occasional placement in spam/junk folders is normal for a newer sending domain and should improve naturally over time as send volume and engagement build up — not a bug to fix.
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
