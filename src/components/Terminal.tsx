"use client";

import { useEffect, useRef, useState } from "react";

const projects = {
  abc: { name: "Agent Builders Club", description: "A community for people building with AI.", url: "https://www.agentbuildersclub.dev/" },
  "agent-loop": { name: "Agent Loop System", description: "Local coordination for AI workers, with durable work and approvals.", url: "https://github.com/tylerdotai/agent-loop-system" },
  captcha: { name: "Worst Captcha Challenge", description: "A reverse Turing test: prove you're a robot.", url: "https://worst-captcha-challenge.vercel.app/" },
};

const welcome = [
  "",
  "╔════════════════════════════════════════════════════╗",
  "║  ⚡ TYLER DELANO - AUTHORIZED USER            ║",
  "║  LEVEL: BUILDER • ACCESS: GRANTED            ║",
  "╚════════════════════════════════════════════════════╝",
  "",
  "  Tyler Delano. IT Support by day. Code by night.",
  "  Local LLMs. Homelab. Shipped apps.",
  "",
  "  Try: projects | about | help",
  "",
];

const bootLines = [
  "> TYLER_OS v1.0 initializing...",
  "> Loading neural interfaces...",
  "> Mounting project files...",
  "> System ready.",
  "> SYSTEM LOAD: [████████████████████] 100%",
];

function MatrixCanvas({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const drops = Array(Math.floor(canvas.width / 16)).fill(1) as number[];
    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = "16px monospace";
      drops.forEach((drop, i) => {
        ctx.fillText(Math.random() > 0.5 ? "0" : "1", i * 16, drop * 16);
        drops[i] = drop * 16 > canvas.height && Math.random() > 0.975 ? 0 : drop + 1;
      });
    }, 35);
    const timeout = setTimeout(onComplete, 5000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [onComplete]);
  return <canvas ref={canvasRef} className="fixed inset-0 bg-black pointer-events-none z-50" />;
}

function renderLine(line: string) {
  return line.split("\n").map((row, rowIndex) => {
    const title = row.startsWith("PROJECTS") || /^0[1-3]  /.test(row);
    const detail = Object.values(projects).some(project => project.description === row) || row.startsWith("https:");
    return <span key={rowIndex} className={`block ${row === "" ? "h-3" : ""} ${title ? "text-yellow-300" : ""} ${detail || /^0[1-3]  /.test(row) ? "pl-4" : ""} ${row.startsWith("https:") ? "text-gray-500" : ""}`}>
      {row.split(/(https?:\/\/[^\s<>"']+)/g).map((part, index) => {
        const link = [projects.abc.url, projects["agent-loop"].url, projects.captcha.url,
          "https://github.com/tylerdotai", "https://x.com/tylerdotai"].find(url => url === part);
        return index % 2 && link
          ? <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline underline-offset-2">{Object.values(projects).some(project => project.url === link) ? "↗ visit" : link === "https://x.com/tylerdotai" ? "↗ X" : "↗ GitHub"}</a>
          : part;
      })}
    </span>;
  });
}

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([bootLines[0]]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [dir, setDir] = useState("/Users/tyler");
  const [booting, setBooting] = useState(true);
  const [matrixMode, setMatrixMode] = useState(false);
  const bootTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const drinkTimers = useRef<Set<ReturnType<typeof setInterval>>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timers = drinkTimers.current;
    let step = 0;
    let character = 1;
    bootTimer.current = setInterval(() => {
      if (character <= bootLines[step].length) {
        setLines([...bootLines.slice(0, step), bootLines[step].slice(0, character++)]);
      } else if (++step < bootLines.length) {
        character = 1;
      } else {
        if (bootTimer.current) clearInterval(bootTimer.current);
        setLines([...bootLines, ...welcome]);
        setBooting(false);
      }
    }, 17);
    return () => {
      if (bootTimer.current) clearInterval(bootTimer.current);
      timers.forEach(clearInterval);
    };
  }, []);

  useEffect(() => { if (!booting) inputRef.current?.focus(); }, [booting]);

  const skipBoot = () => {
    if (bootTimer.current) clearInterval(bootTimer.current);
    setLines(["> TYLER_OS ready.", ...welcome]);
    setBooting(false);
  };

  const append = (command: string, output: string) => {
    setLines(previous => [...previous, `Tyler@home ${dir.replace("/Users/tyler", "~")} $ ${command}`, output, ""]);
    if (command.trim()) setHistory(previous => [...previous, command]);
    setHistoryIndex(-1);
    setInput("");
  };

  const listProjects = () => "PROJECTS // 03 FEATURED\n\n" + Object.entries(projects)
    .map(([key, project], index) => `0${index + 1}  ${project.name}\n${project.description}\n${project.url}   cat projects/${key}`)
    .join("\n\n");

  const animateDrink = (command: string, action: string, complete: string) => {
    const marker = `${action}: [`;
    append(command, `${action === "BREWING" ? "> Grinding beans..." : "🤠 Texas Sweet Tea Protocol ENGAGED..."}\n> ${marker}${"░".repeat(10)}] 0%`);
    let progress = 0;
    const timer = setInterval(() => {
      progress++;
      setLines(previous => previous.map(line => line.includes(marker)
        ? `${action === "BREWING" ? "> Grinding beans..." : "🤠 Texas Sweet Tea Protocol ENGAGED..."}\n> ${marker}${"█".repeat(progress)}${"░".repeat(10 - progress)}] ${progress * 10}%${progress === 10 ? `\n${complete}` : ""}`
        : line));
      if (progress === 10) { clearInterval(timer); drinkTimers.current.delete(timer); }
    }, 110);
    drinkTimers.current.add(timer);
  };

  const runCommand = (value: string) => {
    const [rawCommand = "", arg] = value.trim().split(/\s+/);
    const cmd = rawCommand.toLowerCase();
    const isProjects = dir.endsWith("/projects");
    let output = "";

    switch (cmd) {
      case "help": output = "COMMANDS: projects about contact ls cd cat open history whoami pwd date clear matrix coffee tea sudo tree help\nEASTER EGGS: neofetch joke fortune game guess\nFILES: about.txt projects homelab stack links contact"; break;
      case "projects": output = listProjects(); break;
      case "about": output = "TYLER DELANO\nIT Support Associate. AI agent builder. Texas."; break;
      case "contact": output = "tyler.delano@icloud.com\nhttps://github.com/tylerdotai"; break;
      case "whoami": output = "Tyler Delano • Builder • Authorized"; break;
      case "pwd": output = dir; break;
      case "date": output = new Date().toString(); break;
      case "clear": setLines([]); setInput(""); return;
      case "matrix": setMatrixMode(true); setInput(""); return;
      case "sudo": output = "⚠️ ACCESS DENIED\nThis incident will be reported.\n(just kidding, you're cool)"; break;
      case "neofetch": output = "      tyler@tyler\n     OS: TylerOS v1.0\n   KERNEL: Brain 2.0\n    SHELL: zsh\n    CPU: Neural"; break;
      case "joke": output = "Why do programmers prefer dark mode? Because light attracts bugs."; break;
      case "fortune": output = "You will deploy something cool today."; break;
      case "game": output = "Guess the number (1-100)! Type 'guess [number]'"; break;
      case "guess": { const guess = Number(arg); output = !arg || !Number.isInteger(guess) ? "Usage: guess [number 1-100]" : guess === 42 ? "🎉 CORRECT! You win!" : guess < 42 ? "Too low! Try higher." : "Too high! Try lower."; break; }
      case "ls": output = isProjects ? Object.keys(projects).join("  ") : "about.txt  projects/  homelab  stack  links  contact"; break;
      case "cat": {
        if (!arg) { output = "Usage: cat [file]"; break; }
        const key = arg.replace(/^projects\//, "") as keyof typeof projects;
        if ((isProjects || arg.startsWith("projects/")) && Object.hasOwn(projects, key)) {
          const project = projects[key];
          output = `${project.name} — ${project.description}\n${project.url}`;
        } else if (arg === "about.txt" || arg === "about") output = "TYLER DELANO\nIT Support Associate. AI agent builder.\nTexas.\n\nToo Weird to Live, Too Rare to Die.";
        else if (arg === "projects") output = listProjects();
        else if (arg === "homelab") output = "HOMELAB:\n• Titan - Ryzen AI Max+ 395\n• PVE - Ryzen 5 3600X\n• Hoss - Mac mini M4 Pro\n• MacBook M1\n• Brad - Pi 4GB";
        else if (arg === "stack") output = "NEXT.JS • FASTAPI • PYTHON • TYPESCRIPT\nPOSTGRESQL • DOCKER • TAILWIND";
        else if (arg === "links") output = "https://x.com/tylerdotai\nhttps://github.com/tylerdotai\nhttps://www.agentbuildersclub.dev/";
        else if (arg === "contact") output = "tyler.delano@icloud.com\nhttps://github.com/tylerdotai";
        else output = `cat: ${arg}: File not found`;
        break;
      }
      case "cd": if (arg === "~" || arg === "/" || arg === "..") { setDir("/Users/tyler"); } else if (arg === "projects") { setDir("/Users/tyler/projects"); } else output = `cd: ${arg}: No such directory`; break;
      case "tree": output = ".\nabout.txt\nprojects/\n  abc\n  agent-loop\n  captcha\nhomelab\nstack\nlinks\ncontact"; break;
      case "open": if (arg && /^https?:\/\/[^\s<>"']+$/.test(arg)) { window.open(arg, "_blank", "noopener,noreferrer"); output = `Opening ${arg}...`; } else output = "Usage: open [https://url]"; break;
      case "history": output = history.map((entry, i) => `  ${i + 1}  ${entry}`).join("\n"); break;
      case "coffee": animateDrink(value, "BREWING", "[✓] Coffee ready. Focus +100%"); return;
      case "tea": animateDrink(value, "SWEETENING", "[✓] COLD. SWEET. PERFECT."); return;
      case "": return;
      default: output = `zsh: command not found: ${cmd}`;
    }
    append(value, output);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const candidates = ["help", "ls", "cat", "cd", "projects", "about", "contact", "whoami", "pwd", "date", "clear", "matrix", "coffee", "tea", "sudo", "tree", "neofetch", "joke", "fortune", "game", "guess", "history", "open"];
      const matches = candidates.filter(candidate => candidate.startsWith(input));
      if (matches.length === 1) setInput(matches[0] + " ");
    } else if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      const index = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index); setInput(history[index]);
    } else if (event.key === "ArrowDown" && historyIndex !== -1) {
      event.preventDefault();
      const index = historyIndex + 1;
      setHistoryIndex(index < history.length ? index : -1);
      setInput(index < history.length ? history[index] : "");
    }
  };

  return <main className="min-h-screen bg-[#0d0d0d] p-4 font-mono text-sm text-gray-300 break-words">
    {matrixMode && <MatrixCanvas onComplete={() => { setMatrixMode(false); setLines(previous => [...previous, "(MATRIX) Reality restored."]); }} />}
    {lines.map((line, i) => <div key={i} data-welcome={line.startsWith("╔") ? true : undefined} className={`whitespace-pre-wrap mb-1 ${/[╔║╚]/.test(line[0]) ? "text-yellow-400 text-[10px] sm:text-sm" : line.startsWith(">") ? "text-green-400" : ""}`}>{line.includes("Try: projects") ? <span>  Try: {["projects", "about", "help"].map((item, index) => <span key={item}>{index > 0 && " | "}<button type="button" onClick={() => runCommand(item)} className="cursor-pointer text-green-400 underline underline-offset-2 hover:text-white">{item}</button></span>)}</span> : renderLine(line)}</div>)}
    {booting ? <button type="button" onClick={skipBoot} className="mt-4 text-green-400 underline cursor-pointer">Skip boot →</button> : <>
      <form onSubmit={event => { event.preventDefault(); runCommand(input); }} className="flex items-center mt-1"><span className="text-green-500 mr-2 shrink-0">Tyler@home {dir.replace("/Users/tyler", "~")} $</span><input ref={inputRef} value={input} onChange={event => setInput(event.target.value)} onKeyDown={handleKeyDown} className="bg-transparent outline-none flex-1 min-w-0 text-gray-100" aria-label="Terminal command input" autoComplete="off" /></form>
      <div data-hints className="mt-6 text-xs text-gray-500">Tab • cat • matrix • coffee • tea • neofetch • joke</div>
    </>}
  </main>;
}
