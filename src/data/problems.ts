import type { Problem } from "../types";

const baseChecklist = () => [
  { id: "c1", label: "5 people confirmed the pain", done: true },
  { id: "c2", label: "3 explained their workaround", done: true },
  { id: "c3", label: "2 said they would pay", done: false },
  { id: "c4", label: "First solution sketched", done: false },
  { id: "c5", label: "First interview scheduled", done: false },
];

const baseActivity = () => [
  { id: "a1", text: "Sara added a problem signal", time: "2h ago" },
  { id: "a2", text: "Omar joined as builder", time: "5h ago" },
  { id: "a3", text: "Lina added market context", time: "Yesterday" },
  { id: "a4", text: "First solution drafted", time: "2 days ago" },
];

export const problems: Problem[] = [
  {
    id: "client-feedback",
    industry: "Interior Design",
    title: "Designers lose hours chasing client feedback.",
    pain: "Client notes are scattered across WhatsApp, PDFs, and screenshots.",
    summary:
      "Client notes are scattered across WhatsApp, PDFs, moodboards, screenshots, and voice notes.",
    signal: "Strong signal",
    score: 82,
    scoreReasons: [
      "Specific user",
      "Repeated pain",
      "Manual workaround",
      "Small first solution possible",
    ],
    counts: { feel: 12, build: 4, know: 2 },
    whoFeels: "Freelance interior designers and small studios.",
    problemDetail:
      "Designers send mockups and moodboards to clients, then receive feedback in five different places. A WhatsApp voice note here, a marked-up PDF there, a screenshot with a red circle, an email thread, and a comment on a shared drive. Pulling it all together before the next revision takes hours and mistakes slip through.",
    proof: [
      {
        source: "Expert note",
        platform: "Report",
        origin: "Programa · industry guide",
        date: "2025",
        text: "Remember that sofa your client loved? The one buried somewhere in email thread #47? Or was it a text? Maybe WhatsApp?",
        strength: "Strong",
        url: "https://programa.design/features/interior-design-approvals",
      },
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/interiordesign",
        date: "3 days ago",
        text: "I spend my Friday afternoons just collecting feedback from six chats before I can start working again.",
        strength: "Strong",
        url: "https://www.reddit.com/r/InteriorDesign/",
      },
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/freelance",
        date: "1 week ago",
        text: "Clients refuse to use 'a tool'. They just send voice notes. I lose track of what was approved.",
        strength: "Strong",
        url: "https://www.reddit.com/r/freelance/",
      },
      {
        source: "Review",
        platform: "Product reviews",
        origin: "G2 · 2★ project tool",
        date: "2 weeks ago",
        text: "Too generic for design approvals. My clients never log in, so revisions live in my inbox.",
        strength: "Medium",
      },
      {
        source: "Job post",
        platform: "Upwork",
        origin: "Upwork job post",
        date: "5 days ago",
        text: "Studio hiring a part-time assistant 'to organise client revisions and approvals'.",
        strength: "Medium",
      },
    ],
    whatTheyDoToday:
      "Screenshots, Google Drive folders, PDF markups, and manual WhatsApp follow-ups. Approval status lives in the designer's head.",
    whyToolsFail:
      "Project tools are too generic and intimidating for clients. Design tools are not client-friendly. Approval history is unclear, so nobody knows what was actually signed off.",
    firstVersion: {
      firstFeature:
        "A client approval workspace with visual comments, a clear status per image, and an approval log.",
      forWho: "Freelance interior designers managing 3–10 active clients.",
      avoid:
        "Avoid asking clients to create accounts or learn a new tool. Avoid building a full project manager.",
      findUsers:
        "Instagram interior designers, design communities, and small interior design agencies.",
      pricing: "$29–99/month per studio.",
    },
    scoreBreakdown: [
      { name: "Repetition", value: 88 },
      { name: "Clarity of user", value: 84 },
      { name: "Workaround exists", value: 90 },
      { name: "Signs of payment", value: 72 },
      { name: "Urgency", value: 80 },
      { name: "Build simplicity", value: 78 },
    ],
    people: [
      { name: "Sara K.", role: "Has this", detail: "Freelance designer, 6 clients", commitment: "I have this problem" },
      { name: "Omar D.", role: "Builder", detail: "Full-stack, ex-SaaS", commitment: "I can build this" },
      { name: "Lina M.", role: "Market Expert", detail: "Ran a design studio for 8 years", commitment: "I know this market" },
    ],
    roomStatus: "Building",
    checklist: baseChecklist(),
    activity: baseActivity(),
    pipeline: {
      signalCount: 47,
      clusters: 6,
      confidence: "Strong",
      sources: [
        { platform: "Reddit", count: 21 },
        { platform: "Product reviews", count: 12 },
        { platform: "Upwork", count: 9 },
        { platform: "Forum", count: 5 },
      ],
      lastUpdated: "Today",
    },
  },
  {
    id: "clinic-noshows",
    industry: "Healthcare",
    title: "Small clinics bleed revenue from no-shows.",
    pain: "Reminders are sent by hand and patients still forget appointments.",
    summary:
      "Front-desk staff manually call and text patients, yet 1 in 5 appointments is missed.",
    signal: "Strong signal",
    score: 79,
    scoreReasons: [
      "Clear buyer",
      "Money lost every week",
      "Manual reminder process",
      "Narrow first solution",
    ],
    counts: { feel: 9, build: 3, know: 3 },
    whoFeels: "Independent dental and physiotherapy clinics with 1–4 practitioners.",
    problemDetail:
      "A missed appointment is a slot that can't be sold again. Front desk staff try to prevent it by calling each patient the day before, but they're busy with walk-ins and forget. No-shows quietly cost a small clinic thousands a month.",
    proof: [
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/Dentistry",
        date: "4 days ago",
        text: "Every empty chair is money gone. We tried texting manually but the receptionist can't keep up.",
        strength: "Strong",
        url: "https://www.reddit.com/r/Dentistry/",
      },
      {
        source: "Review",
        platform: "Product reviews",
        origin: "Capterra · appointment reminders",
        date: "1 week ago",
        text: "Charges per SMS and the reminders look spammy to patients. Cancelled after a month.",
        strength: "Medium",
        url: "https://www.capterra.com/p/154255/Appointment-Reminder/reviews/",
      },
      {
        source: "Forum complaint",
        platform: "Forum",
        origin: "Clinic owners forum",
        date: "6 days ago",
        text: "How do you handle no-shows without paying for an enterprise system?",
        strength: "Strong",
      },
    ],
    whatTheyDoToday:
      "Receptionists call patients the day before, keep a paper list, and sometimes charge a no-show fee that's hard to enforce.",
    whyToolsFail:
      "Enterprise practice software is expensive and overbuilt. Generic schedulers don't understand clinic flows or local SMS rules.",
    firstVersion: {
      firstFeature:
        "Automated, friendly two-way reminders with one-tap confirm or reschedule and a no-show tracker.",
      forWho: "Single-location clinics with under 5 practitioners.",
      avoid:
        "Avoid becoming a full records system. Avoid complex insurance billing. Stay focused on attendance.",
      findUsers:
        "Local clinic owner groups, dental supply reps, and physiotherapy associations.",
      pricing: "$49–149/month per clinic.",
    },
    scoreBreakdown: [
      { name: "Repetition", value: 82 },
      { name: "Clarity of user", value: 88 },
      { name: "Workaround exists", value: 76 },
      { name: "Signs of payment", value: 80 },
      { name: "Urgency", value: 85 },
      { name: "Build simplicity", value: 70 },
    ],
    people: [
      { name: "Dr. Reem A.", role: "Has this", detail: "Owns a 3-chair dental clinic", commitment: "I have this problem" },
      { name: "Karim B.", role: "Builder", detail: "Mobile + automation", commitment: "I can build this" },
      { name: "Yousef H.", role: "Market Expert", detail: "Healthcare SaaS sales", commitment: "I know this market" },
    ],
    roomStatus: "Proving",
    checklist: baseChecklist(),
    activity: baseActivity(),
    pipeline: {
      signalCount: 38,
      clusters: 5,
      confidence: "Strong",
      sources: [
        { platform: "Reddit", count: 16 },
        { platform: "Product reviews", count: 11 },
        { platform: "Forum", count: 8 },
        { platform: "Social", count: 3 },
      ],
      lastUpdated: "Today",
    },
  },
  {
    id: "freelance-invoices",
    industry: "Freelancing",
    title: "Freelancers waste days reconciling unpaid invoices.",
    pain: "Late payments are tracked in a spreadsheet and chased by awkward emails.",
    summary:
      "Solo freelancers manually track who paid, who's late, and when to send the uncomfortable follow-up.",
    signal: "Promising",
    score: 71,
    scoreReasons: [
      "Frequent recurring pain",
      "Emotional friction",
      "Clear workaround",
      "Crowded but fragmented market",
    ],
    counts: { feel: 8, build: 1, know: 1 },
    whoFeels: "Solo freelancers and 2–3 person creative shops.",
    problemDetail:
      "Sending the invoice is easy. Getting paid is the hard part. Freelancers track due dates in a spreadsheet, forget to chase, then send an anxious 'just following up' email weeks late. Cash flow suffers and the relationship gets tense.",
    proof: [
      {
        source: "Expert note",
        platform: "Report",
        origin: "QuickBooks · 2025 Late Payments Report",
        date: "2025",
        text: "56% of small businesses are owed money from unpaid invoices, averaging $17.5K each.",
        strength: "Strong",
        url: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/",
      },
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/freelance",
        date: "2 days ago",
        text: "I hate chasing payments more than the actual work. I always forget who owes me.",
        strength: "Strong",
        url: "https://www.reddit.com/r/freelance/",
      },
      {
        source: "Review",
        platform: "Product reviews",
        origin: "G2 · 2★ accounting app",
        date: "2 weeks ago",
        text: "Assumes you're a business with a bookkeeper. I just want to know who's late.",
        strength: "Medium",
      },
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/smallbusiness",
        date: "5 days ago",
        text: "Lost a month of cash flow because three clients quietly went past due and I didn't notice.",
        strength: "Strong",
        url: "https://www.reddit.com/r/smallbusiness/",
      },
    ],
    whatTheyDoToday:
      "A spreadsheet of invoices, calendar reminders, and manually written follow-up emails that feel awkward to send.",
    whyToolsFail:
      "Full accounting suites are too heavy and built for businesses with finance teams. Payment links don't handle the chasing.",
    firstVersion: {
      firstFeature:
        "An invoice tracker that auto-sends polite, scheduled payment reminders and shows a simple who-owes-what view.",
      forWho: "Solo freelancers who send 5–30 invoices a month.",
      avoid:
        "Avoid full bookkeeping, taxes, and expense tracking. Stay on getting paid.",
      findUsers:
        "Freelance subreddits, design Twitter, and creator newsletters.",
      pricing: "$9–25/month.",
    },
    scoreBreakdown: [
      { name: "Repetition", value: 80 },
      { name: "Clarity of user", value: 74 },
      { name: "Workaround exists", value: 72 },
      { name: "Signs of payment", value: 58 },
      { name: "Urgency", value: 78 },
      { name: "Build simplicity", value: 82 },
    ],
    people: [
      { name: "Maya T.", role: "Has this", detail: "Freelance copywriter", commitment: "I have this problem" },
      { name: "Ali R.", role: "Builder", detail: "SaaS, payments", commitment: "I can build this" },
    ],
    roomStatus: "Proving",
    checklist: baseChecklist(),
    activity: baseActivity(),
    pipeline: {
      signalCount: 31,
      clusters: 4,
      confidence: "Medium",
      sources: [
        { platform: "Reddit", count: 18 },
        { platform: "Product reviews", count: 8 },
        { platform: "Social", count: 5 },
      ],
      lastUpdated: "Yesterday",
    },
  },
  {
    id: "warehouse-inventory",
    industry: "Logistics",
    title: "Small warehouses lose stock to paper counts.",
    pain: "Inventory lives in clipboards and a manager's memory, not a system.",
    summary:
      "Manual stock counts cause mismatches between what's on the shelf and what the books say.",
    signal: "Promising",
    score: 68,
    scoreReasons: [
      "Real money lost",
      "Strong workaround signal",
      "Harder build",
      "Slower distribution",
    ],
    counts: { feel: 6, build: 3, know: 2 },
    whoFeels: "Owners of small distribution and e-commerce warehouses.",
    problemDetail:
      "When inventory is tracked on paper or in a basic spreadsheet, the numbers drift. Items get picked but not logged, returns sit unrecorded, and once a quarter someone spends a weekend recounting everything. Mismatches lead to oversells and angry customers.",
    proof: [
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/ecommerce",
        date: "1 week ago",
        text: "We do a full physical count every quarter because we never trust the spreadsheet.",
        strength: "Strong",
      },
      {
        source: "Job post",
        platform: "Fiverr",
        origin: "Fiverr gig request",
        date: "4 days ago",
        text: "Need someone to reconcile stock discrepancies daily and clean up our spreadsheet.",
        strength: "Medium",
      },
      {
        source: "Review",
        platform: "Product reviews",
        origin: "Capterra · 1★ WMS",
        date: "3 weeks ago",
        text: "Quotes start at five figures. We have 4 staff. Makes no sense for us.",
        strength: "Medium",
      },
    ],
    whatTheyDoToday:
      "Clipboards, barcode guns that export to Excel, and periodic full physical counts.",
    whyToolsFail:
      "Warehouse management systems are priced and built for large operations. Spreadsheets don't handle real-time movement.",
    firstVersion: {
      firstFeature:
        "A phone-based stock-in / stock-out logger with a live count and low-stock alerts.",
      forWho: "Warehouses with 2–10 staff and under 2,000 SKUs.",
      avoid:
        "Avoid integrations with every shipping carrier on day one. Avoid forecasting features.",
      findUsers:
        "E-commerce operator communities, 3PL forums, and barcode hardware resellers.",
      pricing: "$79–199/month.",
    },
    scoreBreakdown: [
      { name: "Repetition", value: 70 },
      { name: "Clarity of user", value: 72 },
      { name: "Workaround exists", value: 80 },
      { name: "Signs of payment", value: 66 },
      { name: "Urgency", value: 64 },
      { name: "Build simplicity", value: 54 },
    ],
    people: [
      { name: "Hassan F.", role: "Has this", detail: "Runs an e-com warehouse", commitment: "I have this problem" },
      { name: "Nadia S.", role: "Builder", detail: "Mobile + barcode", commitment: "I can build this" },
      { name: "Tariq Z.", role: "Market Expert", detail: "Supply chain consultant", commitment: "I know this market" },
    ],
    roomStatus: "Building",
    checklist: baseChecklist(),
    activity: baseActivity(),
    pipeline: {
      signalCount: 24,
      clusters: 4,
      confidence: "Medium",
      sources: [
        { platform: "Reddit", count: 11 },
        { platform: "Fiverr", count: 6 },
        { platform: "Product reviews", count: 7 },
      ],
      lastUpdated: "2 days ago",
    },
  },
  {
    id: "tutor-scheduling",
    industry: "Education",
    title: "Private tutors juggle scheduling chaos every week.",
    pain: "Lessons, reschedules, and payments are tracked across chat and memory.",
    summary:
      "Independent tutors lose time to rescheduling messages and forget who has paid for which session.",
    signal: "Promising",
    score: 70,
    scoreReasons: [
      "Specific recurring pain",
      "Clear workaround",
      "Modest signs of payment",
      "Easy to start small",
    ],
    counts: { feel: 7, build: 2, know: 1 },
    whoFeels: "Independent tutors and small tutoring centres.",
    problemDetail:
      "A tutor with 15 students manages a web of recurring lessons, last-minute reschedules, and prepaid packages. It all happens over WhatsApp. Tracking who has lessons left, who needs to pay, and which slot is free becomes a part-time admin job on top of teaching.",
    proof: [
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/tutor",
        date: "3 days ago",
        text: "Half my evening is spent confirming tomorrow's lessons and figuring out who still owes me.",
        strength: "Strong",
      },
      {
        source: "Forum complaint",
        platform: "Forum",
        origin: "Tutoring community",
        date: "1 week ago",
        text: "Booking apps charge too much and aren't built for prepaid lesson packs.",
        strength: "Medium",
      },
      {
        source: "Review",
        platform: "Product reviews",
        origin: "G2 · 2★ scheduler",
        date: "2 weeks ago",
        text: "Doesn't understand prepaid packages. I still track lessons in a notebook.",
        strength: "Medium",
      },
    ],
    whatTheyDoToday:
      "WhatsApp threads, a paper or spreadsheet grid of lessons, and manual payment tracking.",
    whyToolsFail:
      "General booking tools don't model prepaid lesson packages. Education platforms are built for institutions, not solo tutors.",
    firstVersion: {
      firstFeature:
        "A lesson scheduler with prepaid lesson-pack tracking and automatic next-lesson reminders.",
      forWho: "Solo tutors with 5–30 recurring students.",
      avoid:
        "Avoid building a full learning platform or video classroom. Stay on scheduling and packs.",
      findUsers:
        "Tutor Facebook groups, education subreddits, and tutoring marketplaces.",
      pricing: "$12–29/month.",
    },
    scoreBreakdown: [
      { name: "Repetition", value: 78 },
      { name: "Clarity of user", value: 70 },
      { name: "Workaround exists", value: 74 },
      { name: "Signs of payment", value: 56 },
      { name: "Urgency", value: 72 },
      { name: "Build simplicity", value: 80 },
    ],
    people: [
      { name: "Dana W.", role: "Has this", detail: "Maths tutor, 18 students", commitment: "I have this problem" },
      { name: "Sami L.", role: "Builder", detail: "SaaS, scheduling", commitment: "I can build this" },
    ],
    roomStatus: "Proving",
    checklist: baseChecklist(),
    activity: baseActivity(),
    pipeline: {
      signalCount: 22,
      clusters: 3,
      confidence: "Medium",
      sources: [
        { platform: "Reddit", count: 12 },
        { platform: "Forum", count: 6 },
        { platform: "Product reviews", count: 4 },
      ],
      lastUpdated: "Yesterday",
    },
  },
  {
    id: "restaurant-suppliers",
    industry: "Food & Beverage",
    title: "Restaurants reorder supplies by guesswork and texts.",
    pain: "Chefs message suppliers individually and forget what was ordered.",
    summary:
      "Daily reordering happens over scattered phone calls and texts with no record of prices or quantities.",
    signal: "Needs more proof",
    score: 61,
    scoreReasons: [
      "Real pain, fragmented buyers",
      "Workaround is good enough",
      "Hard distribution",
      "Trust barrier",
    ],
    counts: { feel: 5, build: 2, know: 1 },
    whoFeels: "Independent restaurant and café owners.",
    problemDetail:
      "Every morning a chef texts three or four suppliers to reorder produce, meat, and dry goods. Prices change, orders get missed, and there's no clean record of what was bought at what price. Month-end cost tracking becomes a guessing game.",
    proof: [
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/restaurateur",
        date: "1 week ago",
        text: "I text my veg guy, my meat guy, my dry-goods guy every morning. Half the time something's missing.",
        strength: "Medium",
      },
      {
        source: "Forum complaint",
        platform: "Forum",
        origin: "Restaurant owners forum",
        date: "2 weeks ago",
        text: "How do you track food cost when ordering is all on WhatsApp?",
        strength: "Medium",
      },
      {
        source: "Expert note",
        platform: "Social",
        origin: "LinkedIn · hospitality consultant",
        date: "3 weeks ago",
        text: "Suppliers resist new tools; adoption needs to start from the buyer side.",
        strength: "Weak",
      },
    ],
    whatTheyDoToday:
      "Texts and calls to individual suppliers, handwritten order pads, and a shoebox of delivery notes.",
    whyToolsFail:
      "Restaurant ERPs are expensive and complex. Suppliers won't onboard to a portal. The pain is shared but ownership is unclear.",
    firstVersion: {
      firstFeature:
        "A buyer-side reorder log with saved order templates per supplier and a running price record.",
      forWho: "Single-location restaurants and cafés.",
      avoid:
        "Avoid forcing suppliers onto the platform. Avoid full accounting on day one.",
      findUsers:
        "Restaurant owner groups, hospitality consultants, and local F&B meetups.",
      pricing: "$39–99/month.",
    },
    scoreBreakdown: [
      { name: "Repetition", value: 66 },
      { name: "Clarity of user", value: 60 },
      { name: "Workaround exists", value: 62 },
      { name: "Signs of payment", value: 52 },
      { name: "Urgency", value: 58 },
      { name: "Build simplicity", value: 64 },
    ],
    people: [
      { name: "Leila Q.", role: "Has this", detail: "Café owner", commitment: "I have this problem" },
      { name: "Faris N.", role: "Builder", detail: "Marketplace builder", commitment: "I can build this" },
    ],
    roomStatus: "Proving",
    checklist: baseChecklist(),
    activity: baseActivity(),
    pipeline: {
      signalCount: 13,
      clusters: 3,
      confidence: "Weak",
      sources: [
        { platform: "Reddit", count: 6 },
        { platform: "Forum", count: 5 },
        { platform: "Social", count: 2 },
      ],
      lastUpdated: "3 days ago",
    },
  },
  {
    id: "property-maintenance",
    industry: "Real Estate",
    title: "Small landlords lose track of maintenance requests.",
    pain: "Tenant issues come in by call and text and slip through the cracks.",
    summary:
      "Landlords with a handful of units manage repairs across calls, texts, and memory, leading to angry tenants.",
    signal: "Promising",
    score: 69,
    scoreReasons: [
      "Recurring frustration",
      "Clear workaround",
      "Two-sided value",
      "Modest pricing",
    ],
    counts: { feel: 7, build: 3, know: 2 },
    whoFeels: "Independent landlords managing 3–20 units.",
    problemDetail:
      "A tenant reports a leak by text at 9pm. The landlord means to call a plumber but forgets. Two days later the tenant is furious. With several units, requests pile up with no single place to see what's open, who's handling it, and what it cost.",
    proof: [
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/Landlord",
        date: "4 days ago",
        text: "I manage 9 units from my phone. Requests come in everywhere and I drop the ball constantly.",
        strength: "Strong",
      },
      {
        source: "Review",
        platform: "Product reviews",
        origin: "Capterra · 2★ PM software",
        date: "2 weeks ago",
        text: "Built for 500-unit firms. I have nine doors and pay per unit for features I never use.",
        strength: "Medium",
      },
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/realestateinvesting",
        date: "1 week ago",
        text: "A simple way to log tenant repair requests, that's all I want.",
        strength: "Strong",
      },
    ],
    whatTheyDoToday:
      "Texts and calls from tenants, a personal to-do list, and saved contractor numbers in the phone.",
    whyToolsFail:
      "Property management platforms are built for large portfolios and priced per unit. Generic to-do apps don't give tenants a way to report.",
    firstVersion: {
      firstFeature:
        "A simple tenant request inbox with status, photos, and a log of what was fixed and what it cost.",
      forWho: "Small landlords with under 20 units.",
      avoid:
        "Avoid full accounting, leases, and rent collection on day one. Stay on maintenance.",
      findUsers:
        "Landlord subreddits, real estate investing groups, and property meetups.",
      pricing: "$19–59/month.",
    },
    scoreBreakdown: [
      { name: "Repetition", value: 74 },
      { name: "Clarity of user", value: 72 },
      { name: "Workaround exists", value: 70 },
      { name: "Signs of payment", value: 60 },
      { name: "Urgency", value: 68 },
      { name: "Build simplicity", value: 76 },
    ],
    people: [
      { name: "Rana E.", role: "Has this", detail: "Owns 9 rental units", commitment: "I have this problem" },
      { name: "Bilal K.", role: "Builder", detail: "Full-stack", commitment: "I can build this" },
      { name: "Hala M.", role: "Market Expert", detail: "Property manager, 12 yrs", commitment: "I know this market" },
    ],
    roomStatus: "Proving",
    checklist: baseChecklist(),
    activity: baseActivity(),
    pipeline: {
      signalCount: 27,
      clusters: 4,
      confidence: "Medium",
      sources: [
        { platform: "Reddit", count: 15 },
        { platform: "Product reviews", count: 8 },
        { platform: "Forum", count: 4 },
      ],
      lastUpdated: "Today",
    },
  },
  {
    id: "salon-rebooking",
    industry: "Beauty & Wellness",
    title: "Salons lose repeat clients who forget to rebook.",
    pain: "Rebooking depends on the client remembering, not on any system.",
    summary:
      "Independent stylists rely on clients to come back, with no reminder when it's time for the next visit.",
    signal: "Needs more proof",
    score: 63,
    scoreReasons: [
      "Recurring revenue at stake",
      "Workaround is informal",
      "Lower signs of payment",
      "Easy build",
    ],
    counts: { feel: 6, build: 2, know: 1 },
    whoFeels: "Independent hair stylists and small salons.",
    problemDetail:
      "A client's color fades in six weeks, but nothing reminds them to rebook. The stylist relies on people remembering or stumbling back. A simple, well-timed nudge could turn one-off visits into a predictable schedule, but stylists have no easy way to do it.",
    proof: [
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/Hairstylist",
        date: "5 days ago",
        text: "My best clients disappear for months then come back saying 'I should come more often!'",
        strength: "Medium",
      },
      {
        source: "Forum complaint",
        platform: "Forum",
        origin: "Salon pros forum",
        date: "2 weeks ago",
        text: "Booking systems don't nudge clients to rebook at the right interval for their service.",
        strength: "Medium",
      },
      {
        source: "Expert note",
        platform: "Social",
        origin: "Instagram · salon coach",
        date: "3 weeks ago",
        text: "Timed rebooking reminders measurably lift repeat visits in salons.",
        strength: "Medium",
      },
    ],
    whatTheyDoToday:
      "A paper appointment book, occasional manual texts, and hoping clients return on their own.",
    whyToolsFail:
      "Booking apps focus on filling open slots, not on bringing past clients back at the right time. Marketing tools are too generic.",
    firstVersion: {
      firstFeature:
        "Service-aware rebooking reminders that text past clients when it's time to come back.",
      forWho: "Solo stylists and chairs with a loyal client base.",
      avoid:
        "Avoid building a full booking calendar or POS first. Focus on the rebooking nudge.",
      findUsers:
        "Stylist Instagram, beauty pro groups, and salon supplier networks.",
      pricing: "$15–39/month.",
    },
    scoreBreakdown: [
      { name: "Repetition", value: 64 },
      { name: "Clarity of user", value: 66 },
      { name: "Workaround exists", value: 58 },
      { name: "Signs of payment", value: 54 },
      { name: "Urgency", value: 60 },
      { name: "Build simplicity", value: 82 },
    ],
    people: [
      { name: "Noor A.", role: "Has this", detail: "Independent stylist", commitment: "I have this problem" },
      { name: "Zaid R.", role: "Builder", detail: "Automation + SMS", commitment: "I can build this" },
    ],
    roomStatus: "Proving",
    checklist: baseChecklist(),
    activity: baseActivity(),
    pipeline: {
      signalCount: 14,
      clusters: 3,
      confidence: "Weak",
      sources: [
        { platform: "Reddit", count: 7 },
        { platform: "Forum", count: 4 },
        { platform: "Social", count: 3 },
      ],
      lastUpdated: "4 days ago",
    },
  },
  {
    id: "accountant-docs",
    industry: "Accounting",
    title: "Accountants drown in client document requests.",
    pain: "Every tax season means chasing the same PDFs over email, one client at a time.",
    summary:
      "Small accounting firms send dozens of document requests per client and track what's missing in spreadsheets and memory.",
    signal: "Strong signal",
    score: 80,
    scoreReasons: [
      "Painful every single cycle",
      "Clear paying buyer",
      "Spreadsheet workaround everywhere",
      "Narrow first solution",
    ],
    counts: { feel: 14, build: 5, know: 3 },
    whoFeels: "Solo CPAs and accounting firms with 2–10 staff.",
    problemDetail:
      "To close a client's books or file a return, an accountant needs bank statements, receipts, payroll reports, and a dozen other documents. Requests go out by email, clients reply with half of them, and the firm tracks what's still missing in a spreadsheet. Staff spend hours per client re-asking for the same files, and deadlines slip when one PDF arrives late.",
    proof: [
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/Accounting",
        date: "2 days ago",
        text: "I sent the same 'still missing your bank statements' email 11 times this week. It's 80% of my job in March.",
        strength: "Strong",
      },
      {
        source: "Review",
        platform: "Product reviews",
        origin: "G2 · 2★ portal software",
        date: "1 week ago",
        text: "Clients can't figure out the portal login, so they email the files anyway. Now I track two places instead of one.",
        strength: "Strong",
      },
      {
        source: "Job post",
        platform: "Upwork",
        origin: "Upwork job post",
        date: "4 days ago",
        text: "CPA firm hiring a VA to 'follow up with clients on outstanding documents and update our tracking sheet daily'.",
        strength: "Medium",
      },
      {
        source: "Forum complaint",
        platform: "Forum",
        origin: "Bookkeepers community",
        date: "1 week ago",
        text: "What does everyone use to track missing client docs? My checklist spreadsheet has 40 tabs.",
        strength: "Medium",
      },
    ],
    whatTheyDoToday:
      "Email threads per client, a shared spreadsheet of missing documents, and manual reminder emails written from scratch each time.",
    whyToolsFail:
      "Client portals require logins that clients refuse to use. Practice management suites bury document requests inside heavy workflows. Nothing chases the client automatically.",
    firstVersion: {
      firstFeature:
        "A per-client document request list with a no-login upload link and automatic polite reminders until everything is in.",
      forWho: "Solo CPAs and small firms handling 30–200 clients per season.",
      avoid:
        "Avoid building bookkeeping, e-signatures, or a full practice suite. Stay on collecting documents.",
      findUsers:
        "Accounting subreddits, bookkeeper Facebook groups, and state CPA society newsletters.",
      pricing: "$39–129/month per firm.",
    },
    scoreBreakdown: [
      { name: "Repetition", value: 86 },
      { name: "Clarity of user", value: 84 },
      { name: "Workaround exists", value: 82 },
      { name: "Signs of payment", value: 78 },
      { name: "Urgency", value: 76 },
      { name: "Build simplicity", value: 74 },
    ],
    people: [
      { name: "Mona G.", role: "Has this", detail: "Solo CPA, 90 tax clients", commitment: "I have this problem" },
      { name: "Idris V.", role: "Builder", detail: "Full-stack, doc workflows", commitment: "I can build this" },
      { name: "Salma J.", role: "Market Expert", detail: "Ex-partner at a 12-person firm", commitment: "I know this market" },
    ],
    roomStatus: "Building",
    checklist: [
      { id: "c1", label: "5 people confirmed the pain", done: true },
      { id: "c2", label: "3 explained their workaround", done: true },
      { id: "c3", label: "2 said they would pay", done: true },
      { id: "c4", label: "First solution sketched", done: true },
      { id: "c5", label: "First interview scheduled", done: false },
    ],
    activity: [
      { id: "a1", text: "Mona shared her 40-tab tracking spreadsheet", time: "1h ago" },
      { id: "a2", text: "Idris joined as builder", time: "4h ago" },
      { id: "a3", text: "Salma added firm-size pricing context", time: "Yesterday" },
      { id: "a4", text: "First solution drafted", time: "2 days ago" },
    ],
    pipeline: {
      signalCount: 41,
      clusters: 5,
      confidence: "Strong",
      sources: [
        { platform: "Reddit", count: 18 },
        { platform: "Product reviews", count: 10 },
        { platform: "Upwork", count: 8 },
        { platform: "Forum", count: 5 },
      ],
      lastUpdated: "Today",
    },
  },
  {
    id: "gym-churn",
    industry: "Fitness",
    title: "Gyms lose members who silently churn.",
    pain: "Members stop showing up weeks before they cancel, and nobody notices.",
    summary:
      "Independent gym owners only learn a member is gone when the cancellation email arrives, long after attendance dropped off.",
    signal: "Promising",
    score: 68,
    scoreReasons: [
      "Revenue leaks monthly",
      "Attendance data already exists",
      "Owners are busy, not technical",
      "Retention is hard to attribute",
    ],
    counts: { feel: 8, build: 3, know: 2 },
    whoFeels: "Independent gym and boutique studio owners with 100–800 members.",
    problemDetail:
      "A member who cancels in June usually stopped scanning in around April. The check-in data shows the fade, but it sits unused inside the access system. Owners find out at cancellation, when a win-back is awkward and usually too late. A timely 'we miss you' nudge at week two of absence is the obvious move, and almost nobody does it.",
    proof: [
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/gymowners",
        date: "5 days ago",
        text: "Pulled my cancellations report: almost every one had zero visits for 6+ weeks first. I never saw it coming.",
        strength: "Strong",
      },
      {
        source: "Review",
        platform: "Product reviews",
        origin: "Capterra · 2★ gym software",
        date: "2 weeks ago",
        text: "Has an 'at-risk members' report buried four menus deep. No alerts, so I check it never.",
        strength: "Medium",
      },
      {
        source: "Forum complaint",
        platform: "Forum",
        origin: "Fitness business forum",
        date: "1 week ago",
        text: "How do you reach out to members who've gone quiet without it feeling like spam?",
        strength: "Medium",
      },
      {
        source: "Expert note",
        platform: "Social",
        origin: "LinkedIn · gym consultant",
        date: "3 weeks ago",
        text: "Most independents could cut churn meaningfully just by acting on attendance gaps. Few have the time.",
        strength: "Weak",
      },
    ],
    whatTheyDoToday:
      "An occasional manual look at check-in reports, gut feel about regulars, and a generic newsletter that goes to everyone.",
    whyToolsFail:
      "Gym management platforms hold the data but bury at-risk reports and send nothing proactively. Marketing tools don't connect to check-in systems.",
    firstVersion: {
      firstFeature:
        "An attendance-drop alert that flags fading members and sends an owner-approved win-back text at the right moment.",
      forWho: "Single-location gyms and studios with digital check-in.",
      avoid:
        "Avoid building booking, billing, or a member app. Stay on spotting the fade and nudging.",
      findUsers:
        "Gym owner subreddits, boutique studio groups, and fitness equipment reseller networks.",
      pricing: "$49–99/month per location.",
    },
    scoreBreakdown: [
      { name: "Repetition", value: 72 },
      { name: "Clarity of user", value: 70 },
      { name: "Workaround exists", value: 64 },
      { name: "Signs of payment", value: 62 },
      { name: "Urgency", value: 66 },
      { name: "Build simplicity", value: 74 },
    ],
    people: [
      { name: "Adel S.", role: "Has this", detail: "Owns a 400-member gym", commitment: "I have this problem" },
      { name: "Farah B.", role: "Builder", detail: "Data + integrations", commitment: "I can build this" },
      { name: "Joud K.", role: "Market Expert", detail: "Sold software to 60 gyms", commitment: "I know this market" },
    ],
    roomStatus: "Proving",
    checklist: [
      { id: "c1", label: "5 people confirmed the pain", done: true },
      { id: "c2", label: "3 explained their workaround", done: true },
      { id: "c3", label: "2 said they would pay", done: false },
      { id: "c4", label: "First solution sketched", done: false },
      { id: "c5", label: "First interview scheduled", done: false },
    ],
    activity: [
      { id: "a1", text: "Adel shared 12 months of cancellation data", time: "3h ago" },
      { id: "a2", text: "Farah joined as builder", time: "Yesterday" },
      { id: "a3", text: "Joud listed check-in systems to integrate", time: "Yesterday" },
      { id: "a4", text: "Problem signal cluster merged", time: "3 days ago" },
    ],
    pipeline: {
      signalCount: 29,
      clusters: 4,
      confidence: "Medium",
      sources: [
        { platform: "Reddit", count: 13 },
        { platform: "Product reviews", count: 9 },
        { platform: "Forum", count: 4 },
        { platform: "Social", count: 3 },
      ],
      lastUpdated: "Yesterday",
    },
  },
  {
    id: "photo-selects",
    industry: "Photography",
    title: "Photographers chase clients for final selects.",
    pain: "Galleries sit untouched for weeks while the photographer can't close the job.",
    summary:
      "Wedding and portrait photographers deliver proof galleries, then spend weeks nudging clients to pick their final images.",
    signal: "Needs more proof",
    score: 54,
    scoreReasons: [
      "Annoying but survivable",
      "Gallery tools partly cover it",
      "Unclear willingness to pay",
      "Pain is seasonal",
    ],
    counts: { feel: 4, build: 2, know: 1 },
    whoFeels: "Wedding and portrait photographers shooting 15–60 sessions a year.",
    problemDetail:
      "After a shoot, the photographer sends a proof gallery and asks the client to pick 30 selects for editing. Then silence. The album can't be designed, the job can't be invoiced, and the photographer sends increasingly awkward reminders. Some jobs stall for months over a choice the client could make in an evening.",
    proof: [
      {
        source: "Forum complaint",
        platform: "Reddit",
        origin: "r/WeddingPhotography",
        date: "1 week ago",
        text: "Couple got their gallery in March. It's July. Still no album selects. I've reminded them four times.",
        strength: "Medium",
      },
      {
        source: "Forum complaint",
        platform: "Forum",
        origin: "Photo business forum",
        date: "2 weeks ago",
        text: "Do you charge a fee if clients take more than 60 days to choose? Feels harsh but I can't archive the job.",
        strength: "Medium",
      },
      {
        source: "Job post",
        platform: "Upwork",
        origin: "Upwork job post",
        date: "3 weeks ago",
        text: "Photographer looking for help 'following up with past clients about photo selections and album approvals'.",
        strength: "Weak",
      },
    ],
    whatTheyDoToday:
      "Gallery links with a favorites feature, manual reminder emails, and sometimes a deadline clause in the contract that's never enforced.",
    whyToolsFail:
      "Gallery platforms have favorites but no deadlines, no escalating reminders, and no link between selects and getting paid. Reminders stay manual.",
    firstVersion: {
      firstFeature:
        "A selects deadline layered on existing galleries: scheduled reminders, progress shown to the client, and a nudge when the date nears.",
      forWho: "Wedding photographers who deliver albums and prints.",
      avoid:
        "Avoid building another gallery platform or photo storage. Ride on top of what they already use.",
      findUsers:
        "Wedding photography subreddits, photographer Facebook groups, and album lab partners.",
      pricing: "$10–25/month.",
    },
    scoreBreakdown: [
      { name: "Repetition", value: 58 },
      { name: "Clarity of user", value: 62 },
      { name: "Workaround exists", value: 56 },
      { name: "Signs of payment", value: 42 },
      { name: "Urgency", value: 48 },
      { name: "Build simplicity", value: 58 },
    ],
    people: [
      { name: "Yara H.", role: "Has this", detail: "Wedding photographer, 30 weddings/yr", commitment: "I have this problem" },
      { name: "Marwan T.", role: "Builder", detail: "Frontend + email automation", commitment: "I can build this" },
      { name: "Dina F.", role: "Market Expert", detail: "Runs a photo album lab", commitment: "I know this market" },
    ],
    roomStatus: "Paused",
    checklist: [
      { id: "c1", label: "5 people confirmed the pain", done: false },
      { id: "c2", label: "3 explained their workaround", done: true },
      { id: "c3", label: "2 said they would pay", done: false },
      { id: "c4", label: "First solution sketched", done: false },
      { id: "c5", label: "First interview scheduled", done: false },
    ],
    activity: [
      { id: "a1", text: "Room paused pending more payment signals", time: "2 days ago" },
      { id: "a2", text: "Yara described her reminder routine", time: "4 days ago" },
      { id: "a3", text: "Marwan joined as builder", time: "1 week ago" },
      { id: "a4", text: "Problem signal cluster merged", time: "2 weeks ago" },
    ],
    pipeline: {
      signalCount: 22,
      clusters: 3,
      confidence: "Weak",
      sources: [
        { platform: "Reddit", count: 10 },
        { platform: "Upwork", count: 6 },
        { platform: "Forum", count: 4 },
        { platform: "Social", count: 2 },
      ],
      lastUpdated: "2 days ago",
    },
  },
];

export const todaysProblems = problems.slice(0, 3);

export function getProblem(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}

