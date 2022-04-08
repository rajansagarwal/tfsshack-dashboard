import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Avatar from './Avatar'
import Image from './Image'
import Link from 'next/link'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('Hacker')
  const [isProfile, setIsProfile] = useState(true)

  useEffect(() => {
    getProfile()
    document.title = `${naming}'s Dashboard`;
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      console.log(data)
      
      if (data) {
        setUsername(data.username)
        setIsProfile(false)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
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
    <div>
        <h1>Hey, {naming}</h1>
        <h2>Welcome to the <span className="h2-span">Turner Fenton Hack Club Dashboard!</span></h2>

        <div> 
          {isProfile ? (
            <>
            <p>You can set up your username here.</p>
            </>
          ) : (
            <>
            View your profile here!
            </>
          )}
        </div>
        <br/><br/>
        <div className="row collection">
        <div className="col-12 collection">
        <a href="https://tfsshack-dashboard.vercel.app/web" style={{
            textDecoration: 'none'
        }}>
         <div className="card">
             <h2><b>Web Development</b></h2>
             <i>Content Description Goes Here</i>
             <p>Actual Content Goes Here </p>
         </div>
         </a>
         <a href="https://tfsshack-dashboard.vercel.app/ai" style={{
            textDecoration: 'none'
        }}>
         <div className="card">
             <h2><b>Artificial Intelligence</b></h2>
             <i>Content Description Goes Here</i>
             <p>Actual Content Goes Here </p>
         </div>
         </a>
      </div>
         </div>
      <div>
      </div>
    </div>
  )
}
