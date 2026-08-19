"use client";
import type { NextPage } from "next";
import { useState } from "react";
import CoinTrendItem from "./coin-trend-item";

export type FrameComponent1Type = {
    className?: string;
};

const FrameComponent1: NextPage<FrameComponent1Type> = ({ className = "" }) => {
    const [coinTrendItemItems] = useState([
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "BTC",
            bITCOIN: "BITCOIN",
            placeholderValuesOne: "$56,623.54",
            placeholderValuesTwo: "1.41%",
            chartState1: "/chart-state-1@2x.png",
            coinTrendItemBorder: "1px solid #fff" as const,
            frameDivBackgroundColor: "#010010" as const,
            rectangleDivBackgroundColor: "rgba(1, 0, 16, 0.05)" as const,
            placeholderValuesTwoColor: "#fff" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "ETH",
            bITCOIN: "ETHEREUM",
            placeholderValuesOne: "$4,267.90",
            placeholderValuesTwo: "2.22%",
            chartState1: "/chart-state-11@2x.png",
            coinTrendItemBorder: "1px solid #010010" as const,
            frameDivBackgroundColor: "#fff" as const,
            rectangleDivBackgroundColor: "#010010" as const,
            placeholderValuesTwoColor: "#fff" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "BNB",
            bITCOIN: "BINANCE",
            placeholderValuesOne: "$587.74",
            placeholderValuesTwo: "0.82%",
            chartState1: "/chart-state-12@2x.png",
            coinTrendItemBorder: "1px solid #fff" as const,
            frameDivBackgroundColor: "rgba(182, 182, 182, 0.3)" as const,
            rectangleDivBackgroundColor: "#010010" as const,
            placeholderValuesTwoColor: "#808080" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "USDT",
            bITCOIN: "TETHER",
            placeholderValuesOne: "$0.9998",
            placeholderValuesTwo: "0,03%",
            chartState1: "/chart-state-13@2x.png",
            coinTrendItemBorder: "1px solid #fff" as const,
            frameDivBackgroundColor: "rgba(182, 182, 182, 0.3)" as const,
            rectangleDivBackgroundColor: "#010010" as const,
            placeholderValuesTwoColor: "#fff" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "BTC",
            bITCOIN: "BITCOIN",
            placeholderValuesOne: "$56,623.54",
            placeholderValuesTwo: "1.41%",
            chartState1: "/chart-state-14@2x.png",
            coinTrendItemBorder: "1px solid #fff" as const,
            frameDivBackgroundColor: "#010010" as const,
            rectangleDivBackgroundColor: "rgba(1, 0, 16, 0.05)" as const,
            placeholderValuesTwoColor: "#fff" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "ETH",
            bITCOIN: "ETHEREUM",
            placeholderValuesOne: "$4,267.90",
            placeholderValuesTwo: "2.22%",
            chartState1: "/chart-state-15@2x.png",
            coinTrendItemBorder: "1px solid #010010" as const,
            frameDivBackgroundColor: "#fff" as const,
            rectangleDivBackgroundColor: "#010010" as const,
            placeholderValuesTwoColor: "#fff" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "BNB",
            bITCOIN: "BINANCE",
            placeholderValuesOne: "$587.74",
            placeholderValuesTwo: "0.82%",
            chartState1: "/chart-state-16@2x.png",
            coinTrendItemBorder: "1px solid #fff" as const,
            frameDivBackgroundColor: "rgba(182, 182, 182, 0.3)" as const,
            rectangleDivBackgroundColor: "#010010" as const,
            placeholderValuesTwoColor: "#808080" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "USDT",
            bITCOIN: "TETHER",
            placeholderValuesOne: "$0.9998",
            placeholderValuesTwo: "0,03%",
            chartState1: "/chart-state-17@2x.png",
            coinTrendItemBorder: "1px solid #fff" as const,
            frameDivBackgroundColor: "rgba(182, 182, 182, 0.3)" as const,
            rectangleDivBackgroundColor: "#010010" as const,
            placeholderValuesTwoColor: "#fff" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "BTC",
            bITCOIN: "BITCOIN",
            placeholderValuesOne: "$56,623.54",
            placeholderValuesTwo: "1.41%",
            chartState1: "/chart-state-18@2x.png",
            coinTrendItemBorder: "1px solid #fff" as const,
            frameDivBackgroundColor: "#010010" as const,
            rectangleDivBackgroundColor: "rgba(1, 0, 16, 0.05)" as const,
            placeholderValuesTwoColor: "#fff" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "ETH",
            bITCOIN: "ETHEREUM",
            placeholderValuesOne: "$4,267.90",
            placeholderValuesTwo: "2.22%",
            chartState1: "/chart-state-19@2x.png",
            coinTrendItemBorder: "1px solid #010010" as const,
            frameDivBackgroundColor: "#fff" as const,
            rectangleDivBackgroundColor: "#010010" as const,
            placeholderValuesTwoColor: "#fff" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "BNB",
            bITCOIN: "BINANCE",
            placeholderValuesOne: "$587.74",
            placeholderValuesTwo: "0.82%",
            chartState1: "/chart-state-110@2x.png",
            coinTrendItemBorder: "1px solid #fff" as const,
            frameDivBackgroundColor: "rgba(182, 182, 182, 0.3)" as const,
            rectangleDivBackgroundColor: "#010010" as const,
            placeholderValuesTwoColor: "#808080" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "USDT",
            bITCOIN: "TETHER",
            placeholderValuesOne: "$0.9998",
            placeholderValuesTwo: "0,03%",
            chartState1: "/chart-state-111@2x.png",
            coinTrendItemBorder: "1px solid #fff" as const,
            frameDivBackgroundColor: "rgba(182, 182, 182, 0.3)" as const,
            rectangleDivBackgroundColor: "#010010" as const,
            placeholderValuesTwoColor: "#fff" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "BTC",
            bITCOIN: "BITCOIN",
            placeholderValuesOne: "$56,623.54",
            placeholderValuesTwo: "1.41%",
            chartState1: "/chart-state-112@2x.png",
            coinTrendItemBorder: "1px solid #fff" as const,
            frameDivBackgroundColor: "#010010" as const,
            rectangleDivBackgroundColor: "rgba(1, 0, 16, 0.05)" as const,
            placeholderValuesTwoColor: "#fff" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "ETH",
            bITCOIN: "ETHEREUM",
            placeholderValuesOne: "$4,267.90",
            placeholderValuesTwo: "2.22%",
            chartState1: "/chart-state-113@2x.png",
            coinTrendItemBorder: "1px solid #010010" as const,
            frameDivBackgroundColor: "#fff" as const,
            rectangleDivBackgroundColor: "#010010" as const,
            placeholderValuesTwoColor: "#fff" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "BNB",
            bITCOIN: "BINANCE",
            placeholderValuesOne: "$587.74",
            placeholderValuesTwo: "0.82%",
            chartState1: "/chart-state-114@2x.png",
            coinTrendItemBorder: "1px solid #fff" as const,
            frameDivBackgroundColor: "rgba(182, 182, 182, 0.3)" as const,
            rectangleDivBackgroundColor: "#010010" as const,
            placeholderValuesTwoColor: "#808080" as const,
        },
        {
            coinIcon: "/coin-icon@2x.png",
            bTC: "USDT",
            bITCOIN: "TETHER",
            placeholderValuesOne: "$0.9998",
            placeholderValuesTwo: "0,03%",
            chartState1: "/chart-state-115@2x.png",
            coinTrendItemBorder: "1px solid #fff" as const,
            frameDivBackgroundColor: "rgba(182, 182, 182, 0.3)" as const,
            rectangleDivBackgroundColor: "#010010" as const,
            placeholderValuesTwoColor: "#fff" as const,
        },
    ]);
    return (
        <main
            className={`flex items-start justify-end !pt-[0rem] !pb-[4.687rem] !pl-[5.312rem] !pr-[5.625rem] box-border max-w-full text-left text-[3rem] text-accent-color font-[Montserrat] mq1050:!pb-[3.063rem] mq1050:box-border mq450:!pl-[1.25rem] mq450:!pr-[1.25rem] mq450:box-border mq750:!pl-[2.625rem] mq750:!pr-[2.813rem] mq750:!pb-[2rem] mq750:box-border ${className}`}
        >
            <div className="w-[79rem] flex flex-col items-start gap-[3.375rem] max-w-full mq750:gap-[1.688rem]">
                <div className="self-stretch flex items-start !pt-[0rem] !pb-[0rem] !pl-[0.25rem] !pr-[0rem] box-border max-w-full">
                    <h1 className="!m-0 flex-1 relative text-[length:inherit] leading-[2rem] font-bold font-[inherit] inline-block max-w-full mq450:text-[1.813rem] mq450:leading-[1.188rem] mq750:text-[2.375rem] mq750:leading-[1.625rem]">
                        Market Trend
                    </h1>
                </div>
                <div className="self-stretch flex items-start flex-wrap content-start gap-x-[1.331rem] gap-y-[3.375rem] text-[1.125rem] font-[Raleway]">
                    {coinTrendItemItems.map((item, index) => (
                        <CoinTrendItem
                            key={index}
                            coinIcon={item.coinIcon}
                            bTC={item.bTC}
                            bITCOIN={item.bITCOIN}
                            placeholderValuesOne={item.placeholderValuesOne}
                            placeholderValuesTwo={item.placeholderValuesTwo}
                            chartState1={item.chartState1}
                            coinTrendItemBorder={item.coinTrendItemBorder}
                            frameDivBackgroundColor={item.frameDivBackgroundColor}
                            rectangleDivBackgroundColor={item.rectangleDivBackgroundColor}
                            placeholderValuesTwoColor={item.placeholderValuesTwoColor}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default FrameComponent1;
