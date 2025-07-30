


export default function Login() {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full bg-[var(--primary)] text-white p-4'>
      <h1 className='text-3xl font-bold mb-4'>Login</h1>
      <form className='flex flex-col gap-4 w-full max-w-sm'>
        <input type='text' placeholder='Username' className='p-2 rounded bg-gray-200 text-black' />
        <input type='password' placeholder='Password' className='p-2 rounded bg-gray-200 text-black' />
        <button type='submit' className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>Login</button>
      </form>
    </div>
  );
}