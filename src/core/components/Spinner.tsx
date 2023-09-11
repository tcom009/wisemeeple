import "./spinner.css";
import { Text } from "@radix-ui/themes";

interface Props {
  message?: string;
}

const Spinner = ({ message }: Props) => (
  <div className="div-full-center">
    <div className="loadingio-spinner-spinner-tokber3copp">
      <div className="ldio-q8mnbmjnnu">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    {message && <Text>{message}</Text>}
  </div>
);

export default Spinner;
