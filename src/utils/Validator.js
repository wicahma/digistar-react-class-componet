const validateEmail = (val) => {
  if (val.length === 0)
    return { isError: true, message: "Email tidak boleh kosong!" };
  const re = /\S+@\S+\.\S+/g;

  const isError = !re.test(val);

  if (isError) return { isError: isError, message: "Email tidak valid!" };

  return { isError: false, message: "" };
};

const validatePassword = (val) => {
  if (val.length === 0)
    return { isError: true, message: "Password tidak boleh kosong!" };
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{5,16}$/g;

  const isError = !re.test(val);

  if (isError)
    return {
      isError: isError,
      message:
        "Password harus mengandung satu digit angka, satu huruf kecil, satu huruf besar, satu karakter khusus, tanpa spasi, dan 8-16 karakter!",
    };

  return { isError: false, message: "" };
};

export { validateEmail, validatePassword };
