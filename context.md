# Context.md — StayOS (Airbnb Guest OS) — UI/UX Demo Spec (MVP)
Version: v0.1  
Date: 2026-03-03  
Owner: Thomas  
Product codename: **StayOS** (working name)

---

## 1) North Star
Build a **guest-facing “butler + guide”** and a **host-facing “support + upsell”** system.

**Promise (MVP):**
- Host pastes an address → system auto-builds the region pack (around-you map + picks) → host reviews by voice (hands-free) → publishes a guest web app with QR code.
- Guests get: property info + dynamic local recommendations + AI concierge + support tickets + upsell requests.

**Primary value for host:** fewer repetitive questions + better reviews.  
**Secondary value:** upsell requests (commission later).

---

## 2) MVP Scope (Hard Boundaries)
### Must-have (MVP)
1. **Host onboarding**
   - Paste address
   - Auto region pack
   - Host review of picks (approve/hide/pin) via **voice input**
   - Publish guest link + QR

2. **Guest web app**
   - “Welcome” + key property info
   - “Around you” (map + curated lists)
   - AI Butler chat (concise, human, proactive)
   - Support requests → ticket
   - Upsell catalog (request-only in MVP; optional Stripe later)

3. **Host dashboard**
   - Setup status checklist
   - Tickets inbox (triage + status)
   - Upsell requests inbox

### Not in MVP (explicitly out)
- PMS integrations
- Universal public portal for the whole region
- Heavy scraping pipelines
- Deep itinerary planning
- Multi-language perfection (EN/FR first; DE later)
- Payments if it risks time-to-launch (can be “request only” first)

---

## 3) Key Constraints & Compliance (Design Rules)
### Google Places / Maps policy-aware design
- **Store `place_id` permanently**.
- Avoid “store-everything-forever” from Google Places content.
- Our long-term moat is **our own tags + feedback + curated summaries + rankings**, not raw Google data.

### Sponsored / partnerships (later)
- If a business pays for promotion: must be clearly labeled **Sponsored**.
- In MVP: start with host-added partners + upsell requests.

### Privacy baseline
- Minimize data collection.
- Guest chat logs: keep for ops improvement with a retention policy.
- No creepy profiling; only lightweight preference questions.

---

## 4) Product Personas & Jobs
### Host / Property Manager
- Wants onboarding in minutes
- Wants fewer messages (Wi-Fi, check-in, towels)
- Wants guests happy + better reviews
- Wants simple upsell requests

### Guest
- Wants clarity + things to do now
- Wants “human” concierge experience
- Wants fast answers; minimal text
- Wants easy support

---

## 5) UX Principles (Non-negotiables)
- **Speed:** publish in <10 minutes.
- **Clarity:** no walls of text.
- **Premium minimal UI:** clean, calm, “luxury-friendly” layout.
- **AI feels human:** short, helpful, proactive.
- **Few choices:** 2–4 best options, not 20.
- **Contextual:** morning vs afternoon; winter vs summer; active vs chill; kids vs no kids.

---

## 6) IA — Information Architecture (MVP)
### Host App (Web)
- **/host/login**
- **/host/properties**
- **/host/properties/:id/setup** (onboarding wizard)
- **/host/properties/:id/region-pack** (curation screen + voice)
- **/host/properties/:id/knowledge** (property info)
- **/host/properties/:id/tickets**
- **/host/properties/:id/upsells**

### Guest App (Web, mobile-first)
- **/g/:propertySlug** (entry)
- Tabs:
  - **Home**
  - **Around You**
  - **Ask (AI Butler)**
  - **Help**
  - **Extras**

---

## 7) Core Flows (MVP)

### Flow A — Host onboarding (Wizard)
1. Paste Address
2. Confirm location preview (map pin)
3. Auto-generate Region Pack (winter/summer presets, categories)
4. Host “Review picks” screen (approve/hide/pin) — **Voice-first**
5. Add property essentials (Wi-Fi, check-in/out, house rules)
6. Publish → QR + link

**Success state:** Guest app ready.

---

### Flow B — Guest discovery + personalization
1. Guest opens link/QR
2. Quick “vibe questions” (optional, 10 seconds):
   - Active vs Chill
   - Kids? Y/N
   - Car? Y/N
3. Guest sees:
   - Top 5 “Today picks”
   - Quick actions (Wi-Fi, Check-out, Need help)
4. Guest asks AI question → AI responds briefly + suggests 2–4 actions.

---

### Flow C — Support ticket
1. Guest taps “Help” or asks AI (“need more towels”)
2. AI:
   - Tries to solve (if informational)
   - If request: creates ticket with urgency
3. Host sees ticket in inbox → updates status
4. Guest sees ticket status + ETA message

---

### Flow D — Upsell request
1. Guest taps “Extras”
2. Sees curated services (host-defined)
3. Taps request → creates upsell request (ticket-like)
4. Host confirms schedule / price (manual in MVP)

---

## 8) UI/UX Demo Screens (Detailed Spec)

### Host — Screen 1: “Add Property”
**Components**
- Address input (Google autocomplete)
- “Use my location” (optional)
- Continue CTA

**Microcopy**
- “Paste the address. We’ll build the guest app automatically.”

---

### Host — Screen 2: “Region Pack Generating”
**Components**
- Progress steps (Maps → Attractions → Essentials → Draft picks)
- Skeleton cards for categories
- ETA-less (no time promises)

---

### Host — Screen 3: “Review Picks” (Voice-first)
**Goal:** Host stands in front of list and just talks.

**Layout**
- Left: Category tabs (Food, Essentials, Ski, Activities, Health)
- Right: Cards list (each card has approve/hide/pin)
- Top: “Voice mode” toggle + mic button

**Card**
- Name, short descriptor, distance
- Buttons: ✅ Approve, ❌ Hide, ⭐ Pin
- “Edit label” (e.g., “Our favorite bakery”)

**Voice commands (examples)**
- “Pin the first bakery.”
- “Hide all bars.”
- “Approve the top five restaurants.”
- “Rename the ski rental to ‘Partner - Alpine Ski’.”
- “Show family-friendly activities.”

**Voice UX**
- Large live transcript line
- Confirmations as short toast:
  - “Pinned: Bakery du Village”
  - “Hidden: Bars (12)”
- Undo button (critical)

---

### Host — Screen 4: “Property Essentials”
**Fields**
- Wi-Fi name + password
- Check-in/out time
- Entry instructions
- House rules
- Emergency contact
- Parking
- Appliance quick tips (optional)

**UX**
- “AI autofill from text” input (paste listing text / house manual excerpt)
- Inline checklist completion bar

---

### Host — Screen 5: “Publish”
**Outputs**
- QR code
- Short link
- “Copy message to send guests” template:
  - “Welcome! Here’s your digital guide + concierge…”

---

### Guest — Screen 1: “Welcome”
**Top section**
- Property name + hero image (optional)
- Quick actions tiles:
  - Wi-Fi
  - Check-out
  - House rules
  - Ask concierge

**Today picks**
- 5 cards max with reasons:
  - “Great morning bakery”
  - “Scenic short hike”
  - “Family-friendly spot”

---

### Guest — Screen 2: “Around You”
**Tabs**
- Recommended
- Food
- Essentials
- Nature
- Ski (seasonal)
- Health

**Map**
- Minimal map with filter chips
- List below map with 8–12 items max per category
- Each item: one-line summary + open in Google Maps

---

### Guest — Screen 3: “Ask” (AI Butler)
**Chat constraints**
- Short answers (3–6 lines)
- 2–4 options maximum
- One smart follow-up question when helpful
- “Quick reply chips” (contextual):
  - “Breakfast now”
  - “Easy hike”
  - “Kids activities”
  - “I feel sick”
  - “Need towels”

**Tone**
- Human, calm, confident, not salesy
- No rambling, no disclaimers unless needed

---

### Guest — Screen 4: “Help”
**Two modes**
- Quick requests (buttons):
  - Towels
  - Cleaning
  - Heating issue
  - Check-in help
- “Describe your issue” (text or voice)

**Ticket status**
- Created → Seen → In progress → Done
- ETA field optional (host sets)

---

### Guest — Screen 5: “Extras”
**Cards**
- Late checkout
- Private chef
- Spa / massage
- Ski rental (partner)
- Airport transfer

**MVP behavior**
- Request → host confirms manually
- Payments later

---

## 9) AI Butler Spec (MVP)
### System behavior rules
- Never exceed ~120–180 words unless user asks for more.
- Always prioritize actionable results.
- Offer 2–4 options, ranked by fit.
- Ask 1 follow-up question if it changes recommendations significantly.
- Adapt to:
  - time of day
  - season (winter/summer)
  - guest vibe (active/chill)
  - kids + car availability

### Tooling concept (pseudo)
- `getPropertyInfo(propertyId)`
- `getRegionRecommendations(propertyId, filters)`
- `createTicket(propertyId, type, urgency, summary)`
- `logFeedback(propertyId, entityId, rating, tags)`

---

## 10) Data Flywheel (MVP capture)
We capture signals that improve future regions:
- Guest clicks / saves
- “Was this helpful?” feedback
- Host pins / hides
- Ticket categories frequency

**Important:** our “regional intelligence” is based on **our tags + feedback + curation**, not copying raw third-party content.

---

## 11) QA Acceptance Criteria (UI/UX Demo)
- Host can publish from address to QR with:
  - 1) region pack created
  - 2) at least 5 categories populated
  - 3) Wi-Fi set
  - 4) guest app accessible
- Guest can:
  - find Wi-Fi in ≤ 2 taps
  - discover 5 “today picks”
  - ask AI and get short helpful answers
  - create a support ticket and see status

---

## 12) Next File to Create (after this UI/UX demo)
- `schema.md` (Supabase tables + RLS + relationships)
- `ai_prompts.md` (system prompt + style guide + tools)
- `mvp_backlog.md` (tasks ordered, 1–2 week sprint plan)

---
End of file.