interface LittleSideProps {
  type: string;
  value: string;
}

const LittleSide: React.FC<LittleSideProps> = ({ type, value }) => {
  return (
    <div>
      <span>icon</span>
      <div>
        <span>{type}</span>
        <span>{value}</span>
      </div>
    </div>
  );
};

export default LittleSide;
