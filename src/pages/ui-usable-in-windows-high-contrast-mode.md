---
layout: page.njk
tags: pages
title: The interface is usable in Windows High Contrast mode

conformanceLevel:
  - Best practice
description:
  - The interface is usable in Windows High Contrast mode
filters:
  - Best practice
interaction:
  - Contrast
knowledgeToTest:
  - Easy
principal:
priority:
responsibility:
  - Developer
severity:
successCriteria:
  - None
testProcedure:
  - Manual
  - Windows
timeToTest:
  - Quick
topic:
  - Code
  - Contrast
understandingScURL:
userImpact:
  - Text must meet a minimum contrast ratio to ensure users – especially those with low vision – can read comfortably
---

# {{ title }}

## Developer Notes

### Ensure the interface is usable in Windows High Contrast mode (Best Practice)

Consider how user preference changes in their operating system might affect usability of the interface. It is possible that specific: background images, focus styles, SVG colours and media queries will need to be created to ensure an interface is usable with special certain operating modes are switched on.

#### Information and tools

- [Use high contrast mode in Windows 10](https://support.microsoft.com/en-us/windows/use-high-contrast-mode-in-windows-10-fedc744c-90ac-69df-aed5-c8a90125e696)
- [What is High Contrast Mode?](https://scottvinkle.me/blogs/work/high-contrast-mode)
- [https://sarahmhigley.com/writing/whcm-quick-tips/](https://sarahmhigley.com/writing/whcm-quick-tips/)
- [A11y Project: High Contrast Mode](https://www.a11yproject.com/posts/2020-01-23-operating-system-and-browser-accessibility-display-modes/#toc_High-Contrast-Mode)

## Testing Notes

### The interface is usable in Windows High Contrast mode (Best Practice)

Content such as images, text and controls should be legible and and the interface usable in High Contrast mode.

#### Steps to check

- From the Windows Start button, select Settings > Ease of Access > High contrast
- Select the toggle button under Turn on high contrast. There may be a small delay while Windows processes the request, then the screen colours should change.
- Do all form field and button outlines remain visible?
- Does the interface remain usable?

**Impact range**: Medium - High

**Test type:** Manual
