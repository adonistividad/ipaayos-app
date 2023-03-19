import { Gesture, GestureConfig, createGesture } from "@ionic/core";
// import { id } from 'date-fns/locale';
import React, { useEffect, useRef } from "react";
import "./AvtSwiperCard.css";

const AvtSwiperCard: React.FC<any> = ({
  data,
  cardObject,
  currentIndex,
  updateStatus,
}) => {
  const cardElement = useRef<HTMLDivElement>(null);
  const { id } = data;

  const swipeLeft = () => {
    cardElement.current!.style.transform = `translateX(-${
      window.innerWidth * 1.5
    }px)`;
    // updateStatus(id, task_id, null, "declined", currentIndex);
    updateStatus(id, "declined", currentIndex-1);
    setTimeout(() => {
      cardElement.current!.style.display = "none";
    }, 100);
  };
  const swipeRight = () => {
    cardElement.current!.style.transform = `translateX(${
      window.innerWidth * 1.5
    }px)`;
    updateStatus(id, "shortlisted", currentIndex-1);
    setTimeout(() => {
      cardElement.current!.style.display = "none";
    }, 100);
  };
  useEffect(() => {
    const initGesture = async () => {
      const windowWidth = window.innerWidth;
      if (cardElement.current === null) {
        return;
      }
      const options: GestureConfig = {
        el: cardElement.current,
        gestureName: "avt-swiper-card",
        onStart: () => {
          cardElement.current!.style.transition = "";
        },
        onMove: (detail) => {
          cardElement.current!.style.transform = `translate(${
            detail.deltaX
          }px, ${detail.deltaY}px) rotate(${detail.deltaX / 20}deg)`;
        },
        onEnd: (detail) => {
          cardElement.current!.style.transition = "0.3s ease-out";

          if (detail.deltaX > windowWidth / 3) {
            // do something
            swipeRight();
          } else if (detail.deltaX < -windowWidth / 3) {
            swipeLeft();
          } else {
            cardElement.current!.style.transform = "";
          }
        },
      };
      const gesture: Gesture = createGesture(options);
      gesture.enable();
    };
    initGesture();
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={cardElement} className="avt-swiper-card" >
      {cardObject}
    </div>
  );
};

export default AvtSwiperCard;
