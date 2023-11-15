import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import CollectionForm from "@/components/management/collection/CollectionForm";
import { collectionService } from "@/services/CollectionService";

const fetchCollectionData = async (id: number) => {
    return await collectionService.getById(id);
};

export default async function EditUserPage({ params }: { params: { id: string } }) {
    const data = await fetchCollectionData(parseInt(params.id));
    
    return (<>
        <PageHeader title="Edit Collection" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <CollectionForm collectionData={data?.toJSON()} />
        </MuiBox>
    </>)
}