import "../styles/layout.scss";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="layout">
      <div>{children}</div>
    </div>
  );
};
export default Layout;
