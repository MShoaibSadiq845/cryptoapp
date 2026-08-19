import type { NextPage } from "next";
import Image from "next/image";

export type HeaderContainerType = {
    className?: string;
};

const HeaderContainer: NextPage<HeaderContainerType> = ({ className = "" }) => {
    return (
        <header
            className={`flex items-start justify-end !pt-[0rem] !pb-[4.312rem] !pl-[4.375rem] !pr-[4.75rem] box-border max-w-full text-left text-[2rem] text-accent-color font-[Montserrat] mq750:!pl-[2.188rem] mq750:!pr-[2.375rem] mq750:box-border ${className}`}
        >
            <div className="w-[80.813rem] flex items-start gap-[0.875rem] max-w-full">
                <Image
                    className="h-[3.625rem] w-[3.625rem] relative z-[1]"
                    loading="lazy"
                    width={58}
                    height={58}
                    sizes="100vw"
                    alt=""
                    src="/Group-2.svg"
                />
                <div className="flex-1 flex flex-col items-start !pt-[0.625rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] box-border max-w-full">
                    <div className="w-[25.563rem] flex items-start justify-between gap-[1.25rem] max-w-full">
                        <h2 className="!m-0 relative text-[length:inherit] font-bold font-[inherit] shrink-0 z-[1]">
                            Circlechain
                        </h2>
                        <div className="flex flex-col items-start !pt-[0.25rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] text-[1.5rem]">
                            <h3 className="!m-0 relative text-[length:inherit] font-medium font-[inherit] shrink-0">
                                How it work
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col items-start !pt-[0.875rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] box-border max-w-full text-[1.5rem]">
                    <div className="w-[13.25rem] h-[1.813rem] relative">
                        <h3 className="!m-0 absolute top-[0rem] left-[0rem] text-[length:inherit] font-medium font-[inherit] inline-block min-w-[3.563rem]">
                            Blog
                        </h3>
                        <h3 className="!m-0 absolute top-[0rem] left-[7rem] text-[length:inherit] font-medium font-[inherit] inline-block min-w-[6.25rem]">
                            Support
                        </h3>
                    </div>
                </div>
                <div className="flex flex-col items-start !pt-[0.437rem] !pb-[0rem] !pl-[0rem] !pr-[0.812rem]">
                    <Image
                        className="w-full h-[2.375rem] relative"
                        width={38}
                        height={38}
                        sizes="100vw"
                        alt=""
                        src="/Group.svg"
                    />
                </div>
                <div className="flex flex-col items-start !pt-[0.437rem] !pb-[0rem] !pl-[0rem] !pr-[0.812rem]">
                    <Image
                        className="w-full h-[2.375rem] relative"
                        width={38}
                        height={38}
                        sizes="100vw"
                        alt=""
                        src="/Vector.svg"
                    />
                </div>
                <div className="flex flex-col items-start !pt-[0.25rem] !pb-[0rem] !pl-[0rem] !pr-[0.812rem]">
                    <Image
                        className="w-full h-[2.563rem] relative"
                        width={41}
                        height={41}
                        sizes="100vw"
                        alt=""
                        src="/typcn-social-linkedin.svg"
                    />
                </div>
                <div className="flex flex-col items-start !pt-[0.437rem] !pb-[0rem] !pl-[0rem] !pr-[0.812rem]">
                    <div className="w-[2.375rem] h-[2.375rem] relative rounded-[5px] border-accent-color border-solid border-[3px] box-border z-[1]">
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
                </div>
                <div className="flex flex-col items-start !pt-[0.437rem] !pb-[0rem] !pl-[0rem] !pr-[0rem]">
                    <Image
                        className="w-full h-[2.375rem] relative"
                        loading="lazy"
                        width={38}
                        height={38}
                        sizes="100vw"
                        alt=""
                        src="/ph-telegram-logo-duotone.svg"
                    />
                </div>
            </div>
        </header>
    );
};

export default HeaderContainer;
