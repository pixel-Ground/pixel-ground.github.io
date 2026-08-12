# QA Report

## Passed
- `preview/app.js` Node syntax check
- Vue entry/data JavaScript syntax check
- CSS opening/closing brace count matched
- Duplicate HTML id check passed
- All relative asset references in `preview/index.html` resolved
- `standalone.html` contains no unresolved local CSS/JS/image references
- 4 portfolio projects present and company/project naming separated
- Desktop Orbit math supports four 90° nodes and 270° scroll rotation
- Mobile breakpoint removes Orbit and exposes sequential project content
- White square pointer particle is capped at 1–10px and click burst is enabled
- `prefers-reduced-motion` fallback included
- focus-visible treatment included

## Packaging
- `standalone.html`: dependency-free single-file demo
- `static/`: dependency-free static deployment version
- `src/`: Vue 3 implementation source

## Environment note
The package registry install step timed out in the execution environment, so a Vite production bundle was not generated here. The package manifest and Vue source are included, while the dependency-free static/standalone implementation is included as the immediately runnable deliverable.
