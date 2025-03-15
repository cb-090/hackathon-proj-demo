import { useState, useEffect, useRef } from "react";
import { supabase } from './supabase'
import About from "./About";
import Advice from "./Advice";
import Career from "./Career";
import Resources from "./Resources";
import "./App.css";
// import journalCover from "./assets/journalCover.png";

export default function App() {
  const [user, setUser] = useState(null)
  const [isAbout, setIsAbout] = useState(false);
  const [isAdvice, setIsAdvice] = useState(false);
  const [isCareer, setIsCareer] = useState(false);
  const [isResources, setIsResources] = useState(false);
  const pageBackgrounds = {
    cover: "url('/journal-cover.png')",
    page: "url('/journal-page.jpg')",
  };

  const changePage = (page) => {
    setIsAbout(false);
    setIsAdvice(false);
    setIsCareer(false);
    setIsResources(false);
    if (page == "about") {
      setIsAbout(true);
    } else if (page == "advice") {
      setIsAdvice(true);
    } else if (page == "career") {
      setIsCareer(true);
    } else if (page == "resources") {
      setIsResources(true);
    }
  };

  // User authentication

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        // await logInNewUser(session.user)
      }
    }
    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        // logInNewUser(session.user)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  async function signIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) console.error('Error signing in:', error)
  }

  // Handle user sign out
  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error)
  }

  // Adds user to database
  // async function logInNewUser(user) {
  //   const { data: existingUser } = await supabase.from('user').select('*').eq('id', user.id).single()

  //   if (!existingUser) {
  //     await supabase.from('user').insert({
  //       id: user.uid,
  //       name: user.user_metadata.preferred_username,
  //       github_avatar_url: user.user_metadata.avatar_url,
  //       created_at: new Date().toISOString(),
  //     })
  //   }
  // }

  return (
    <div className="App">
      <header>
        <h1>Title of our project</h1>
        <button className="tabs" onClick={() => changePage("about")}>
          About
        </button>
        <button className="tabs" onClick={() => changePage("advice")}>
          Advice
        </button>
        <button className="tabs" onClick={() => changePage("career")}>
          Career
        </button>
        <button className="tabs" onClick={() => changePage("resources")}>
          Resources
        </button>
      </header>
      <main>
        {!isAbout && !isAdvice && !isCareer && !isResources ? (
          <div
            className="journal"
            style={{
              backgroundImage: pageBackgrounds.cover,
              backgroundSize: "contain",
              backgroundPosition: "center",
              height: "100vh", // or any specific height you prefer
              padding: "20px", // adjust padding as needed
              color: "white", // to ensure text is visible on the background
            }}
          >
            <p>Blank Name's Journal</p>
            {!user ? (<button onClick={signIn}>Sign In</button>) :
        (<button onClick={signOut}>Sign Out</button>)}
          </div>
        ) : (
          <div className="page">
            <p>Blank Name's Journal</p>
            {isAbout && <About backgroundImage={pageBackgrounds.page} />}
            {isAdvice && <Advice />}
            {isCareer && <Career />}
            {isResources && <Resources />}
          </div>
        )}
      </main>
      <footer>
        {/* add an email/form for suggested improvements */}
        <p>&copy; add email</p>
      </footer>
    </div>
  );
}