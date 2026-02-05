import { axios } from "@/config/axios";
import type { LoginFormValues } from "@/interfaces/Userinterfaces";
import { Eye, EyeOff, Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
   const router = useRouter();

  const LoginAPI = async (data: LoginFormValues) => {
    const URL = `/user/login`;
    const res = await axios.post(URL, data);
    return res.data;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (formData) => {
    setPending(true);
    try {
      const res = await LoginAPI({
        email: formData.email,
        password: formData.password,
      });
      console.log("LOGIN PAGE RESPONSE:", res);
      localStorage.setItem("token", JSON.stringify(res?.data?.accessToken));
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      setPending(false);
      toast.success("Login successfully");
      setTimeout(() => {
        router.push("/Landing");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("Error:", error);
      toast.error("Invalid email or password");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="w-full grid grid-cols-2 h-screen font-inter bg-white">
      <div className="w-[70%] flex flex-col justify-center items-center mx-auto">
        <div className="mb-10 space-y-2">
          <h1 className="font-semibold text-3xl leading-9.5 text-[#181D27]">
            Welcome back
          </h1>
          <p className="text-[#535862] text-md leading-6">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="text-[#414651] font-medium text-base mb-1.5 leading-6 flex">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "This field is required" })}
              className="w-full outline outline-[#D5D7DA] rounded-md placeholder:font-normal placeholder:text-[#717680] placeholder:text-base px-3.5 py-2.5"
            />
            {errors.email && (
              <span className="text-xs text-red-600 mt-1 flex">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="text-[#414651] font-medium text-base mb-1.5 leading-6 flex">
              Password
            </label>
            <div className="relative">
              <input
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "This field is required",
                })}
                className="w-full outline outline-[#D5D7DA] rounded-md placeholder:font-normal placeholder:text-[#717680] placeholder:text-base px-3.5 py-2.5"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#717680] cursor-pointer"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-600 mt-1 flex">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex justify-between items-center gap-4">
            <label className="flex items-center space-x-2 text-sm text-[#414651]">
              <input
                type="checkbox"
                {...register("remember")}
                className="w-4 h-4 rounded-sm accent-[#265BB8]"
              />
              <span className="font-medium text-sm leading-5 text-[#414651]">
                Remember for 30 days
              </span>
            </label>
            <a
              href="/forgot-password"
              className="text-[#1F4B9E] font-semibold text-sm leading-5 hover:underline"
            >
              Forgot password
            </a>
          </div>

          <button
            type="submit"
            disabled={pending}
            className={`w-full h-11 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
              pending
                ? "bg-[#265BB8]/70 cursor-not-allowed"
                : "bg-[#265BB8] hover:bg-[#154091] hover:ring-2 hover:ring-[#154091]"
            } text-white`}
          >
            {pending ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </form>
      </div>

      <div className="w-full h-full">
        <Image
          src="/images/Section.svg"
          alt="Section"
          fill
          className="object-cover rounded-tl-4xl rounded-bl-4xl"
        />
      </div>
    </section>
  );
}
