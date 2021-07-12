const toLoginPage = (time = 600) => {
  setTimeout(() => {
    window.location.href = '/login';
  }, time);
};

const getPlayForm = () => {};

export {
  toLoginPage,
  getPlayForm,
};
