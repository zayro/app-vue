export default {
  data: () => ({
    myVariable: 10
  }),
  created() {
    console.log(myVariable++);
  }
};