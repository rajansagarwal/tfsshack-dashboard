import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Avatar from './Avatar'
import Image from './Image'
import Link from 'next/link'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  
  let array = ['870220@pdsb.net', '@696969@pdsb.net']

  useEffect(() => {
    getProfile()
    document.title = `Dashboard`;
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')

      if (error && status !== 406) {
        throw error
      }

      for (let i = 0; i < data.length; i++) {
        array.push(`${data[i].username}`)
      }

      console.log(array)

    for (let i = 0; i < array.length; i++) {
      if (session.user.email == array[i]) {
        setIsAdmin(true) 
      }
    }

      if (data) {
        for (let i = 0; i < data.length; i++) {
          members.push(`${data[i].username}`)
        }
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
        <h2>
        </h2>
        {isAdmin ? (
          <div>
            <h2 className="h2-span">You have admin access to this page.</h2>
            <h3><u>Member List</u></h3>
            <br/>
            <ol>
            {members.map(function(item) {
              return <li key={item}>{item}</li>;
            })}
            </ol>
          </div>
        ) : (
          <div>
            <div>
              <h2>You do not have admin access to this page</h2>
              <h2>Please return to the dashboard.</h2>

            </div>
          </div>
        )}
    </div>
  )
}
