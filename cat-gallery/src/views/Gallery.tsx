import Timeline from "../components/Timeline";
import Profile from "./Profile";

import "./gallery.scss";
import { useState } from "react";
import Picture from "./Picture";
interface NodeComponentProps {
  id: string;
  timestamp?: number;
  src: string;
}

const NodeComponent: React.FC<NodeComponentProps> = ({
  id,
  timestamp,
  src,
}) => {
  const s = "img/" + src;

  return (
    <div className="Node">
      <img src={s} />
    </div>
  );
};

const nodes: NodeComponentProps[] = [
  { id: "001", timestamp: new Date('2020-01-02').getTime(), src: "a001.jpg" },
  { id: "002", timestamp: new Date('2020-01-01').getTime(), src: "a002.jpg" },
  { id: "003", timestamp: undefined, src: "a003.jpg" },
  { id: "004", timestamp: undefined, src: "a004.jpg" },
  { id: "005", timestamp: undefined, src: "a005.jpg" },
  { id: "006", timestamp: undefined, src: "a006.jpg" },
  { id: "007", timestamp: undefined, src: "a007.jpg" },
  { id: "008", timestamp: undefined, src: "a008.jpg" },
  { id: "009", timestamp: undefined, src: "a009.jpg" },
  { id: "010", timestamp: undefined, src: "a010.jpg" },
  { id: "011", timestamp: undefined, src: "a011.jpg" },
];

const Gallery: React.FC = ({ children }) => {
  const [currentId, setCurrentId] = useState(null as null | string)
  const onClick = (id: string) => () => {
    setCurrentId(id)
  }
  const onClose = () => {
    setCurrentId(null)

  }
  return (
    <div className="Gallery">
      <Profile></Profile>
      <Timeline
        nodes={nodes}
        component={NodeComponent}
        timestampKey={"timestamp"}
        uniqueKey={"id"}
        onClick={onClick}
      ></Timeline>
      { currentId && <Picture onClose={onClose} src={nodes.find(x => x.id === currentId)?.src}>{currentId}</Picture>}

    </div>
  );
};

export default Gallery;
