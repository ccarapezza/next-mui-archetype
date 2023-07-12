"use client"
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingUI from './LoadingUI';

interface ISubscriptionForm {
    email: string
}

const schema = yup.object({
    email: yup.string().email().min(3).max(50).required(),
}).required();

const subscribe = async (roleData: { email: string }) => {
    console.log("roleData", roleData);
    const res = await fetch(`http://localhost:3000/api/subscribe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(roleData)
    });
    if(!res.ok){
        const errorData = await res?.json();
        console.log("errorData", errorData);
        debugger;
        throw new Error((errorData.error)?(errorData.error):"Error subscribing");
    }
    return res.json();
};

function SubscriptionForm({ mode }: { mode: "footer" | "popup" }) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ISubscriptionForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: ISubscriptionForm) => {
        setLoading(true);
        console.log(data)
        subscribe(data).then((response) => {
            console.log("response", response);
            alert("Thanks for subscribing!");//TODO: replace with toast
        }).catch((error) => {
            console.log("error", error);
            alert(error);//TODO: replace with toast
        }).finally(() => {
            setLoading(false);
        });
    };

    return (<form onSubmit={handleSubmit(onSubmit)}>
        {
            mode === "footer" && !loading ?
            <>
                <label className="block pt-4 pb-2"> Stay up to date </label>
                <div className="max-w-sm flex items-center border rounded-md p-1">
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full p-2.5 outline-none"
                    />
                    <button type='submit' disabled={loading} className="p-2.5 rounded-md text-white bg-indigo-600 outline-none shadow-md focus:shadow-none sm:px-5">
                        Subscribe
                    </button>
                </div>
                <p className="text-xs text-red-600 mt-2">{errors.email?.message}</p>
            </>
            : mode === "popup" && !loading ?
            <>
                <div className="relative">
                    <FontAwesomeIcon className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" icon={faEnvelope} />
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <p className="text-xs text-red-600 mt-2">{errors.email?.message}</p>
                <button type='submit' disabled={loading} className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2">
                    Subscribe
                </button>
            </>
            :
            <LoadingUI />
        }
    </form>)
}

export default SubscriptionForm