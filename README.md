# Rayawa.github.io

English | [简体中文](README_zh.md)

A multilingual static catalogue of application, embedded-system and research projects.

## Overview

The site groups project descriptions, technical pages and shared static resources. Chinese, English and French pages use separate directories. The project landing pages focus on technical work and exclude biographies, personal portraits, classmate information and personal contact details.

## Technology and Dependencies

HTML, CSS and JavaScript with GitHub Pages deployment. External fonts/icons and selected media are loaded by the pages. A static server is sufficient; no JavaScript package build is required.

## Repository Structure

- `index.html` — default project catalogue
- `en/` — English pages
- `fr/` — French pages
- `projects/` — project details
- `static/css/` — shared styles
- `static/js/` — navigation, footer and interactions
- `static/resources/` — project assets

## Quick Start

Run a static server from the repository root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`. No frontend compilation is required. Network access is needed for externally hosted resources.

Edit the corresponding language pages together and check relative asset paths. Shared navigation and footer code is under `static/js/`.
