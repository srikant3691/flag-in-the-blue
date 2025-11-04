import { useState } from "react";
import hints from "../data/hint.js";
import hintButtonImg from "/hintbutton.png";
import popupBoxImg from "/popupbox.png";
import nextHintImg from "/nexthint.png";
import prevBoxImg from "/prevbox.png";
import okBoxImg from "/okbox.png";
import nextBoxImg from "/nextbox.png";

const jakartaFont = { fontFamily: '"Super Squad", sans-serif' };

export default function HintBox() {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isCorrectOpen, setIsCorrectOpen] = useState(true);

  const totalHints = hints?.length || 0;

  const prevHint = () =>
    setIndex((prev) => (prev === 0 ? totalHints - 1 : prev - 1));
  const nextHint = () =>
    setIndex((prev) => (prev === totalHints - 1 ? 0 : prev + 1));

  const togglePopup = () => {
    setIsOpen((prev) => {
      if (!prev) {
        setIndex(0);
      }
      return !prev;
    });
    if (isCorrectOpen) setIsCorrectOpen(false);
  };

  const handleNextHintFromCorrect = () => {
    setIsCorrectOpen(false);
    setIndex((prev) => (prev === totalHints - 1 ? 0 : prev + 1));
    setIsOpen(true);
  };

  const handleFinish = () => {
    setIsCorrectOpen(false);
    console.log("Game finished or level complete.");
  };

  return (
    <>
      {(isOpen || isCorrectOpen) && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40"
          onClick={isOpen ? togglePopup : null}
        ></div>
      )}

      <button
        onClick={togglePopup}
        className="fixed top-5 right-5 flex flex-col items-center text-white font-bold z-50"
        style={jakartaFont}
      >
        <img
          src={hintButtonImg}
          alt="Hint Button"
          className="w-32 h-auto hover:scale-105 transition-transform"
        />
      </button>

      {isOpen && (
        <div
          className="fixed bottom-[15vh]
                     left-1/2 transform -translate-x-1/2 
                     w-[95%] max-w-4xl 
                     text-white text-center p-12 md:p-16 
                     flex flex-col items-center justify-center 
                      z-50 rounded-4xl
                     "
          style={{
            backgroundImage: `url(${popupBoxImg})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: "rgba(50, 30, 50, 0.1)",
            ...jakartaFont,
          }}
        >
          <p className="text-yellow-400 font-bold text-xl md:text-2xl mb-4 leading-relaxed max-w-3xl">
            HINT {index + 1}:
            <span className="text-white font-medium ml-3">
              {hints[index]?.text}
            </span>
          </p>

          <div className="flex justify-center items-center gap-8 md:gap-12 mt-6">
            <button
              onClick={prevHint}
              style={{
                backgroundImage: `url(${prevBoxImg})`,
                backgroundSize: "100% 100%",
              }}
              className="w-24 h-20 md:w-32 md:h-24 
                         flex items-center justify-center 
                         bg-contain bg-no-repeat bg-center text-amber-400 font-extrabold 
                         text-3xl md:text-4xl hover:scale-110 transition-transform duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={index === 0}
            ></button>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                backgroundImage: `url(${okBoxImg})`,
                backgroundSize: "100% 100%",
              }}
              className="w-32 h-20 md:w-40 md:h-24 
                         flex items-center justify-center 
                         bg-contain bg-no-repeat bg-center text-yellow-400 font-extrabold 
                         text-2xl md:text-3xl hover:scale-110 transition-transform duration-200"
            ></button>

            <button
              onClick={nextHint}
              style={{
                backgroundImage: `url(${nextBoxImg})`,
                backgroundSize: "100% 100%",
              }}
              className="w-24 h-20 md:w-32 md:h-24 
                         flex items-center justify-center 
                         bg-contain bg-no-repeat bg-center text-amber-400 font-extrabold 
                         text-3xl md:text-4xl hover:scale-110 transition-transform duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={index === totalHints - 1}
            ></button>
          </div>
        </div>
      )}

      {isCorrectOpen && (
        <div className="fixed inset-0 z-60">
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       w-[90%] max-w-2xl 
                       text-white text-center p-8 md:p-12 
                       flex flex-col items-center justify-center shadow-2xl z-70"
            style={{
              backgroundImage: `url(${popupBoxImg})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "rgba(30, 30, 50, 0.1)",
              ...jakartaFont,
            }}
          >
            <h2
              className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-green-500 mb-8"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                padding: "15px 30px",
                margin: "10px 0",
              }}
            >
              CORRECT ANSWER
            </h2>

            <div className="flex justify-center items-center mt-6">
              <button
                onClick={
                  index === totalHints - 1
                    ? handleFinish
                    : handleNextHintFromCorrect
                }
                style={{
                  backgroundImage: `url(${nextHintImg})`,
                  backgroundSize: "100% 100%",
                }}
                className="w-40 h-20 md:w-52 md:h-24 flex items-center justify-center 
                           bg-contain bg-no-repeat bg-center text-white font-extrabold 
                           text-2xl md:text-3xl hover:scale-110 transition-transform duration-200"
              >
                {index === totalHints - 1 ? "" : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
