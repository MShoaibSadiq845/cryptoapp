import type { NextPage } from "next";

export type FrameComponent2Type = {
    className?: string;
};

const FrameComponent2: NextPage<FrameComponent2Type> = ({ className = "" }) => {
    return (
        <section
            className={`flex items-start justify-end !pt-[0rem] !pb-[0rem] !pl-[11.937rem] !pr-[14.312rem] box-border max-w-full text-center text-[2.25rem] text-accent-color font-[Montserrat] mq450:!pl-[1.25rem] mq450:!pr-[1.25rem] mq450:box-border mq750:!pl-[5.938rem] mq750:!pr-[7.125rem] mq750:box-border ${className}`}
        >
            <div className="w-[63.688rem] flex flex-col items-start !pt-[2.062rem] !pb-[4.187rem] !pl-[4.062rem] !pr-[1.75rem] box-border relative isolate gap-[0.625rem] max-w-full mq1050:!pl-[2rem] mq1050:box-border">
                <div className="w-[15.5rem] h-[15.5rem] absolute !!m-[0 important] top-[-4.5rem] right-[0.813rem] [filter:blur(139px)] rounded-[50%] bg-[rgba(115,253,170,0.69)] shrink-0" />
                <div className="w-[15.5rem] h-[15.5rem] absolute !!m-[0 important] bottom-[-2.875rem] left-[-6.812rem] [filter:blur(139px)] rounded-[50%] bg-[rgba(115,253,170,0.69)] shrink-0" />
                <div className="w-full h-full absolute !!m-[0 important] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] shadow-[5px_1px_13px_4px_rgba(115,_253,_170,_0.48)] [filter:blur(5px)] rounded-[10px] bg-[rgba(1,0,16,0.61)] z-[1] shrink-0" />
                <div className="flex items-start !pt-[0rem] !pb-[0rem] !pl-[8.375rem] !pr-[8.375rem] box-border max-w-full shrink-0 mq1050:!pl-[4.188rem] mq1050:!pr-[4.188rem] mq1050:box-border mq450:!pl-[1.25rem] mq450:!pr-[1.25rem] mq450:box-border">
                    <h1 className="!m-0 w-[35.063rem] relative text-[length:inherit] font-bold font-[inherit] inline-block max-w-full z-[2] mq450:text-[1.375rem] mq750:text-[1.813rem]">
                        Want to be aware of all update
                    </h1>
                </div>
                <div className="self-stretch flex items-start justify-center gap-[1.187rem] max-w-full shrink-0 text-left text-[1rem] text-primary-color mq1225:flex-wrap">
                    <div className="h-[3.813rem] flex-1 relative rounded-[10px] bg-accent-color border-secondarycolor border-solid border-[3px] box-border min-w-[28.25rem] max-w-full z-[2] mq1050:min-w-full" />
                    <div className="w-[13.25rem] flex flex-col items-start !pt-[0.312rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] box-border">
                        <div className="self-stretch rounded-[20px] bg-secondarycolor flex items-center justify-center !pt-[0.937rem] !pb-[0.937rem] !pl-[2.125rem] !pr-[2.125rem]">
                            <b className="relative">Subscribe</b>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FrameComponent2;
