import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Avatar from './Avatar'
import { useRouter } from 'next/router'
import Image from './Image'
import Link from 'next/link'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [admin, setAdmin] = useState(false)
  const [access, setAccess] = useState(false)
  // const [avatar_url, setAvatarUrl] = useState(null)
  const router = useRouter()

  useEffect(() => {
    getProfile()
  }, [session])

  function name() {
    if (username === null || 'email_address') {
        return `${session.user.email}`
    }
    else {
        return `${username}`
    }
  }
  
  const naming = name();


  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, Access, Admin`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        // setAvatarUrl(data.avatar_url)
        setAccess(data.Access)
        setAdmin(data.Admin)
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
        // avatar_url,
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
      router.push('/')
    }
  }

  useEffect(() => {
    getProfile()
    document.title = `${naming}'s Dashboard`;
  }, [session])

  return (
    <div className="form-widget">
     {/*   <Avatar
      url={avatar_url}
      size={150}
      onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({ username, website, avatar_url: url })
      }} 
    />
    */}
    <br/><br/>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
    <div style={{
      display: 'flex',
    }}>
        { access ? (
          <div style={{
            width: 150,
          }}>
          <input id="email" type="text" value='Member Access' disabled />
        </div>
        ) : (
          <div>
          <input id="email" type="text" value='You do not have member access.' disabled />
        </div>
        )}
        <div style={{
          paddingLeft: 15,
        }}>
        { admin ? (
          <div style={{
            width: 150,
          }}>
          <input id="email" type="text" value='Admin Access' disabled />
          </div>
        ) : (
          <div>
        </div>
        )}
      </div>
      </div>
<br/><br/>
      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update Now'}
        </button>
      </div>
      <br/>
      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
      <br/><br/>
    </div>
  )
}
