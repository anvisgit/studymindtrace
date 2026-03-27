# studymindtrace

> **Course:** Web Programming  
> **Student:**   Anvi Wadhwa & Pragya

---

##  Project Overview

**StudyMind** is a web-based cognitive load monitoring dashboard designed to help students **track mental fatigue**, **predict burnout**, and **optimize study schedules** in real time. Unlike conventional study tools (e.g., Pomodoro timers, simple time-trackers), StudyMind addresses the *root causes* of academic burnout through evidence-based features grounded in cognitive psychology research.

### Problem Statement

- **78% of students** report mental exhaustion during exam preparation ([American College Health Association, 2023](#references))
- Context switching between subjects increases cognitive load by **up to 40%** ([Monsell, 2003](#references))
- Students lack tools that **objectively measure** mental fatigue in real time

### Solution

StudyMind provides a comprehensive dashboard that monitors cognitive load through multiple dimensions — biometric data, environmental context, task switching patterns, and predictive AI modeling — to actively guide students toward healthier, more productive study habits.

---

## Features

### 1. Cognitive Load Meter (Real-Time Score 0–100)
A composite score calculated from study duration, task difficulty, subject switching frequency, and decision intensity. Inspired by **Cognitive Load Theory** (Sweller, 1988) which identifies three types of cognitive load: intrinsic, extraneous, and germane.

**Innovation:** Most study apps only track *time*. Our meter quantifies the *mental cost* of that time by factoring in difficulty and context-switching penalties.

### 2. Biometric Integration (HRV + Heart Rate)
Displays **Heart Rate Variability (HRV)**, resting heart rate, and a computed Stress Index. HRV is a scientifically validated biomarker for autonomic nervous system stress.

Bridges the gap between *subjective* self-assessment and *objective* physiological data. If a student rates a task as "easy" but their HRV drops below 30ms, the system identifies hidden stress.

**Research basis:** HRV as a stress biomarker — Thayer et al. (2012), *Neuroscience & Biobehavioral Reviews*.

### 3. Predictive Burnout Modeling (AI Forecast)
An hourly timeline (9 AM – 4 PM) predicting cognitive load for each time block using historical patterns. Provides actionable schedule swap suggestions.

**Innovation:** Shifts from *reactive* ("you're tired, take a break") to *proactive* ("at your current pace, you'll burn out at 1 PM — swap Physics with History to extend your window"). Uses a simple linear prediction model based on accumulated task difficulty and duration.

### 4. Dynamic Task Routing (Energy-Matched Work)
Tasks are categorized by type (Analytical, Creative, Rote Memorization, Passive Listening). As cognitive load rises, high-intensity tasks are automatically blocked and low-intensity tasks are recommended.

**Innovation:** Inspired by **Yerkes-Dodson Law** — performance increases with arousal to a point, then decreases. By matching task complexity to current energy level, we keep students in their optimal performance zone.

### 5. Micro-Recovery Prescriptions (Context-Aware Breaks)
Instead of generic "take a break" alerts, StudyMind prescribes *specific* recovery protocols based on the type of fatigue detected:
- **Visual fatigue** → 20-20-20 Eye Reset (look 20ft away for 20s every 20min)
- **Cognitive fatigue** → Box Breathing (4-4-4-4 protocol)
- **Motor fatigue** → Micro-movement stretches

**Innovation:** Research shows that break quality matters more than break quantity. Scrolling social media during a break actually *increases* cognitive load. Prescriptive, targeted breaks lower the specific fatigue type accumulated.

**Research basis:** 20-20-20 rule — American Academy of Ophthalmology; Box breathing — Ma et al. (2017), *Science*.

### 6. Context Switch Cost Visualization
A real-time "tax meter" that quantifies the cognitive penalty of switching between subjects. Each switch event is logged with its penalty cost, and a cumulative "Total Load Tax" is displayed.

**Innovation:** Makes the abstract concept of "multitasking is bad" visceral and numerical. Seeing "+18% load penalty" for switching from Physics to Literature conditions students to batch similar subjects together.

**Research basis:** Task-switching cost research — Monsell (2003), *Trends in Cognitive Sciences*.

### 7. Distraction Shield (Dynamic Blocking)
A toggle that auto-activates when cognitive load exceeds 75%. Blocks distracting websites (YouTube, Twitter, Instagram, Reddit, TikTok).

**Innovation:** Unlike rigid browser blockers that are always-on (and often disabled by frustrated users), this shield is *dynamic* — it only engages precisely when the student's prefrontal cortex is too depleted to resist distraction. Based on the concept of **ego depletion** (Baumeister et al., 1998).

### 8. Environmental Intelligence
Tracks time of day, ambient noise levels, and identifies historically optimal study windows.

**Innovation:** Contextual awareness allows the system to provide insights like "Your efficiency drops 35% after 8 PM" — helping students position their hardest work during their peak cognitive windows.

**Research basis:** Circadian rhythm effects on cognition — Schmidt et al. (2007), *Chronobiology International*.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|--|--|
| **HTML5** | Semantic page structure |
| **CSS3** | Custom design system with CSS variables, grid layouts, responsive design |
| **Vanilla JavaScript** | Application logic, DOM manipulation, state management |
| **Chart.js 4.4.0** | Line chart visualization for cognitive load trends |
| **Google Fonts** | IBM Plex Sans + IBM Plex Mono for typography |

### Why Vanilla JS (No Frameworks)?
This project intentionally avoids React/Vue/Angular to demonstrate mastery of core web technologies. All interactivity — dynamic theme switching, real-time score updates, timer functionality, reactive UI updates — is implemented with pure DOM manipulation.

---

##  File Structure

```
web/
├── prog.html       # Main HTML — page structure and semantic markup
├── styles.css      # Complete CSS design system (variables, components, responsive)
├── app.js          # Application logic (chart, features, session management)
└── README.md       # Project documentation (this file)
```

---

##  Design Decisions

### Visual Language
- **Dark theme** with monochromatic palette — reduces eye strain during extended study sessions (the primary use case)
- **IBM Plex Mono** for data/metrics — improves readability of numbers and codes
- **IBM Plex Sans** for body text — clean, professional, highly legible
- **Grid-based layouts with 1px gaps** — inspired by Bloomberg Terminal and financial dashboards for information density
- **Minimal color usage** — critical alerts use red (#cc4444), success states use green (#44aa66), keeping the interface calm and focused

### UX Philosophy
- **Information density over simplicity** — students need comprehensive data, not minimalist designs that hide information
- **Monospace typography for data** — every metric, timestamp, and score uses monospace for precise alignment
- **Progressive disclosure** — landing page explains the concept; dashboard shows the data; task form allows input

---

##  References

1. **Cognitive Load Theory** — Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. *Cognitive Science*, 12(2), 257–285.
2. **Task Switching Costs** — Monsell, S. (2003). Task switching. *Trends in Cognitive Sciences*, 7(3), 134–140.
3. **HRV as Stress Biomarker** — Thayer, J. F., Åhs, F., Fredrikson, M., Sollers III, J. J., & Wager, T. D. (2012). A meta-analysis of heart rate variability and neuroimaging studies. *Neuroscience & Biobehavioral Reviews*, 36(2), 747–756.
4. **Ego Depletion** — Baumeister, R. F., Bratslavsky, E., Muraven, M., & Tice, D. M. (1998). Ego depletion: Is the active self a limited resource? *Journal of Personality and Social Psychology*, 74(5), 1252.
5. **Box Breathing Research** — Ma, X., Yue, Z. Q., Gong, Z. Q., et al. (2017). The effect of diaphragmatic breathing on attention, negative affect and stress. *Frontiers in Psychology*, 8, 874.
6. **Circadian Rhythms & Cognition** — Schmidt, C., Collette, F., Cajochen, C., & Peigneux, P. (2007). A time to think: Circadian rhythms in human cognition. *Cognitive Neuropsychology*, 24(7), 755–789.
7. **20-20-20 Rule** — American Academy of Ophthalmology. (2020). Computers, Digital Devices and Eye Strain.
8. **Yerkes-Dodson Law** — Yerkes, R. M., & Dodson, J. D. (1908). The relation of strength of stimulus to rapidity of habit-formation. *Journal of Comparative Neurology and Psychology*, 18(5), 459–482.
9. **Student Mental Health Statistics** — American College Health Association. (2023). National College Health Assessment.
10. **Chart.js Library** — [https://www.chartjs.org/](https://www.chartjs.org/) — MIT License
11. **Google Fonts (IBM Plex)** — [https://fonts.google.com/specimen/IBM+Plex+Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) — SIL Open Font License

---

## 🔧 How to Run

1. Clone this repository
2. Open `prog.html` in any modern browser
3. Click **"Start Tracking"** to access the dashboard
4. Use **"+ Add Task"** to log study sessions and see all panels update

No build tools, servers, or dependencies required — runs entirely in the browser.

--
