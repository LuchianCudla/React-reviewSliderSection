import "./index.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { data } from "./data";

const App = () => {
  const [people] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastInd = people.length - 1;
    if (index < 0) {
      setIndex(lastInd);
    }

    if (index > people.length - 1) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex(index + 1);
    }, 3500);

    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <div className="section__title">
        <h2>Review Slider</h2>
      </div>

      <div className="section-center">
        {people.map(({ name, title, id, quote, image }, personIndex) => {
          let pos = "nextSlide";
          if (personIndex === index) {
            pos = "activeSlide";
          }

          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex && people.length - 1)
          ) {
            pos = "lastSlide";
          }
          return (
            <article key={id} className={pos}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
            </article>
          );
        })}

        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FaChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default App;
