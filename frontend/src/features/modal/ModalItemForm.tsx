import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import closeIcon from "../../assets/images/close.svg";
import itemIcon from "../../assets/images/dashboard-item.svg";
import { useItem } from "../../hooks/useItem";
import useModalStore from "../../store/modal";
import { useProductStore } from "../../store/productStore";

type ItemFormData = {
  productName: string;
  price: number;
  description: string;
};

export default function ModalItemForm() {
  const { closeModal } = useModalStore();
  const { item } = useProductStore();
  const { data, isLoading } = useItem(item?.id as number);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ItemFormData>({
    defaultValues: {
      productName: data?.productName || "",
      price: data?.price || "",
      description: data?.description || "",
    },
    values: {
      productName: data?.productName || "",
      price: data?.price || "",
      description: data?.description || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const validateForm = (data: ItemFormData) => {
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
  };

  const onSubmit = (formData: ItemFormData) => {
    if (!validateForm(formData)) {
      return;
    }

    console.log("Form Data:", formData);
    closeModal();
  };

  const handleDelete = () => {
    console.log("Delete item:", item?.id);
    closeModal();
  };

  if (isLoading) return <p>Loading...</p>;
  console.log(item?.image);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#485158] rounded-2xl p-6 2xl:p-8 flex flex-col items-center w-150 z-50 max-h-[90vh] overflow-y-auto"
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
        className="bg-[#D9D9D9] relative flex items-center justify-center w-22 h-22 rounded-2xl cursor-pointer overflow-hidden shadow"
        onClick={handleImageClick}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="product"
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={item?.image ? item.image : itemIcon}
            alt="profile"
            className=""
          />
        )}
        <span className="absolute bottom-0 text-[0.6rem] bg-[#676767] text-[#464646] w-full text-center">
          تغییر عکس
        </span>
      </div>

      <div className="w-full flex flex-col md:flex-row items-start md:items-center mt-8 2xl:mt-12 gap-4 md:gap-0">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-xs text-white w-full">
          <label htmlFor="productName">
            نام محصول <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="productName"
            className={`bg-white/40 rounded-xl h-10 w-full md:w-[90%] border outline-none pr-4 text-sm shadow ${
              errors.productName ? "border-red-500" : "border-transparent"
            }`}
            {...register("productName")}
          />
        </div>

        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-xs text-white w-full">
          <label htmlFor="price">
            قیمت محصول <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="price"
            className={`bg-white/40 rounded-xl h-10 w-full md:w-[90%] border outline-none pr-4 text-sm shadow ${
              errors.price ? "border-red-500" : "border-transparent"
            }`}
            inputMode="decimal"
            {...register("price")}
          />
        </div>
      </div>

      <div className="w-full flex items-start mt-8 2xl:mt-12">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-xs text-white w-full">
          <label htmlFor="description">توضیحات</label>
          <textarea
            id="description"
            className="bg-white/40 rounded-xl min-h-20 w-full border border-transparent outline-none p-4 text-sm shadow max-h-30 2xl:max-h-40"
            {...register("description")}
          />
        </div>
      </div>

      <div className="flex items-center w-full justify-center gap-8 md:gap-30 mt-8 2xl:mt-12">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#407E5C] hover:bg-[#10743D] text-white font-medium text-sm px-8 py-1.5 rounded-lg transition-all duration-150 lg:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-[#9F3535] hover:bg-[#790000] text-white font-medium text-sm px-8 py-1.5 rounded-lg transition-all duration-150 lg:cursor-pointer"
        >
          حذف
        </button>
      </div>
    </form>
  );
}
