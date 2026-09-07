# Härtz Heart Companion

Build a responsive web application called "Härtz – Heart Rate Companion" based on the provided Figma design and screenshots.

IMPORTANT:

The provided design is the visual source of truth.

Do not replace it with a generic healthcare dashboard.

Preserve the visual identity, layout, proportions, typography, colors, spacing, ECG background, logo treatment, buttons, cards and overall visual hierarchy.

The goal is to transform the existing UI/UX concept into a polished, functional web application that works especially well on mobile screens.

==================================================

1. PRODUCT PURPOSE

==================================================

Härtz is a heart-rate companion designed for adults over 18.

The application allows users to simulate a heart-rate measurement while providing contextual information about the user's activity and physical/emotional state.

The app should demonstrate how heart-rate information can be presented clearly depending on the user's context.

This is NOT a medical diagnostic application.

The application must clearly communicate that simulated measurements are not medical measurements.

Keep this disclaimer visible throughout the experience:

"Disclaimer : Not a medical device. Cannot replace a doctor."

On the welcome screen, also display:

"Härtz is a heart rate app, it is a wellness tool intended exclusively for adults over the age of 18.

It allows you to observe the impact of stress and fatigue on the body.

It is not a medical device and does not in any way replace the advice, diagnosis, or care of a cardiologist.

In the event of chest pain, dizziness, or persistent palpitations, contact a doctor immediately."

==================================================

2. VISUAL IDENTITY

==================================================

Follow the supplied design closely.

Main background:

dark desaturated blue, approximately #294967.

Dark content panels:

deep navy blue, approximately #163553 / #0D2B52.

Primary accent:

cyan, approximately #00A9D6.

Main text:

white / off-white.

Secondary text:

light gray.

Status colors:

Normal:

mint / turquoise, approximately #59E3B7.

Risky:

red.

Attention:

orange / peach.

The interface should feel:

- professional

- calm

- medical/wellness oriented

- minimal

- modern

- spacious

- trustworthy

Do NOT introduce:

- gradients

- glassmorphism

- excessive shadows

- generic healthcare illustrations

- cartoon hearts

- fitness-dashboard aesthetics

- excessive cards

- unnecessary animations

The subtle ECG waveform in the background is an important part of the visual identity.

Use it throughout the application with low opacity so that it remains decorative and never reduces readability.

==================================================

3. LOGO

==================================================

Use the Härtz logo from the provided design.

The logo consists of the word:

Härtz

with the initial H integrated with an ECG/heartbeat line.

Do not replace it with a generic heart icon.

Keep the cyan ECG element and dark typography.

On mobile, position the logo according to the supplied screens.

==================================================

4. RESPONSIVE BEHAVIOR

==================================================

The application is mobile-first.

The supplied mobile screens are the main reference.

It must work correctly on:

- mobile portrait

- tablet

- desktop

Do not simply stretch the mobile interface on desktop.

On desktop, use a centered application container with an appropriate maximum width while preserving the mobile visual proportions.

On mobile, maintain the compact layout shown in the reference.

No element may overflow or become clipped.

==================================================

5. PAGE / ROUTE STRUCTURE

==================================================

Create these routes:

/

/status

/measurement

/history

Create a clear navigation flow:

Welcome

→ Status

→ Measurement

→ History

The back button must return to the previous screen.

==================================================

6. WELCOME SCREEN

==================================================

Route:

/

Reproduce the supplied "mobile-home" design.

Background:

dark blue with subtle ECG waveform.

Top:

Härtz logo.

Main content:

A dark navy rounded information card.

Inside the card, display the wellness/medical disclaimer text supplied above.

Below the card:

Large dark button:

"Start"

When the user clicks Start:

Navigate to /status

At the bottom:

display:

"Disclaimer : Not a medical device. Cannot replace a doctor."

The Start button should have a subtle hover and pressed state but remain visually minimal.

==================================================

7. STATUS SCREEN

==================================================

Route:

/status

Reproduce the supplied "mobile-settings" design.

Top:

Härtz logo.

Back button:

"Back"

SECTION 1:

Title:

"SELECT YOUR ACTIVITY STATUS :"

Radio options:

"At rest"

"In Activity"

Only one option can be selected.

Store the selected value as:

activityStatus

Possible values:

rest

activity

SECTION 2:

Title:

"SELECT PHYSICAL / EMOTIONAL STATUS :"

Radio options:

Stress

Exhaustion

Illness/Fever

Calm

Only one option can be selected.

Store the selected value as:

physicalStatus

Possible values:

stress

exhaustion

illness

calm

Use custom radio controls matching the design.

Selected radio:

cyan center.

Unselected radio:

light gray center.

Do not use the browser's default radio styling.

==================================================

8. USEFUL VALUES

==================================================

Below the status selections, create the "Useful values :" panel.

Display:

Normal : 70 - 100 bpm

Tachycardia : > 100 bpm

(At rest)

Bradycardia : < 65 bpm

(non-athletes)

Use the colored arrows from the reference design.

Normal:

cyan/mint arrow.

Tachycardia:

red arrow.

Bradycardia:

red arrow.

Keep the typography and spacing close to the supplied design.

==================================================

9. START MEASUREMENT

==================================================

At the bottom of the Status screen:

Create the button:

"Start Measurement"

When clicked:

1. Check that activityStatus has been selected.

2. Check that physicalStatus has been selected.

3. If one or both are missing, show a small clear validation message.

4. If both are selected, navigate to /measurement.

Do not allow the measurement to start with incomplete context.

==================================================

10. MEASUREMENT SCREEN

==================================================

Route:

/measurement

Reproduce the supplied "mobile-results" design.

Top:

Härtz logo.

Center:

Large dashed circular progress indicator.

Inside:

"% loading"

Create a visible progress animation from:

0% → 100%

The measurement should take approximately 5–7 seconds.

The progress percentage must update smoothly.

While measuring:

Display the loading state.

Do not display the final BPM yet.

==================================================

11. SIMULATED MEASUREMENT

==================================================

There is no real heart-rate sensor.

Create a simulated measurement for this prototype.

When the measurement reaches 100%:

Generate a realistic sample BPM value.

Store it as:

heartRate

The value should be an integer.

The simulated result should take the selected context into account.

For example:

At rest:

generate values approximately between 55 and 115 BPM.

In Activity:

generate values approximately between 80 and 160 BPM.

The result must be clearly presented as simulated data.

Do not claim that the value comes from a real sensor.

==================================================

12. HEART-RATE CLASSIFICATION

==================================================

For the prototype, use these simple thresholds when activityStatus = "rest":

70–100 BPM:

Normal

Above 100 BPM:

Risky

Below 65 BPM:

Attention

Values between 65–69 BPM can also be classified as Attention for this prototype.

For activityStatus = "activity":

Do not apply resting thresholds as if they were medical diagnostic thresholds.

Instead, classify the result as contextual/illustrative.

The classification system must be easy to modify later.

Store:

heartRateStatus

Possible values:

normal

risky

attention

==================================================

13. RESULT DISPLAY

==================================================

After the measurement reaches 100%:

Replace the loading state with the measurement result.

Display the actual BPM prominently.

Example:

78 BPM

Normal

The BPM should become the primary piece of information.

Keep the status legend from the supplied design:

Normal

Risky

Attention

Use the corresponding status color.

Normal:

mint/turquoise

Risky:

red

Attention:

orange/peach

Do not redesign the entire screen.

Preserve the original composition and visual language.

==================================================

14. SHOW HISTORY

==================================================

On the completed measurement screen, display:

"Show History"

with the small stopwatch/history icon shown in the design.

Clicking it navigates to:

/history

==================================================

15. MEASUREMENT HISTORY

==================================================

Create a functional History page.

Every completed simulated measurement should be saved locally in the browser.

Use localStorage.

Each history record must contain:

- date

- time

- activityStatus

- physicalStatus

- BPM

- classification

Example:

03 Sep 2026

14:32

At rest

Exhaustion

78 BPM

Normal

The newest measurement should appear first.

Create a clean history list matching the visual identity of Härtz.

==================================================

16. HISTORY EMPTY STATE

==================================================

If there are no saved measurements:

Display a simple empty state.

Example:

"No measurements yet."

Add a button:

"Start a measurement"

which navigates to /status.

==================================================

17. HISTORY DETAILS

==================================================

When the user clicks a history record, show its details.

Display:

Date

Time

Activity status

Physical/emotional status

BPM

Classification

Keep the same dark blue visual language.

Do not create a complicated dashboard.

==================================================

18. CLEAR HISTORY

==================================================

Add a subtle "Clear history" action on the history page.

Before deleting everything, ask for confirmation.

After confirmation:

Remove all saved measurements from localStorage.

Return to the empty history state.

==================================================

19. STATE MANAGEMENT

==================================================

Use simple React state and localStorage.

Do not introduce a backend or authentication system.

The following state is required:

activityStatus

physicalStatus

measurementProgress

heartRate

heartRateStatus

measurementHistory

Keep the implementation simple and readable.

==================================================

20. COMPONENTS

==================================================

Create reusable components for:

HärtzLogo

ECGBackground

RadioOption

PrimaryButton

BackButton

Disclaimer

UsefulValues

MeasurementProgress

HeartRateStatus

HistoryItem

Avoid unnecessary duplication.

==================================================

21. ANIMATIONS

==================================================

Keep animations subtle.

ECG background:

very subtle visual movement is acceptable.

Measurement:

smooth progress from 0 to 100%.

Dashed circle:

subtle rotation or pulse during measurement.

Result:

gentle transition from loading state to result.

Do not use exaggerated animations.

==================================================

22. ACCESSIBILITY

==================================================

Use readable text sizes.

Ensure sufficient contrast.

Make buttons and radio controls easy to tap on mobile.

Do not communicate health status using color alone.

Always display the status text in addition to the color.

==================================================

23. MEDICAL SAFETY

==================================================

This is a wellness/UIUX prototype.

Never describe the simulated measurement as medically accurate.

Never present the classification as a diagnosis.

Keep the disclaimer visible.

The app should not imply that it can replace professional medical advice.

==================================================

24. CODE QUALITY

==================================================

Use clean, maintainable React code.

Use TypeScript if supported.

Keep components modular.

Keep the data model simple.

Avoid unnecessary dependencies.

Do not create a backend.

Do not create authentication.

Do not create payment functionality.

Do not create unnecessary features.

==================================================

25. MOST IMPORTANT DESIGN INSTRUCTION

==================================================

The supplied Figma design is the source of truth.

Do not "modernize" it into a generic health app.

Preserve its distinctive characteristics:

- dark desaturated blue background

- subtle ECG waveform

- Härtz logo

- cyan accent

- dark navy content panels

- white typography

- simple radio controls

- restrained status colors

- large breathing spaces

- minimal interface

- professional medical/wellness atmosphere

The final application should look like the provided Figma design has been transformed into a real, interactive web application.

The result must be polished enough to be presented as a UI/UX portfolio project.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hartz-pulse-companion.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/551edaa3-5816-473a-b76a-c32c559e06c7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
