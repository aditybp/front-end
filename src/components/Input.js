import React, { useState } from "react";
import colors from "../styles/colors";
import { EyeSlash, Eye, CloseCircle } from "iconsax-react"; // Import ikon CloseCircle

const TextInput = ({
  label,
  placeholder = "Lorem Ipsum",
  size = "Small",
  baseClasses = "p-3 min-h-12 w-full border-[1.5px]",
  variant = "border",
  value,
  onChange,
  disabled = false,
  className = "",
  type = "text",
  isRequired = false, // Prop untuk required
  errorMessage = "This field is required", // Default pesan error
  labelPosition = "top", // New prop to control label position
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(""); // State untuk pesan error

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const sizes = {
    ExtraSmall: "text-ExtraSmall px-2 py-1",
    Small: "text-Small px-3 py-2",
    Medium: "text-Medium px-4 py-3",
    Large: "text-Large px-5 py-4",
    ExtraLarge: "text-ExtraLarge px-6 py-5",
  };

  const variants = {
    border:
      "border border-surface-light-outline focus:outline-none focus:border-2 focus:border-custom-blue-500",
  };

  // Fungsi untuk validasi
  const handleBlur = () => {
    if (isRequired && !value) {
      setError(errorMessage); // Set pesan error jika input required tapi kosong
    } else {
      setError(""); // Hapus error jika valid
    }
  };

  return (
    <div className={`relative flex flex-col ${className}`}>
      {label && (
        <div
          className={`flex ${
            labelPosition === "left" ? "items-center" : "flex-col"
          } mb-1`}>
          <label className="text-B2 text-emphasis-on_surface-high flex items-center w-[180px]">
            {label}
            {isRequired && (
              <span className="text-custom-red-500 ml-1 items-center">*</span>
            )}{" "}
            {/* Asterisk inline with label */}
          </label>
          {labelPosition === "left" ? (
            <div className="ml-4 w-full">
              {" "}
              {/* Adds space between label and input when left */}
              <input
                type={isPasswordVisible ? "text" : type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={handleBlur} // Validasi saat kehilangan fokus
                disabled={disabled}
                className={`${sizes[size]} ${baseClasses} ${
                  error ? "border-custom-red-500" : variants[variant]
                } rounded-[16px] w-full transition-all duration-200 ease-in-out`}
              />
              {error && (
                <div className="mt-1 text-custom-red-500 text-ExtraSmall">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <>
              <input
                type={isPasswordVisible ? "text" : type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={handleBlur} // Validasi saat kehilangan fokus
                disabled={disabled}
                className={`${sizes[size]} ${baseClasses} ${
                  error ? "border-custom-red-500" : variants[variant]
                } rounded-[16px] w-full transition-all duration-200 ease-in-out`}
              />
              {error && (
                <div className="flex items-center mt-1">
                  <CloseCircle
                    color={colors.Solid.Basic.Red[500]} // Ganti dengan warna yang sesuai
                    variant="Linear"
                    size={16}
                    className="mr-1"
                  />
                  <span className="text-custom-red-500 text-ExtraSmall">
                    {error}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 my-3">
          {isPasswordVisible ? (
            <EyeSlash
              color={colors.Emphasis.Light.On_Surface.Medium}
              variant="Linear"
              size={24}
            />
          ) : (
            <Eye
              color={colors.Emphasis.Light.On_Surface.Medium}
              variant="Linear"
              size={24}
            />
          )}
        </button>
      )}
    </div>
  );
};

export default TextInput;
