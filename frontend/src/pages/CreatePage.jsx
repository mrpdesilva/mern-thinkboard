import axios from 'axios';
import { ArrowLeftIcon, NotebookPen, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import api from '../lib/axios';

const CreatePage = () => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes",
        {
          title,
          content
        }
      );
      toast.success("Note created successfully");
      navigate("/");

    } catch (error) {
      console.log("Error creating the note", error)

      if (error.response.status === 429) {
        toast.error("Rate limit exceeded. Please try again later",
          {
            duration: 4000,
            icon: "💀"
          }
        );
      }else{
        toast.error("Something went wrong. Please try again later");
      }

    } finally {

    }
  }

  return (
    <div className='h-screen overflow-hidden flex flex-col'>
      <div className='max-w-2xl w-full mx-auto px-4 py-6 flex flex-col flex-1'>

        <Link
          to={"/"}
          className='inline-flex items-center gap-2 mb-6 text-base-content/50 hover:text-base-content transition-colors duration-200 group'
        >
          <ArrowLeftIcon className='size-4 text-primary group-hover:-translate-x-1 transition-transform duration-200' />
          <span className='text-sm'>Back to Notes</span>
        </Link>

        <div className='card bg-base-100 border-t-4 border-solid border-[#ff865b] shadow-xl flex-1 overflow-hidden'>
          <div className='card-body gap-4 flex flex-col h-full'>

            {/* Header */}
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20'>
                <NotebookPen className='size-5 text-primary' />
              </div>
              <div>
                <h2 className='card-title text-base-content text-2xl font-bold mb-1'>Create New Note</h2>
                <p className='text-xs text-base-content/40 mt-0.5'>Capture your thoughts</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 flex-1'>

              {/* Title */}
              <div className='form-control gap-1'>
                <span className='label-text text-base-content/60 font-medium'>Title</span>
                <input
                  type="text"
                  placeholder="Give your note a title..."
                  className='input input-bordered focus:input-primary w-full transition-all duration-200 mt-1'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content — grows to fill remaining space */}
              <div className='form-control gap-1 flex-1 flex flex-col'>
                <span className='label-text text-xs font-semibold uppercase tracking-widest text-base-content/50'>
                  Content
                </span>
                <textarea
                  placeholder="Write your thoughts here..."
                  className='textarea textarea-bordered focus:textarea-primary resize-none transition-all duration-200 w-full mt-1 flex-1'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <span className='text-xs text-base-content/30 mt-0.5'>{content.length} characters</span>
              </div>

              <div className='divider my-0' />

              {/* Footer */}
              <div className='flex items-center justify-between'>
                <span className='text-xs text-base-content/30'>
                  {title || content ? '● Unsaved changes' : '○ Empty note'}
                </span>
                <button
                  type='submit'
                  className='btn btn-primary gap-2'
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className='loading loading-spinner loading-sm' />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Sparkles className='size-4' />
                      Create Note
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        <p className='text-center text-xs text-base-content/20 mt-4'>
          Notes are saved to your personal board
        </p>

      </div>
    </div>
  )
}

export default CreatePage