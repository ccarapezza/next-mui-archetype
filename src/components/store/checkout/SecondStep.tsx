"use client"
import { useSession } from 'next-auth/react';
import OrderFormGuest from './second-step/OrderFormGuest';
import LoadingUI from '@/components/main-ui/LoadingUI';


export default function SecondStep(props: { checkoutDiscountsId: string | null }) {
  const { checkoutDiscountsId } = props;
  const { status, data } = useSession();

  return (
    <>
      <div className="max-w-screen-xl px-4 py-2 mx-auto sm:px-6 sm:py-8 lg:px-8">
        <h2 className="text-xl font-bold text-primary sm:text-3xl mb-5">Ultimo paso</h2>
        {
          status === 'loading' ?
            <LoadingUI />
            :
            <OrderFormGuest checkoutDiscountsId={checkoutDiscountsId} />
        }
      </div>
    </>

  )
}