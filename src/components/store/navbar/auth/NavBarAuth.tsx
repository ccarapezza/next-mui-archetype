'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faSpinner, faSignOut, faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import SignIn from '@/components/auth/SingIn';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { on } from 'events';

export default function NavBarAuth() {

  const { status, data } = useSession();

  const [state, setState] = useState(false);

  return (
    <div className='relative'>
      <div className="text-xl cursor-pointer h-8 flex items-center justify-center w-8 relative"
        onClick={() => {
          if (state === true) {
            setState(false)
            return
          }
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
            <>
              {
                status === "authenticated" ?
                  <div className='absolute top-[30px] right-0 bg-white p-4 rounded-md shadow-lg shadow-tertiary border'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-2xl font-bold text-primary'>Mi Cuenta:</h3>
                      <button className='text-tertiary-600 hover:text-primary-800'
                        onClick={() => setState(false)}
                      >
                        <FontAwesomeIcon icon={faClose} />
                      </button>
                    </div>
                    
                    <div className='my-4 py-2 border-y'>
                      <h4 className='text-sm capitalize mb-2'>{data.user?.name}</h4>
                      <h4 className='text-sm'>{data.user?.email}</h4>
                    </div>
                    <div className='text-center'>
                      <Link
                        href='/mi-cuenta'
                        className='flex items-center w-[200px] justify-center gap-x-1 py-2 px-4 text-white font-medium bg-tertiary hover:bg-primary active:bg-tertiary rounded-full md:inline-flex text-white bg-tertiary-600 hover:bg-tertiary-700'
                        onClick={() => setState(false)}
                      >
                        Mis Pedidos
                        <FontAwesomeIcon icon={faCartShopping} className='pl-1' />
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center w-[200px] justify-center gap-x-1 py-2 px-4 mt-4 text-white font-medium bg-tertiary hover:bg-primary active:bg-tertiary rounded-full md:inline-flex text-white bg-tertiary-600 hover:bg-tertiary-700"
                      >
                        Cerrar Sesión
                        <FontAwesomeIcon icon={faSignOut} className='pl-1' />
                      </button>
                    </div>
                  </div>
                  :
                  <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setState(false)}></div>
                    <div className="flex items-center min-h-screen px-4 py-8">
                      <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
                        <div className="p-4 border-b rounded-md">
                          <div className="flex justify-end">
                            <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                              onClick={() => setState(false)}
                            >
                              <FontAwesomeIcon icon={faClose} />
                            </button>
                          </div>
                          <SignIn />
                        </div>
                      </div>
                    </div>
                  </div>
              }
            </>
          )
          : ''
      }
    </div>
  )
}