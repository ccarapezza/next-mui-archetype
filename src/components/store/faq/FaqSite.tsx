'use client'
import { useState } from "react";
import { FaqListDto } from "@/schemas/faq";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";


export default function FaqSite(props: { faqList: FaqListDto[] }) {
    const { faqList } = props;

    const [openStates, setOpenStates] = useState<boolean[]>(new Array(faqList.length).fill(false));

    const handleOpenAnswer = (index: number) => {
        const newOpenStates = [...openStates];
        newOpenStates[index] = !newOpenStates[index];
        setOpenStates(newOpenStates);
    };

    return (
        <section className="flex-1 leading-relaxed max-w-screen-xl pt-5 mx-auto px-4 md:px-8">
            <div className="mt-12 mb-10 max-w-screen-xl mx-auto">
                <h3 className="text-5xl font-tungsten text-primary sm:text-6xl mb-4 text-center">Preguntas Frecuentes:</h3>
                {
                    faqList.length === 0 && <p className="text-center text-gray-500">No hay preguntas frecuentes cargadas.</p>
                }
                {faqList.map((item, idx) => (
                    <div
                        className="space-y-3 mt-5 overflow-hidden border-b"
                        key={idx}
                        onClick={() => handleOpenAnswer(idx)} // Pasar el índice de la pregunta
                    >
                        <h4 className="cursor-pointer flex items-center justify-between text-lg text-gray-700 font-medium">
                            {item.ask}
                            {openStates[idx] ? (
                                <FontAwesomeIcon icon={faMinus} className="h-5 w-5 text-gray-500 ml-2" />
                            ) : (
                                <FontAwesomeIcon icon={faPlus} className="h-5 w-5 text-gray-500 ml-2" />
                            )}
                        </h4>
                        <div className="duration-300" style={{ height: openStates[idx] ? "auto" : "0px" }}>
                            <div>
                                <p className="text-gray-500 p-2 pb-4">{item.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
