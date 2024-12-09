import React, { useState } from "react";
import Galaxy from "./Galaxy";
import Sidebar from "./Sidebar";
import AnimatedCursor from "react-animated-cursor";
import { IoPlanet } from "react-icons/io5";
import { LinksCard } from "./LinksCard";
import { LuCopyright } from "react-icons/lu";
import { FiExternalLink } from 'react-icons/fi';
import "../assets/styles/app.scss";
import "../assets/styles/tailwind.css";

const Home: React.FC = () => {
  const isTouchDevice = useState<boolean>('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0);

  return (
    <div className="animate-fade-in">
      <div className="app flex flex-col min-h-screen text-white">
        <Sidebar />
        <main className="scrollable flex-grow overflow-y-auto">
          {!isTouchDevice && (
            <AnimatedCursor
              innerSize={20}
              outerSize={16}
              color="265, 265, 265"
              outerAlpha={0.2}
              innerScale={0.7}
              outerScale={5}
              clickables={[
                "a",
                'input[type="text"]',
                'input[type="email"]',
                'input[type="number"]',
                'input[type="submit"]',
                'input[type="image"]',
                "label[for]",
                "select",
                "textarea",
                "button",
                ".link",
              ]}
            />
          )}
          <div>
            <br />
            <div className="mx-auto inline-block p-4">
              <div className="transition-transform duration-500 ease-in-out hover:scale-130">
                <IoPlanet size={110} color="black" />
              </div>
            </div>
            <br />
            <h1>
              <span className="text-4xl underline-animation">
                {"Hey, I'm Jwt2706"}
              </span>
            </h1>
            <br />
            <code className="text-gray-400">
              I'm an open source enjoyer.
              <br />
              Check out some of my projects on the sidebar!
            </code>
          </div>
          <LinksCard />
          <a href="/jwt2706_public.key" target="_blank" rel="noopener noreferrer" aria-label="GPG key" className="inline-flex items-center px-2 text-gray-400 text-lg bg-neutral-800 p-1 rounded mb-4">
            GPG key
            <FiExternalLink className="ml-2" aria-hidden="true" />
          </a>
        </main>
        <footer>
          <code>
            Made with &lt;3 | <LuCopyright style={{ display: "inline" }} />{" "}
            jwt2706 {new Date().getFullYear()}
          </code>
        </footer>
        <Galaxy />
      </div>
    </div>
  );
}

export default Home;
