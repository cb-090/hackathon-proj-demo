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
  const [entries, setEntries] = useState([]);
  const [resources, setResources] = useState({
    education: [],
    finances: [],
    programs: [],
    opportunities: [],
    misc: [],
  });

  const pageBackgrounds = {
    cover: "url('/assets/journal-cover.png')",
    page: "url('/assets/journal-page.jpg')"
  };

  const changePage = (page) => {
    setIsAbout(false);
    setIsAdvice(false);
    setIsCareer(false);
    setIsResources(false);

    if (page == "home") {
      return;
    } else if (page == "about") {
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
        await logInNewUser(session.user)
      }
    }
    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        logInNewUser(session.user)
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
  async function logInNewUser(user) {
    const { data: existingUser } = await supabase.from('user').select('*').eq('id', user.id).single()

    if (!existingUser) {
      console.log('adding new user')
      await supabase.from('user').insert({
        id: user.id,
        name: user.user_metadata.name,
        avatar_url: user.user_metadata.avatar_url,
        created_at: new Date().toISOString(),
      })
    }
  }

  // Updates advice database
  async function fetchAdvice() {
    const { data, error } = await supabase
      .from('advice')
      .select('*, user(*)')
      .order('created_at', { ascending: true })

    if (error) console.error('Error fetching advice:', error)
    else setEntries(data)
  }

  useEffect(() => {
    if (user) {
      // Initial fetch
      fetchAdvice()
      fetchResources()

      // Set up real-time subscription
      const channel = supabase
        .channel('advice')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'advice',
          },
          async () => {
            await fetchAdvice()
            await fetchResources()
          }
        )
        .subscribe()

      return () => {
        channel.unsubscribe()
      }
    }
  }, [user])

async function addAdvice(title, advice) {
    const { error } = await supabase.from('advice').insert({
      author_id: user?.id,
      title: title,
      content: advice,
      created_at: new Date().toISOString(),
    })

    fetchAdvice()
  
    if (error) console.error('Error adding advice:', error)
    else {
      return
      }
    }

// Resource database management
async function addResource(content, category, tags) {
  console.log('added resource')
  const { error } = await supabase.from('resources').insert({
      author_id: user?.id,
      content: content,
      category: category,
      tags: tags,
      created_at: new Date().toISOString(),
  })

  fetchResources()

  if (error) console.error('Error adding advice:', error)
    else {
      return
      }
}

async function fetchResources() {
  const { data, error } = await supabase
    .from('resources')
    .select('*, user(*)')
    .order('created_at', { ascending: true })

    var newResources = {
      education: [],
      finances: [],
      programs: [],
      opportunities: [],
      misc: [],
    };
    
    data.map((resource) => {
      if (resource.category == "education") {
        newResources.education.push(resource)
      }
      else if (resource.category == "finances")
        newResources.finances.push(resource)
      else if (resource.category == "programs")
        newResources.programs.push(resource)
      else if (resource.category == "opportunities")
        newResources.opportunities.push(resource)
      else if (resource.category == "misc")
        newResources.misc.push(resource)
    })

    if (error) console.error('Error fetching resources:', error)
    else setResources(newResources)
}

  return (

    <div className="App">
      <header>
        <h1>Title of our project</h1>
        <button className="tabs" onClick={() => changePage("home")}>
          Home
        </button>
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
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh", // or any specific height you prefer
              padding: "20px", // adjust padding as needed
              color: "black", // to ensure text is visible on the background
            }}
          >
            <p>{user?.user_metadata.name ?? "My"}'s' Journal</p>
            {!user ? (<button onClick={signIn}>Sign In</button>) :
        (<button onClick={signOut}>Sign Out</button>)}
          </div>
        ) : (
          <div className="page">
            <p>{user?.user_metadata.name ?? "My"}'s Journal</p>
            {isAbout && <About backgroundImage={pageBackgrounds.page} />}
            {isAdvice && <Advice backgroundImage={pageBackgrounds.page} user={user} entries={entries} send={addAdvice} />}
            {isCareer && <Career backgroundImage={pageBackgrounds.page} />}
            {isResources && <Resources backgroundImage={pageBackgrounds.page} user={user} resources={resources} send={addResource}/>}
          </div>
        )}
        <div className="bookmarks">
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
        </div>
      </main>
      <footer>
        {/* add an email/form for suggested improvements */}
        <p>&copy; add email</p>
      </footer>
    </div>
  );
}