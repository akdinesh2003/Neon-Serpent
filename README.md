# Neon Serpent

A modern and visually stunning twist on the classic arcade snake game, powered by AI.

## 🌟 Features

- **Sleek Neon Aesthetics:** Immerse yourself in a vibrant, glowing world with beautiful, high-contrast visuals.
- **AI-Powered Gameplay:** The food placement is controlled by a Genkit AI flow, creating a more challenging and unpredictable experience by preventing easily exploitable patterns.
- **Customizable Experience:**
  - **Multiple Themes:** Choose from a variety of neon color schemes to match your style.
  - **Adjustable Speeds:** Set the game's pace from slow to fast to match your skill level.
- **Responsive Design:** Play seamlessly on both desktop and mobile devices.
- **Modern Tech Stack:** Built with Next.js, React, and Tailwind CSS for a fast and cutting-edge experience.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **UI:** [React](https://react.dev/), [ShadCN](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Generative AI:** [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- npm or a compatible package manager

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-repo/neon-serpent.git
cd neon-serpent
npm install
```

### 2. Set Up Your Environment Variables

The AI features in this game are powered by the Google Gemini API. You will need to provide your own API key to run the project.

1.  Create a new file named `.env.local` in the root of your project directory.
2.  Add your Google Gemini API key to this file:

    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

    > **⚠️ Important:** Without a valid API key, the AI for food placement will not work, and the game may not function correctly. You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Running the Development Server

Once the installation and setup are complete, you can run the game locally:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the result.

## 🎮 How to Play

- **Start/Restart:** Press `SPACE` or `ENTER`.
- **Move Snake:** Use the `ARROW KEYS` on your keyboard or the on-screen controls on mobile.
- **Pause/Resume:** Press the `P` key or use the pause/play button on the screen.
- **Settings:** Click the settings icon to change the game's theme and speed.

---

## ✍️ Author

- ** AK DINESH ** - https://github.com/akdinesh2003
