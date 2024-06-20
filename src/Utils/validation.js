const emailFilter =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{3,4})+$/;

function emailValidation(email) {
  return emailFilter.test(email);
}

export { emailValidation };
