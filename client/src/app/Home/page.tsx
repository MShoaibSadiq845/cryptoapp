import type { NextPage } from "next";
import HeaderContainer from "../components/header-container";
import FrameComponent from "../components/frame-component";
import TokenAccessDisplay from "../components/token-access-display";
import FrameComponent1 from "../components/frame-component1";
import FrameComponent2 from "../components/frame-component2";
import FrameComponent3 from "../components/frame-component3";

const Home: NextPage = () => {
  return (
    <div className="w-full relative bg-primary-color overflow-hidden flex flex-col items-end !pt-[4.125rem] !pb-[0rem] !pl-[0rem] !pr-[0.062rem] box-border gap-[5.75rem] leading-[normal] tracking-[normal] mq450:gap-[1.438rem] mq750:gap-[2.875rem]">
      <HeaderContainer />
      <FrameComponent />
      <section className="w-[88.063rem] flex items-start justify-center !pt-[0rem] !pb-[7.25rem] !pl-[1.25rem] !pr-[1.25rem] box-border max-w-full text-center text-[3rem] text-accent-color font-[Montserrat]">
        <div className="w-[58.688rem] flex flex-col items-start gap-[0.687rem] max-w-full">
          <b className="self-stretch h-[7.25rem] relative inline-block mq450:text-[1.813rem] mq750:text-[2.375rem]">
            Global Decentralize currency based on
            <br />
            blockchain technology
          </b>
          <div className="w-[56.188rem] flex items-start justify-center !pt-[0rem] !pb-[0rem] !pl-[1.25rem] !pr-[1.25rem] box-border max-w-full text-[1.25rem] text-secondarycolor">
            <h3 className="!m-0 relative text-[length:inherit] font-medium font-[inherit] mq450:text-[1rem]">
              Web3 is the latest efficient technology
            </h3>
          </div>
        </div>
      </section>
      <section className="flex items-start justify-end !pt-[0rem] !pb-[4.812rem] !pl-[4.5rem] !pr-[4.5rem] box-border max-w-full mq1050:!pl-[2.25rem] mq1050:!pr-[2.25rem] mq1050:box-border mq750:!pb-[3.125rem] mq750:box-border">
        <TokenAccessDisplay />
      </section>
      <FrameComponent1 />
      <FrameComponent2 />
      <FrameComponent3 />
    </div>
  );
};

export default Home;
