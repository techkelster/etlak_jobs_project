interface LittleSideProps {
  type: string;
  value: string;
  img: string;
}

const LittleSide: React.FC<LittleSideProps> = ({ type, value, img }) => {
  return (
    <div className="flex gap-2 items-center">
      <span>
        <img className="inline" src={img} alt="" />
      </span>
      <div className="flex flex-col">
        <span className="font-extralight">{type}</span>
        <span>{value}</span>
      </div>
    </div>
  );
};

export default LittleSide;
