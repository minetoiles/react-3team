import { useState } from "react";

type Fields = {
  nickname: string;
  email: string;
  password: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

// 폼 훅
function useForm(initialValues: Fields) {
  const [values, setValues] = useState<Fields>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function validate(): boolean {
    const newErrors: Errors = {};

    if (values.nickname.length < 2) newErrors.nickname = "닉네임은 2자 이상이어야 해요.";
    if (!values.email.includes("@")) newErrors.email = "올바른 이메일을 입력해주세요.";
    if (values.password.length < 6) newErrors.password = "비밀번호는 6자 이상이어야 해요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(onSubmit: (values: Fields) => Promise<void>) {
    return async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      await onSubmit(values);
      setIsSubmitting(false);
    };
  }

  return { values, errors, isSubmitting, handleChange, handleSubmit };
}

// 컴포넌트
function SignupForm() {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm({
    nickname: "",
    email: "",
    password: "",
  });

  const onSubmit = handleSubmit(async (values) => {
    await new Promise((res) => setTimeout(res, 1000));
    alert(`가입 완료! 닉네임: ${values.nickname}`);
  });

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <input placeholder="닉네임" value={values.nickname} onChange={handleChange("nickname")} />
        {errors.nickname && <p style={{ color: "red" }}>{errors.nickname}</p>}
      </div>
      <div>
        <input placeholder="이메일" value={values.email} onChange={handleChange("email")} />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <input placeholder="비밀번호" type="password" value={values.password} onChange={handleChange("password")} />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "가입 중..." : "가입하기"}
      </button>
    </form>
  );
}

export default SignupForm;
