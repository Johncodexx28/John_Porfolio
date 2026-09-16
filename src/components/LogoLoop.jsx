const LogoLoop = ({ items }) => (
  <div className="logo-loop" aria-label="Languages, frameworks, and tools">
    <div className="logo-loop__track">
      {[...items, ...items].map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={`${item.name}-${index}`}
            className="logo-loop__item"
            aria-hidden={index >= items.length}
          >
            <Icon size={22} aria-hidden="true" />
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  </div>
);

export default LogoLoop;
