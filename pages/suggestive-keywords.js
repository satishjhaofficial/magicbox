import SuggestiveKeywords from "../components/SuggestiveKeywords/SuggestiveKeywords";

export async function getServerSideProps() {
  return {
    props: {
      page_title: "Suggestive Keywords",
    },
  };
}

export default SuggestiveKeywords;
