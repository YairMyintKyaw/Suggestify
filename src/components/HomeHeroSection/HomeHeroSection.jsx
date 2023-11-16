import { NavLink } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const HomeHeroSection = () => {
  return (
    <div className="h-[90vh] flex flex-col px-10 ">
      <div className="flex-1 flex items-center md:items-end   text-[18vw] md:text-[11vw] font-helvetica_compressed ">
        <div className="leading-none flex flex-col md:flex-row">
          <span className="toUp">Seek.&nbsp;</span>
          <span className="toUp">Receive.&nbsp;</span>
          <span className="toUp">Grow</span>
        </div>
      </div>
      <div className="flex items-center flex-1 relative">
        <div className=" w-1/2 flex items-end ">
          <div className="text-end w-fit flex flex-col gap-5 items-end font-openSans toUp">
            <div className="tracking-wider text-md ">
              Gather any suggestion.
              <br />
              Anyone can give feedback anonymously.
              <br />
              You will get honest feedback from clients or friends.
            </div>

            <NavLink
              to={"get-started"}
              className="inline-flex gap-2 py-2 px-4 items-center border rounded-full w-fit hover:border-darkGreen hover:shadow"
            >
              Get Started <BsArrowRight />
            </NavLink>
          </div>

          <div className="absolute right-0 flex items-end toUp ">
            <a
              href="mailto:yemyintkyaw241220@gmail.com"
              className="inline-flex gap-2 py-2 items-center w-fit relative getInTouch"
            >
              get in touch <BsArrowRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
