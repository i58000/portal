import Timeline from "../components/Timeline";
import Profile from "./Profile";

import "../styles/gallery.scss";
import { UIEvent, useRef, useState } from "react";
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
  const s = process.env.PUBLIC_URL + "/img/" + src;

  return (
    <div className="NodeImg">
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
  const [currentId, setCurrentId] = useState(null as null | string);
  const [centerIndex, setCenterIndex] = useState(0);

  const refGallery = useRef<HTMLInputElement | null>(null);
  const refTimeline = useRef<HTMLInputElement | null>(null);
  const refProfile = useRef<HTMLInputElement | null>(null);

  const onClick = (id: string) => () => {
    setCurrentId(id);
  };
  const onClose = () => {
    setCurrentId(null);
  };

  const onScroll = (evt: UIEvent) => {
    if (!refGallery.current || !refTimeline.current || !refProfile.current) {
      return;
    }
    const scrollTop =
      refGallery.current.scrollTop + refProfile.current.clientHeight + 120;
    let min = Infinity;
    let target = 0;
    if (refTimeline) {
      const arr = refTimeline.current?.children;
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i] as HTMLElement;
        const gap = Math.abs(element.offsetTop - scrollTop);
        if (gap < min) {
          min = gap;
          target = i;
        }
      }
    }
    setCenterIndex(target);
  };

  return (
    <div className="Gallery" onScroll={onScroll} ref={refGallery}>
      <div className="container">
        <Profile ref={refProfile}></Profile>
        <Timeline
          ref={refTimeline}
          nodes={nodes}
          component={NodeComponent}
          timestampKey={"timestamp"}
          uniqueKey={"id"}
          onClick={onClick}
          centerIndex={centerIndex}
        ></Timeline>
      </div>
      {currentId && (
        <Picture
          onClose={onClose}
          src={nodes.find((x) => x.id === currentId)?.src}
        >
          {currentId}
        </Picture>
      )}
    </div>
  );
};

export default Gallery;
