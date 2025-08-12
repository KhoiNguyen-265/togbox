# Togbox Demo

> **Togbox** is a lightweight, flexible modal library written in pure JavaScript.  
> This repository is the **demo version** and **initial development phase** before extracting it into an official standalone library.

---

## 📌 Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Installation & Usage](#installation--usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Planned Library Development](#planned-library-development)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Introduction

**Togbox Demo** was created to test and develop core modal features before packaging them into a reusable library.  
Tested features include:

- Open/close modal through multiple methods (**button**, **overlay**, **ESC key**)
- Options for **footer**, **destroyOnClose**
- Handle multiple modals at the same time
- Disable page scrolling when modal is open
- Add footer buttons using `addFooterButton`
- Support callbacks for modal **open** and **close** (`onOpen`, `onClose`)

---

## Demo

Clone the repository and open `index.html` directly in your browser:

```bash
git clone https://github.com/<your-username>/togbox-demo.git
cd togbox-demo
```

Then open the `index.html` file in a browser (Chrome, Firefox, Edge...) to try it out:

- **Modal 1**: Opened via **Open Modal 1** button
- **Modal 2**: Includes a login form, closes only via button or ESC key
- **Modal 3**: Includes a footer with multiple action buttons

📌 **Note:**  
This repo is only for demonstration purposes.  
The official library will be released in a separate repo `togbox` with a cleaner structure and npm support.

---

## Installation & Usage

1. **Download or clone** this repository
2. Open `index.html` in your browser
3. Customize `main.js` or `style.css` to experiment with different modal behaviors

Example usage:

```javascript
const modal1 = new Togbox({
  templateId: "modal-1",
  closeMethods: ["button", "overlay", "escape"],
  destroyOnClose: false,
  onOpen: () => console.log("Modal opened"),
  onClose: () => console.log("Modal closed"),
});

document.getElementById("open-modal-1").onclick = () => modal1.open();
```

---

## Features

- **closeMethods**: Specify closing methods (`button`, `overlay`, `escape`)
- **footer**: Enable/disable footer (`true`/`false`)
- **destroyOnClose**: Remove modal from DOM when closed
- **cssClass**: Add custom CSS classes
- **addFooterButton**: Add buttons to footer with callbacks
- **Multiple modals support**: Open multiple modals without losing state

---

## Project Structure

```
togbox-demo/
│
├── index.html     # Demo HTML file
├── style.css      # CSS for modals and demo page
└── main.js        # Togbox logic and event handling
```

---

## Planned Library Development

The official version will be located in the **`togbox`** repository with the following structure:

```
togbox/
├── dist/          # Built JS and CSS files
├── src/           # ES module source code
├── README.md      # Library documentation
└── package.json   # npm package info
```

Planned improvements:

- **Publish to npm** (`npm install togbox`)
- **Bundler support** (Vite, Webpack, Rollup)
- **Unit tests**
- **CSS optimization** (BEM naming convention)

---

## Technologies Used

- **HTML5** for page structure and modal templates
- **CSS3** (Flexbox, transitions) for styling and animations
- **Vanilla JavaScript** for modal functionality

---

## License

MIT License — Free to use, modify, and distribute.

---
