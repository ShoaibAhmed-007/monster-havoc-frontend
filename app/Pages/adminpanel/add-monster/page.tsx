import MonsterForm from "@/app/components/Forms/MonsterForm";

function page() {
  return (
    <div className="container mx-auto py-8 flex justify-center items-center flex-col">
      <h1 className="text-2xl font-bold mb-4">Create Monster</h1>
      <div className="max-w-[700px] w-full">
        <MonsterForm />
      </div>
    </div>
  );
}
export default page;
