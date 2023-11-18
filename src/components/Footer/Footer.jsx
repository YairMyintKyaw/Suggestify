const Footer = () => {
  return (
    <div className="bg-green text-center  text-primary  ">
      <div className="  relative h-9 flex items-center mx-auto w-[210px] ">
        <div className="group/logo logo peer absolute right-0  whitespace-nowrap bg-green">
          <span className="hidden group-hover/logo:inline-block ">
            <a href="https://instagram.com/leonegan8?igshid=OGQ5ZDc2ODk2ZA==">
              Lynn created the
            </a>
          </span>
          <span className="group-hover/d&d:hidden "> Logo</span>
        </div>
        <div className="group/design_and_develop peer-hover:hidden design_and_develop absolute left-0 whitespace-nowrap bg-green hover:z-20">
          Designed & developed{" "}
          <span className="group-hover/design_and_develop:hidden">/</span>
          <span className="hidden group-hover/design_and_develop:inline-block ">
            by <a href="https://github.com/YairMyintKyaw">Ye Myint Kyaw</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
