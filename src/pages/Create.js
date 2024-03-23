import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
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
      .insert([{ postTitle, courseDpt, courseCode, contactInfo, description}])

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

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">postTitle:</label>
        <input 
          type="text" 
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <label htmlFor="courseDpt">courseDpt:</label>
        <textarea 
          id="courseDpt"
          value={courseDpt}
          onChange={(e) => setCourseDpt(e.target.value)}
        />

        <label htmlFor="courseCode">courseCode:</label>
        <input 
          type="text"
          id="courseCode"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />

        <label htmlFor="contactInfo">contactInfo:</label>
        <textarea 
          id="contactInfo"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />

        <label htmlFor="description">description:</label>
        <input 
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p >}
      </form>
    </div>
  )
}

export default Create