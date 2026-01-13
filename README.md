# the-playground 🚀

### What's this all about?
**the-playground** is my personal 3D sandbox built as a school assignment. The goal was to combine 3D modeling skills with web development to create a functional, interactive environment. It’s where I mess around with shaders, custom models, and camera animations. I built it to be modular, focusing on a clean dev experience without all the unnecessary bloat.

### Technical Stuff
I’m using a modern 3D stack and some pretty specific coding rules to keep things snappy:

* **Framework:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (for that sweet type-safety).
* **Rendering:** [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) to bring Three.js into the React world.
* **Shaders:** Using the [Lygia Shader Library](https://lygia.xyz/) for the heavy math, plus a custom water shader based on vertex displacement and noise.
* **State Management:** A central store (Zustand) handles the camera targets and scene states.
* **The "No useMemo" Rule:** I explicitly avoid the `useMemo()` hook. I prefer keeping logic predictable through smart component scoping instead.
* **Tools:** * [Leva](https://github.com/pmndrs/leva) for live tweaking (hidden automatically when `isProduction` is true).
    * [@react-three/drei](https://github.com/pmndrs/drei) for text and helper components.

### Credits
* **Models:** Most of the 3D models are my own work, made specifically for this project.
* **The Floor (Disclaimer):** The terrain/floor model was made following a Blender Geometry Nodes tutorial. Honestly, I lost the link to the original video during development, so if it looks familiar, credits to that unknown creator!
* **Water Shader:** Shout out to the [Wawa Sensei Water Shader tutorial](https://wawasensei.dev/courses/react-three-fiber/lessons/water-shader) for the inspiration and foundation.
* **Textures & Assets:** Various procedural textures generated using Lygia.

### How to run it locally
Want to take it for a spin? Here’s how:

1.  **Clone the repo:**
    ```bash
    git clone [repository-url]
    cd the-playground
    ```

2.  **Grab the dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root to set your `isProduction` flag and other bits.

4.  **Fire it up:**
    ```bash
    npm run dev
    ```

5.  **Build for production:**
    ```bash
    npm run build
    ```