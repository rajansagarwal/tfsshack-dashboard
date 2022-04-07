import { useState, useEffect, PropTypes } from 'react'
import { supabase } from '../utils/supabaseClient'
import Avatar from './Avatar'
import Image from './Image'
import Link from 'next/link'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', 
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  let favicon = document.getElementById('favicon');

useEffect(() => {
      document.title = `${naming}'s Dashboard`;
    favicon = `${avatar_url}`;
})

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
        <h2>Welcome to the Turner Fenton Hack Club Dashboard!</h2>
        <br/><br/>
        <div> 
        </div>
        <br/><br/>
        <div className="row collection">
        <div className="col-12 collection">
         <div className="card">
             <h2>Web Development</h2>
             <i>Content Description Goes Here</i>
             <p>Actual Content Goes Here </p>
         </div>
         <div className="card">
             <h2>Web Development</h2>
             <i>Content Description Goes Here</i>
             <p>Actual Content Goes Here </p>
         </div>
      </div>
         </div>
         <div className="row collection">
        <div className="col-12 collection">
         <div className="card">
             <h2>Web Development</h2>
             <i>Content Description Goes Here</i>
             <p>Actual Content Goes Here </p>
         </div>
         <div className="card">
             <h2>Web Development</h2>
             <i>Content Description Goes Here</i>
             <p>Actual Content Goes Here </p>
         </div>
      </div>
         </div>
      <div>
      </div>
    </div>
  )
}
