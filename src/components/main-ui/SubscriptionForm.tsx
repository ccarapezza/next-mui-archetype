"use client"
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingUI from './LoadingUI';
import { useSnackbar } from 'notistack';

interface ISubscriptionForm {
    email: string
}

const schema = yup.object({
    email: yup.string().email().min(3).max(50).required(),
}).required();

const subscribe = async (roleData: { email: string }) => {
    console.log("roleData", roleData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/subscribe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(roleData)
    });
    if (!res.ok) {
        const errorData = await res?.json();
        console.log("errorData", errorData);
        throw new Error((errorData.error) ? (errorData.error) : "Error subscribing");
    }
    return res.json();
};

function SubscriptionForm({ mode, setModalState }: { mode: "footer" | "popup", setModalState?: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ISubscriptionForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: ISubscriptionForm) => {

        setLoading(true);
        console.log(data)
        subscribe(data).then((response) => {
            console.log("response", response);
            enqueueSnackbar('¡Gracias por suscribirce a nuestro newsletter!', { variant: 'success' });
            if (mode === "popup" && setModalState) {
                setModalState(false);
            }
            reset();
        }).catch((error) => {
            console.log("error", error);
            enqueueSnackbar(error, { variant: 'error' });
        }).finally(() => {
            setLoading(false);
        });
    };

    return (<form onSubmit={handleSubmit(onSubmit)}>
        {
            mode === "footer" && !loading ?
                <>
                    <label className="block pt-4 pb-2">¡Subscribite y entérate de las últimas novedades!</label>
                    <div className="max-w-sm flex items-center border rounded-md p-1">
                        <input
                            {...register("email")}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu email"
                            className="w-full p-2.5 outline-none text-primary rounded-s-md"
                        />
                        <button type='submit' disabled={loading} className="p-2.5 rounded-e-md text-white hover:text-primary bg-primary outline-none shadow-md focus:shadow-none sm:px-5 hover:bg-secondary">
                            ENVIAR
                        </button>
                    </div>
                    <p className="text-xs text-red-600 mt-2">{errors.email?.message}</p>
                </>
                : mode === "popup" && !loading ?
                    <>
                        <div className="flex items-center border rounded-md p-1">
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Ingresa tu email"
                                className="w-full p-2.5 outline-none text-primary rounded-s-md"
                            />
                            <button type='submit' disabled={loading} className="p-2.5 rounded-e-md text-white hover:text-primary bg-primary outline-none shadow-md focus:shadow-none sm:px-5 hover:bg-secondary">
                                ENVIAR
                            </button>
                        </div>
                        <p className="text-xs text-red-600 mt-2">{errors.email?.message}</p>
                    </>
                    :
                    <LoadingUI />
        }
    </form>)
}

export default SubscriptionForm