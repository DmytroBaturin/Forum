import styles from "./index.module.scss";
import { Button } from "../button";
import React, { useEffect, useState } from "react";
import useComponentVisible from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { createTopic, getCategory } from "../../store/actions/topics";
import { categoriesSelector } from "../../store/topicSlice";

export const Modal = () => {
  const { ref } = useComponentVisible(true);
  const dispatch = useDispatch();
  const [topic, setTopic] = useState({
    title: "",
    description: "",
    categoryIds: [],
  });
  const categories = useSelector(categoriesSelector);

  const handleInputChange = (type, value) => {
    setTopic((prev) => ({ ...prev, [type]: value }));
  };

  const isCategoryActive = (categoryId) => {
    return topic.categoryIds.includes(categoryId);
  };

  const handleCategoryChange = (categoryId) => {
    setTopic((prev) => {
      const isCategorySelected = prev.categoryIds.includes(categoryId);
      if (isCategorySelected) {
        return {
          ...prev,
          categoryIds: prev.categoryIds.filter((id) => id !== categoryId),
        };
      } else {
        return { ...prev, categoryIds: [...prev.categoryIds, categoryId] };
      }
    });
  };

  useEffect(() => {
    dispatch(getCategory());
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <div className={styles.overlay}></div>
      <div ref={ref} className={styles.modal}>
        <div className={styles.container}>
          <textarea
            className={styles}
            value={topic.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={topic.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Description"
          />
          {categories ? (
            <div className={styles.categories}>
              {categories.map((category) => (
                <span
                  key={category._id}
                  onClick={() => handleCategoryChange(category._id)}
                  className={
                    isCategoryActive(category._id) ? styles.activeCategory : ""
                  }
                >
                  {category.name}
                </span>
              ))}
            </div>
          ) : null}
          <Button
            onClick={() => {
              dispatch(createTopic(topic));
            }}
            text="Create Topic"
          />
        </div>
      </div>
    </div>
  );
};
