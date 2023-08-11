
import Image from 'next/image'

export default async function ManagementSingInHeader() {

    return (
        <div className='flex flex-col md:flex-row items-center justify-center mt-2 px-4 pt-4'>
            <h2 className='text-tertiary-800 font-semibold'>Login corporativo:</h2>
            <div className='flex flex-col md:flex-row items-center justify-center'>
                <Image src={"/logos/CMD-Logo-Navbar.png"} alt='Float UI logo' width={150} />
                <span className='text-tertiary-800 font-semibold mx-4 my-6 md:my-0'> by </span>
                <h3 className='text-xl sm:text-xl font-bold text-[#A353A3]'>randomBrand?</h3>
            </div>
        </div>
    )
}




