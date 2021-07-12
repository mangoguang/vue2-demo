export default {
  // 连续点击六次显示vconsole
  show() {
    let count = 0;
    let start = 0;
    const entry = document.querySelector('#app');
    if (entry) {
      entry.addEventListener('click', () => {
        if (count === 0) {
          start = Date.now();
        }
        count += 1;
        if (count > 5) {
          const time = Date.now() - start;
          if (time < 1800) {
            // 2s内点击6次
            count = -1000;
            const vconsole = document.querySelector('#__vconsole');
            if (vconsole) {
              vconsole.style.display = 'block';
            }
          } else {
            // 超过2s重新计算
            count = 0;
            start = 0;
          }
        }
      });
    }
  },
};
