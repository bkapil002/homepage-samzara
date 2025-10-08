import React from 'react'

const JoinMember = () => {
  return (
    <div className='mb-12 sm:mb-15 mt-10 px-4 sm:px-8 md:px-19 lg:px-16'>
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-4 sm:p-10 text-center text-white max-w-full sm:max-w-3xl md:max-w-5xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold leading-snug">
          Join our{" "}
          <span className="font-bold text-white">961378</span> members who are
          willing to share their experience, strength and hope with you{" "}
          <span className="font-bold">24/7/365.</span>
        </h2>

        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-100">
          Attend online meetings and meet a community of people from around the
          world who are in recovery from addiction.
        </p>

        <a
          href="https://community.samzara.in/register"
          target="_blank"
          rel="noopener noreferrer"
          className="block sm:inline-block mt-5 sm:mt-6 cursor-pointer bg-white text-green-600 px-6 py-2 rounded-full shadow hover:bg-gray-100 transition w-full sm:w-auto font-semibold"
        >
          Sign Up Today
        </a>
      </div>
    </div>
  )
}

export default JoinMember