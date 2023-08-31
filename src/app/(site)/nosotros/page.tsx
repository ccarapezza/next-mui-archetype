import Link from "next/link";

const links = [
    { name: 'REPROCANN', href: '/' },
    { name: 'Aliados', href: '/aliados' },
    { name: 'Preguntas frecuentes', href: '/faq' },
    { name: 'Nuestra tienda', href: '/category/ropa' },
]

export default function AboutUs() {


    return (
        <div className="relative bg-none isolate overflow-hidden py-24 sm:py-32 min-h-[400px] sm:min-h-[750px] sm:bg-[url('/ilustra-cmd02.png')]"
            style={{
                backgroundSize: '700px auto', backgroundPosition: 'right bottom', backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">Nosotros</h2>
                    <p className="mt-6 text-lg leading-8 text-tertiary">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 sm:grid-cols-2 md:flex lg:gap-x-10">
                        {links.map((link) => (
                            <Link key={link.name} href={link.href} className="text-primary hover:text-tertiary">
                                {link.name} <span aria-hidden="true">&rarr;</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

