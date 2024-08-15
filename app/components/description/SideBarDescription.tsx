import LittleSide from "./LittleSide";

interface SideBarDescriptionProps {
  posted_on: string;
  deadline: string;
  location: string;
  start_date: string;
  end_date: string;
  catagories: string[];
  required_skills: string[];
}

const SideBarDescription: React.FC<SideBarDescriptionProps> = ({
  posted_on,
  deadline,
  location,
  start_date,
  end_date,
  catagories,
  required_skills,
}) => {
  const img = {
    posted_icon: "/assets/plus-circle.png",
    deadline_icon: "/assets/fire.png",
    location_icon: "/assets/Location.png",
    start_date_icon: "/assets/calendar.png",
    end_date_icon: "/assets/calendar.png",
  };
  return (
    <div className="">
      <h1 className="text-3xl font-extrabold mb-[10px]">About</h1>
      <div className="flex flex-col gap-8 pt-[30px]">
        <LittleSide
          type={"Posted On"}
          value={posted_on}
          img={img.posted_icon}
        />
        <LittleSide
          type={"Deadline"}
          value={deadline}
          img={img.deadline_icon}
        />
        <LittleSide
          type={"Location"}
          value={location}
          img={img.location_icon}
        />
        <LittleSide
          type={"Start Date"}
          value={start_date}
          img={img.start_date_icon}
        />
        <LittleSide
          type={"End Date"}
          value={end_date}
          img={img.end_date_icon}
        />
      </div>
      <hr className="m-[10px]" />
      <h1 className="text-3xl font-extrabold mb-[10px]">Catagories</h1>

      <div className="flex flex-wrap">
        {catagories.map((item, index) => {
          return (
            <span className="three px-6 h-7 rounded-3xl m-1" key={index}>
              {item}
            </span>
          );
        })}
      </div>
      <hr className="m-[10px]" />
      <h1 className="text-3xl font-extrabold mb-[10px]">Required Skills</h1>
      <div className="flex flex-wrap">
        {required_skills.map((item, index) => {
          return (
            <span className="four p-2 m-1 border-none" key={index}>
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SideBarDescription;
