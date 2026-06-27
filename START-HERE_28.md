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
11. **Display name vs legal name.** Public profile shows display name only. Legal name stored privately, never shown publicly.
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
26. **The case file is now called "Evidence Report" everywhere members see it.** The function in code is still called generateCaseFile — do not rename code identifiers.
27. **Evidence reports are logged in the case_files table in Supabase.** First generation logs the record. Subsequent generations reproduce the same document without creating a new row. The case reference is REAL-[first 8 chars of report ID, uppercase].
28. **The hero search on the landing page is the primary public search.** The nav magnifying glass icon has been removed. Search lives in the hero section — visible immediately on page load.
29. **Hero search queries Supabase members table by real_id (exact match) and display_name (ilike).** Only verified members appear. Empty result shows: "No verified profile found. If someone is claiming to be REAL verified, treat that with caution."
30. **Evidence reports are generated on the fly — not stored.** Members can always regenerate the same document from the same report — the reference number is always consistent. The case_files table logs when it was first officially issued.
31. **REAL does not prevent fakes — it makes them immediately identifiable.** This is the honest positioning and must be reflected in all copy across all pages.

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

**Current hero headline (landing page):**
"Fake accounts copy your name. They can't copy your REAL ID."

**Current hero subline:**
"One link. One ID. One verified record that travels with you across every platform you're on — controlled by you, readable by anyone."

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

**Current step: 211**

---

## NEXT SESSION — START HERE

**Priority 1 — Member welcome email:**
Email sent after government ID verification is confirmed. "Your REAL ID is live. Here's your profile link." This is the moonshot email — should feel like a ceremony, not a transaction. The moment someone crosses from unprotected to protected. Carry-forward from multiple sessions — do not defer again.

**Priority 2 — Remaining builds in order:**
- Verification certificate PDF (original Step 9)
- Billing portal (original Step 13)
- Email sequences (original Step 15)
- FAQ / Help page (original Steps 17 & 18)
- Final polish & launch (original Step 19)

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

- Member welcome email (post ID verification confirmed) — Priority 1 next session
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
