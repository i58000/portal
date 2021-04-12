import "../styles/timeline.scss";
import moment from "moment";
import { forwardRef } from "react";

const Node: React.FC<{ timestamp: number; onClick: any }> = ({
  children,
  timestamp,
  onClick,
}) => {
  const mom = moment(timestamp);
  const mmdd = timestamp ? mom.format("MM-DD") : "??-??";
  const yyyy = timestamp ? mom.format("YYYY") : "????";

  return (
    <div className="Node">
      <div className="left">
        <div className="timestamp">
          <div className="mm-dd">{mmdd}</div>
          <div className="yyyy">{yyyy}</div>
        </div>
        <div className="circle"></div>
      </div>
      <div className="right" onClick={onClick}>
        {children}
      </div>
    </div>
  );
};

interface AAA {
  nodes: Array<any>;
  component: React.FC<any>;
  uniqueKey: string;
  timestampKey: string;
  onClick: Function;
  centerIndex: number;
}

const Timeline = forwardRef<HTMLDivElement | null, AAA>(
  (
    {
      nodes,
      uniqueKey,
      timestampKey,
      children,
      component: Component,
      onClick,
      centerIndex,
    },
    ref
  ) => {
    return (
      <div className="Timeline" ref={ref}>
        {nodes.map((node, index) => {
          const classNames = ["node"];
          if (centerIndex === index) {
            classNames.push("center");
          } else if (centerIndex - 1 === index) {
            classNames.push("prev");
          } else if (centerIndex + 1 === index) {
            classNames.push("next");
          }
          return (
            <div className={classNames.join(" ")} key={node[uniqueKey]}>
              <Node
                timestamp={node[timestampKey]}
                onClick={onClick(node[uniqueKey])}
              >
                <Component {...node}></Component>
              </Node>
            </div>
          );
        })}
      </div>
    );
  }
);

export default Timeline;
