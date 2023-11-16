import Steps from "../Steps/Steps";

const steps = [
  "Get started with Google.",
  "Create A Suggestion Box.",
  "Share the Box QR Code.",
  "Receive Feedback.",
  "View in the box.",
];

const UserGuide = () => {
  return (
    <div className="flex flex-col lg:flex-row ps-10 border-t border-darkGreen">
      <div className="flex-1 font-helvetica_compressed text-7xl pt-10 toRight ">
        How Suggestify works?
      </div>
      <div className="w-full lg:w-3/5 flex lg:gap-10  ">
        <span className="w-[.5px] h-full bg-darkGreen"></span>
        <div className="pt-14 pb-14">
          <Steps steps={steps} />
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
