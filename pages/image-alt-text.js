import ImageAltText from "../components/ImageAltText/ImageAltText";

export async function getServerSideProps() {
  return {
    props: {
      page_title: "Image Alt Text",
    },
  };
}

export default ImageAltText;
