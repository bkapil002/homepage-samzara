import { useCallback } from "react";

function ScrollButton() {
  // Scroll function
  const scrollWin = useCallback(() => {
    window.scrollBy({ top: 200, behavior: "smooth" }); // scroll down by 200px
  }, []);

  return (
   <div className="scroll-btn" onClick={scrollWin}>
      <svg
        className="arrows"
        viewBox="0 0 60 72"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="a1" d="M0 0 L30 32 L60 0"></path>
        <path className="a2" d="M0 20 L30 52 L60 20"></path>
        <path className="a3" d="M0 40 L30 72 L60 40"></path>
      </svg>
    </div>
  );
}

export default ScrollButton;
