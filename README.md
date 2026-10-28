# Rayawa.github.io

English | [简体中文](README_zh.md)

A multilingual personal portfolio website for projects, photography and written work.

## Overview

This static website presents technical projects, photography, articles and a personal introduction. Chinese, English and French pages are maintained in separate directories. Shared navigation, footer and interaction scripts support language switching and common page behavior.

The repository contains the complete website source and media resources. GitHub Pages publishes the site from the default branch through the existing workflow.

## Technology and Dependencies

- HTML5, CSS3 and JavaScript, without an application backend or local package-build requirement.
- Shared browser scripts for navigation, the footer, galleries and page interactions.
- External fonts, icons and selected browser libraries loaded by the pages.
- GitHub Pages/Jekyll for publishing; Python 3 is an optional local HTTP server.

## Repository Structure

- `index.html` — Chinese homepage.
- `en/` and `fr/` — English and French pages.
- `projects/` — project presentations and technical pages.
- `life/` — photography, music and reading-related pages.
- `static/css/` — shared and page-specific styles.
- `static/js/` — navigation, footer and browser interactions.
- `static/resources/` — images, documents and project media.
- `.github/workflows/` — deployment workflow.

## Quick Start

Run a static server from the repository root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`, `/en/` or `/fr/`. A local server keeps root-relative resource paths working. Edit the corresponding language pages together and preview affected pages before publishing.

The existing Chinese technical documentation is retained in [README_zh.md](README_zh.md).
