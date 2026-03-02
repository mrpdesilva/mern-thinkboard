import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './../src/pages/HomePage.jsx'
import CreatePage from './../src/pages/CreatePage'
import NoteDetailPaage from './../src/pages/NoteDetailPaage'
import { toast } from 'react-hot-toast'

const App = () => {

  const [theme, setTheme] = useState("sunset");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  {/* <button className='btn btn-outline' onClick={() => {
    setTheme(theme === "sunset" ? "cupcake" : "sunset");
  }}
  >
    Toggle Theme
  </button> */}

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full 
        [background:radial-gradient(ellipse_at_bottom_left,rgba(255,100,20,0.15)_0%,#0f1117_60%)] p-4" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPaage />} />
      </Routes>

    </div>
  )
}

export default App
