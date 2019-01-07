export default {
  methods: {
    formateMoney(money) {
      let res = (money / 100).toFixed(2);
      return res;
    }
  }
};
