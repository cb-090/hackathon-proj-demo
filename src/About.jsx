export default function About({ backgroundImage }) {
    return (
      <div
        className="about"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh", // or any specific height you prefer
          padding: "20px", // adjust padding as needed
          color: "black", // to ensure text is visible on the background
        }}
      >
        <h2>About</h2>
        <p>Welcome to [App Name]! 💖 Hi [new user]! Welcome!</p>
        <p>
          STEM can be awesome, but let’s be real—it can also be super confusing
          when you’re trying to figure it all out on your own. That’s why we
          created this journal-themed space just for you! 📝💡 Think of it as a
          big sister, bestie, and mentor all in one—packed with stories, advice,
          and things we wish we knew when we started our STEM journeys. Whether
          you're looking for guidance, motivation, or just a little reassurance
          that you belong (because you totally do!), this is your space to learn,
          share, and grow. So grab a virtual pen, dive in, and let’s navigate STEM
          together! 🚀💖
        </p>
        <p>career page</p>
        <p>
          confused on where you should be right now? check out this page to see a
          comprehensive timeline of milestones so you can start formulating a
          plan.
        </p>
        <p>resources page</p>
        <p>
          Check out this page to find out about new opportunities, either to learn
          something new through videos, find opportunities to help your journey
          financially, and tons of free programs or courses if you want to pursue
          learning outside of school!~
        </p>
        <p>advice page</p>
        <p>
          What's something you wish you knew when you were younger? Give some
          advice and maybe learn something new in the open forum. Big sis, lil sis
          style.
        </p>
        <p>about the team behind</p>
      </div>
    );
  }
  