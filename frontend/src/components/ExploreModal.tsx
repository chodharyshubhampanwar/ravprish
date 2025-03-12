import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExploreModalProps } from "../types/nav";
import { navigationData } from "../navigationData";

const ExploreModal: React.FC<ExploreModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex md:items-start justify-center md:pt-16">
      <div
        ref={modalRef}
        className="bg-white w-full h-full md:rounded-lg md:shadow-xl md:max-w-4xl md:mx-4 md:max-h-[80vh] md:overflow-y-auto"
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {navigationData.categories.map((category) => (
              <div key={category.id}>
                <h3 className="font-normal text-lg mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          navigate(item.path);
                          onClose();
                        }}
                        className="text-blue-700 hover:text-blue-950 transition-colors duration-200"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreModal;
