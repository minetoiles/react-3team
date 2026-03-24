import { useState } from "react";

function SignupForm() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    let valid = true;

    if (nickname.length < 2) {
      setNicknameError("닉네임은 2자 이상이어야 해요.");
      valid = false;
    } else {
      setNicknameError("");
    }

    if (!email.includes("@")) {
      setEmailError("올바른 이메일을 입력해주세요.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("비밀번호는 6자 이상이어야 해요.");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000)); // 서버 요청 시뮬레이션
    setIsSubmitting(false);
    alert("가입 완료!");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <input placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        {nicknameError && <p style={{ color: "red" }}>{nicknameError}</p>}
      </div>
      <div>
        <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      </div>
      <div>
        <input placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "가입 중..." : "가입하기"}
      </button>
    </form>
  );
}

export default SignupForm;
