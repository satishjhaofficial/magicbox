import QuestionAnswerGeneration from "../components/QuestionAnswerGeneration/QuestionAnswerGeneration";

export async function getServerSideProps() {
  return {
    props: {
      page_title: "Question & Answer Generation",
    },
  };
}

export default QuestionAnswerGeneration;
