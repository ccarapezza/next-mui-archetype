'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faSpinner, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import SignIn from '@/components/auth/SingIn';
import { signOut, useSession } from 'next-auth/react';

export default function (props: { providers: any }) {

  const { status, data } = useSession();
  const { providers } = props;

  const [state, setState] = useState(false);

  return (
    <>
      <div className="text-xl cursor-pointer h-8 flex items-center justify-center w-8 relative"
        onClick={() => {
          setState(true)
        }}>
        {
          status === "loading" ?
            <FontAwesomeIcon icon={faSpinner} pulse className='text-primary dark:text-white' />
            :
            <FontAwesomeIcon className='text-tertiary hover:text-primary' icon={faUser} />
        }

      </div>
      {
        state ?
          (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setState(false)}></div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
                  <div className="flex items-center justify-center p-4 border-b">
                    {
                      status === "authenticated" ?
                        <div className='p-4 text-center'>
                          <h3 className='text-lg text-tertiary-800 font-semibold mt-2 mb-4'>Mi Cuenta:</h3>
                          <h4 className='text-tertiary my-4'>{data.user?.name}</h4>
                          <h4 className='text-tertiary my-4'>{data.user?.email}</h4>
                          <button onClick={() => signOut()} className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-tertiary hover:bg-primary active:bg-tertiary rounded-full md:inline-flex text-white bg-tertiary-600 hover:bg-tertiary-700">
                            Cerrar Sesión
                            <FontAwesomeIcon icon={faSignOut} className='pl-1' />
                          </button>
                        </div>
                        :
                        <SignIn providers={providers!} />
                    }
                    {/* <SignIn providers={providers!} /> */}
                  </div>
                </div>
              </div>
            </div>
          )
          : ''
      }
    </>
  )
}