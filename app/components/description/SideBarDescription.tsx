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
  return (
    <div>
      <h2>About</h2>
      <div>
        <LittleSide type={"Posted On"} value={posted_on} />
        <LittleSide type={"Deadline"} value={deadline} />
        <LittleSide type={"Location"} value={location} />
        <LittleSide type={"Start Date"} value={start_date} />
        <LittleSide type={"End Date"} value={end_date} />
      </div>
      <h2>Catagories</h2>
      <div>
        {catagories.map((item) => {
          return <span>{item}</span>;
        })}
      </div>
      <h2>Required Skills</h2>
      <div>
        {required_skills.map((item) => {
          return <span>{item}</span>;
        })}
      </div>
    </div>
  );
};

export default SideBarDescription;
