import Image from 'next/image';
import Link from 'next/link';


const team = [
    {
        avatar: "https://dummyimage.com/384x224/322F30/fff.jpg",
        name: "Aliado 1",
        site: "www.aliado1.com",
        hrefSite: "https://www.aliado1.com",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
        linkedin: "javascript:void(0)",
        twitter: "javascript:void(0)",
        github: "javascript:void(0)"
    },
    {
        avatar: "https://dummyimage.com/384x224/322F30/fff.jpg",
        name: "Aliado 2",
        site: "www.aliado1.com",
        hrefSite: "https://www.aliado1.com",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
        linkedin: "javascript:void(0)",
        twitter: "javascript:void(0)",
        github: "javascript:void(0)"
    },
    {
        avatar: "https://dummyimage.com/384x224/322F30/fff.jpg",
        name: "Aliado 3",
        site: "www.aliado1.com",
        hrefSite: "https://www.aliado1.com",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
        linkedin: "javascript:void(0)",
        twitter: "javascript:void(0)",
        github: "javascript:void(0)"
    },
    {
        avatar: "https://dummyimage.com/384x224/322F30/fff.jpg",
        name: "Aliado 4",
        site: "www.aliado1.com",
        hrefSite: "https://www.aliado1.com",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
        linkedin: "javascript:void(0)",
        twitter: "javascript:void(0)",
        github: "javascript:void(0)"
    },
    {
        avatar: "https://dummyimage.com/384x224/322F30/fff.jpg",
        name: "Aliado 5",
        site: "www.aliado1.com",
        hrefSite: "https://www.aliado1.com",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry.",
        linkedin: "javascript:void(0)",
        twitter: "javascript:void(0)",
        github: "javascript:void(0)"
    }
]

export default function Aliados() {


    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-xl">
                    <h3 className="text-primary text-3xl font-semibold sm:text-4xl">
                        Nuestros Aliados
                    </h3>
                    <p className="text-gray-600 mt-3">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {
                            team.map((item, idx) => (
                                <li key={idx}>
                                    <div className="w-full h-60 sm:h-52 md:h-56">
                                        <Image
                                            src={item.avatar}
                                            className="w-full h-full object-cover object-center shadow-md rounded-xl"
                                            alt={item.name}
                                            layout="responsive"
                                            width={384}
                                            height={224}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="text-lg text-gray-700 font-semibold">{item.name}</h4>
                                        <Link
                                            className='text-primary hover:text-tertiary underline'
                                            href={item.hrefSite}
                                        >
                                            {item.site}
                                        </Link>
                                        <p className="text-gray-600 mt-2">{item.desc}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>

    );
};

