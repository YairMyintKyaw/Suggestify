const Footer = () => {
  return (
    <div className="bg-green text-center    text-primary  ">
      <div className=" relative h-9 flex items-center mx-auto w-[210px] ">
        <div className="group/d&d absolute left-0 whitespace-nowrap bg-green hover:z-20">
          Designed & developed <span className="group-hover/d&d:hidden">/</span>
          <span className="hidden group-hover/d&d:inline-block ">
            by <a href="https://github.com/YairMyintKyaw">Ye Myint Kyaw</a>
          </span>
        </div>

        <div className="group/logo absolute right-0  whitespace-nowrap bg-green">
          <span className="hidden peer group-hover/logo:inline-block ">
            Phone Lynn Thant creates&nbsp;
          </span>
          <span className="group-hover/d&d:hidden peer-">Logo</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
