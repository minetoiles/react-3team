import { createContext, useContext, useReducer } from "react";

// 타입

type FormState = {
  nickname: string;
  email: string;
  password: string;
  errors: Partial<Record<"nickname" | "email" | "password", string>>;
  isSubmitting: boolean;
};

type FormAction =
  | { type: "SET_FIELD"; field: keyof Omit<FormState, "errors" | "isSubmitting">; value: string }
  | { type: "SET_ERRORS"; errors: FormState["errors"] }
  | { type: "SET_SUBMITTING"; value: boolean };

// Reducer

const initialState: FormState = {
  nickname: "",
  email: "",
  password: "",
  errors: {},
  isSubmitting: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value };
  }
}

// Context

type FormContextValue = {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
};

const FormContext = createContext<FormContextValue | null>(null);

function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("FormProvider 안에서 사용하세요.");
  return ctx;
}

function FormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return <FormContext.Provider value={{ state, dispatch }}>{children}</FormContext.Provider>;
}

// 컴포넌트

function PreviewCard() {
  const { state } = useFormContext();
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8 }}>
      <p>닉네임 미리보기: {state.nickname || "—"}</p>
      <p>이메일 미리보기: {state.email || "—"}</p>
    </div>
  );
}

function SignupForm() {
  const { state, dispatch } = useFormContext();
  const { nickname, email, password, errors, isSubmitting } = state;

  function validate(): boolean {
    const newErrors: FormState["errors"] = {};
    if (nickname.length < 2) newErrors.nickname = "닉네임은 2자 이상이어야 해요.";
    if (!email.includes("@")) newErrors.email = "올바른 이메일을 입력해주세요.";
    if (password.length < 6) newErrors.password = "비밀번호는 6자 이상이어야 해요.";
    dispatch({ type: "SET_ERRORS", errors: newErrors });
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    dispatch({ type: "SET_SUBMITTING", value: true });
    await new Promise((res) => setTimeout(res, 1000));
    dispatch({ type: "SET_SUBMITTING", value: false });
    alert(`가입 완료! 닉네임: ${nickname}`);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <input
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "nickname", value: e.target.value })}
        />
        {errors.nickname && <p style={{ color: "red" }}>{errors.nickname}</p>}
      </div>
      <div>
        <input
          placeholder="이메일"
          value={email}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <input
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "가입 중..." : "가입하기"}
      </button>
    </form>
  );
}


function SignupPage() {
  return (
    <FormProvider>
      <SignupForm />
      <PreviewCard /> 
    </FormProvider>
  );
}

export default SignupPage;
