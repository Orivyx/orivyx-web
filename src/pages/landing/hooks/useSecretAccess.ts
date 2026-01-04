import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Secret key sequence: "orivyx" typed anywhere on the page
const SECRET_SEQUENCE = ["o", "r", "i", "v", "y", "x"];

// Alternative: Konami Code (↑↑↓↓←→←→BA)
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useSecretAccess() {
  const navigate = useNavigate();

  const handleKeySequence = useCallback(() => {
    let sequenceIndex = 0;
    let konamiIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const resetSequence = () => {
      sequenceIndex = 0;
      konamiIndex = 0;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Reset after 2 seconds of inactivity
      clearTimeout(timeout);
      timeout = setTimeout(resetSequence, 2000);

      const key = event.key.toLowerCase();

      // Check "orivyx" sequence
      if (key === SECRET_SEQUENCE[sequenceIndex]) {
        sequenceIndex++;
        if (sequenceIndex === SECRET_SEQUENCE.length) {
          navigate("/admin");
          resetSequence();
        }
      } else {
        sequenceIndex = 0;
      }

      // Check Konami Code
      if (
        event.key === KONAMI_CODE[konamiIndex] ||
        key === KONAMI_CODE[konamiIndex]
      ) {
        konamiIndex++;
        if (konamiIndex === KONAMI_CODE.length) {
          navigate("/admin");
          resetSequence();
        }
      } else {
        konamiIndex = 0;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [navigate]);

  useEffect(() => {
    return handleKeySequence();
  }, [handleKeySequence]);
}
