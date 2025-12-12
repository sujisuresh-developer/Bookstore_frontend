import React from 'react'
import { Link } from 'react-router-dom'




function Pnf() {
  return (
    <>
      <section>
        <img
          className="mx-auto w-[800px]"
          src="https://miro.medium.com/v2/resize:fit:1400/0*GUYQoLJ08bNdTigR.gif"
          alt=""
        />

        <div className="flex justify-center mb-2 mt-4">
          <Link to={"/"}>
            <button className="bg-violet-400 hover:bg-violet-600 text-black font-semibold py-2 px-4 rounded">
              Back to Home
            </button>
          </Link>
        </div>
      </section>

    </>
  )
}

export default Pnf