import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';
import { LoaderIcon } from 'lucide-react';

const HomePage = () => {

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {

        const res = await api.get("/notes");
        console.log(res.data)
        setNotes(res.data);
        setIsRateLimited(false);

      } catch (error) {
        console.log("Error fetching notes")
        console.log(error)
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load Notes")
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto px-15 mt-6'>

        {loading && (
          <div className='min-h-screen bg-base-200 flex items-center justify-center'>
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-20 h-20 rounded-full bg-orange-400/20 animate-ping" />
                <div className="absolute w-16 h-16 rounded-full bg-orange-500/30 animate-pulse" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-rose-500 shadow-lg shadow-orange-500/50 animate-spin" style={{ animationDuration: '3s' }}>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-3 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: '50% 300%',
                        transform: `translate(-50%, -300%) rotate(${i * 45}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="w-40 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent relative overflow-hidden rounded-full">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200 to-transparent"
                  style={{ animation: 'shimmer 1.8s ease-in-out infinite' }}
                />
              </div>

              <p className="text-orange-400 font-semibold tracking-widest text-sm uppercase animate-pulse">
                Loading Notes…
              </p>
            </div>

            <style>{`
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}</style>
          </div>
        )}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default HomePage
