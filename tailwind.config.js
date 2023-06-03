/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
        keyframes: {
          shake: {
            '0%, 100%': { transform: 'rotate(0)' },
            '10%, 30%, 50%, 70%, 90%': { transform: 'rotate(-1deg)' },
            '20%, 40%, 60%, 80%': { transform: 'rotate(1deg)' },
          },
          pulse: {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
          },
          spin: {
            '0%': { transform: 'rotate(0deg)' },
            '80%': { transform: 'rotate(95deg)' },
            '90%': { transform: 'rotate(88deg)' },
            '100%': { transform: 'rotate(90deg)' },
          },
        },
        animation: {
          shake: 'shake 0.82s ease-in-out both',
          pulse: 'pulse 0.5s ease-in-out infinite',
          spin: 'spin 0.3s cubic-bezier(0, 0, 0.2, 1)',

        },
      colors: {
        offWhite:'#F5F4F6',
        // darkGray:'#3E3644',
        // darkGray:'#553555'
        darkGray:'#2D1B4B'
      },
    },
  },
  plugins: [],
}


