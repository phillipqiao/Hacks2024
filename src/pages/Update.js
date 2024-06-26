import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [postTitle, setPostTitle] = useState('')
  const [courseDpt, setCourseDpt] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [description, setDescription] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!postTitle || !contactInfo || !description || !courseDpt || !courseCode) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('studyBuddies')
      .update([{ postTitle, courseDpt, courseCode, contactInfo, description}]).select()
      .eq('id', id)

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('studyBuddies')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setPostTitle(data.postTitle)
        setCourseDpt(data.courseDpt)
        setCourseCode(data.courseCode)
        setContactInfo(data.contactInfo)
        setDescription(data.description)
      }
    }

    fetchPost()
  }, [id, navigate])

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
      <label htmlFor="postTitle">Post Title:</label>
        <input 
          type="text" 
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <label htmlFor="courseDpt">Subject : </label>
        <input 
          type="text"
          id="courseDpt"
          value={courseDpt}
          onChange={(e) => setCourseDpt(e.target.value)}
          placeholder="e.g. CPSC"
        />

        <label htmlFor="courseCode">Course # : </label>
        <input 
          type="text"
          id="courseCode"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          placeholder="e.g. 210"

        />

        <label htmlFor="contactInfo">Contact Info:</label>
        <textarea 
          id="contactInfo"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />

        <label htmlFor="description">Description of:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Update Post!</button>
        {formError && <p className="error">{formError}</p >}
      </form>
    </div>
  )
}

export default Update