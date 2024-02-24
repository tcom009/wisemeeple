import "./smallspinner.css";

interface Props {
  message?: string;
}

const SmallSpinner = ({ message }: Props) => (
  <span className="small-loader"></span>
);

export default SmallSpinner;
