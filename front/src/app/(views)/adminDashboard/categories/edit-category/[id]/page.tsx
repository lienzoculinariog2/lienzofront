import CategoryForm from "../../../components/CategoryForm";

interface EditCategoryPageProps {
  params: { id: string };
}

const EditCategoryPage = ({ params }: EditCategoryPageProps) => {
  return <CategoryForm categoryId={params.id} />;
};

export default EditCategoryPage;
