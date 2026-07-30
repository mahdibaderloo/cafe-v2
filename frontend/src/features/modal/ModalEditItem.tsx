import { useForm, useWatch } from "react-hook-form";
import { useRef, useState } from "react";
import closeIcon from "../../assets/images/close.svg";
import itemIcon from "../../assets/images/dashboard-item.svg";
import { useItem } from "../../hooks/items/useItem";
import useModalStore from "../../store/modal";
import { useProductStore } from "../../store/productStore";
import type { ItemFormData } from "../../types/modal.type";
import type { ItemRequest } from "../../types/item.type";
import { useUpdateItem } from "../../hooks/items/useUpdateItem";

export default function ModalEditItem() {
  const { closeModal, setType } = useModalStore();
  const { item } = useProductStore();
  const { data, isLoading } = useItem(item?.id as number);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { mutate } = useUpdateItem();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ItemFormData>({
    values: {
      productName: data?.productName || "",
      price: data?.price || 0,
      description: data?.description || "",
    },
  });

  const priceValue = useWatch({
    control,
    name: "price",
  });

  function formatPrice(value: string) {
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return "";
    return parseInt(numbers, 10).toLocaleString("en-US");
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPrice(e.target.value);
    const numericValue = parseInt(formatted.replace(/,/g, "")) || 0;
    setValue("price", numericValue, { shouldValidate: true });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  function validateForm(data: ItemFormData) {
    let isValid = true;

    if (!data.productName || data.productName.trim() === "") {
      setError("productName", {
        type: "manual",
        message: "نام محصول الزامی است",
      });
      isValid = false;
    }

    if (!data.price || data.price <= 0) {
      setError("price", {
        type: "manual",
        message: "قیمت محصول الزامی است",
      });
      isValid = false;
    }

    return isValid;
  }

  function onSubmit(formData: ItemFormData) {
    if (!validateForm(formData)) {
      return;
    }

    const requestData: ItemRequest = {
      productName: formData.productName,
      price: formData.price,
      description: formData.description || "",
      categoryId: Number(item?.categoryId),
      image: imagePreview || data?.image || "",
    };

    mutate({
      id: item?.id as number,
      data: requestData,
    });
  }

  function handleDelete() {
    setType("submit");
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#485158] rounded-2xl p-6 2xl:p-8 flex flex-col items-center w-150 2xl:w-240 z-50"
    >
      <img
        src={closeIcon}
        alt="close-icon"
        className="self-end lg:cursor-pointer"
        onClick={() => closeModal()}
      />

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <div
        className="bg-[#D9D9D9] relative flex items-center justify-center w-26 h-26 2xl:w-36 2xl:h-36 rounded-2xl cursor-pointer overflow-hidden shadow"
        onClick={handleImageClick}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="product"
            className="w-full h-full object-cover"
          />
        ) : data?.image ? (
          <img
            src={data.image}
            alt="product"
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={itemIcon} alt="profile" className="" />
        )}
        <span className="absolute bottom-0 text-[0.8rem] 2xl:text-[1rem] bg-[#676767] text-[#464646] w-full text-center">
          تغییر عکس
        </span>
      </div>

      <div className="w-full flex flex-col md:flex-row items-start md:items-center mt-8 2xl:mt-12 gap-10">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-sm 2xl:text-lg text-white w-full">
          <label htmlFor="productName">
            نام محصول <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="productName"
            className={`bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-full border outline-none pr-4 font-medium shadow ${
              errors.productName ? "border-red-500" : "border-transparent"
            }`}
            {...register("productName")}
          />
          {errors.productName && (
            <span className="text-red-300 text-xs">
              {errors.productName.message}
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-sm 2xl:text-lg text-white w-full">
          <label htmlFor="price">
            قیمت محصول <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="price"
            className={`bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-full border outline-none pr-4 text-sm 2xl:text-lg font-medium shadow ${
              errors.price ? "border-red-500" : "border-transparent"
            }`}
            inputMode="decimal"
            value={priceValue ? priceValue.toLocaleString() : ""}
            onChange={handlePriceChange}
          />
          {errors.price && (
            <span className="text-red-300 text-xs">{errors.price.message}</span>
          )}
        </div>
      </div>

      <div className="w-full flex items-start mt-8 2xl:mt-12">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-sm 2xl:text-lg text-white w-full">
          <label htmlFor="description">توضیحات</label>
          <textarea
            id="description"
            className="bg-white/40 rounded-xl min-h-30 2xl:min-h-40 w-full border border-transparent outline-none p-4 shadow max-h-40 2xl:max-h-60"
            {...register("description")}
          />
        </div>
      </div>

      <div className="flex items-center w-full justify-center gap-8 md:gap-30 mt-8 2xl:mt-12">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#407E5C] hover:bg-[#10743D] text-white font-medium text-lg px-10 py-2 2xl:px-14 2xl:py-3 rounded-lg transition-all duration-150 lg:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-[#9F3535] hover:bg-[#790000] text-white font-medium text-lg px-10 py-2 2xl:px-14 2xl:py-3 rounded-lg transition-all duration-150 lg:cursor-pointer"
        >
          حذف
        </button>
      </div>
    </form>
  );
}
