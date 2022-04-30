import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Avatar from './Avatar'
import Image from './Image'
import Link from 'next/link'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [username, setUsername] = useState('Hacker')
  const [isProfile, setIsProfile] = useState(true)
  const [loads, setLoads] = useState(true)
  const [admin, setAdmin] = useState(false)
  const [access, setAccess] = useState(false)
  
  useEffect(() => {
    fetchPosts()
    getProfile()
    document.title = `${naming} Dashboard`;

    const mySubscription = supabase
      .from('posts')
      .on('*', () => {
        console.log('something happened....')
        fetchPosts()
      })
      .subscribe()
    return () => supabase.removeSubscription(mySubscription)
  }, [])
  
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select()
    setPosts(data)
    setLoads(false)
  }
  if (loads) return <p className="text-2xl">Loading ...</p>
  if (!posts.length) return <p className="text-2xl">No posts.</p>

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, Access, Admin`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      console.log(data)
      
      if (data) {
        setUsername(data.username)
        setIsProfile(false)
        setAccess(data.Access)
        setAdmin(data.Admin)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoads(false)
    }
  }


function name() {
    if (username === '') {
        return `${session.user.email}`
    }
    else {
        return `${username}`
    }
  }

  const naming = name();

  return (
    <div style={{
      display: 'block'
    }}>
        <h1>Hey, {naming}</h1>
        <h2>Welcome to the <span className="h2-span">Turner Fenton DECA Dashboard!</span></h2>

        <div> 
          {isProfile ? (
            <>
            <p>You can set up your username <Link href="/account">here</Link>.</p>
            </>
          ) : (
            <>
            View your profile <Link href="/account">here</Link>!
            </>
          )}
        </div>
        <br/><br/>
      <div>

    { access ? (
      <div className="row collection">
        <div className="col-12 collection">
      {
        posts.map(post => (
          <a key={post.id} href={post.title} style={{
            textDecoration: 'none',
          }}>
            <div className="card">
             <h2><b>{post.title}</b></h2>
             <i>{post.subtitle}</i>
             <p>{post.date} </p>
         </div>
          </a>)
        )
      }
</div></div>
) : (
  <div>
    Whoops! It appears that you don't have access to this page!<br/><br/> This page is currently under construction, and only available to students that made it to JOT Masters.
  </div>
)}
      </div>
    </div>
  )
}
