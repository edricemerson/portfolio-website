export default function Home() {
  return (
    <main className="bg-gray-950 text-white min-h-screen flex flex-col">
      <header className="flex flex-wrap justify-between items-center px-10 py-6 bg-gray-900 shadow-md">
        <div className="flex flex-col items-start">
          <p className="italic text-gray-300 text-sm mb-2">
            "Committed to learning, solving and innovating for a better Tomorrow"
          </p>
          <nav className="flex flex-wrap gap-6 text-gray-200">
            <a href="#about-me" className="hover:text-blue-400 transition">About Me</a>
            <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
            <a href="#experience" className="hover:text-blue-400 transition">Experience</a>
            <a href="#education" className="hover:text-blue-400 transition">Education</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          </nav>
        </div>

       
        <div className="mt-4 md:mt-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
            Download CV
          </button>
        </div>
      </header>

     
      <section id="about-me" className="py-20 px-10 bg-gray-950">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">About Me</h2>
          <p className="text-gray-400 text-lg">Know more about my background</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="relative flex justify-center">
            <img
              src="/Images/Image1.jpg"
              alt="Profile 1"
              className="w-48 h-48 object-cover rounded-2xl border-2 border-gray-700 shadow-md"
            />
            <img
              src="/Images/Image2.jpg"
              alt="Profile 2"
              className="w-48 h-48 object-cover rounded-2xl border-2 border-gray-700 shadow-md absolute top-4 left-4 opacity-80"
            />
          </div>

          <div className="max-w-xl text-left space-y-4">
            <div>
              <p className="text-2xl font-bold">I'm Edric Emerson</p>
              <p className="text-lg text-gray-400">Computer Science & Database Technology Specialist</p>
              <p className="text-gray-500">5th Semester • GPA 3.0</p>
            </div>

            <p className="text-gray-300 leading-relaxed">
              A passionate computer science student with a strong foundation in programming and problem-solving.
              I thrive on challenges and enjoy creating innovative solutions through code. With a keen interest in
              software development, I am constantly exploring new technologies and honing my skills to stay at the
              forefront of the ever-evolving tech landscape. My goal is to contribute to impactful projects that make
              a difference in the world.
            </p>

            <div className="mt-8">
              <p className="text-2xl font-semibold mb-4">Skills</p>
              <div className="flex flex-col md:flex-row gap-10">
                <div>
                  <p className="text-lg font-medium mb-3">Technical Skills</p>
                  <div className="flex gap-4">
                    <img src="/Images/database.png" alt="Database" className="w-10 h-10" />
                    <img src="/Images/http.png" alt="Web" className="w-10 h-10" />
                    <img src="/Images/mobile.png" alt="Mobile" className="w-10 h-10" />
                  </div>
                </div>

                <div>
                  <p className="text-lg font-medium mb-3">Additional Skills</p>
                  <div className="flex gap-4">
                    <img src="/Images/eng.png" alt="English" className="w-10 h-10" />
                    <img src="/Images/teamwork.png" alt="Teamwork" className="w-10 h-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="py-20 px-10 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-10">Education</h2>
        <div className="max-w-3xl mx-auto">
          <div className="border-l-4 border-blue-500 pl-6 space-y-6">
            <div>
              <h3 className="text-2xl font-semibold">Bina Nusantara University</h3>
              <p className="text-gray-400">Bachelor of Computer Science</p>
              <p className="text-gray-500 text-sm">2022 - Present</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-20 px-10 bg-gray-950">
        <h2 className="text-4xl font-bold text-center mb-10">Experience</h2>
        <div className="max-w-3xl mx-auto">
          <div className="border-l-4 border-green-500 pl-6 space-y-6">
            <div>
              <h3 className="text-2xl font-semibold">Internship / Project Experience</h3>
              <p className="text-gray-400">To be added soon...</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20 px-10 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-10">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Example Project Card */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition">
            <h3 className="text-xl font-semibold mb-2">Portfolio Website</h3>
            <p className="text-gray-400 mb-4">Built with Next.js and Tailwind CSS</p>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-500 underline text-sm"
            >
              View Project →
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <footer id="contact" className="py-10 bg-gray-950 text-center border-t border-gray-800">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Edric Emerson — All Rights Reserved
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="mailto:edric@example.com" className="text-blue-400 hover:text-blue-500">
            Email
          </a>
          <a href="https://github.com/yourusername" target="_blank" className="text-blue-400 hover:text-blue-500">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" className="text-blue-400 hover:text-blue-500">
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}
