import Summarization from "../components/Summarization/Summarization";

export async function getServerSideProps() {
  return {
    props: {
      page_title: "Summarization",
    },
  };
}

export default Summarization;
