import type { NextPage } from "next";
import Image from "next/image";

export type FrameComponentType = {
    className?: string;
};

const FrameComponent: NextPage<FrameComponentType> = ({ className = "" }) => {
    return (
        <section
            className={`w-[85.813rem] flex items-start justify-end !pt-[0rem] !pb-[2rem] !pl-[0.25rem] !pr-[0.25rem] box-border max-w-full text-left text-[1rem] text-primary-color font-[Montserrat] ${className}`}
        >
            <div className="h-[39.5rem] flex-1 relative max-w-full">
                <section className="absolute top-[0rem] left-[0rem] w-[46.063rem] flex items-start isolate max-w-full shrink-0 text-left text-[4.688rem] text-accent-color font-[Montserrat]">
                    <b className="flex-1 relative inline-block max-w-full z-[1] shrink-0 mq450:text-[2.813rem] mq750:text-[3.75rem]">
                        Save, Buy and Sell
                        <br />
                        Your blockchain asset
                    </b>
                    <div className="h-[17.313rem] w-[17.125rem] absolute !!m-[0 important] top-[-13.687rem] left-[0rem] shrink-0">
                        <div className="absolute top-[1.813rem] left-[1.625rem] [filter:blur(139px)] rounded-[50%] bg-[rgba(115,253,170,0.5)] w-[15.5rem] h-[15.5rem]" />
                    </div>
                </section>
                <h1 className="!m-0 absolute top-[17.375rem] left-[0rem] text-[2.25rem] font-medium font-[inherit] text-accent-color shrink-0 mq450:text-[1.375rem] mq750:text-[1.813rem]">
                    The easy to manage and trade
                    <br />
                    your cryptocurency asset
                </h1>
                <div className="absolute top-[27.25rem] left-[0rem] rounded-[20px] bg-background w-[14.438rem] h-[3.313rem] flex items-center justify-center !pt-[0.937rem] !pb-[0.937rem] !pl-[2.062rem] !pr-[2.062rem] box-border whitespace-nowrap shrink-0">
                    <b className="relative">Connect Wallet</b>
                </div>
                <div className="absolute top-[27.125rem] left-[18.25rem] rounded-[20px] bg-accent-color w-[14.438rem] h-[3.313rem] flex items-center justify-center !pt-[0.937rem] !pb-[0.937rem] !pl-[2.125rem] !pr-[2.125rem] box-border whitespace-nowrap shrink-0">
                    <b className="relative">Start Trading</b>
                </div>
                <div className="absolute h-full top-[0rem] bottom-[0rem] left-[43.938rem] w-[41.375rem] shrink-0">
                    <div className="absolute top-[24rem] left-[14.563rem] [filter:blur(139px)] rounded-[50%] bg-[rgba(115,253,170,0.69)] w-[15.5rem] h-[15.5rem]" />
                    <Image
                        className="absolute top-[0rem] left-[0rem] w-[41.375rem] h-[30.438rem] object-cover z-[2]"
                        loading="lazy"
                        width={662}
                        height={487}
                        sizes="100vw"
                        alt=""
                        src="/Modern-3d-illustration-of-Crypto-trading-1@2x.png"
                    />
                </div>
                <div className="absolute bottom-[-11.375rem] left-[9.25rem] [filter:blur(139px)] rounded-[50%] bg-[rgba(115,253,170,0.56)] w-[15.5rem] h-[15.5rem] z-[1] shrink-0" />
            </div>
        </section>
    );
};

export default FrameComponent;
