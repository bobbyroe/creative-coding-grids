# Creative Coding with Three.js — Grids!

Block out a Joshua-Davis-style grid in Three.js, swap bold color palettes, and sprinkle in GTAO for delicious depth. This project is intentionally **iterative** and **playful**—you’ll get happy accidents you can riff on for your own work.

**Learn Three.js Basics (my course)**
[https://robotbobby.thinkific.com/courses/learn-threejs-basics](https://robotbobby.thinkific.com/courses/learn-threejs-basics)

If this helps, **support on Patreon** ❤️
[https://patreon.com/RobotBobby](https://patreon.com/RobotBobby)

![Grid Screenshot](./grid-shot.png)

> Inspiration: [joshuadavis.com](https://joshuadavis.com/) • [HYPE for Processing](https://github.com/hype/HYPE_Processing)

---

## ✨ What you’ll explore

* Building a **grid composition** with randomness and repetition
* **Color palette** swaps for instant mood changes
* **GTAO post-processing** for chunky, tactile shading
* Light touches of animation + camera orbit to keep it alive

---

## 🚀 Quick Start

Clone and run a simple file server:

```bash
# from the project root
npx http-server
# then open the printed URL (usually http://localhost:8080)
```

Or use VS Code **Live Server** and open `index.html`.

---

## 🧩 Tech Stack

* [Three.js](https://threejs.org/)

  * WebGLRenderer, OrbitControls
  * EffectComposer + RenderPass + **GTAOPass** + OutputPass
* Node.js (optional) – only for serving files locally

---

## 🎛 Remix Knobs (edit `index.js`)

A few quick edits to make it yours:

```js
// 1) Try a different palette
const palette = [0x780000, 0xc1121f, 0xfdf0d5, 0x003049, 0x669bbc];
// const palette =["#ffbe0b","#fb5607","#ff006e","#8338ec","#3a86ff"];
// const palette = ["#386641","#6a994e","#a7c957","#f2e8cf","#bc4749"];

// 2) Grid density
const gridSize = 5; // bump to 7, 9, 11…

// 3) Spacing + scale rhythm
const spacing = 1.1; // tighten or loosen
// Look for `scale` in the loops to change block size ranges

// 4) Depth & rotation spice
// z is nudged with randomness inside getBox(); try bigger ranges
mesh.rotation.z = Math.PI * 0.25; // try 0, 0.125 * Math.PI, etc.
```

---

## 🛠 Dev Notes

* Main entry: `index.js`
* Post-fx: `EffectComposer` → `RenderPass` → **`GTAOPass`** → `OutputPass`
* Lights: Hemisphere + Point for specular pops

---

## 🤝 Contributing

Issues, ideas, PRs—totally welcome. Try adding:

* Alt grid tilings (hex, triangles)
* Animated palette shifts
* Noise-driven z-offsets
* InstancedMesh for larger grids

---

## 📄 License

MIT — remix freely and make cool stuff.

