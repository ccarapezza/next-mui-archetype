import VerifyEmailPage from "@/components/main-ui/VerifyEmailPage";
import { Suspense } from "react";

export default function VerifyEmail() {
    return (<Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailPage />
    </Suspense>)
}