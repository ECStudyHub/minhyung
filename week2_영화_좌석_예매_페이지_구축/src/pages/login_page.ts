import { MSG } from "../resources/messages";
import { $$login_page } from "../section_elements";
import { validator } from "../validator";

export function handleClickLoginSectionLoginButton() {
  const email = $$login_page.$input_email?.value;
  const password = $$login_page.$input_password?.value;

  const validators = [
    {
      has_error: !email || !password,
      error_message: MSG.empty_login_section,
    },

    {
      has_error: email && !validator.email.test(email),
      error_message: MSG.error_validate_email,
    },
    {
      has_error: password && !validator.password_length.test(password),
      error_message: MSG.error_validate_password_length,
    },
    {
      has_error: password && !validator.password_format.test(password),
      error_message: MSG.error_validate_password_format,
    },
  ];

  for (const { has_error, error_message } of validators) {
    if (has_error) {
      window.alert(error_message);
      return;
    }
  }
}

export function connectLoginPageEventListeners() {
  $$login_page.$login_btn?.addEventListener("click", handleClickLoginSectionLoginButton);
}
