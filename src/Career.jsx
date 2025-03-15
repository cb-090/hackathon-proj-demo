import React from "react";
import "./App.css";

export default function Career() {
  const timelineData = [
    {
      year: "2025",
      title: "Graduate from University",
      description:
        "Complete my Computer Science degree with a focus on software engineering.",
    },
    {
      year: "2024",
      title: "Software Internship",
      description:
        "Work as a software engineering intern at a tech company, gaining hands-on experience.",
    },
    {
      year: "2023",
      title: "Start Learning Machine Learning",
      description:
        "Begin exploring machine learning and AI by taking online courses and working on personal projects.",
    },
    {
      year: "2022",
      title: "Join Society of Women Engineers",
      description:
        "Become an active member of the Society of Women Engineers to build community and network with other women in STEM.",
    },
    {
      year: "2021",
      title: "Start Learning Programming",
      description:
        "Take my first programming class and begin exploring various languages like Python and JavaScript.",
    },
  ];

  return (
    <div className="career">
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
