const first_names = ["ly", "ho", "tran", "le", "nguyen", "doan", "vu", "dinh"];

const last_names = ["nghia", "tien", "kien", "nam", "bao", "hai", "long"];

module.exports = () => {
  const adj = first_names[Math.floor(Math.random() * first_names.length)];
  const noun = last_names[Math.floor(Math.random() * last_names.length)];
  const MIN = 1000;
  const MAX = 9999;
  const num = Math.floor(Math.random() * (MAX + 1 - MIN)) + MIN;

  return `${adj}-${noun}-${num}`;
};
