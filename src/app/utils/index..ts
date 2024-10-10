export const redirectToLogin = () => {
  window.location.href = process.env.NEXT_PUBLIC_REDIRECT_TO_LOGIN || "https://www.facebook.com/login";
};

export const redirectToCreateAccount = () => {
  window.location.href =
    process.env.NEXT_PUBLIC_REDIRECT_TO_CREATE_ACCOUNT ||
    "https://web.facebook.com/login/identify/?ctx=recover&ars=facebook_login&from_login_screen=0";
};
export const redirectToForgotPassword = () => {
  window.location.href =
    process.env.NEXT_PUBLIC_REDIRECT_TO_FORGOT_PASSWORD ||
    "https://web.facebook.com/r.php";
};

export const redirectToCreatePage = () => {
  window.location.href =
    process.env.NEXT_PUBLIC_REDIRECT_TO_CREATE_PAGE ||
    "https://web.facebook.com/pages/create/?ref_type=registration_form";
};
