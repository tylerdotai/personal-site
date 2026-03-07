import Link from "next/link";

export default function Home() {
  const projects = [
    {
      name: "Flume",
      desc: "Task manager with AI agent API",
      link: "https://flume.sh",
      status: "Live",
    },
    {
      name: "Jarvis AI",
      desc: "Desktop assistant with local LLMs",
      link: "https://github.com/tylerdotai/jarvis-ai",
      status: "In Dev",
    },
    {
      name: "Titan AI",
      desc: "Local AI code generation",
      link: "https://github.com/tylerdotai/titan-ai",
      status: "Live",
    },
  ];

  const homelab = [
    { name: "Titan", specs: "Ryzen AI Max+ 395, 128GB RAM, Radeon 8060S" },
    { name: "PVE", specs: "Ryzen 5 3600X, 16GB RAM" },
    { name: "Hoss", specs: "Mac mini M4 Pro, 24GB RAM" },
    { name: "MacBook", specs: "MacBook M1" },
    { name: "Brad", specs: "Raspberry Pi, 4GB RAM" },
  ];

  return (
    <main className="min-h-screen bg-background bg-grid px-6 py-12 md:px-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-baseline justify-between">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              TYLER<span className="cursor-blink"></span>
              <br />
              DELANO
            </h1>
            <div className="flex gap-4 text-sm">
              <a
                href="mailto:tyler.delano@icloud.com"
                className="hover:text-accent transition-colors"
              >
                email
              </a>
              <a
                href="https://github.com/tylerdotai"
                target="_blank"
                className="hover:text-accent transition-colors"
              >
                github
              </a>
              <a
                href="https://x.com/tylerdotai"
                target="_blank"
                className="hover:text-accent transition-colors"
              >
                twitter
              </a>
            </div>
          </div>
        </header>

        {/* Bio */}
        <section className="mb-16">
          <p className="text-xl md:text-2xl leading-relaxed text-gray-400">
            I build things.
            <br />
            Not a dev by trade.
            <br />
            But I build like one.
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-border mb-12" />

        {/* Projects */}
        <section className="mb-12">
          <h2 className="text-sm text-gray-500 mb-6">PROJECTS</h2>
          <div className="grid gap-4">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.link}
                target="_blank"
                className="group block border border-border p-4 hover:border-accent transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg group-hover:text-accent transition-colors">
                    {project.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-400 mt-1">{project.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Homelab */}
        <section className="mb-12">
          <h2 className="text-sm text-gray-500 mb-6">HOMELAB</h2>
          <div className="grid gap-2">
            {homelab.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-baseline py-2 border-b border-border/50"
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500 text-sm text-right">
                  {item.specs}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Footer */}
        <footer className="flex justify-between items-center text-sm text-gray-500">
          <a
            href="https://github.com/tylerdotai/personal-site"
            target="_blank"
            className="hover:text-gray-300 transition-colors"
          >
            view source
          </a>
          <span>Built with Next.js, Tailwind</span>
        </footer>
      </div>
    </main>
  );
}
