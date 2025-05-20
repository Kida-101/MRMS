const CustomCardItem = ({ icon, label, value, valueColor }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-primary/70">
        {icon}
        <div>{label}</div>
      </div>
      <div className={`font-semibold text-primary/90 ${valueColor}`}>
        {value}
      </div>
    </div>
  );
};

export default CustomCardItem;
