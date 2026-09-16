import { motion as Motion } from "framer-motion";
import { Braces, Database, Figma, Layers3, Smartphone, Sparkles, Wrench } from "lucide-react";
import { SiGithubcopilot, SiOpenai, SiPerplexity } from "react-icons/si";

const aiToolIcons = {
  ChatGPT: SiOpenai,
  "GitHub Copilot": SiGithubcopilot,
  "Prompt Design": Sparkles,
  "AI-assisted Research": SiPerplexity,
};

const skillGroups = [
  { title: "Frontend", icon: Braces, skills: ["React", "JavaScript", "Tailwind CSS", "HTML & CSS"] },
  { title: "Backend", icon: Layers3, skills: ["Node.js", "Express", "REST APIs", "Authentication"] },
  { title: "Mobile Development", icon: Smartphone, skills: ["React Native", "Responsive Design", "PWA Basics"] },
  { title: "Database", icon: Database, skills: ["Firebase", "Supabase", "MySQL", "Data Modeling"] },
  { title: "UI/UX", icon: Figma, skills: ["Figma", "Wireframing", "Prototyping", "Design Systems"] },
  { title: "Tools", icon: Wrench, skills: ["Git & GitHub", "Vite", "Vercel", "VS Code"] },
  { title: "AI Tools", icon: Sparkles, skills: ["ChatGPT", "GitHub Copilot", "Prompt Design", "AI-assisted Research"] },
];

const Skills = () => (
  <section id="skills" className="scroll-mt-28 px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40" aria-labelledby="skills-title">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#D93F87]">Capabilities</p><h2 id="skills-title" className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">A growing toolkit for thoughtful products.</h2><p className="mt-5 text-base leading-relaxed text-gray-400 sm:text-lg">I blend interface craft, practical development, and emerging tools to move ideas from rough concept to polished experience.</p></div>
      <div className="mt-14 grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => {
          const Icon = group.icon;
          return <Motion.article key={group.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.04 }} whileHover={{ y: -7 }} className={`group rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.025] p-6 shadow-xl shadow-black/15 transition hover:border-[#D93F87]/60 ${index === 0 || index === 6 ? "lg:col-span-2" : ""}`}>
            <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D93F87]/15 text-[#f4a6ca] transition group-hover:scale-110 group-hover:bg-[#D93F87] group-hover:text-white"><Icon size={21} /></span><span className="text-xs font-medium text-gray-500">{String(index + 1).padStart(2, "0")}</span></div><h3 className="mt-7 text-xl font-bold text-white">{group.title}</h3><div className="mt-4 flex flex-wrap gap-2">{group.skills.map((skill) => { const SkillIcon = group.title === "AI Tools" ? aiToolIcons[skill] : null; return <span key={skill} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-gray-300">{SkillIcon && <SkillIcon aria-hidden="true" size={13} className="text-[#f4a6ca]" />}{skill}</span>; })}</div>
          </Motion.article>;
        })}
      </div>
    </div>
  </section>
);

export default Skills;
