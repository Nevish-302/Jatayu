import { styles } from "../styles";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <section
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        {/* <span className="hash-span" id={idName}>
          &nbsp;
        </span> */}

        <Component />
      </section>
    );
  };

export default StarWrapper;
