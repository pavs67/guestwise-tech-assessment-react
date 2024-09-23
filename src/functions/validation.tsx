export function validEmail(emailAddress: string) {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(emailAddress).toLowerCase());
}

export function validPhone(number: string) {
  const pattern = /^(0[127]{1}[0-9]{7,15})$/;
  return pattern.test(number);
}
