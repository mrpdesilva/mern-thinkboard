import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Save, Sparkles, Trash2Icon } from 'lucide-react';

const NoteDetailPaage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {

    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data);

      } catch (error) {
        console.log("Error in fetching notes", error)
        toast.error("Failed to fetch the Note")

      } finally {
        setLoading(false)
      }
    }

    fetchNote()

  }, [id])

  const handleDelete = async () => {

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/")

    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");

    }

  }

  const handleSave = async () => {

    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add title or content")
      return;
    }

    setSaving(true)
    
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note saved successfully");
      navigate("/")
      
    } catch (error) {
      console.log("Error saving the note", error)
      toast.error("Failed to update note");
      
    }finally{
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link
              to={"/"}
              className='inline-flex items-center gap-2 text-base-content/50 hover:text-base-content transition-colors duration-200 group'
            >
              <ArrowLeftIcon className='size-4 text-primary group-hover:-translate-x-1 transition-transform duration-200' />
              <span className='text-sm'>Back to Notes</span>
            </Link>
            <button onClick={handleDelete} className="btn btn-ghost text-error">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <span className='label-text text-base-content/60 font-medium'>Title</span>
                <input
                  type="text"
                  placeholder="Give your note a title..."
                  className='mt-3 input input-bordered focus:input-primary w-full transition-all duration-200 mt-1'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className='form-control gap-1 flex-1 flex flex-col'>
                <span className='label-text text-xs font-semibold uppercase tracking-widest text-base-content/50'>
                  Content
                </span>
                <textarea
                  placeholder="Write your thoughts here..."
                  className='textarea textarea-bordered focus:textarea-primary resize-none transition-all duration-200 w-full mt-1 flex-1'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
                <span className='text-xs text-base-content/30 mt-0.5'>{note.content.length} characters</span>
              </div>

              <div className='divider my-0' />

              {/* Footer */}
              <div className='flex items-center justify-between'>
                <span className='text-xs text-base-content/30'>
                  {note.title || note.content ? '● Unsaved changes' : '○ Empty note'}
                </span>
                <button
                  type='submit'
                  className='btn btn-primary gap-2'
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? (
                    <>
                      <span className='loading loading-spinner loading-sm' />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className='size-4' />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPaage
