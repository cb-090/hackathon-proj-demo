import React from "react";

export default function Career({ backgroundImage }) {
  const timelineData = [
    {
      year: " ",
      title: "Highschool",
      description:
        "Take CS classes at school (AP or otherwise!), explore summer programs like GWC or KWK, explore summer classes at vatious universities' engineering schools, and start building your own personal projects! Put all of this on a resume, LinkedIn, and GitHub to use when you apply to colleges and scholarships.  Also look into high school internship opportunities with engineering companies!",
    },
    {
      year: " ",
      title: "College: Freshmen-Junior",
      description:
        "Take advantage of the CS curriculum at your school, keep updating your resume and GitHub with your class proejcts, as well as your LinkedIn with your various experiences & milestones. Look into freshman, sophomore, or junior specific summer programs and internships offered at various companies, tech focused or otherwise. If interested in graduate education, look into joining a research project with a professor.",
    },
    {
      year: " ",
      title: "College: Senior",
      description:
        "Make the most of your final undergrad courses and apply to graduate programs (if interested in obtainiing a masters or phd). Look at and apply to early career / entry level jobs, post-grad programs (like 1 year of service), keep meeting with your Career and Professional Development Office, and enjoy the rest of your undergrad experience!",
    },
    {
      year: " ",
      title: "Graduate Schools",
      description:
        "Explore and complete your branch of research or grad program, and look into post-grad industry opportunities/jobs to jumpstart your career.",
    },
    {
      year: " ",
      title: "Industry",
      description:
        "Keep learning and growing in the industry, and plan out where you want to go with your career and the rest of your life :)",
    },
  ];
  
  return (
    <div
      className="career"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // or any specific height you prefer
        padding: "20px", // adjust padding as needed
        color: "black", // to ensure text is visible on the background
      }}
    >
      <h2>My Roadmap</h2>
      <div className="timeline">
        {timelineData.map((event, index) => (
          <div key={index} className="timeline-event">
            <div className="timeline-year">{event.year}</div>
            <div className="timeline-content">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Resume Template Section */}
      <section className="template-section">
        <h2>Resume Template</h2>
        <p>
          Create a polished, professional resume tailored for software
          engineering roles, highlighting academic achievements and technical
          skills. It should be easy to read, concise, and reflect my unique
          strengths in the field.
        </p>

        <h3>Resume Tips:</h3>
        <ul>
          <li>
            <strong>Use Action Verbs:</strong> Start bullet points with strong
            action verbs like "developed", "designed", or "led" to showcase your
            achievements.
          </li>
          <li>
            <strong>Highlight Relevant Skills:</strong> Make sure to list
            technical skills that are relevant to the role you’re applying for,
            such as programming languages, tools, and frameworks.
          </li>
          <li>
            <strong>Keep It Concise:</strong> Keep your resume to one page (two
            at most) and focus on the most important and relevant experiences
            and achievements.
          </li>
          <li>
            <strong>Quantify Achievements:</strong> Whenever possible, include
            numbers and metrics to demonstrate the impact of your work (e.g.,
            “Increased app efficiency by 30%”).
          </li>
          <li>
            <strong>Tailor for Each Job:</strong> Customize your resume for each
            job application by emphasizing the most relevant skills and
            experience for the specific role.
          </li>
        </ul>
      </section>

      {/* LinkedIn Template Section */}
      <section className="template-section">
        <h2>LinkedIn Template</h2>
        <p>
          Build a strong LinkedIn profile to showcase my career journey, skills,
          and professional connections in the tech industry. This profile should
          emphasize my accomplishments, technical skills, and enthusiasm for
          contributing to innovative projects.
        </p>

        <h3>LinkedIn Tips:</h3>
        <ul>
          <li>
            <strong>Professional Headshot:</strong> Use a clear, professional
            photo for your profile. It’s the first impression potential
            employers will have.
          </li>
          <li>
            <strong>Craft a Compelling Headline:</strong> Your headline should
            be more than just your job title. Highlight your skills, ambitions,
            and what you’re passionate about.
          </li>
          <li>
            <strong>Write a Strong Summary:</strong> The summary section is your
            chance to tell your story. Briefly describe your experience, skills,
            and what excites you about your work.
          </li>
          <li>
            <strong>Showcase Projects:</strong> Include any relevant projects,
            particularly ones that showcase your technical expertise and
            problem-solving abilities.
          </li>
          <li>
            <strong>Engage with Content:</strong> Share interesting articles,
            insights, or personal experiences related to your field. This helps
            demonstrate your passion and knowledge.
          </li>
          <li>
            <strong>Get Recommendations:</strong> Ask colleagues, professors, or
            employers for recommendations to build credibility and trust in your
            profile.
          </li>
        </ul>
      </section>
    </div>
  );
}
