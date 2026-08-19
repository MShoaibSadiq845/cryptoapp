"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type FeaturePointsContainerType = {
    className?: string;
    accessTokenMarket?: string;
    buyAndSellTokenAnytimeAndAnyw?: string;

    /** Style props */
    featurePointsContainerPadding?: CSSProperties["padding"];
    featurePointsContainerGap?: CSSProperties["gap"];
    frameDivPadding?: CSSProperties["padding"];
};

const FeaturePointsContainer: NextPage<FeaturePointsContainerType> = ({
    className = "",
    accessTokenMarket,
    buyAndSellTokenAnytimeAndAnyw,
    featurePointsContainerPadding,
    featurePointsContainerGap,
    frameDivPadding,
}) => {
    const featurePointsContainerStyle: CSSProperties = useMemo(() => {
        return {
            padding: featurePointsContainerPadding,
            gap: featurePointsContainerGap,
        };
    }, [featurePointsContainerPadding, featurePointsContainerGap]);

    const frameDivStyle: CSSProperties = useMemo(() => {
        return {
            padding: frameDivPadding,
        };
    }, [frameDivPadding]);

    return (
        <div
            className={`self-stretch rounded-[10px] [background:linear-gradient(-90deg,_rgba(115,_253,_170,_0.89),_rgba(196,_196,_196,_0))] flex flex-col items-start !pt-[1.125rem] !pb-[1.125rem] !pl-[20.062rem] !pr-[2.375rem] box-border gap-[0.562rem] max-w-full text-left text-[2rem] text-accent-color font-[Montserrat] mq450:!pl-[1.25rem] mq450:box-border mq750:!pl-[10rem] mq750:box-border ${className}`}
            style={featurePointsContainerStyle}
        >
            <div className="w-[43.625rem] h-[8.188rem] relative rounded-[10px] [background:linear-gradient(-90deg,_rgba(115,_253,_170,_0.89),_rgba(196,_196,_196,_0))] hidden max-w-full shrink-0" />
            <h2 className="!m-0 self-stretch relative text-[length:inherit] font-bold font-[inherit] whitespace-nowrap z-[1] shrink-0 mq450:text-[1.188rem] mq750:text-[1.625rem]">
                {accessTokenMarket}
            </h2>
            <div
                className="flex items-start !pt-[0rem] !pb-[0rem] !pl-[2.25rem] !pr-[1.625rem] shrink-0 text-center text-[1.25rem] text-primary-color"
                style={frameDivStyle}
            >
                <div className="relative font-medium z-[1] mq450:text-[1rem]">
                    {buyAndSellTokenAnytimeAndAnyw}
                </div>
            </div>
        </div>
    );
};

export default FeaturePointsContainer;
