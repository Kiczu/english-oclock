import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export const metadata: Metadata = {
  title: "Sklep | English o'clock",
};

const ProductPage = ({ params }: Props) => {
  return (
    <main style={{ padding: 24 }}>
      <h1>Produkt: {params.slug}</h1>
      <p>Ta strona jest w budowie.</p>
    </main>
  );
};

export default ProductPage;
