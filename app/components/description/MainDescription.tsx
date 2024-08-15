interface MainDescriptionProps {
  description: string;
  responsiblities: string;
  traits: string;
  age: string;
  gender: string;
  whenAndWhere: string;
}

const MainDescription: React.FC<MainDescriptionProps> = ({
  description,
  responsiblities,
  traits,
  age,
  gender,
  whenAndWhere,
}) => {
  return (
    <div className="pt-[50px] pl-[40px] w-2/3">
      <h1 className="text-3xl font-extrabold mb-[10px]">Description</h1>
      <p className="mb-[50px]">{description}</p>
      <h1 className="text-3xl font-extrabold mb-[10px]">Responsiblities</h1>
      <ul className="mb-[50px]">{responsiblities}</ul>

      <h1 className="text-3xl font-extrabold mb-[10px]">
        Ideal Candidate We Want
      </h1>
      <ul className="ml-[20px] mb-[50px]">{traits}</ul>

      <h2 className="text-3xl font-extrabold mb-[10px]">Where and When</h2>
      <p>
        {" "}
        <span>
          <img className="inline" src="/assets/Location.png" alt="" />
        </span>{" "}
        {whenAndWhere}
      </p>
    </div>
  );
};

export default MainDescription;
