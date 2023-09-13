import MuiBox from '@/components/client/MuiBox'
import MyProfileForm from '@/components/management/my-profile/MyProfileForm'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { myProfileService } from '@/services/MyProfileService'
import React from 'react'

const getMyProfileData = async () => {
    return await myProfileService.getMyProfile();
}

export default async function MyProfilePage() {
    const myProfileData = await getMyProfileData();

    return (<>
        <PageHeader title="Mi Perfil" />
        <MuiBox className="p-10 flex justify-center">
            <MyProfileForm myProfileData={myProfileData}/>
        </MuiBox>
    </>)
}
