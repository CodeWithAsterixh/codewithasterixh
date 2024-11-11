import Typewriter from "@/ui/components/TextWriteMock/TextWriterMock";

type Props = object;

function AboutPage({}: Props) {
  return (
    <section className="w-full h-fit flex flex-col items-start justify-start gap-5 p-4 bg-base-white dark:bg-base-black">
      <section className="group text-base-black dark:text-base-white w-full h-fit flex items-start justify-start gap-3 flex-col">
        <h1 className="font-bold border-b-4 border-b-transparent group-hover:border-b-base-black duration-200 dark:group-hover:border-b-base-white text-xl min-[498px]:text-2xl sm:text-3xl">
          Tech Meets Creativity:{" "}
          <Typewriter
            spanClassName="!border-teal-600 dark:!border-teal-400"
            className="!text-teal-700 dark:!text-teal-300"
            texts={[
              "Shaping the Future",
              "Pushing Boundaries",
              "Creating Impact",
              "Crafting Tomorrow",
              "Delivering Results",
              "Building the Future",
              "Innovating Every Day",
              "Shaping the Future",
            ]}
          />
        </h1>
        <div className="text-sm min-[498px]:text-base sm:text-lg">
          <p>
            Hello! I’m Paul Peter, a forward-thinking Computer Science and
            Software Engineering student, deeply engaged in the innovative
            intersection of technology and creativity. With a 2-year foundation
            in web development, I bring expertise in HTML, CSS, JavaScript,
            React, and Git, transforming ideas into engaging digital
            experiences.
          </p>
          <br />
          <p>
            Fueled by a passion for cutting-edge projects, I’m driven to push
            the boundaries of what&apos;s possible in the digital realm. My
            approach combines critical thinking and technical proficiency to
            deliver impactful solutions and results. As I continue to expand my
            skills, I’m excited to contribute meaningfully within a dynamic
            professional environment.
          </p>
          <br />
          <p>
            If you&apos;re looking for a resourceful, results-driven developer
            to join your team, let&apos;s connect and explore how we can shape
            the future of technology together.
          </p>
        </div>
      </section>
      <section className="group text-base-black dark:text-base-white w-full h-fit flex items-start justify-start gap-3 flex-col">
        <h1 className="font-bold border-b-4 border-b-transparent group-hover:border-b-base-black duration-200 dark:group-hover:border-b-base-white text-xl min-[498px]:text-2xl sm:text-3xl">
          When I’m Not Coding:{" "}
          <Typewriter
            spanClassName="!border-teal-600 dark:!border-teal-400"
            className="!text-teal-700 dark:!text-teal-300"
            texts={[
              "Exploring My Creative Side",
              "The Passions That Drive Me",
              "A Developer’s Playground",
              "My Hobbies and Inspirations",
              "The Things That Inspire Me",
            ]}
          />
        </h1>
        <div className="text-sm min-[498px]:text-base sm:text-lg">
          <p>
            Enthusiastic about the world of coding, I find joy in crafting
            digital solutions and exploring the endless possibilities of
            technology. Beyond the screen, my downtime revolves around two other
            passions: watching movies and gaming.
          </p>
          <br />
          <p>
            When it comes to movies, I’m drawn to those that intertwine
            creativity, technology, and science, offering a unique blend of
            entertainment and inspiration.
          </p>
          <br />
          <p>
            In the gaming realm, I immerse myself in virtual adventures, not
            just for the thrill, but for the strategic thinking and
            problem-solving challenges they present. These hobbies not only fuel
            my curiosity but also provide a well-rounded perspective,
            influencing my approach to coding and problem-solving.
          </p>
          <br />
          <p>
            By combining my love for coding with cinematic and gaming
            experiences, I find a harmonious balance that enhances both my
            technical skills and creative thinking.
          </p>
        </div>
      </section>
    </section>
  );
}

export default AboutPage;
