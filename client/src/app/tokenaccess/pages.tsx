import type { NextPage } from "next";
import Image from "next/image";
import FeaturePointsContainer from "./feature-points-container";

export type TokenAccessDisplayType = {
    className?: string;
};

const TokenAccessDisplay: NextPage<TokenAccessDisplayType> = ({
    className = "",
}) => {
    return (
        <div
            className={`w-[43.625rem] flex flex-col items-start gap-[5.562rem] max-w-full text-left text-[2rem] text-accent-color font-[Montserrat] mq450:gap-[1.375rem] mq750:gap-[2.75rem] ${className}`}
        >
            <FeaturePointsContainer
                accessTokenMarket="Access Token Market"
                buyAndSellTokenAnytimeAndAnyw={`Buy and sell token anytime
and anywhere`}
            />
            <div className="self-stretch rounded-[10px] [background:linear-gradient(-90deg,_rgba(115,_253,_170,_0.89),_rgba(196,_196,_196,_0))] flex flex-col items-start !pt-[0.875rem] !pb-[2.812rem] !pl-[18.125rem] !pr-[2.437rem] box-border relative isolate gap-[0.625rem] max-w-full mq450:!pl-[1.25rem] mq450:box-border mq750:!pl-[9.063rem] mq750:box-border">
                <div className="w-[43.625rem] h-[8.188rem] relative rounded-[10px] [background:linear-gradient(-90deg,_rgba(115,_253,_170,_0.89),_rgba(196,_196,_196,_0))] hidden max-w-full z-[0] shrink-0" />
                <h2 className="!m-0 self-stretch relative text-[length:inherit] font-bold font-[inherit] whitespace-nowrap z-[1] shrink-0 mq450:text-[1.188rem] mq750:text-[1.625rem]">{`User Friendly Interface `}</h2>
                <div className="flex items-start !pt-[0rem] !pb-[0rem] !pl-[7.687rem] !pr-[5rem] shrink-0 text-center text-[1.25rem] text-primary-color mq450:!pl-[1.25rem] mq450:!pr-[1.25rem] mq450:box-border">
                    <h3 className="!m-0 relative text-[length:inherit] font-medium font-[inherit] z-[1] mq450:text-[1rem]">
                        Easy to navigate
                    </h3>
                </div>
                <div className="w-[44.1rem] h-[31.938rem] absolute !!m-[0 important] top-[-12.625rem] left-[-37.437rem] shrink-0">
                    <div className="absolute top-[0rem] left-[0rem] [filter:blur(139px)] rounded-[50%] bg-[rgba(115,253,170,0.56)] w-[15.5rem] h-[15.5rem]" />
                    <Image
                        className="absolute top-[2.125rem] left-[0.125rem] w-[43.975rem] h-[29.813rem] object-contain z-[1]"
                        loading="lazy"
                        width={703.6}
                        height={477}
                        sizes="100vw"
                        alt=""
                        src="/Illustration@2x.png"
                    />
                </div>
            </div>
            <FeaturePointsContainer
                accessTokenMarket="Ownership Token control"
                buyAndSellTokenAnytimeAndAnyw={`Be in control and own as many
asset as possible`}
                featurePointsContainerPadding="1rem 1.562rem 1.062rem 16.375rem"
                featurePointsContainerGap="0.75rem"
                frameDivPadding="0rem 2.375rem 0rem 3.687rem"
            />
        </div>
    );
};

export default TokenAccessDisplay;
