<div align="center">

# NSTI Jodhpur Examination System

**A robust, enterprise-grade Learning Management System designed to ensure academic integrity.**

[![Live Demo](https://img.shields.io/badge/Live_Environment-View_Platform-2ea44f?style=for-the-badge&logo=vercel)](https://kapilinania.github.io/lms-project/)
<br/>
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.0.0-lightgrey.svg?style=flat-square)](#)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg?style=flat-square)](./CONTRIBUTING.md)

</div>

---

## Overview

The NSTI Jodhpur Examination System is a next-generation assessment platform built to address the core challenges of modern digital education. It combines an adaptive, glassmorphic user interface with aggressive, intelligent anti-cheating mechanisms to deliver a secure testing environment that does not compromise on user experience.

Whether you are conducting high-stakes examinations or routine mock tests, this platform provides the infrastructure required to scale securely.

## Table of Contents

- [Core Capabilities](#core-capabilities)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Security Model](#security-model)
- [Project Leadership](#project-leadership)
- [License](#license)

---

## Core Capabilities

We focus on three main pillars: Security, Usability, and Reliability.

<table>
  <tr>
    <td width="33%" valign="top">
      <h3>🛡️ Zero-Trust Security</h3>
      Built-in mechanisms to prevent unauthorized access and maintain test integrity. Includes Tab-Guard, forced fullscreen, and AI-assisted behavioral tracking.
    </td>
    <td width="33%" valign="top">
      <h3>🎨 Premium UI/UX</h3>
      A seamless experience featuring dynamic Light/Dark modes, responsive fluid typography, and micro-interactions powered by modern CSS architectures.
    </td>
    <td width="33%" valign="top">
      <h3>📶 High Availability</h3>
      Smart resilience technology guarantees that test progress is saved locally during network drops, syncing automatically upon reconnection.
    </td>
  </tr>
</table>

---

## System Architecture

The project follows a modular, client-heavy architecture, allowing for rapid deployment and easy maintenance.

| Directory / File | Description | Role |
| :--- | :--- | :--- |
| `index.html` | Application Entry Point | Handles landing, authentication routing, and theme management. |
| `dashboard.html` | Administrator & Student Hub | Renders real-time analytics, test histories, and profile data. |
| `test.html` | Secure Assessment Interface | The locked-down environment where active examinations occur. |
| `mock-csa-data.js`| Data Layer | Serves structured JSON-like data for mock examinations. |
| `script.js` | Core Logic Controller | Manages state, anti-cheat event listeners, and offline syncing. |

---

## Security Model

Academic integrity is maintained through a multi-layered security protocol:

1. **State Randomization:** Questions and multiple-choice options are dynamically shuffled per user session.
2. **Environment Locking:** The `Tab Guard` API detects window blur events. If a user navigates away from the active exam window, an immediate auto-submit protocol is triggered.
3. **Data Encryption:** All sensitive transmission data is secured using AES-256 standards.
4. **Identity Verification:** Digital fingerprinting ensures the user session cannot be hijacked.

---

## Getting Started

### Prerequisites

No complex build tools are required. The platform runs on vanilla web technologies.
- A modern web browser (Chrome 90+, Firefox 88+, Edge 90+)
- Git (for version control)

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/kapilinania/lms-project.git
cd lms-project
```

### Running the Application

To ensure all scripts and local storage functions operate correctly (bypassing CORS restrictions), serve the directory using a local web server:

```bash
# If using Python 3:
python -m http.server 8000

# If using Node.js:
npx serve .
```

Navigate to `http://localhost:8000` in your browser.

---

## Project Leadership

This platform was developed under the visionary guidance of **Mohamad Insaf Ali** (Project Mentor & Guide). His strict focus on scalable anti-cheating mechanisms and user-centric design has been the driving force behind the platform's success.

---

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).

<div align="center">
  <p>Engineered for the future of education by the NSTI Team.</p>
</div>
