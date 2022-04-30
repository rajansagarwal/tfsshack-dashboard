import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [warning, setWarning] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      if (email.endsWith('@pdsb.net') !== true) {
        throw error & setWarning('Must be a PDSB account!')
      }
      setWarning('Check your email for the login link!')
    } catch (error) {
      setWarning(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row">
      <div className="form-widget">
        <h1 className="header">Turner Fenton Hack Club</h1>
        <p className="description">Sign in via magic link or Metamask with your email below</p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Sending...' : 'Send magic link'}</span>
          </button><br/><br/>
        </div>
        {warning}
      </div>
    </div>
  )
}