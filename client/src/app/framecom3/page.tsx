import type { NextPage } from "next";
import Image from "next/image";

export type FrameComponent3Type = {
    className?: string;
};

const FrameComponent3: NextPage<FrameComponent3Type> = ({ className = "" }) => {
    return (
        <section
            className={`self-stretch shadow-[0px_-5px_4px_rgba(115,_253,_170,_0.36)] bg-primary-color flex items-start justify-between !pt-[6rem] !pb-[3.875rem] !pl-[5.125rem] !pr-[4.875rem] box-border gap-[1.25rem] max-w-full text-left text-[2rem] text-accent-color font-[Montserrat] mq1050:flex-wrap mq1050:gap-[1.25rem] mq750:gap-[1.25rem] mq750:!pt-[3.875rem] mq750:!pb-[2.5rem] mq750:!pl-[2.563rem] mq750:!pr-[2.438rem] mq750:box-border ${className}`}
        >
            <div className="h-[31.438rem] w-[90rem] relative shadow-[0px_-5px_4px_rgba(115,_253,_170,_0.36)] bg-primary-color hidden max-w-full shrink-0" />
            <div className="w-[21.625rem] flex flex-col items-start gap-[1.875rem] max-w-full shrink-0">
                <div className="flex items-start gap-[0.875rem]">
                    <Image
                        className="h-[3.625rem] w-[3.625rem] relative z-[1]"
                        loading="lazy"
                        width={58}
                        height={58}
                        sizes="100vw"
                        alt=""
                        src="/Group-2.svg"
                    />
                    <div className="flex flex-col items-start !pt-[0.625rem] !pb-[0rem] !pl-[0rem] !pr-[0rem]">
                        <h2 className="!m-0 relative text-[length:inherit] font-bold font-[inherit] z-[1] mq450:text-[1.188rem] mq750:text-[1.625rem]">
                            Circlechain
                        </h2>
                    </div>
                </div>
                <b className="relative text-[1.25rem] z-[1] mq450:text-[1rem]">
                    Amet minim mollit non deserunt ullamco est aliqua dolor do amet sint.
                    Velit officia consequatduis enim velit mollit. Exercitation
                    veniamconsequat sunt nostrud amet.
                </b>
            </div>
            <div className="flex flex-col items-start !pt-[0.375rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] shrink-0 text-center text-[1.25rem]">
                <div className="flex flex-col items-start gap-[2.106rem]">
                    <h2 className="!m-0 relative text-[2.25rem] font-bold font-[inherit] z-[1] mq450:text-[1.375rem] mq750:text-[1.813rem]">
                        Quick Link
                    </h2>
                    <h3 className="!m-0 w-[7.688rem] relative text-[length:inherit] font-medium font-[inherit] inline-block z-[1] mq450:text-[1rem]">
                        How it work
                    </h3>
                    <h3 className="!m-0 relative text-[length:inherit] font-medium font-[inherit] z-[1] mq450:text-[1rem]">
                        Blog
                    </h3>
                    <h3 className="!m-0 relative text-[length:inherit] font-medium font-[inherit] z-[1] mq450:text-[1rem]">
                        Support
                    </h3>
                </div>
            </div>
            <section className="flex flex-col items-start !pt-[0.375rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] shrink-0 text-center text-[2.25rem] text-accent-color font-[Montserrat]">
                <div className="self-stretch flex items-start [row-gap:20px] mq450:flex-wrap">
                    <div className="flex flex-col items-start !pt-[5.187rem] !pb-[0rem] !pl-[0rem] !pr-[0rem]">
                        <Image
                            className="w-full h-[2.375rem] relative z-[1]"
                            width={38}
                            height={38}
                            sizes="100vw"
                            alt=""
                            src="/Group.svg"
                        />
                    </div>
                    <div className="flex-1 flex flex-col items-end gap-[12.125rem] min-w-[10.688rem] mq450:gap-[6.063rem]">
                        <div className="self-stretch flex flex-col items-end gap-[2.25rem] mq450:gap-[1.125rem]">
                            <div className="self-stretch flex items-start justify-end !pt-[0rem] !pb-[0rem] !pl-[0rem] !pr-[1.625rem]">
                                <h2 className="!m-0 relative text-[length:inherit] font-bold font-[inherit] z-[1] mq450:text-[1.375rem] mq750:text-[1.813rem]">
                                    Social Media
                                </h2>
                            </div>
                            <div className="flex items-end gap-[1.687rem]">
                                <Image
                                    className="h-[2.375rem] w-[2.375rem] relative z-[1]"
                                    width={38}
                                    height={38}
                                    sizes="100vw"
                                    alt=""
                                    src="/Vector.svg"
                                />
                                <Image
                                    className="h-[2.563rem] w-[2.563rem] relative z-[1]"
                                    width={41}
                                    height={41}
                                    sizes="100vw"
                                    alt=""
                                    src="/typcn-social-linkedin.svg"
                                />
                                <div className="h-[2.375rem] w-[2.375rem] relative rounded-[5px] border-accent-color border-solid border-[3px] box-border z-[1]">
                                    <Image
                                        className="absolute top-[0.375rem] left-[0.313rem] w-[1.688rem] h-[1.688rem]"
                                        loading="lazy"
                                        width={27}
                                        height={27}
                                        sizes="100vw"
                                        alt=""
                                        src="/radix-icons-discord-logo.svg"
                                    />
                                    <div className="absolute top-[0rem] left-[0rem] rounded-[5px] border-accent-color border-solid border-[3px] box-border w-full h-full hidden" />
                                </div>
                                <Image
                                    className="h-[2.375rem] w-[2.375rem] relative z-[1]"
                                    width={38}
                                    height={38}
                                    sizes="100vw"
                                    alt=""
                                    src="/ph-telegram-logo-duotone.svg"
                                />
                            </div>
                        </div>
                        <div className="flex items-start justify-end !pt-[0rem] !pb-[0rem] !pl-[0.5rem] !pr-[0.5rem] text-[1.25rem]">
                            <h3 className="!m-0 w-[12.313rem] relative text-[length:inherit] font-medium font-[inherit] inline-block z-[1] mq450:text-[1rem]">
                                (c) 2022 Circlechain
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default FrameComponent3;
