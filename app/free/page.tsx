import { redirect } from "next/navigation";

const FreePage = () => {
  redirect("/sklep?price=free");
};

export default FreePage;
