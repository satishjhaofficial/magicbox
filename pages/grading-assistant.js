import GradingAssistant from "../components/GradingAssistant/GradingAssistant";

export async function getServerSideProps() {
  return {
    props: {
      page_title: "Grading Assistant",
    },
  };
}

export default GradingAssistant;
