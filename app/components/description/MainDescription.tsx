interface MainDescriptionProps {
  description: string;
  responsiblities: string[];
  traits: string[];
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
    <div>
      <h2>Description</h2>
      <p>{description}</p>
      <h2>Responsiblities</h2>
      <ul>
        {responsiblities.map((item) => {
          return (
            <li>
              <span>icon</span>
              {item}
            </li>
          );
        })}
      </ul>

      <h2>Ideal Candidate We Want</h2>
      <ul>
        <li>
          <span>icon</span>Age {age}
        </li>
        <li>
          <span>icon</span>Gender {gender}
        </li>
        {traits.map((item) => {
          return (
            <li>
              <span>icon</span> {item}
            </li>
          );
        })}
      </ul>

      <h2>Where and When</h2>
      <p>
        {" "}
        <span>icon</span> {whenAndWhere}
      </p>
    </div>
  );
};

export default MainDescription;
