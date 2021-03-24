import "./timeline.scss";
import moment from "moment";

const Node: React.FC<{ timestamp: number; onClick: any }> = ({ children, timestamp, onClick }) => {
  const mom = moment(timestamp)
  const mmdd = timestamp ? mom.format("MM-DD") : '??-??'
  const yyyy = timestamp ? mom.format("YYYY") : '????'
  return (
    <div className="node">
      <div className="left">
        <div className="timestamp">
          <div className="mm-dd">{mmdd}</div>
          <div className="yyyy">{yyyy}</div>
        </div>
        <div className="circle"></div>
      </div>
      <div className="right" onClick={onClick}>{children}</div>
    </div>
  );
};

interface AAA {
  nodes: Array<any>;
  component: React.FC<any>;
  uniqueKey: string;
  timestampKey: string;
  onClick: Function
}

const Timeline: React.FC<AAA> = ({
  nodes,
  uniqueKey,
  timestampKey,
  children,
  component: Component,
  onClick
}) => {
  return (
    <div className="Timeline">
      {nodes.map((node) => (
        <Node
          timestamp={node[timestampKey]}
          key={node[uniqueKey]}
          onClick={onClick(node[uniqueKey])}>
          <Component {...node}></Component>
        </Node>
      ))}
    </div>
  );
};

export default Timeline;
